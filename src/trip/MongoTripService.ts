import { Db } from 'mongodb';
import { MongoWriter } from 'mongodb-extension';
import { tripModel } from './model';
import { Trip } from './Trip';

export class MongoTripService extends MongoWriter<Trip, string> {
  constructor(protected db: Db, collectionName: string) {
    super(db, collectionName, tripModel.attributes);
  }
}