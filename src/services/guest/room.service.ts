import type { RoomResponse } from "@constant/response/RoomResponse";
import httpPublic from "..";

const BASE_URL = "/public/rooms";

class GuestRoomService {
  static async getById(id: number): Promise<RoomResponse> {
    const { data } = await httpPublic.get(`${BASE_URL}/${id}`);

    return data;
  }
}

export default GuestRoomService;
