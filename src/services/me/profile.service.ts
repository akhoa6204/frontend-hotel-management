import { UserShortResponse } from "@constant/response/UserShortResponse";
import httpClient from "..";
import { UserUpdateRequest } from "@constant/request/UserPasswordRequest";
import { UserUpdatePasswordRequest } from "@constant/request/UserUpdatePasswordRequest";

const BASE_URL = "/api/me";

class ProfileService {
  static async getMe(): Promise<UserShortResponse> {
    const { data } = await httpClient.get(BASE_URL);
    return data;
  }

  static async updateMe(
    request: UserUpdateRequest,
  ): Promise<UserShortResponse> {
    const { data } = await httpClient.put(BASE_URL, request);

    return data;
  }

  static async changePassword(
    request: UserUpdatePasswordRequest,
  ): Promise<void> {
    await httpClient.patch(`${BASE_URL}/password`, request);
  }
}

export default ProfileService;
