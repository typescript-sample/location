import { Db } from "mongodb";
import { buildQuery, PointMapper, SearchBuilder } from "mongodb-extension";
import { Log, ViewManager, Manager, Search } from "onecore";
import {
  Location,
  LocationFilter,
  LocationInfo,
  LocationInfoRepository,
  locationModel,
  LocationRepository,
  LocationService,
  Rate,
  RateFilter,
  RateRepository,
} from "./location";
import { LocationController, RateController } from "./location-controller";
import { MongoLocationInfoRepository } from "./mongo-location-info-repository";
import { MongoLocationRateRepository } from "./mongo-location-rate-repository";
const shortid = require("shortid");
export * from "./location";
export { LocationController };

import { MongoLocationRepository } from "./mongo-location-repository";

export class LocationManager
  extends Manager<Location, string, LocationFilter>
  implements LocationService
{
  constructor(
    search: Search<Location, LocationFilter>,
    repository: LocationRepository,
    private rateRepository: RateRepository,
    private infoRepository: LocationInfoRepository
  ) {
    super(search, repository);
  }
  async rateLocation(objRate: Rate): Promise<boolean> {
    if (
      !this.rateRepository.save ||
      !this.rateRepository.exist ||
      !this.infoRepository.save
    )
      return false;
    const info = await this.infoRepository.load(objRate.locationId!);
    if (
      !info ||
      typeof info[("rate" + objRate.rate.toString()) as keyof LocationInfo ]==="undefined"
    )
      return false;

    if (objRate.id) {
      const rate = await this.rateRepository.load(objRate.id);
      if (!rate) return false;
      (info as any)["rate" + rate.rate.toString()] -= 1;
      rate.rate = objRate.rate;
      const rs = await this.rateRepository.update(rate);
      if (rs !== 1) return false;
    } else {
      const rs = await this.rateRepository.save({
        ...objRate,
        id: shortid.generate(),
      });
      if (rs !== 1) return false;
    }
    const sumRate =
      info.rate1 +
      info.rate2 * 2 +
      info.rate3 * 3 +
      info.rate4 * 4 +
      info.rate5 * 5;
    info.viewCount = sumRate;
    (info as any)["rate" + objRate.rate.toString()] += 1;
    info.rate = sumRate / info.viewCount;
    this.infoRepository.save(info);
    return true;
  }
}

export function useLocationService(db: Db): LocationService {
  const builder = new SearchBuilder<Location, LocationFilter>(
    db,
    "location",
    buildQuery,
    locationModel
  );
  const repository = new MongoLocationRepository(db);
  const rateRepository = new MongoLocationRateRepository(db);
  const infoRepository = new MongoLocationInfoRepository(db);
  return new LocationManager(
    builder.search,
    repository,
    rateRepository,
    infoRepository
  );
}
export function useLocationController(log: Log, db: Db): LocationController {
  return new LocationController(log, useLocationService(db));
}

// export function useRateController(log: Log, db: Db): LocationController {
//   const builder = new SearchBuilder<Rate, RateFilter>(db, 'locationRate', buildQuery, locationModel);
//   const repository = new MongoRateRepository(db);
//   return new RateController(log, builder.search, repository);
// }
