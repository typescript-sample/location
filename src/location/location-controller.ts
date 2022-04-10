import { LoadSearchHandler, Log } from 'express-ext';
import { Search } from 'onecore';
import { Location, LocationFilter, LocationService } from './location';

export class LocationController extends LoadSearchHandler<Location, string, LocationFilter> {
  constructor(log: Log, find: Search<Location, LocationFilter>, service: LocationService) {
    super(log, find, service);
  }
}
