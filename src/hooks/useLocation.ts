import { useState } from "react";

interface Location {
  lat: number;
  lng: number;
}

export function useLocation() {

  const [location, setLocation] =
    useState<Location | null>(null);


  function getLocation(
    callback?: (location: Location) => void
  ) {


    if (!navigator.geolocation) {

      alert("Geolocation is not supported on this device.");

      return;

    }



    navigator.geolocation.getCurrentPosition(

      (position) => {

        const newLocation = {

          lat: position.coords.latitude,

          lng: position.coords.longitude,

        };


        setLocation(newLocation);


        if (callback) {

          callback(newLocation);

        }

      },


      (error) => {

        alert(
          `Location error: ${error.message}`
        );

        console.error(error);

      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }

    );

  }



  function clearLocation() {

    setLocation(null);

  }



  return {

    location,

    getLocation,

    clearLocation,

  };

}