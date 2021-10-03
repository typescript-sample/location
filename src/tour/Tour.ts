export interface Tour {
  id?: string;
  startTime: Date;
  endTime: Date;
  locations: string[]|Location[];
  imageURL?: string;
}
