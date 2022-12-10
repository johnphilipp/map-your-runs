import React, { useState } from "react";
import { activities as activitiesFromFile } from "../../data/activities";
import { BarChartComp as BarChartComp } from "./BarChartComp";
import { AreaChartComp as AreaChartComp } from "./AreaChartComp";
import { DropdownComp as DropdownComp } from "./DropdownComp";

export function Dashboard() {
  // Store activity types, e.g. ["Run", "Ride", "Hike", ...]
  const allTypes = Array.from(
    new Set(
      activitiesFromFile.features.map((feature) => feature.properties.type)
    )
  ).sort();

  // Track state of dropdown
  const [selectedTypeChart, setSelectedTypeChart] = useState(allTypes[0]);

  // const AreaChartComp = dynamic(() => import("./AreaChartComp"), {
  //   ssr: false,
  // });

  return (
    <div className="z-10">
      <h1 className="mt-6 ml-6 text-gray-600 text-4xl">Dashboard</h1>
      <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-4">
        <div className="m-6 text-gray-600">
          <h2 className="text-2xl mb-4">Count of all activities by type</h2>
          <div className="mt-8">
            <BarChartComp className="z-20" />
          </div>
        </div>
        <div className="m-6 leading-loose text-gray-600">
          <h2 className="sm:text-lg md:text-2xl">
            Distance of selected type over time
          </h2>
          <AreaChartComp
            className="z-30"
            selectedTypeChart={selectedTypeChart}
          />
          <div className="title sm:text-lg md:text-2xl mt-4 ml-4">
            Select type:
          </div>
          <DropdownComp
            className="z-210"
            allTypes={allTypes}
            selectedTypeChart={selectedTypeChart}
            setSelectedTypeChart={setSelectedTypeChart}
          />
        </div>
      </div>
    </div>
  );
}
