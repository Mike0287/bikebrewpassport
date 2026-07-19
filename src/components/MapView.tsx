import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";

import L from "leaflet";
import { useEffect, useState } from "react";

import type { Venue } from "../hooks/useVenues";

import VenueCard from "./VenueCard";

import markUnvisited from "../assets/mark-unvisited.svg";
import markVisited from "../assets/mark-visited.svg";
import markRecommended from "../assets/mark-recommended.svg";

import LocationMarker from "./LocationMarker";
import MapController from "./MapController";


interface MapProps {

  venues: Venue[];

  visited: number[];

  toggleVisited: (stamp: number) => void;

  location: {
    lat: number;
    lng: number;
  } | null;

  nextStop: Venue | null;

  resetMap: number;

}



const unvisitedIcon = new L.Icon({

  iconUrl: markUnvisited,

  iconSize: [50, 50],

  iconAnchor: [25, 50],

  popupAnchor: [0, -45],

});


const visitedIcon = new L.Icon({

  iconUrl: markVisited,

  iconSize: [50, 50],

  iconAnchor: [25, 50],

  popupAnchor: [0, -45],

});


const nextStopIcon = new L.Icon({

  iconUrl: markRecommended,

  iconSize: [65, 65],

  iconAnchor: [32, 65],

  popupAnchor: [0, -55],

});



const mobileUnvisitedIcon = new L.Icon({

  iconUrl: markUnvisited,

  iconSize: [32, 32],

  iconAnchor: [16, 32],

  popupAnchor: [0, -30],

});


const mobileVisitedIcon = new L.Icon({

  iconUrl: markVisited,

  iconSize: [32, 32],

  iconAnchor: [16, 32],

  popupAnchor: [0, -30],

});


const mobileNextStopIcon = new L.Icon({

  iconUrl: markRecommended,

  iconSize: [42, 42],

  iconAnchor: [21, 42],

  popupAnchor: [0, -38],

});



function MapResetController({
  resetMap,
  venues
}: {
  resetMap: number;
  venues: Venue[];
}) {

  const map = useMap();


  useEffect(() => {

    if (resetMap === 0 || venues.length === 0) {
      return;
    }


    const bounds = L.latLngBounds(
      venues.map((venue) => [
        venue.Latitude,
        venue.Longitude
      ])
    );


    map.fitBounds(
      bounds,
      {
        padding: [50, 50],
        animate: true,
        duration: 1.2,
      }
    );


  }, [resetMap, venues, map]);


  return null;

}



export default function MapView({

  venues,

  visited,

  toggleVisited,

  location,

  nextStop,

  resetMap

}: MapProps) {


  const [isMobile, setIsMobile] =
    useState(false);


  useEffect(() => {

    function checkMobile() {

      setIsMobile(
        window.innerWidth <= 700
      );

    }


    checkMobile();


    window.addEventListener(
      "resize",
      checkMobile
    );


    return () =>
      window.removeEventListener(
        "resize",
        checkMobile
      );

  }, []);



  return (

    <div className="map-container">


      <MapContainer

        center={[52.5, -1.5]}

        zoom={7}

        style={{
          height:"100vh",
          width:"100%"
        }}

      >


        <MapController
          nextStop={nextStop}
          location={location}
        />


        <MapResetController
          resetMap={resetMap}
          venues={venues}
        />



        <TileLayer

          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

          attribution="&copy; OpenStreetMap contributors"

        />



        {location && (

          <LocationMarker location={location} />

        )}



        {location && nextStop && (

          <Polyline

            positions={[
              [
                location.lat,
                location.lng
              ],
              [
                nextStop.Latitude,
                nextStop.Longitude
              ]
            ]}

            color="#000000"

            weight={4}

            opacity={0.8}

            dashArray="10,10"

          />

        )}






        {nextStop && (

          <Marker

            position={[
              nextStop.Latitude,
              nextStop.Longitude
            ]}

            icon={
              isMobile
                ? mobileNextStopIcon
                : nextStopIcon
            }

          >


            <Popup>

              <VenueCard
                venue={nextStop}
                visited={visited.includes(nextStop.Stamp)}
                toggleVisited={toggleVisited}
                recommended
              />

            </Popup>


          </Marker>

        )}






        {venues

          .filter(
            (venue) =>
              !nextStop ||
              venue.Stamp !== nextStop.Stamp
          )

          .map((venue)=>(

            <Marker

              key={venue.Stamp}

              position={[
                venue.Latitude,
                venue.Longitude
              ]}

              icon={
                visited.includes(venue.Stamp)
                  ? (
                      isMobile
                        ? mobileVisitedIcon
                        : visitedIcon
                    )
                  : (
                      isMobile
                        ? mobileUnvisitedIcon
                        : unvisitedIcon
                    )
              }

            >


              <Popup>

                <VenueCard
                  venue={venue}
                  visited={visited.includes(venue.Stamp)}
                  toggleVisited={toggleVisited}
                />

              </Popup>


            </Marker>

          ))}


      </MapContainer>

    </div>

  );

}