import type { SearchFilter } from "@constant/internal/SearchFilter";
import httpClient from "..";
import type { ApiResponse } from "@constant/response/ApiResponse";
import type { ReviewResponse } from "@constant/response/ReviewResponse";
import type { ReviewUpdateRequest } from "@constant/request/ReviewUpdateRequest";

const BASE_URL = "/staff/reviews";
export default class StaffReviewService {
  static async getList(
    params: SearchFilter,
  ): Promise<ApiResponse<ReviewResponse[]>> {
    return await httpClient.get(BASE_URL, {
      params,
    });
  }

  static async updateActive(data: ReviewUpdateRequest): Promise<void> {
    const { id, ...body } = data;
    await httpClient.patch<ApiResponse<ReviewResponse>>(
      `${BASE_URL}/${id}/active`,
      body,
    );
  }
}
