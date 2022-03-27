import { Request, Response } from 'express';
import { GenericSearchController } from 'express-ext';
import { Db } from 'mongodb';
import { MongoWriter } from 'mongodb-extension';
import { Log, Search } from 'onecore';
import { Trip, TripFilter, tripModel, TripService } from './trip';

export * from './trip';

export class TripController extends GenericSearchController<Trip, string, TripFilter> {
  constructor(log: Log, find: Search<Trip, TripFilter>, private tripService: TripService) {
    super(log, find, tripService);
    this.all = this.all.bind(this);
  }
  all(req: Request, res: Response) {
    this.tripService.all()
      .then(trips => res.status(200).json(trips).end).catch(err => res.status(500).end(err));
  }
}

export class MongoTripService extends MongoWriter<Trip, string> {
  constructor(protected db: Db, collectionName: string) {
    super(db, collectionName, tripModel.attributes);
  }
}
