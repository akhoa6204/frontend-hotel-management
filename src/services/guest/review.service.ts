import type { SearchFilter } from "@constant/internal/SearchFilter";
import httpPublic from "..";
import type { ApiResponse } from "@constant/response/ApiResponse";
import type { ReviewResponse } from "@constant/response/ReviewResponse";
import type { ReviewOverviewResponse } from "@constant/response/ReviewOverviewResponse";

const BASE_URL = "/public/reviews";

export default class GuestReviewService {
  static async getReviewsByRoomType(
    params: SearchFilter & { roomTypeId: number },
  ): Promise<ApiResponse<ReviewResponse[]>> {
    try {
      const { roomTypeId, ...data } = params;
      return await httpPublic.get(`${BASE_URL}/room-types/${roomTypeId}`, {
        data,
      });
    } catch (e) {
      throw e;
    }
  }

  static async getOverviewReviewsByRoomType(
    roomTypeId: number,
  ): Promise<ReviewOverviewResponse> {
    const { data } = await httpPublic.get(
      `${BASE_URL}/room-types/${roomTypeId}/overview`,
    );
    return data;
  }
}
