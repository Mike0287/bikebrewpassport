import type { Venue } from "../hooks/useVenues";
import { useEffect, useState } from "react";


interface Props {
  venues: Venue[];
  visited: number[];
  toggleVisited: (stamp: number) => void;
  isOpen: boolean;
  onClose: () => void;
}


export default function AllVenues({
  venues,
  visited,
  toggleVisited,
  isOpen,
  onClose,
}: Props) {


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



  if (!isOpen) return null;



  const regions = [
    ...new Map(
      [...venues]
        .sort(
          (a, b) =>
            a.Stamp - b.Stamp
        )
        .map(venue => [

          venue.Region,

          venues
            .filter(
              v =>
                v.Region === venue.Region
            )
            .sort(
              (a, b) =>
                a.Stamp - b.Stamp
            )

        ])
    )
  ].map(([region, venues]) => ({
    region,
    venues
  }));



  const columnCount =
    isMobile
      ? 2
      : 4;



  const maxRegionSize =
    Math.max(
      ...regions.map(
        region =>
          region.venues.length
      )
    );



  const mobileTarget =
    Math.ceil(
      venues.length / 2
    );



  const targetHeight =
    isMobile
      ? mobileTarget
      : maxRegionSize;



const columns: {
  region: string;
  venues: Venue[];
}[][] = Array.from(
  {
    length: columnCount
  },
  () => []
);



  const columnHeights =
    Array(columnCount)
      .fill(0);



  let currentColumn = 0;



  regions.forEach(region => {


    const regionSize =
      region.venues.length;



    if (

      columnHeights[currentColumn] +
      regionSize >
      targetHeight

      &&

      currentColumn <
      columnCount - 1

    ) {

      currentColumn++;

    }



    columns[currentColumn]
      .push(region);



    columnHeights[currentColumn] +=
      regionSize;


  });





  return (

    <div
      className="all-venues-overlay"
      onClick={onClose}
    >


      <div
        className="all-venues-panel"
        onClick={(e) =>
          e.stopPropagation()
        }
      >


        <div className="all-venues-header">

          <h3>
            All Venues
          </h3>


          <button
            className="all-venues-close"
            onClick={onClose}
          >
            ✕
          </button>


        </div>




        <div className="all-venues-content">


          {columns.map(
            (column, columnIndex) => (


              <div
                key={columnIndex}
                className="venue-column"
              >


                {column.map(region => (


                  <div
                    key={region.region}
                    className="venue-region"
                  >


                    <h4>
                      {region.region}
                    </h4>



                    {region.venues.map(
                      venue => (


                      <label
                        key={venue.Stamp}
                        className="venue-row"
                      >


                        <input
                          type="checkbox"
                          checked={
                            visited.includes(
                              venue.Stamp
                            )
                          }
                          onChange={() =>
                            toggleVisited(
                              venue.Stamp
                            )
                          }
                        />



                        <span className="venue-stamp">
                          {venue.Stamp}
                        </span>



                        <span className="venue-name">
                          {venue["Venue Name"]}
                        </span>



                      </label>


                    ))}



                  </div>


                ))}


              </div>


            )
          )}


        </div>


      </div>


    </div>

  );

}