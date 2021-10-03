import { Event } from 'onecore';

export interface EventService {
  all(): Promise<Event[]>;
  load(id: string): Promise<Event>;
  getEventsByDate?(date: Date): Promise<Event[]>;
  getEventsByLocation?(locationId: string): Promise<Event[]>;
}
