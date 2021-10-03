import { Trip } from './Trip';

export interface TripService {
  all(): Promise<Trip[]>;
  load(id: string): Promise<Trip>;
  getTripsByDate?(date: Date): Promise<Trip[]>;
  getTripsByLocation?(locationId: string): Promise<Trip[]>;
}
