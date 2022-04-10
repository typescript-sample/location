import { Db } from 'mongodb';
import { buildQuery, PointMapper, SearchBuilder } from 'mongodb-extension';
import { Log, ViewManager } from 'onecore';
import { Location, LocationFilter, locationModel, LocationRepository, LocationService } from './location';
import { LocationController } from './location-controller';
export * from './location';
export { LocationController };

import { MongoLocationRepository } from './mongo-location-repository';

export class LocationManager extends ViewManager<Location, string> implements LocationService {
  constructor(repository: LocationRepository) {
    super(repository);
  }
}

export function useLocationController(log: Log, db: Db): LocationController {
  const mapper = new PointMapper<Location>('geo', 'latitude', 'longitude');
  const builder = new SearchBuilder<Location, LocationFilter>(db, 'location', buildQuery, locationModel, mapper.fromPoint);
  const repository = new MongoLocationRepository(db, mapper.fromPoint);
  return new LocationController(log, builder.search, repository);
}
