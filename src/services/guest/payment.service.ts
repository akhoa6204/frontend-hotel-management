import { PaymentCreationRequest } from "@constant/request/PaymentCreationRequest";
import httpPublic from "..";
import { CheckoutLinkResponse } from "@constant/response/CheckoutLinkResponse";
import { PaymentResponse } from "@constant/response/PaymentResponse";

const BASE_URL = "/public/payments";

class GuestPaymentService {
  static async create(
    request: PaymentCreationRequest,
  ): Promise<PaymentResponse> {
    const { data } = await httpPublic.post(BASE_URL, request);

    return data;
  }

  static async createCheckoutLink(
    paymentId: number,
  ): Promise<CheckoutLinkResponse> {
    const { data } = await httpPublic.post(
      `${BASE_URL}/${paymentId}/checkout-link`,
    );

    return data;
  }

  static async getById(paymentId: number): Promise<PaymentResponse> {
    const { data } = await httpPublic.get(`${BASE_URL}/${paymentId}`);

    return data;
  }
}

export default GuestPaymentService;
