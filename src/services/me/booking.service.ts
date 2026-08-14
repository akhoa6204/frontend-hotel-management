import type { ApiResponse } from "@constant/response/ApiResponse";
import type { BookingResponse } from "@constant/response/BookingResponse";
import httpClient from "..";
import type { SearchFilter } from "@constant/internal/SearchFilter";
import type { SearchBookingFilter } from "@constant/internal/SearchBookingFilter";
import type { BookingStatus } from "@enums/BookingStatus";
import type { BookingCancelRequest } from "@constant/request/BookingCancelRequest";

const BASE_URL = "/me/bookings";

class MyBookingService {
  static async getList(
    params: SearchFilter &
      Partial<SearchBookingFilter> & { status?: BookingStatus },
  ): Promise<ApiResponse<BookingResponse[]>> {
    return await httpClient.get(BASE_URL, {
      params,
    });
  }

  static async getById(id: string): Promise<BookingResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/${id}`);

    return data;
  }

  static async cancel(payload: BookingCancelRequest): Promise<BookingResponse> {
    const { id, reason } = payload;
    const { data } = await httpClient.patch(`${BASE_URL}/${id}/cancelled`, {
      reason,
    });

    return data;
  }
}

export default MyBookingService;
