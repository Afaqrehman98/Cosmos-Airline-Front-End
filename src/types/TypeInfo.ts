export interface FlightInfo {
  actual_departure_at: string;
  airline: string;
  delays: {
    code: string;
    description: string;
    time_minutes: number;
  }[];
  destination: string;
  flight_number: string;
  id: string;
  origin: string;
  scheduled_departure_at: string;
}
