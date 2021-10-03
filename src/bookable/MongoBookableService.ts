import { Db } from 'mongodb';
import { MongoLoader } from 'mongodb-extension';
import { Bookable } from 'onecore';
import { bookableModel } from './model';

export class MongoBookableService extends MongoLoader<Bookable, string> {
  constructor(protected db: Db, collectionName: string, fromPoint?: (v: Bookable) => Bookable) {
    super(db, collectionName, bookableModel.attributes, fromPoint);
  }
}
