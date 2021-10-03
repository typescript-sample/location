import { HealthController } from 'express-ext';
import { BookableController } from './bookable';
import { BookingController } from './booking';
import { EventController } from './event';
import { LocationController } from './location';
import { TourController } from './tour';
import { TripController } from './trip';

export interface ApplicationContext {
  health: HealthController;
  location?: LocationController;
  event?: EventController;
  bookable?: BookableController;
  tour?: TourController;
  trip?: TripController;
  booking?: BookingController;
}
