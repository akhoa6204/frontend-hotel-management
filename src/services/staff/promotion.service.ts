import { SearchFilter } from "@constant/internal/SearchFilter";
import { ApiResponse } from "@constant/response/ApiResponse";
import { PromotionResponse } from "@constant/response/PromotionResponse";
import httpClient from "..";
import { PromotionCreationRequest } from "@constant/request/PromotionCreationRequest";
import { PromotionUpdateRequest } from "@constant/request/PromotionUpdateRequest";

const BASE_URL = "/staff/promotions";

class StaffPromotionService {
  static async getList(
    params: SearchFilter = {},
  ): Promise<ApiResponse<PromotionResponse[]>> {
    return await httpClient.get(BASE_URL, { params });
  }

  static async getById(id: number): Promise<PromotionResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/${id}`);

    return data;
  }

  static async create(
    request: PromotionCreationRequest,
  ): Promise<PromotionResponse> {
    const { data } = await httpClient.post(BASE_URL, request);

    return data;
  }

  static async update(
    id: number,
    request: PromotionUpdateRequest,
  ): Promise<PromotionResponse> {
    const { data } = await httpClient.put(`${BASE_URL}/${id}`, request);

    return data;
  }

  static async delete(id: number): Promise<void> {
    await httpClient.delete(`${BASE_URL}/${id}`);
  }
}

export default StaffPromotionService;
