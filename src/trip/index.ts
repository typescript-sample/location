import { Db } from 'mongodb';
import { MongoWriter } from 'mongodb-extension';
import { Request, Response } from 'express';
import { GenericSearchController, SearchResult } from 'express-ext';
import { Trip, tripModel, TripService, TripSM } from './trip';

export class TripController extends GenericSearchController<Trip, string, TripSM> {
  constructor(log: (msg: string, ctx?: any) => void, find: (s: TripSM, limit?: number, skip?: number | string, fields?: string[]) => Promise<SearchResult<Trip>>, private tripService: TripService) {
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
