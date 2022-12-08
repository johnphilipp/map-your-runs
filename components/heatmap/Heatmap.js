import React, { useState } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import ControlPanel from "./ControlPanel";
import { MapStyle } from "./MapStyle";
import { activities as activitiesFromFile } from "../../data/activities";

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
    <div>
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
      <ControlPanel
        activities={activities}
        allTypes={allTypes}
        allYears={allYears}
        checkedTypes={checkedTypes}
        setCheckedTypes={setCheckedTypes}
        checkedYears={checkedYears}
        setCheckedYears={setCheckedYears}
        useAllTypes={useAllTypes}
        setUseAllTypes={setUseAllTypes}
        useAllYears={useAllYears}
        setUseAllYears={setUseAllYears}
      />
    </div>
  );
}
