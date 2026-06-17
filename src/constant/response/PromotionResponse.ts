import { DiscountType } from "src/enums/DiscountType";
import { PromotionScope } from "src/enums/PromotionScope";

export interface PromotionResponse {
  id: number;
  name: string;
  description: string;
  code?: string;

  discountType: DiscountType;
  discountValue: number;

  startDate: string;
  endDate: string;

  active: boolean;
  priority: number;
  stackable: boolean;

  quotaUsed: number;
  quotaTotal: number;

  scope: PromotionScope;

  minTotal?: number;
  maxDiscountAmount?: number;

  autoApplied: boolean;
}
