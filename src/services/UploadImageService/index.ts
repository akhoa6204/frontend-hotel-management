import type {
  UpLoadRequest,
  UploadContext,
} from "@constant/request/UploadRequest";
import type { ApiResponse } from "@constant/response/ApiResponse";
import httpClient from "..";
import axios from "axios";

const SIGNATURE_URL = "/staff/uploads/cloudinary/signature";
const DELETE_URL = "/staff/uploads/cloudinary";
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type CloudinarySignature = {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
  uploadUrl: string;
};

export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
};

export default class UploadImageService {
  private static validateFile(file: File) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type) || file.size > MAX_IMAGE_SIZE_BYTES) {
      throw new Error("Only JPG, PNG, or WebP images up to 5 MB are allowed.");
    }
  }

  private static async getSignature(file: File, context: UploadContext) {
    const response = await httpClient.post<ApiResponse<CloudinarySignature>>(
      SIGNATURE_URL,
      {
        context,
        fileName: file.name,
        contentType: file.type,
        size: file.size,
      },
    );
    return response.data;
  }

  public static async upload(data: UpLoadRequest): Promise<CloudinaryUploadResult> {
    this.validateFile(data.file);
    const context = data.context ?? "room-types";
    const signature = await this.getSignature(data.file, context);
    const formData = new FormData();

    formData.append("file", data.file);
    formData.append("timestamp", String(signature.timestamp));
    formData.append("api_key", signature.apiKey);
    formData.append("signature", signature.signature);
    formData.append("folder", signature.folder);

    const response = await axios.post<CloudinaryUploadResult>(
      signature.uploadUrl,
      formData,
    );
    return response.data;
  }

  public static async deleteUploadedImage(
    publicId: string,
    context: UploadContext = "room-types",
  ) {
    await httpClient.delete(DELETE_URL, {
      data: { publicId, context },
    });
  }
}
