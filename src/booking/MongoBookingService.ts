import { Db } from 'mongodb';
import { MongoLoader } from 'mongodb-extension';
import { Booking } from 'onecore';
import { bookingModel } from './model';

export class MongoBookingService extends MongoLoader<Booking, string> {
  constructor(protected db: Db, collectionName: string, fromPoint?: (v: Booking) => Booking) {
    super(db, collectionName, bookingModel.attributes, fromPoint);
  }
}
