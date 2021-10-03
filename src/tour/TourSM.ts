import { DateRange } from 'onecore';
import { SearchModel } from 'onecore';

export interface TourSM extends SearchModel {
  id?: string;
  startTime?: DateRange;
  endTime?: DateRange;
  locations?: string[];
}
