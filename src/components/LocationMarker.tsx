import { Marker, Circle } from "react-leaflet";
import L from "leaflet";

interface Props {
  location: {
    lat: number;
    lng: number;
  };
}

import riderMarker from "../assets/rider-marker.svg";

const locationIcon = new L.Icon({

  iconUrl: riderMarker,

  iconSize: [60, 60],

  iconAnchor: [30, 30],

});

export default function LocationMarker({
  location,
}: Props) {

  return (
    <>
      <Marker
        position={[
          location.lat,
          location.lng,
        ]}
        icon={locationIcon}
      />

	<Circle
	  center={[location.lat, location.lng]}
	  radius={250}
	  pathOptions={{
		color:"#c96b2c",
		fillColor:"#c96b2c",
		fillOpacity:0.15
	  }}
	/>
	</>
  );
}