import { BookingCreationRequest } from "@constant/request/BookingCreationRequest";
import httpPublic from "..";
import { BookingResponse } from "@constant/response/BookingResponse";
import { QuoteRequest } from "@constant/request/QuoteRequest";
import { QuoteResponse } from "@constant/response/QuoteResponse";

const BASE_URL = "/public/bookings";

class GuestBookingService {
  static async create(
    request: BookingCreationRequest,
  ): Promise<BookingResponse> {
    const { data } = await httpPublic.post(BASE_URL, request);

    return data;
  }

  static async quote(request: QuoteRequest): Promise<QuoteResponse> {
    const { data } = await httpPublic.post(`${BASE_URL}/quote`, request);

    return data;
  }
}

export default GuestBookingService;
