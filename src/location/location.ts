import {
  Attributes,
  DateRange,
  Filter,
  Service,
  ViewRepository,
  ViewService,
  Repository,
} from "onecore";

export interface LocationFilter extends Filter {
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date | DateRange;
}

export interface RateFilter extends Filter {
  id?: string;
  locationId?: string;
  userId?: string;
  rate?: number;
  rateTime?: Date | DateRange;
  review?: string;
}
export interface Location {
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
}
export interface LocationRepository extends Repository<Location, string> {}

export interface RateRepository extends Repository<Rate, string> {}

export interface LocationInfoRepository extends Repository<LocationInfo, string> {}
export interface LocationService
  extends Service<Location, string, LocationFilter> {
  /*
  getLocationsByTypeInRadius?(type: string, raidus: number): Promise<Location[]>;
  saveLocation?(userId: string, locationId: string): Promise<boolean>;
  removeLocation?(userId: string, locationId: string): Promise<boolean>;
  getLocationsOfUser?(userId: string): Promise<Location[]>;

  rateLocation?(objRate: LocationRate): Promise<boolean>;
  */
  rateLocation(objRate: Rate): Promise<boolean>;
}

export interface RateService extends Service<Rate, string, RateFilter> {
  rateLocation?(objRate: Rate): Promise<boolean>;
}

export const locationModel: Attributes = {
  id: {
    key: true,
  },
  name: {
    required: true,
    q: true,
  },
  type: {
    match: "equal",
    required: true,
  },
  description: {
    q: true,
  },
  status: {
    match: "equal",
  },
  imageURL: {},
  latitude: {
    type: "number",
  },
  longitude: {
    type: "number",
  },
};

export interface Rate {
  id?: string;
  locationId: string;
  userId: string;
  rate: number;
  rateTime?: Date;
  review?: string;
}
export interface LocationInfo {
  id: string;
  rate: number;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
  viewCount: number;
}

export const rateModel: Attributes = {
  id: {
    key: true,
  },
  locationId: {
    required: true,
    q: true,
  },
  userId: {
    required: true,
    q: true,
  },
  rate: {
    type: "number",
  },
  rateTime: {
    type: "datetime",
  },
  review: {
    q: true,
  },
};

export const locationInfoModel: Attributes = {
  id: {
    key: true,
  },
  viewCount: {
    type: "number",
  },
  rate: {
    type: "number",
  },
  rate1: {
    type: "number",
  },
  rate2: {
    type: "number",
  },
  rate3: {
    type: "number",
  },
  rate4: {
    type: "number",
  },
  rate5: {
    type: "number",
  },
};
