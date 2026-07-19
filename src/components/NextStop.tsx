import { FaMotorcycle } from "react-icons/fa";
import type { Venue } from "../hooks/useVenues";
import { distanceBetween } from "../utils/distance";
import { useState } from "react";

interface Props {
  venues: Venue[];
  visited: number[];
  toggleVisited: (stamp: number) => void;
  region: string;

  location: {
    lat: number;
    lng: number;
  } | null;

  getLocation: (
    callback?: (location: {
      lat: number;
      lng: number;
    }) => void
  ) => void;

  nextStop: Venue | null;

  setNextStop: (venue: Venue | null) => void;

  clearNextStop: () => void;

  closeDrawer?: () => void;
}


export default function NextStop({
  venues,
  visited,
  region,
  location,
  getLocation,
  nextStop,
  setNextStop,
  clearNextStop,
  closeDrawer,
}: Props) {


  const [locationError, setLocationError] =
    useState(false);



  const filteredVenues = venues.filter(
    (venue) =>
      region === "" ||
      venue.Region === region
  );


  const unvisited = filteredVenues.filter(
    (venue) =>
      !visited.includes(venue.Stamp)
  );



  function findNearest() {

    setLocationError(false);

    getLocation((currentLocation) => {

      const nearest = unvisited
        .map((venue) => ({
          venue,
          distance: distanceBetween(
            currentLocation.lat,
            currentLocation.lng,
            venue.Latitude,
            venue.Longitude
          ),
        }))
        .sort(
          (a, b) =>
            a.distance - b.distance
        )[0];


      if (nearest) {

        setNextStop(nearest.venue);

        closeDrawer?.();

      }
      else {

        setNextStop(null);

      }

    });

  }



  function navigate() {

    if (!nextStop) return;


    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${nextStop.Latitude},${nextStop.Longitude}`,
      "_blank"
    );

  }



  return (

    <div className="next-stop">


      <h3>
        <FaMotorcycle className="title-icon" /> Next Stop
      </h3>



      {region && (

        <p>
          📍 Searching in: <strong>{region}</strong>
        </p>

      )}



      <button onClick={findNearest}>
        📍 Find nearest café
      </button>



      {locationError && (

        <p>
          ⚠️ Unable to find your location. Please allow location access.
        </p>

      )}



      {nextStop && (

        <>

          <h4>
            ⭐ Recommended Stop
          </h4>


          <strong>
            ☕ {nextStop["Venue Name"]}
          </strong>


          <p>
            Stamp #{nextStop.Stamp}
          </p>


          <p>
            📍 {nextStop.Region}
          </p>


          {location && (

            <p>
              Your location found ✅
            </p>

          )}



          <button onClick={navigate}>
            Navigate
          </button>


          <button
            onClick={clearNextStop}
          >
            ❌ Cancel suggestion
          </button>


        </>

      )}



      {!nextStop && location && (

        <p>
          🎉 No unvisited stops found in this area.
        </p>

      )}


    </div>

  );

}