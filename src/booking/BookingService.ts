import { Booking } from 'onecore';

export interface BookingService {
  all(): Promise<Booking[]>;
  load(id: string): Promise<Booking>;
}
