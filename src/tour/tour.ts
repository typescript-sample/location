import { DateRange, Filter, Model } from 'onecore';

export interface TourService {
  all(): Promise<Tour[]>;
  load(id: string): Promise<Tour>;
  getToursByDate?(date: Date): Promise<Tour[]>;
  getToursByLocation?(locationId: string): Promise<Tour[]>;
}
export interface Tour {
  id?: string;
  startTime: Date;
  endTime: Date;
  locations: string[] | Location[];
  imageURL?: string;
}
export interface TourFilter extends Filter {
  id?: string;
  startTime?: DateRange;
  endTime?: DateRange;
  locations?: string[];
}

export const tourModel: Model = {
  name: 'tours',
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
    locationId: {
      match: 'equal'
    }
  }
};
