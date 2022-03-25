import { Bookable, Model } from 'onecore';

export interface BookableService {
  all(): Promise<Bookable[]>;
  load(id: string): Promise<Bookable>;
}

export const bookableModel: Model = {
  name: 'bookable',
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
    capacity: {
      type: 'number',
    },
    locationId: {
      match: 'equal'
    }
  }
};
