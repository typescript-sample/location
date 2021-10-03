import { Tour } from './Tour';

export interface TourService {
  all(): Promise<Tour[]>;
  load(id: string): Promise<Tour>;
  getToursByDate?(date: Date): Promise<Tour[]>;
  getToursByLocation?(locationId: string): Promise<Tour[]>;
}
