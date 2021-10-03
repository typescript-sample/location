import { Db, FilterQuery } from 'mongodb';
import { findAllWithMap, MongoLoader } from 'mongodb-extension';
import { Location } from 'onecore';
import { tourModel } from './model';
import { Tour } from './Tour';

export class MongoTourService extends MongoLoader<Tour, string> {
  constructor(protected db: Db, collectionName: string) {
    super(db, collectionName, tourModel.attributes);
  }
  load(id: string): Promise<Tour> {
    return super.load(id).then(tour => {
      if (tour && tour.locations && tour.locations.length > 0) {
        const locationIds: any = tour.locations;
        const query: FilterQuery<any> = { _id: { $in: locationIds } };
        return findAllWithMap<Location>(this.db.collection('location'), query, '_id').then(locations => {
          tour.locations = locations as any;
          return tour;
        });
      } else {
        return tour;
      }
    });
  }
}
