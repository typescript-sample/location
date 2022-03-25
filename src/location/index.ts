import { LoadSearchController, SearchResult } from "express-ext";
import { Db } from "mongodb";
import { MongoLoader } from "mongodb-extension";
import { locationModel, LocationService } from "./location";
import { LocationSM } from 'onecore';
import { Request, Response } from "express";

export class LocationController extends LoadSearchController<Location, string, LocationSM> {
    constructor(log: (msg: string, ctx?: any) => void, find: (s: LocationSM, limit?: number, skip?: number | string, fields?: string[]) => Promise<SearchResult<Location>>, private locationService: LocationService) {
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