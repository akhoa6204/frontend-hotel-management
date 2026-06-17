import { RoomResponse } from "@constant/response/RoomResponse";
import httpClient from "..";

const BASE_URL = "/public/rooms";

class GuestRoomService {
  static async getById(id: number): Promise<RoomResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/${id}`);

    return data;
  }
}

export default GuestRoomService;
