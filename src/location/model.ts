import { Model } from 'onecore';

export const locationModel: Model = {
  name: 'location',
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
    latitude: {
      type: 'number',
    },
    longitude: {
      type: 'number',
    }
  }
};
