import { Event, Model } from 'onecore';

export interface EventService {
  all(): Promise<Event[]>;
  load(id: string): Promise<Event>;
  getEventsByDate?(date: Date): Promise<Event[]>;
  getEventsByLocation?(locationId: string): Promise<Event[]>;
}

export const eventModel: Model = {
  name: 'events',
  attributes: {
    id: {
      key: true
    },
    name: {
      required: true,
      q: true
    },
    type: {
      match: 'equal',
      required: true
    },
    description: {
      q: true
    },
    status: {
      match: 'equal'
    },
    imageURL: {},
    startTime: {
      type: 'datetime',
    },
    endTime: {
      type: 'datetime',
    },
    latitude: {
      type: 'number',
    },
    longitude: {
      type: 'number',
    },
    locationId: {
      match: 'equal'
    }
  }
};
