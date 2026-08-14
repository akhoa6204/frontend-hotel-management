import type { SearchFilter } from "@constant/internal/SearchFilter";
import type { AmenityResponse } from "@constant/response/AmenityResponse";
import httpClient from "..";

const BASE_URL = "/staff/amenities";

export const StaffAmenityService = {
  async getAll(params?: SearchFilter): Promise<AmenityResponse[]> {
    const { data } = await httpClient.get(BASE_URL, {
      params,
    });

    return data;
  },
};

export default StaffAmenityService;
