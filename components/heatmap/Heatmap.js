import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import ControlPanel from "./ControlPanel";
import { MapStyle } from "./MapStyle";
import { activities as activities } from "./activities";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function filterFeaturesByDay(featureCollection, time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter((feature) => {
    const featureDate = new Date(feature.properties.time);
    return (
      featureDate.getFullYear() === year &&
      featureDate.getMonth() === month &&
      featureDate.getDate() === day
    );
  });
  return { type: "FeatureCollection", features };
}

function filterFeaturesByType(featureCollection, types) {
  // TODO: Use logic with types -- keep track of element in array, filter to only keep what#s in array
  const features = featureCollection.features.filter(
    (feature) => !types.includes(feature.properties.type)
  );
  return { type: "FeatureCollection", features };
}

export function Heatmap() {
  const [allDays, useAllDays] = useState(true);
  const [runs, useRuns] = useState(true);
  const [timeRange, setTimeRange] = useState(["", ""]);
  const [selectedTime, selectTime] = useState("");
  const [activitiesX, setActivitiesX] = useState(activities);

  // TODO: Use logic with types -- keep track of element in array, filter to only keep what#s in array
  const [types, useTypes] = useState(
    Array.from(
      new Set(activities.features.map((feature) => feature.properties.type))
    )
  );

  useEffect(() => {
    const features = activities.features;
    const endTime = features[0].properties.start_date_local;
    const startTime = features[features.length - 1].properties.start_date_local;

    setTimeRange([startTime, endTime]);
    setActivitiesX(activities);
    selectTime(endTime);
  }, []);

  const data = useMemo(() => {
    if (allDays) {
      if (!runs) {
        return filterFeaturesByType(activitiesX, "Run");
      } else {
        return activitiesX;
      }
    } else {
      return filterFeaturesByDay(activitiesX, selectedTime);
    }
  }, [activitiesX, allDays, runs, selectedTime]);

  return (
    <>
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
          {data && (
            <Source type="geojson" data={data}>
              <Layer {...MapStyle} />
            </Source>
          )}
        </MapGL>
      </div>
      <div className="bg-slate-400 p-4 leading-loose text-gray-600">
        <ControlPanel
          startTime={timeRange[0]}
          endTime={timeRange[1]}
          selectedTime={selectedTime}
          allDays={allDays}
          runs={runs}
          onChangeTime={selectTime}
          onChangeAllDays={useAllDays}
          onChangeRuns={useRuns}
        />
      </div>
    </>
  );
}

// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "!mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// export function Heatmap() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-70.9);
//   const [lat, setLat] = useState(42.35);
//   const [zoom, setZoom] = useState(9);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v12",
//       center: [lng, lat],
//       zoom: zoom,
//     });
//   });

//   useEffect(() => {
//     if (!map.current) return; // wait for map to initialize
//     map.current.on("move", () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   });

//   return (
//     <div>
//       <div className="sidebar">
//         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//       </div>
//       <div ref={mapContainer} className="map-container w-full h-96 mb-6" />
//     </div>
//   );
// }
