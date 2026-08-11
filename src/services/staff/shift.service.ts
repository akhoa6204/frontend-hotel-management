import type { SearchSchedule } from "@constant/internal/SearchSchedule";
import type { StaffShiftResponse } from "@constant/response/StaffShiftResponse";
import httpClient from "..";
import type { ShiftResponse } from "@constant/response/ShiftResponse";
import type { ShiftCreationRequest } from "@constant/request/ShiftCreationRequest";
import type { ApiResponse } from "@constant/response/ApiResponse";

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
}

export default StaffShiftService;
