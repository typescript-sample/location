import { Db } from 'mongodb';
import { MongoLoader, PointMapper } from 'mongodb-extension';
import { tripModel } from './model';
import { Trip } from './Trip';

export class MongoTripService extends MongoLoader<Trip, string> {
  constructor(protected db: Db, collectionName: string) {
    super(db, collectionName, tripModel.attributes);
  }
}
