import { useEffect, useState } from "react";

export interface Venue {
  Stamp: number;
  "Venue Name": string;
  Latitude: number;
  Longitude: number;
  Region: string;
  "Venue Address": string;
  Postal: string;
  "Post Code": string;
}

export function useVenues() {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    fetch("/venues.json")
      .then((res) => res.json())
      .then(setVenues);
  }, []);

  return venues;
}