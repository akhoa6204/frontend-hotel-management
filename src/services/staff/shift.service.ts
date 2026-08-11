import type { SearchSchedule } from "@constant/internal/SearchSchedule";
import type { StaffShiftResponse } from "@constant/response/StaffShiftResponse";
import httpClient from "..";
import type { ShiftResponse } from "@constant/response/ShiftResponse";
import type { ShiftCreationRequest } from "@constant/request/ShiftCreationRequest";
import type { ApiResponse } from "@constant/response/ApiResponse";
import type { StaffShiftImportConfirmRequest } from "@constant/request/StaffShiftImportRequest";
import type {
  StaffShiftImportPreviewResponse,
  StaffShiftImportResultResponse,
} from "@constant/response/StaffShiftImportResponse";

const BASE_URL = "/staff/shifts";

class StaffShiftService {
  static async getMySchedule(
    params: SearchSchedule,
  ): Promise<StaffShiftResponse[]> {
    const { data } = await httpClient.get(`${BASE_URL}/me`, { params });

    return data;
  }

  static async getSchedule(
    params: SearchSchedule,
  ): Promise<ApiResponse<StaffShiftResponse[]>> {
    return await httpClient.get(BASE_URL, { params });
  }

  static async getDefinitions(): Promise<ShiftResponse[]> {
    const { data } = await httpClient.get(`${BASE_URL}/definitions`);

    return data;
  }

  static async create(request: ShiftCreationRequest): Promise<ShiftResponse> {
    const { data } = await httpClient.post(BASE_URL, request);

    return data;
  }

  static async remove(id: number): Promise<void> {
    await httpClient.delete(`${BASE_URL}/${id}`);
  }

  static async previewImport(file: File): Promise<StaffShiftImportPreviewResponse> {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await httpClient.post<ApiResponse<StaffShiftImportPreviewResponse>>(
      `${BASE_URL}/import/preview`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return data;
  }

  static async revalidateImport(
    request: StaffShiftImportConfirmRequest,
  ): Promise<StaffShiftImportPreviewResponse> {
    const { data } = await httpClient.post<ApiResponse<StaffShiftImportPreviewResponse>>(
      `${BASE_URL}/import/preview`,
      request,
    );
    return data;
  }

  static async confirmImport(
    request: StaffShiftImportConfirmRequest,
  ): Promise<StaffShiftImportResultResponse> {
    const { data } = await httpClient.post<ApiResponse<StaffShiftImportResultResponse>>(
      `${BASE_URL}/import/confirm`,
      request,
    );
    return data;
  }
}

export default StaffShiftService;
