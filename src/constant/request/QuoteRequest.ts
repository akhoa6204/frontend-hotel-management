export type QuoteRequest = {
  roomId: number;
  startDate: string;
  endDate: string;
  promotionCode?: string;
};
