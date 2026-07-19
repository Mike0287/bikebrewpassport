import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import NextStop from "./components/NextStop";
import Progress from "./components/Progress";
import { useVenues } from "./hooks/useVenues";
import { useState } from "react";
import { useVisited } from "./hooks/useVisited";
import { useLocation } from "./hooks/useLocation";
import type { Venue } from "./hooks/useVenues";


function App() {

  const venues = useVenues();

  const {
    location,
    getLocation,
    clearLocation
  } = useLocation();


  const { visited, toggleVisited } = useVisited();


  const [search, setSearch] = useState("");

  const [region, setRegion] = useState("");

  const [nextStop, setNextStop] =
    useState<Venue | null>(null);


  const [resetMap, setResetMap] =
    useState(0);


  const [mobilePanelOpen, setMobilePanelOpen] =
    useState(false);



  function clearNextStop() {

    setNextStop(null);

    clearLocation();

    setResetMap(prev => prev + 1);

  }



  const filteredVenues = venues.filter((venue) =>
    venue["Venue Name"]
      .toLowerCase()
      .includes(search.toLowerCase())
    &&
    (
      region === "" ||
      venue.Region === region
    )
  );



  return (

    <div className="app">


		<button
		  className={`mobile-drawer-toggle ${
			mobilePanelOpen ? "open" : ""
		  }`}
		  type="button"
		  onClick={() =>
			setMobilePanelOpen(previous => !previous)
		  }
		>
		  {
			mobilePanelOpen
			  ? "✕"
			  : "☰"
		  }
		</button>


		{
		  mobilePanelOpen && (
			<div
			  className="drawer-overlay"
			  onClick={() => setMobilePanelOpen(false)}
			/>
		  )
		}



      <div
        className={
          `sidebar-container ${
            mobilePanelOpen
              ? "mobile-panel-open"
              : ""
          }`
        }
      >


        <div className="sidebar-content">


          <Sidebar
            search={search}
            setSearch={setSearch}
          />



          <Progress
            venues={venues}
            visited={visited}
            region={region}
            setRegion={setRegion}
            onRegionSelected={() =>
              setMobilePanelOpen(false)
            }
          />



          <NextStop

            venues={venues}

            visited={visited}

            toggleVisited={toggleVisited}

            region={region}

            location={location}

            getLocation={getLocation}

            nextStop={nextStop}

            setNextStop={setNextStop}

            clearNextStop={clearNextStop}

            closeDrawer={() =>
              setMobilePanelOpen(false)
            }

          />


        </div>


      </div>



      <MapView

        venues={filteredVenues}

        visited={visited}

        toggleVisited={toggleVisited}

        location={location}

        nextStop={nextStop}

        resetMap={resetMap}

      />


    </div>

  );

}


export default App;