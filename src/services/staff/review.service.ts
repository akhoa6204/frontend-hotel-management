import { SearchFilter } from "@constant/internal/SearchFilter";
import httpClient from "..";
import { ApiResponse } from "@constant/response/ApiResponse";
import { ReviewResponse } from "@constant/response/ReviewResponse";
import { ReviewUpdateRequest } from "@constant/request/ReviewUpdateRequest";

const BASE_URL = "/staff/reviews";
export default class StaffReviewService {
  static async getList(
    params: SearchFilter,
  ): Promise<ApiResponse<ReviewResponse[]>> {
    try {
      return await httpClient.get(BASE_URL, {
        params,
      });
    } catch (e) {
      throw e;
    }
  }

  static async updateActive(data: ReviewUpdateRequest): Promise<void> {
    try {
      const { id, ...body } = data;
      await httpClient.patch<ApiResponse<ReviewResponse>>(
        `${BASE_URL}/${id}/active`,
        body,
      );
    } catch (e) {
      throw e;
    }
  }
}
