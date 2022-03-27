import { Booking, Filter, Model } from 'onecore';

export interface BookingFilter extends Filter {
  bookingId?: string;
  id?: string;
  userId?: string;
  name?: string;
  type?: string;
  description?: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  status?: string;
}

export interface BookingService {
  all(): Promise<Booking[]>;
  load(id: string): Promise<Booking>;
}

export const bookingModel: Model = {
  name: 'booking',
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


