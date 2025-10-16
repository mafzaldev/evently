export interface Registration {
  eventId: string;
  name: string;
  email: string;
  phone: string;
}

export interface RegistrationsState {
  registrations: Registration[];
}

export interface EventsState {
  events: Event[];
  order: string[];
}
