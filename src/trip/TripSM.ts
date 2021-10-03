import { DateRange } from 'onecore';
import { SearchModel } from 'onecore';

export interface TripSM extends SearchModel {
  id?: string;
  startTime?: DateRange;
  endTime?: DateRange;
  locations?: string[];
}
