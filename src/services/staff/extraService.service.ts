import { ApiResponse } from "@constant/response/ApiResponse";
import httpClient from "..";
import { ServiceResponse } from "@constant/response/ServiceResponse";
import { ServiceCreationRequest } from "@constant/request/ServiceCreationRequest";
import { ServiceUpdateRequest } from "@constant/request/ServiceUpdateRequest";
import { SearchFilter } from "@constant/internal/SearchFilter";
import { SearchExtraService } from "@constant/internal/SearchExtraService";

const BASE_URL = "/staff/extra-services";

export const StaffExtraServiceService = {
  async getAll(
    params?: SearchFilter & SearchExtraService,
  ): Promise<ApiResponse<ServiceResponse[]>> {
    return await httpClient.get(BASE_URL, {
      params,
    });
  },

  async getById(id: number): Promise<ServiceResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/${id}`);

    return data;
  },

  async create(payload: ServiceCreationRequest): Promise<ServiceResponse> {
    const { data } = await httpClient.post(BASE_URL, payload);

    return data;
  },

  async update(payload: ServiceUpdateRequest): Promise<ServiceResponse> {
    const { id, ...body } = payload;
    const { data } = await httpClient.put(`${BASE_URL}/${id}`, body);

    return data;
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`${BASE_URL}/${id}`);
  },
};

export default StaffExtraServiceService;
