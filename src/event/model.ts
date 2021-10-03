import { Model } from 'onecore';

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
