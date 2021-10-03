import { SearchModel } from 'onecore';

export interface BookingSM extends SearchModel {
  bookingId?: string;
  id?: string;
  userId?: string;
  name?: string;
  type?: string;
  description?: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  status?: string;
}
