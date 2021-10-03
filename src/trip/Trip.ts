export interface Trip {
  id?: string;
  userId?: string;
  startTime: Date;
  endTime: Date;
  locations: string[];
  imageURL?: string;
}
