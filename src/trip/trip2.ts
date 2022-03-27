import { DateRange, Filter, GenericService, Model } from 'onecore';

export interface Trip {
  id?: string;
  userId?: string;
  startTime: Date;
  endTime: Date;
  locations: string[];
  imageURL?: string;
}

export interface TripFilter extends Filter {
  id?: string;
  userId?: string;
  startTime?: DateRange;
  endTime?: DateRange;
  locations?: string[];
}

export interface TripService extends GenericService<Trip, string, number> {
  getTripsByDate?(date: Date): Promise<Trip[]>;
  getTripsByLocation?(locationId: string): Promise<Trip[]>;
}

export const tripModel: Model = {
  name: 'trips',
  attributes: {
    id: {
      key: true
    },
    userId: {
      required: true,
      match: 'equal'
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
    locations: {
      type: 'primitives'
    }
  }
};
