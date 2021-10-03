import { Request, Response } from 'express';
import { LoadSearchController, SearchResult } from 'express-ext';
import { Trip } from './Trip';
import { TripService } from './TripService';
import { TripSM } from './TripSM';

export class TripController extends LoadSearchController<Trip, string, TripSM> {
  constructor(log: (msg: string, ctx?: any) => void, find: (s: TripSM, limit?: number, skip?: number | string, fields?: string[]) => Promise<SearchResult<Trip>>, private tripService: TripService) {
    super(log, find, tripService);
    this.all = this.all.bind(this);
  }
  all(req: Request, res: Response) {
    this.tripService.all()
      .then(trips => res.status(200).json(trips).end).catch(err => res.status(500).end(err));
  }
}
