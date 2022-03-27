import { Request, Response } from 'express';
import { LoadSearchController } from 'express-ext';
import { Db } from 'mongodb';
import { MongoLoader } from 'mongodb-extension';
import { Event, EventFilter, Log, Search } from 'onecore';
import { eventModel, EventService } from './event';

export * from './event';

export class EventController extends LoadSearchController<Event, string, EventFilter> {
  constructor(log: Log, search: Search<Event, EventFilter>, private eventService: EventService) {
    super(log, search, eventService);
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
