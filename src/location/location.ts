import { Model } from "onecore";

export interface LocationRate {
    id?: string;
    locationId: string;
    userId: string;
    rate: number;
    rateTime?: Date;
    review?: string;
}

export interface LocationService {
    all(): Promise<Location[]>;
    load(id: string): Promise<Location>;

    getLocationsByTypeInRadius?(type: string, raidus: number): Promise<Location[]>;
    saveLocation?(userId: string, locationId: string): Promise<boolean>;
    removeLocation?(userId: string, locationId: string): Promise<boolean>;
    getLocationsOfUser?(userId: string): Promise<Location[]>;

    rateLocation?(objRate: LocationRate): Promise<boolean>;
}

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
