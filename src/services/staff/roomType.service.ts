import type { SearchFilter } from "@constant/internal/SearchFilter";
import type { ApiResponse } from "@constant/response/ApiResponse";
import type { RoomTypeResponse } from "@constant/response/RoomTypeResponse";
import httpClient from "..";
import type { RoomTypeCreationRequest } from "@constant/request/RoomTypeCreationRequest";
import type { RoomTypeUpdateRequest } from "@constant/request/RoomTypeUpdateRequest";

const BASE_URL = "/staff/room-types";

class StaffRoomTypeService {
  static async getList(
    params: SearchFilter = {},
  ): Promise<ApiResponse<RoomTypeResponse[]>> {
    return await httpClient.get(BASE_URL, { params });
  }

  static async getById(id: number): Promise<RoomTypeResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/${id}`);

    return data;
  }

  static async create(
    request: RoomTypeCreationRequest,
  ): Promise<RoomTypeResponse> {
    const { data } = await httpClient.post(BASE_URL, request);

    return data;
  }

  static async update(
    id: number,
    request: RoomTypeUpdateRequest,
  ): Promise<RoomTypeResponse> {
    const { data } = await httpClient.put(`${BASE_URL}/${id}`, request);

    return data;
  }

  static async delete(id: number): Promise<void> {
    await httpClient.delete(`${BASE_URL}/${id}`);
  }
}

export default StaffRoomTypeService;
