import { Bookable } from 'onecore';

export interface BookableService {
  all(): Promise<Bookable[]>;
  load(id: string): Promise<Bookable>;
}
