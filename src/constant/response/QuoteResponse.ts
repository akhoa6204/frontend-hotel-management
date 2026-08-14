import type { PromotionResponse } from "./PromotionResponse";

export type QuoteResponse = {
  nights: number;

  basePrice: number;

  subtotal: number;

  totalDiscount: number;

  finalTotal: number;

  promotion?: PromotionResponse;

  promotionDiscount?: number;

  autoPromotion?: PromotionResponse;

  autoDiscount?: number;
};
