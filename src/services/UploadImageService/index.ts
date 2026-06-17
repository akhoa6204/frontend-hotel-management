import { UpLoadRequest } from "@constant/request/UploadRequest";
import httpClient from "..";
import axios from "axios";

const BASE = import.meta.env.VITE_CLOUDINARY_URL_UPLOAD;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
export default class UploadImageService {
  public static async upload(data: UpLoadRequest) {
    try {
      const formData = new FormData();

      formData.append("file", data.file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await axios.post(BASE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}
