import React, { useState } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import { MapStyle } from "./MapStyle";
import { activities as activitiesFromFile } from "../../data/activities";
import { Container } from "../utils/Container";
import ControlMetrics from "./ControlMetrics";
import ControlTypes from "./ControlTypes";
import ControlYears from "./ControlYears";

// Read mapbox api token from .env.local
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export function Heatmap() {
  // Store activity types, e.g. ["Run", "Ride", "Hike", ...]
  const allTypes = Array.from(
    new Set(
      activitiesFromFile.features.map((feature) => feature.properties.type)
    )
  ).sort();

  // Store activity years, e.g. ["2019", "2020", "2021", ...]
  const allYears = Array.from(
    new Set(
      activitiesFromFile.features.map((feature) =>
        feature.properties.start_date_local.substring(0, 4)
      )
    )
  ).sort();

  // Boolean check if all types should be used
  const [useAllTypes, setUseAllTypes] = useState(true);

  // Boolean check if all years should be used
  const [useAllYears, setUseAllYears] = useState(true);

  // Store which types are checked by the user via selected checkboxes
  const [checkedTypes, setCheckedTypes] = useState([]);

  // Store which activities/years are checked by the user via selected checkboxes
  const [checkedYears, setCheckedYears] = useState([]);

  // Filter activities (from file) by type
  const activitiesFilteredByType = activitiesFromFile.features.filter(
    (feature) => {
      if (useAllTypes == true) {
        return true;
      } else {
        return checkedTypes.includes(feature.properties.type);
      }
    }
  );

  // Filter activities (pre-filtered from activitiesFilteredByType) by year
  const activitiesFiltredByTypeAndYear = activitiesFilteredByType.filter(
    (feature) => {
      if (useAllYears == true) {
        return true;
      } else {
        return checkedYears.includes(
          feature.properties.start_date_local.substring(0, 4)
        );
      }
    }
  );

  // Create new geojson object from activitiesFiltredByTypeAndYear which is as main heatmap data
  const activities = new Object();
  activities.type = "FeatureCollection";
  activities.features = activitiesFiltredByTypeAndYear;

  return (
    <div className="z-60">
      <Container>
        <h1 className="text-gray-600 text-3xl font-medium">Heatmap</h1>
        <ControlMetrics
          activities={activities}
          allTypes={allTypes}
          checkedTypes={checkedTypes}
          useAllTypes={useAllTypes}
          allYears={allYears}
          checkedYears={checkedYears}
          useAllYears={useAllYears}
        />
        <div className="mt-8 md:grid lg:grid-cols-2 gap-6">
          <MapGL
            initialViewState={{
              latitude: 51,
              longitude: 7,
              zoom: 3,
            }}
            mapStyle="mapbox://styles/mapbox/dark-v9"
            projection={"globe"}
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            {activities && (
              <Source type="geojson" data={activities}>
                <Layer {...MapStyle} />
              </Source>
            )}
          </MapGL>
          <div className="mt-6 lg:mt-0">
            <ControlTypes
              allTypes={allTypes}
              checkedTypes={checkedTypes}
              setCheckedTypes={setCheckedTypes}
              useAllTypes={useAllTypes}
              setUseAllTypes={setUseAllTypes}
            />
            <ControlYears
              allYears={allYears}
              checkedYears={checkedYears}
              setCheckedYears={setCheckedYears}
              useAllYears={useAllYears}
              setUseAllYears={setUseAllYears}
            />
          </div>
        </div>
        <br />
      </Container>
    </div>
  );
}
