import { Controller, LoadSearchHandler, Log } from "express-ext";
import { Search } from "onecore";
import {
  Location,
  LocationFilter,
  LocationService,
  Rate,
  RateFilter,
  RateService,
} from "./location";
import { Request, Response } from "express";
export class LocationController extends Controller<
  Location,
  string,
  LocationFilter
> {
  constructor(log: Log, public service: LocationService) {
    super(log, service);
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

export class RateController extends Controller<Rate, string, RateFilter> {
  constructor(log: Log, service: RateService) {
    super(log, service);
  }
}
