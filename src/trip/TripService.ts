import { GenericService } from 'onecore';
import { Trip } from './Trip';

export interface TripService extends GenericService<Trip, string, number> {
  getTripsByDate?(date: Date): Promise<Trip[]>;
  getTripsByLocation?(locationId: string): Promise<Trip[]>;
}
