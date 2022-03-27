import { Request, Response } from 'express';
import { LoadSearchController } from 'express-ext';
import { Db } from 'mongodb';
import { MongoLoader } from 'mongodb-extension';
import { Bookable, BookableFilter, Log, Search } from 'onecore';
import { bookableModel, BookableService } from './bookable';

export * from './bookable';

export class BookableController extends LoadSearchController<Bookable, string, BookableFilter> {
  constructor(log: Log, search: Search<Bookable, BookableFilter>, private bookableService: BookableService) {
    super(log, search, bookableService);
    this.all = this.all.bind(this);
  }
  all(req: Request, res: Response) {
    this.bookableService.all()
      .then(bookables => res.status(200).json(bookables).end).catch(err => res.status(500).end(err));
  }
}

export class MongoBookableService extends MongoLoader<Bookable, string> {
  constructor(protected db: Db, collectionName: string, fromPoint?: (v: Bookable) => Bookable) {
    super(db, collectionName, bookableModel.attributes, fromPoint);
  }
}
