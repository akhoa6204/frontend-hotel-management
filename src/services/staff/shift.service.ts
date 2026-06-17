import { SearchSchedule } from "@constant/internal/SearchSchedule";
import { StaffShiftResponse } from "@constant/response/StaffShiftResponse";
import httpClient from "..";
import { ShiftResponse } from "@constant/response/ShiftResponse";
import { ShiftCreationRequest } from "@constant/request/ShiftCreationRequest";

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
  ): Promise<StaffShiftResponse[]> {
    const { data } = await httpClient.get(BASE_URL, { params });

    return data;
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
