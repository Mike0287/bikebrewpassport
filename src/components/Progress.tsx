import { FaMotorcycle } from "react-icons/fa";
import type { Venue } from "../hooks/useVenues";

interface ProgressProps {
  venues: Venue[];
  visited: number[];
  region: string;
  setRegion: (value: string) => void;
  onRegionSelected?: () => void;
}

export default function Progress({
  venues,
  visited,
  region,
  setRegion,
  onRegionSelected,
}: ProgressProps) {


  const regions = [
    ...new Set(
      venues.map((venue) => venue.Region)
    ),
  ].sort();


  const total = venues.length;


  const regionStats = regions.map((regionName) => {

    const regionVenues = venues.filter(
      (venue) => venue.Region === regionName
    );


    const completed = regionVenues.filter(
      (venue) => visited.includes(venue.Stamp)
    ).length;


    return {
      region: regionName,
      total: regionVenues.length,
      completed
    };

  });


  const overall =
    total === 0
      ? 0
      : Math.round(
          (visited.length / total) * 100
        );


  return (

    <div className="progress-panel">

	<h3>
	  <FaMotorcycle className="title-icon" /> Passport Progress
	</h3>


      <div className="progress-item">

        <strong>
          Total
        </strong>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${overall}%`
            }}
          />

        </div>

        <small>
          {visited.length} / {total} ~ ({overall}%)
        </small>

      </div>


      <h4>
        Regions
      </h4>


      {regionStats.map((item) => {

        const percentage =
          item.total === 0
            ? 0
            : Math.round(
                (item.completed / item.total) * 100
              );


        return (

          <div
            key={item.region}
            className={
              region === item.region
                ? "region-progress active"
                : "region-progress"
            }
            onClick={() => {
              setRegion(
                region === item.region
                  ? ""
                  : item.region
              );
              onRegionSelected?.();
            }}
          >

            <div className="region-title">
              {item.region}
            </div>


            <div className="progress-bar small">

              <div
                className="progress-fill"
                style={{
                  width: `${percentage}%`
                }}
              />

            </div>


            <small>
              {item.completed} / {item.total} ~ ({percentage}%)
            </small>


          </div>

        );

      })}


    </div>

  );

}