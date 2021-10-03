import { Request, Response } from 'express';
import { LoadSearchController, SearchResult } from 'express-ext';
import { Bookable, BookableSM } from 'onecore';
import { BookableService } from './BookableService';

export class BookableController extends LoadSearchController<Bookable, string, BookableSM> {
  constructor(log: (msg: string, ctx?: any) => void, find: (s: BookableSM, limit?: number, skip?: number | string, fields?: string[]) => Promise<SearchResult<Bookable>>, private bookableService: BookableService) {
    super(log, find, bookableService);
    this.all = this.all.bind(this);
  }
  all(req: Request, res: Response) {
    this.bookableService.all()
      .then(bookables => res.status(200).json(bookables).end).catch(err => res.status(500).end(err));
  }
}
