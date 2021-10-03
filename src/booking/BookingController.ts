import { Request, Response } from 'express';
import { LoadSearchController, SearchResult } from 'express-ext';
import { Booking } from 'onecore';
import { BookingService } from './BookingService';
import { BookingSM } from './BookingSM';

export class BookingController extends LoadSearchController<Booking, string, BookingSM> {
  constructor(log: (msg: string, ctx?: any) => void, find: (s: BookingSM, limit?: number, skip?: number | string, fields?: string[]) => Promise<SearchResult<Booking>>, private bookingService: BookingService) {
    super(log, find, bookingService);
    this.all = this.all.bind(this);
  }
  all(req: Request, res: Response) {
    this.bookingService.all()
      .then(bookings => res.status(200).json(bookings).end).catch(err => res.status(500).end(err));
  }
}
