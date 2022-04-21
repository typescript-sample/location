import { Request, Response } from 'express';
import { LoadSearchHandler, Log } from 'express-ext';
import { Search } from 'onecore';
import {
  Location,
  LocationFilter,
  LocationService,
  Rate
} from './location';
export class LocationController extends LoadSearchHandler<
  Location,
  string,
  LocationFilter
> {
  constructor(log: Log, find: Search<Location, LocationFilter>, public service: LocationService) {
    super(log, find, service);
    this.rateLocation = this.rateLocation.bind(this);
  }
  async rateLocation(req: Request, res: Response): Promise<any> {
    const { userId, locationId, rate, review, id, rateTime } = req.body;
    try {
      const rateLocation: Rate = {
        userId,
        locationId,
        rate,
        review,
        id,
        rateTime,
      };
      const rs = await this.service.rateLocation(rateLocation);
      return res.json(rs);
    } catch (error) {
      return res.status(400).json(false);
    }
  }
}
