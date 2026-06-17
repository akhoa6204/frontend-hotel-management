export interface ReviewStatsResponse {
  avgOverall: number;
  avgAmenities: number;
  avgCleanliness: number;
  avgComfort: number;
  avgLocationScore: number;
  avgValueForMoney: number;
  avgHygiene: number;

  totalActiveReviews: number;
  totalHiddenReviews: number;
}
