import { Request, Response } from 'express';
import { LoadSearchController } from 'express-ext';
import { Db } from 'mongodb';
import { MongoLoader } from 'mongodb-extension';
import { Location, LocationFilter, Log, Search } from 'onecore';
import { locationModel, LocationService } from './location';

export class LocationController extends LoadSearchController<Location, string, LocationFilter> {
  constructor(log: Log, find: Search<Location, LocationFilter>, private locationService: LocationService) {
    super(log, find, locationService);
    this.all = this.all.bind(this);
    this.load = this.load.bind(this);
  }
  all(req: Request, res: Response) {
    this.locationService.all()
      .then(locations => res.status(200).json(locations).end).catch(err => res.status(500).end(err));
  }
}
export class MongoLocationService extends MongoLoader<Location, string> {
  constructor(protected db: Db, collectionName: string, fromPoint?: (v: Location) => Location) {
    super(db, collectionName, locationModel.attributes, fromPoint);
  }
}
