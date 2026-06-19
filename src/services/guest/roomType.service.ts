import { SearchBookingFilter } from "@constant/internal/SearchBookingFilter";
import { SearchFilter } from "@constant/internal/SearchFilter";
import { ApiResponse } from "@constant/response/ApiResponse";
import { RoomTypeResponse } from "@constant/response/RoomTypeResponse";
import httpPublic from "..";

const BASE_URL = "/public/room-types";

class GuestRoomTypeService {
  static async getList(
    params: SearchFilter & SearchBookingFilter,
  ): Promise<ApiResponse<RoomTypeResponse[]>> {
    return await httpPublic.get(BASE_URL, { params });
  }

  static async getById(id: number): Promise<RoomTypeResponse> {
    const { data } = await httpPublic.get(`${BASE_URL}/${id}`);

    return data;
  }
}

export default GuestRoomTypeService;
