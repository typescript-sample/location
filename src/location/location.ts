import { Attributes, DateRange, Filter, ViewRepository, ViewService } from 'onecore';

export interface LocationFilter extends Filter {
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date | DateRange;
}
export interface Location {
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
}
export interface LocationRepository extends ViewRepository<Location, string> {
}
export interface LocationService extends ViewService<Location, string> {
  /*
  getLocationsByTypeInRadius?(type: string, raidus: number): Promise<Location[]>;
  saveLocation?(userId: string, locationId: string): Promise<boolean>;
  removeLocation?(userId: string, locationId: string): Promise<boolean>;
  getLocationsOfUser?(userId: string): Promise<Location[]>;

  rateLocation?(objRate: LocationRate): Promise<boolean>;
  */
}

export const locationModel: Attributes = {
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
};
