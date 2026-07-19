import type { Venue } from "../hooks/useVenues";

interface Props {
  venue: Venue;
  visited?: boolean;
  toggleVisited?: (stamp: number) => void;
  recommended?: boolean;
}


export default function VenueCard({
  venue,
  visited = false,
  toggleVisited,
  recommended = false,
}: Props) {


  function navigate() {

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${venue.Latitude},${venue.Longitude}`,
      "_blank"
    );

  }


  function openingTimes() {

    const query = encodeURIComponent(
      `${venue["Venue Name"]} ${venue["Post Code"]} opening times`
    );


    window.open(
      `https://www.google.com/search?q=${query}`,
      "_blank"
    );

  }



  return (

    <div className="venue-card">


      {recommended && (
        <h3>
          ⭐ Recommended Stop
        </h3>
      )}



      <h3>
        ☕ {venue["Venue Name"]}
      </h3>



      <p>
        🏍 Stamp #{venue.Stamp}
      </p>



      <p>
        📍 {venue.Region}
      </p>



      {venue["Venue Address"] && (
        <p>
          {venue["Venue Address"]}
        </p>
      )}

      <div className="venue-actions">


        <button
          className="card-button"
          onClick={navigate}
        >
          🧭 Navigate
        </button>



        <button
          className="card-button"
          onClick={openingTimes}
        >
          🔎 Opening Times
        </button>



        {toggleVisited && (

          <button
            className="card-button"
            onClick={() =>
              toggleVisited(venue.Stamp)
            }
          >

            {
              visited
                ? "✅ Visited"
                : "Mark as visited"
            }

          </button>

        )}


      </div>


    </div>

  );

}