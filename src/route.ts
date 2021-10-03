import { Application } from 'express';
import { ApplicationContext } from './context';

export function route(app: Application, ctx: ApplicationContext): void {
  app.get('/health', ctx.health.check);

  app.get('/locations', ctx.location.all);
  app.get('/locations/search', ctx.location.search);
  app.post('/locations/search', ctx.location.search);
  app.get('/locations/:id', ctx.location.load);

  app.get('/events', ctx.event.all);
  app.get('/events/search', ctx.event.search);
  app.post('/events/search', ctx.event.search);
  app.get('/events/:id', ctx.event.load);

  app.get('/bookables', ctx.bookable.all);
  app.get('/bookables/search', ctx.bookable.search);
  app.post('/bookables/search', ctx.bookable.search);
  app.get('/bookables/:id', ctx.bookable.load);

  app.get('/tours', ctx.tour.all);
  app.get('/tours/search', ctx.tour.search);
  app.post('/tours/search', ctx.tour.search);
  app.get('/tours/:id', ctx.tour.load);

  app.get('/trips', ctx.trip.all);
  app.get('/trips/search', ctx.trip.search);
  app.post('/trips/search', ctx.trip.search);
  app.get('/trips/:id', ctx.trip.load);

  app.get('/bookings', ctx.booking.all);
  app.get('/bookings/search', ctx.booking.search);
  app.post('/bookings/search', ctx.booking.search);
  app.get('/bookings/:id', ctx.booking.load);
}
