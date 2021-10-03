import { Db } from 'mongodb';
import { MongoLoader } from 'mongodb-extension';
import { Location } from 'onecore';
import { locationModel } from './model';

export class MongoLocationService extends MongoLoader<Location, string> {
  constructor(protected db: Db, collectionName: string, fromPoint?: (v: Location) => Location) {
    super(db, collectionName, locationModel.attributes, fromPoint);
  }
}
