import { Db } from 'mongodb';
import { MongoLoader } from 'mongodb-extension';
import { Event } from 'onecore';
import { eventModel } from './model';

export class MongoEventService extends MongoLoader<Event, string> {
  constructor(protected db: Db, collectionName: string, fromPoint?: (v: Event) => Event) {
    super(db, collectionName, eventModel.attributes, fromPoint);
  }
}
