export interface LocationRate {
  id?: string;
  locationId: string;
  userId: string;
  rate: number;
  rateTime?: Date;
  review?: string;
}
