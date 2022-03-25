import { Db, FilterQuery } from 'mongodb';
import { findAllWithMap, MongoLoader } from 'mongodb-extension';
import { Location } from 'onecore';

import { Request, Response } from 'express';
import { LoadSearchController, SearchResult } from 'express-ext';
import { Tour, tourModel, TourService, TourSM } from './tour';

export class TourController extends LoadSearchController<Tour, string, TourSM> {
  constructor(log: (msg: string, ctx?: any) => void, find: (s: TourSM, limit?: number, skip?: number | string, fields?: string[]) => Promise<SearchResult<Tour>>, private tourService: TourService) {
    super(log, find, tourService);
    this.all = this.all.bind(this);
  }
  all(req: Request, res: Response) {
    this.tourService.all()
      .then(tours => res.status(200).json(tours).end).catch(err => res.status(500).end(err));
  }
}

export class MongoTourService extends MongoLoader<Tour, string> {
  constructor(protected db: Db, collectionName: string) {
    super(db, collectionName, tourModel.attributes);
  }
  load(id: string): Promise<Tour> {
    return super.load(id).then(tour => {
      if (tour && tour.locations && tour.locations.length > 0) {
        const locationIds: any = tour.locations;
        const query: FilterQuery<any> = { _id: { $in: locationIds } };
        return findAllWithMap<Location>(this.db.collection('location'), query, '_id').then(locations => {
          tour.locations = locations as any;
          return tour;
        });
      } else {
        return tour;
      }
    });
  }
}
