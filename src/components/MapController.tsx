import { useMap } from "react-leaflet";
import { useEffect } from "react";

interface Props {
  nextStop: {
    Latitude: number;
    Longitude: number;
  } | null;

  location: {
    lat: number;
    lng: number;
  } | null;

}


export default function MapController({
  nextStop,
  location,
}: Props) {

  const map = useMap();


  // Focus on user + recommended café
  useEffect(() => {

    if (!nextStop || !location) return;


    const bounds = [
      [
        location.lat,
        location.lng
      ],
      [
        nextStop.Latitude,
        nextStop.Longitude
      ],
    ] as [
      [number, number],
      [number, number]
    ];


    map.fitBounds(
      bounds,
      {
        padding: [80, 80],
        maxZoom: 14,
        animate: true,
        duration: 1.5,
      }
    );


  }, [nextStop, location, map]);

  return null;
}
