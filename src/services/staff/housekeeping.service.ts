import { HouseKeepingTaskResponse } from "@constant/response/HousekeepingResponse";
import httpClient from "..";
import { ApiResponse } from "@constant/response/ApiResponse";
import { SearchFilter } from "@constant/internal/SearchFilter";
import { SearchHouseKeepingTask } from "@constant/internal/SearchHousekeepingTask";
import { HousekeepingCreationRequest } from "@constant/request/HousekeepingCreationRequest";
import { HousekeepingUpdateRequest } from "@constant/request/HousekeepingUpdateRequest";

const BASE_URL = "/staff/housekeepings";

class StaffHousekeepingService {
  static async getList(
    params: SearchHouseKeepingTask & SearchFilter = {},
  ): Promise<ApiResponse<HouseKeepingTaskResponse[]>> {
    return await httpClient.get(BASE_URL, { params });
  }

  static async getMyList(
    params: SearchHouseKeepingTask & SearchFilter = {},
  ): Promise<ApiResponse<HouseKeepingTaskResponse[]>> {
    return await httpClient.get(`${BASE_URL}/me`, { params });
  }

  static async getById(id: number): Promise<HouseKeepingTaskResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/${id}`);

    return data;
  }

  static async create(
    request: HousekeepingCreationRequest,
  ): Promise<HouseKeepingTaskResponse> {
    const { data } = await httpClient.post(BASE_URL, request);

    return data;
  }

  static async update(
    request: HousekeepingUpdateRequest,
  ): Promise<HouseKeepingTaskResponse> {
    const { id, ...body } = request;
    const { data } = await httpClient.put(`${BASE_URL}/${id}`, body);

    return data;
  }
}

export default StaffHousekeepingService;
