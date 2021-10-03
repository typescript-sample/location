export interface Trip {
  id?: string;
  startTime: Date;
  endTime: Date;
  locations: string[];
  imageURL?: string;
}
