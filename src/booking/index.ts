import { Request, Response } from 'express';
import { LoadSearchController } from 'express-ext';
import { Db } from 'mongodb';
import { MongoLoader } from 'mongodb-extension';
import { Booking, Log, Search } from 'onecore';
import { BookingFilter, bookingModel, BookingService } from './booking';


export class BookingController extends LoadSearchController<Booking, string, BookingFilter> {
  constructor(log: Log, search: Search<Booking, BookingFilter>, private bookingService: BookingService) {
    super(log, search, bookingService);
    this.all = this.all.bind(this);
  }
  all(req: Request, res: Response) {
    this.bookingService.all()
      .then(bookings => res.status(200).json(bookings).end).catch(err => res.status(500).end(err));
  }
}

export class MongoBookingService extends MongoLoader<Booking, string> {
  constructor(protected db: Db, collectionName: string, fromPoint?: (v: Booking) => Booking) {
    super(db, collectionName, bookingModel.attributes, fromPoint);
  }
}
