import { Model } from 'onecore';

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