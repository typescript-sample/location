import { Db } from 'mongodb';
import { ViewRepository } from 'mongodb-extension';
import { Repository } from 'mongodb-extension';
import { Location, locationModel, LocationRepository, LocationService, Rate, RateRepository } from './location';

export class MongoLocationRepository extends Repository<Location, string> implements LocationRepository {
  constructor(db: Db) {
    super(db, 'location', locationModel);
  }
 
}
