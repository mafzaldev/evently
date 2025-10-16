export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
}

export interface Registration {
  eventId: string;
  name: string;
  email: string;
  phone: string;
}
