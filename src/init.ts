import { HealthController, resources } from 'express-ext';
import { Db } from 'mongodb';
import { buildQuery, MongoChecker, PointMapper, SearchBuilder } from 'mongodb-extension';
import { Bookable, BookableSM, Booking, Event, EventSM } from 'onecore';
import { Location, LocationSM } from 'onecore';
import { createValidator } from 'validator-x';
import { BookableController, bookableModel, MongoBookableService } from './bookable';
import { BookingController, bookingModel, BookingSM, MongoBookingService } from './booking';
import { ApplicationContext } from './context';
import { EventController, eventModel, MongoEventService } from './event';
import { locationModel, MongoLocationService } from './location';
import { LocationController } from './location/LocationController';
import { MongoTourService, Tour, TourController, tourModel, TourSM } from './tour';
import { MongoTripService, Trip, TripController, tripModel, TripSM } from './trip';

export function log(msg: any): void {
  console.log(JSON.stringify(msg));
}
resources.createValidator = createValidator;
export function createContext(db: Db): ApplicationContext {
  const mongoChecker = new MongoChecker(db);
  const healthController = new HealthController([mongoChecker]);
  const build = buildQuery as any;

  const locationMapper = new PointMapper<Location>('geo', 'latitude', 'longitude');
  const locationService = new MongoLocationService(db, 'location', locationMapper.fromPoint);
  const searchLocation = new SearchBuilder<Location, LocationSM>(db, 'location', build, locationModel.attributes, locationMapper.fromPoint);
  const locationController = new LocationController(log, searchLocation.search, locationService);

  const eventMapper = new PointMapper<Event>('geo', 'latitude', 'longitude');
  const eventService = new MongoEventService(db, 'event', eventMapper.fromPoint);
  const searchEvent = new SearchBuilder<Event, EventSM>(db, 'event', build, eventModel.attributes, eventMapper.fromPoint);
  const eventController = new EventController(log, searchEvent.search, eventService);

  const bookableMapper = new PointMapper<Bookable>('geo', 'latitude', 'longitude');
  const bookableService = new MongoBookableService(db, 'bookable', bookableMapper.fromPoint);
  const searchBookable = new SearchBuilder<Bookable, BookableSM>(db, 'bookable', build, bookableModel.attributes, bookableMapper.fromPoint);
  const bookableController = new BookableController(log, searchBookable.search, bookableService);

  const bookingService = new MongoBookingService(db, 'booking');
  const searchBooking = new SearchBuilder<Booking, BookingSM>(db, 'booking', build, bookingModel.attributes);
  const bookingController = new BookingController(log, searchBooking.search, bookingService);

  const tourService = new MongoTourService(db, 'tour');
  const searchTour = new SearchBuilder<Tour, TourSM>(db, 'tour', build, tourModel.attributes);
  const tourController = new TourController(log, searchTour.search, tourService);

  const tripService = new MongoTripService(db, 'trip');
  const searchTrip = new SearchBuilder<Trip, TripSM>(db, 'trip', build, tripModel.attributes);
  const tripController = new TripController(log, searchTrip.search, tripService);

  const ctx: ApplicationContext = {
    health: healthController,
    location: locationController,
    event: eventController,
    bookable: bookableController,
    tour: tourController,
    trip: tripController,
    booking: bookingController };
  return ctx;
}
