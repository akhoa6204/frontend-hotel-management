import type { SearchFilter } from "@constant/internal/SearchFilter";
import httpClient from "..";
import type { ApiResponse } from "@constant/response/ApiResponse";
import type { BookingResponse } from "@constant/response/BookingResponse";
import type { BookingCreationRequest } from "@constant/request/BookingCreationRequest";
import type { BookingUpdateRequest } from "@constant/request/BookingUpdateRequest";
import type { QuoteRequest } from "@constant/request/QuoteRequest";
import type { QuoteResponse } from "@constant/response/QuoteResponse";
import type { BookingCancelRequest } from "@constant/request/BookingCancelRequest";

const BASE_URL = "/staff/bookings";

class StaffBookingService {
  static async getList(
    params: SearchFilter,
  ): Promise<ApiResponse<BookingResponse[]>> {
    return await httpClient.get(BASE_URL, {
      params,
    });
  }

  static async getById(id: string): Promise<BookingResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/${id}`);

    return data;
  }

  static async create(
    request: BookingCreationRequest,
  ): Promise<BookingResponse> {
    const { data } = await httpClient.post(BASE_URL, request);

    return data;
  }

  static async update(request: BookingUpdateRequest): Promise<BookingResponse> {
    const { id, ...body } = request;
    const { data } = await httpClient.patch(`${BASE_URL}/${id}`, body);

    return data;
  }

  static async confirm(id: string): Promise<BookingResponse> {
    const { data } = await httpClient.patch(`${BASE_URL}/${id}/confirm`);

    return data;
  }

  static async checkin(id: string): Promise<BookingResponse> {
    const { data } = await httpClient.patch(`${BASE_URL}/${id}/checkin`);

    return data;
  }

  static async checkout(id: string): Promise<BookingResponse> {
    const { data } = await httpClient.patch(`${BASE_URL}/${id}/checkout`);

    return data;
  }

  static async cancel(body: BookingCancelRequest): Promise<BookingResponse> {
    const { id, reason } = body;
    const { data } = await httpClient.patch(`${BASE_URL}/${id}/cancelled`, {
      reason,
    });

    return data;
  }

  static async quote(request: QuoteRequest): Promise<QuoteResponse> {
    const { data } = await httpClient.post(`${BASE_URL}/quote`, request);

    return data;
  }
}

export default StaffBookingService;
