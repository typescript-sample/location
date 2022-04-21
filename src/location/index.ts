import { Db } from 'mongodb';
import { buildQuery, PointMapper, SearchBuilder } from 'mongodb-extension';
import { Log, ViewManager } from 'onecore';
import shortid from 'shortid';
import {
  Location,
  LocationFilter,
  LocationInfo,
  LocationInfoRepository,
  locationModel,
  LocationRepository,
  LocationService,
  Rate,
  RateRepository,
} from './location';
import { LocationController } from './location-controller';
import { MongoLocationInfoRepository } from './mongo-location-info-repository';
import { MongoLocationRateRepository } from './mongo-location-rate-repository';
export * from './location';
export { LocationController };

import { MongoLocationRepository } from './mongo-location-repository';

export class LocationManager
  extends ViewManager<Location, string>
  implements LocationService {
  constructor(
    repository: LocationRepository,
    private rateRepository: RateRepository,
    private infoRepository: LocationInfoRepository
  ) {
    super(repository);
  }
  async rateLocation(objRate: Rate): Promise<boolean> {
    if (
      !this.rateRepository.save ||
      !this.rateRepository.exist ||
      !this.infoRepository.save
    ) {
      return false;
    }
    const info = await this.infoRepository.load(objRate.locationId);
    if (
      !info ||
      typeof info[('rate' + objRate.rate.toString()) as keyof LocationInfo ] === 'undefined'
    ) {
      return false;
    }

    if (objRate.id) {
      const rate = await this.rateRepository.load(objRate.id);
      if (!rate) { return false; }
      (info as any)['rate' + rate.rate.toString()] -= 1;
      rate.rate = objRate.rate;
      const rs = await this.rateRepository.update(rate);
      if (rs !== 1) { return false; }
    } else {
      const rs = await this.rateRepository.save({
        ...objRate,
        id: shortid.generate(),
      });
      if (rs !== 1) { return false; }
    }
    const sumRate =
      info.rate1 +
      info.rate2 * 2 +
      info.rate3 * 3 +
      info.rate4 * 4 +
      info.rate5 * 5;
    info.viewCount = sumRate;
    (info as any)['rate' + objRate.rate.toString()] += 1;
    info.rate = sumRate / info.viewCount;
    this.infoRepository.save(info);
    return true;
  }
}

export function useLocationController(log: Log, db: Db): LocationController {
  const mapper = new PointMapper<Location>('geo', 'latitude', 'longitude');
  const builder = new SearchBuilder<Location, LocationFilter>(db, 'location', buildQuery, locationModel, mapper.fromPoint);
  const repository = new MongoLocationRepository(db, mapper.fromPoint);
  const rateRepository = new MongoLocationRateRepository(db);
  const infoRepository = new MongoLocationInfoRepository(db);
  const service = new LocationManager(repository, rateRepository, infoRepository);
  return new LocationController(log, builder.search, service);
}
