import { Location } from 'onecore';
import { LocationRate } from './LocationRate';

export interface LocationService {
  all(): Promise<Location[]>;
  load(id: string): Promise<Location>;

  getLocationsByTypeInRadius?(type: string, raidus: number): Promise<Location[]>;
  saveLocation?(userId: string, locationId: string): Promise<boolean>;
  removeLocation?(userId: string, locationId: string): Promise<boolean>;
  getLocationsOfUser?(userId: string): Promise<Location[]>;

  rateLocation?(objRate: LocationRate): Promise<boolean>;
}
