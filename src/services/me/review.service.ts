import { SearchFilter } from "@constant/internal/SearchFilter";
import httpClient from "..";
import { ApiResponse } from "@constant/response/ApiResponse";
import { ReviewResponse } from "@constant/response/ReviewResponse";
import { ReviewCreationRequest } from "@constant/request/ReviewCreationRequest";

const BASE_URL = "/me/reviews";

export default class MyReviewService {
  static async create(data: ReviewCreationRequest): Promise<ReviewResponse> {
    const { bookingId, ...body } = data;
    const response = await httpClient.post(
      `${BASE_URL}/bookings/${bookingId}`,
      body,
    );

    return response.data;
  }

  static async getList(
    params: SearchFilter,
  ): Promise<ApiResponse<ReviewResponse[]>> {
    return await httpClient.get(BASE_URL, {
      params,
    });
  }

  static async getById(id: number): Promise<ReviewResponse> {
    const response = await httpClient.get(`${BASE_URL}/${id}`);

    return response.data;
  }

  
}
