import type { DiscountType } from "src/enums/DiscountType";
import type { PromotionScope } from "src/enums/PromotionScope";

export interface PromotionUpdateRequest {
  name: string;
  description: string;

  code?: string;

  discountType: DiscountType;
  discountValue: number;

  startDate: string;
  endDate: string;

  priority: number;

  stackable: boolean;
  autoApplied: boolean;

  quotaTotal: number;

  scope: PromotionScope;

  minTotal?: number;
  maxDiscountAmount?: number;
}
