import type { InvoiceResponse } from "@constant/response/InvoiceResponse";
import httpClient from "..";
import type { InvoiceItemCreationRequest } from "@constant/request/InvoiceItemCreationRequest";
import type { InvoiceItemUpdateRequest } from "@constant/request/InvoiceItemUpdateRequest";

const BASE_URL = "/staff/invoices";

class StaffInvoiceService {
  static async getById(id: string): Promise<InvoiceResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/${id}`);

    return data;
  }

  static async addInvoiceItem(
    request: InvoiceItemCreationRequest,
  ): Promise<InvoiceResponse> {
    const { invoiceId, ...body } = request;
    const { data } = await httpClient.post(
      `${BASE_URL}/${invoiceId}/invoice-items`,
      body,
    );

    return data;
  }

  static async updateInvoiceItem(
    request: InvoiceItemUpdateRequest,
  ): Promise<InvoiceResponse> {
    const { id, ...body } = request;
    const { data } = await httpClient.patch(
      `${BASE_URL}/invoice-items/${id}`,
      body,
    );

    return data;
  }

  static async deleteInvoiceItem(
    invoiceItemId: number,
  ): Promise<InvoiceResponse> {
    const { data } = await httpClient.delete(
      `${BASE_URL}/invoice-items/${invoiceItemId}`,
    );

    return data;
  }
}

export default StaffInvoiceService;
