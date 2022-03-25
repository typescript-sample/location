import { Db } from 'mongodb';
import { MongoLoader } from 'mongodb-extension';
import { Request, Response } from 'express';
import { LoadSearchController, SearchResult } from 'express-ext';
import { Event, EventSM } from 'onecore';
import { eventModel, EventService } from './event';

export class EventController extends LoadSearchController<Event, string, EventSM> {
    constructor(log: (msg: string, ctx?: any) => void, find: (s: EventSM, limit?: number, skip?: number | string, fields?: string[]) => Promise<SearchResult<Event>>, private eventService: EventService) {
      super(log, find, eventService);
      this.all = this.all.bind(this);
    }
    all(req: Request, res: Response) {
      this.eventService.all()
        .then(events => res.status(200).json(events).end).catch(err => res.status(500).end(err));
    }
  }

export class MongoEventService extends MongoLoader<Event, string> {
  constructor(protected db: Db, collectionName: string, fromPoint?: (v: Event) => Event) {
    super(db, collectionName, eventModel.attributes, fromPoint);
  }
}
