import { SearchFilter } from "@constant/internal/SearchFilter";
import httpClient from "..";
import { ApiResponse } from "@constant/response/ApiResponse";
import { ReviewResponse } from "@constant/response/ReviewResponse";
import { ReviewOverviewResponse } from "@constant/response/ReviewOverviewResponse";

const BASE_URL = "/public/reviews";

export default class GuestReviewService {
  static async getReviewsByRoomType(
    params: SearchFilter & { roomTypeId: number },
  ): Promise<ApiResponse<ReviewResponse[]>> {
    try {
      const { roomTypeId, ...data } = params;
      return await httpClient.get(`${BASE_URL}/room-types/${roomTypeId}`, {
        data,
      });
    } catch (e) {
      throw e;
    }
  }

  static async getOverviewReviewsByRoomType(
    roomTypeId: number,
  ): Promise<ReviewOverviewResponse> {
    const { data } = await httpClient.get(
      `${BASE_URL}/room-types/${roomTypeId}/overview`,
    );
    return data;
  }
}
