import { SearchFilter } from "@constant/internal/SearchFilter";
import { ApiResponse } from "@constant/response/ApiResponse";
import { RoomResponse } from "@constant/response/RoomResponse";
import httpClient from "..";
import { RoomCreationRequest } from "@constant/request/RoomCreationRequest";
import { RoomUpdateRequest } from "@constant/request/RoomUpdateRequest";
import { SearchBookingFilter } from "@constant/internal/SearchBookingFilter";

const BASE_URL = "/staff/rooms";

class StaffRoomService {
  static async getList(
    params: SearchFilter & Partial<SearchBookingFilter>,
  ): Promise<ApiResponse<RoomResponse[]>> {
    return await httpClient.get(BASE_URL, { params });
  }

  static async getById(id: number): Promise<RoomResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/${id}`);

    return data;
  }

  static async create(request: RoomCreationRequest): Promise<RoomResponse> {
    const { data } = await httpClient.post(BASE_URL, request);

    return data;
  }

  static async update(
    id: number,
    request: RoomUpdateRequest,
  ): Promise<RoomResponse> {
    const { data } = await httpClient.patch(`${BASE_URL}/${id}`, request);

    return data;
  }

  static async delete(id: number): Promise<void> {
    await httpClient.delete(`${BASE_URL}/${id}`);
  }
}

export default StaffRoomService;
