import { Request, Response } from 'express';
import { LoadSearchController, SearchResult } from 'express-ext';
import { Tour } from './Tour';
import { TourService } from './TourService';
import { TourSM } from './TourSM';

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
