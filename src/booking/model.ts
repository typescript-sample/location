import { Model } from 'onecore';

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
