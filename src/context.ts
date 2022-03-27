import { HealthController, resources } from 'express-ext';
import { Db } from 'mongodb';
import { buildQuery, MongoChecker, PointMapper, SearchBuilder } from 'mongodb-extension';
import { Bookable, BookableFilter, Booking, Event, EventFilter, Location, LocationFilter } from 'onecore';
import { createValidator } from 'xvalidators';
import { BookableController, MongoBookableService } from './bookable';
import { bookableModel } from './bookable/bookable';
import { BookingController, MongoBookingService } from './booking';
import { BookingFilter, bookingModel } from './booking/booking';
import { EventController, MongoEventService } from './event';
import { eventModel } from './event/event';
import { LocationController, MongoLocationService } from './location';
import { locationModel } from './location/location';
import { MongoTourService, TourController } from './tour';
import { Tour, TourFilter, tourModel } from './tour/Tour';
import { MongoTripService, TripController } from './trip';
import { Trip, TripFilter, tripModel } from './trip/Trip';

resources.createValidator = createValidator;
export function log(msg: any): void {
  console.log(JSON.stringify(msg));
}

export interface ApplicationContext {
  health: HealthController;
  location?: LocationController;
  event?: EventController;
  bookable?: BookableController;
  tour?: TourController;
  trip?: TripController;
  booking?: BookingController;
}
export function useContext(db: Db): ApplicationContext {
  const mongoChecker = new MongoChecker(db);
  const health = new HealthController([mongoChecker]);
  const build = buildQuery as any;

  const locationMapper = new PointMapper<Location>('geo', 'latitude', 'longitude');
  const locationService = new MongoLocationService(db, 'location', locationMapper.fromPoint);
  const searchLocation = new SearchBuilder<Location, LocationFilter>(db, 'location', build, locationModel.attributes, locationMapper.fromPoint);
  const location = new LocationController(log, searchLocation.search, locationService);

  const eventMapper = new PointMapper<Event>('geo', 'latitude', 'longitude');
  const eventService = new MongoEventService(db, 'event', eventMapper.fromPoint);
  const searchEvent = new SearchBuilder<Event, EventFilter>(db, 'event', build, eventModel.attributes, eventMapper.fromPoint);
  const event = new EventController(log, searchEvent.search, eventService);

  const bookableMapper = new PointMapper<Bookable>('geo', 'latitude', 'longitude');
  const bookableService = new MongoBookableService(db, 'bookable', bookableMapper.fromPoint);
  const searchBookable = new SearchBuilder<Bookable, BookableFilter>(db, 'bookable', build, bookableModel.attributes, bookableMapper.fromPoint);
  const bookable = new BookableController(log, searchBookable.search, bookableService);

  const tourService = new MongoTourService(db, 'tour');
  const searchTour = new SearchBuilder<Tour, TourFilter>(db, 'tour', build, tourModel.attributes);
  const tour = new TourController(log, searchTour.search, tourService);

  const tripService = new MongoTripService(db, 'trip');
  const searchTrip = new SearchBuilder<Trip, TripFilter>(db, 'trip', build, tripModel.attributes);
  const trip = new TripController(log, searchTrip.search, tripService);

  const bookingService = new MongoBookingService(db, 'booking');
  const searchBooking = new SearchBuilder<Booking, BookingFilter>(db, 'booking', build, bookingModel.attributes);
  const booking = new BookingController(log, searchBooking.search, bookingService);
  return { health, location, event, bookable, tour, trip, booking };
}
