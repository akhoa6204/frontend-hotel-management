import { PaymentCreationRequest } from "@constant/request/PaymentCreationRequest";
import httpClient from "..";
import { PaymentUpdateRequest } from "@constant/request/PaymentUpdateRequest";
import { CheckoutLinkResponse } from "@constant/response/CheckoutLinkResponse";
import { PaymentResponse } from "@constant/response/PaymentResponse";

const BASE_URL = "/staff/payments";

class StaffPaymentService {
  static async create(
    request: PaymentCreationRequest,
  ): Promise<PaymentResponse> {
    const { data } = await httpClient.post(BASE_URL, request);

    return data;
  }

  static async getById(id: number): Promise<PaymentResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/${id}`);

    return data;
  }

  static async update(request: PaymentUpdateRequest): Promise<PaymentResponse> {
    const { paymentId, ...body } = request;
    const { data } = await httpClient.patch(`${BASE_URL}/${paymentId}`, body);

    return data;
  }

  static async createCheckoutLink(
    paymentId: number,
  ): Promise<CheckoutLinkResponse> {
    const { data } = await httpClient.post(
      `${BASE_URL}/${paymentId}/checkout-link`,
    );

    return data;
  }
}

export default StaffPaymentService;
