import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import ControlPanel from "./ControlPanel";
import { MapStyle } from "./MapStyle";
import { activities as activitiesFromFile } from "../../data/activities";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export function Heatmap() {
  // Store activities in variable, initialize state from file
  const [activities, setActivities] = useState(activitiesFromFile);

  return (
    <>
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
      <ControlPanel activities={activities} setActivities={setActivities} />
    </>
  );
}
