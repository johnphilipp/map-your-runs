import React, { useState } from "react";
import { activities as activitiesFromFile } from "../../data/activities";
import { BarChart } from "./BarChart";
import { AreaChart } from "./AreaChart";
import { DropdownType } from "./DropdownType";
import { DropdownYear } from "./DropdownYear";
import { Container } from "../utils/Container";

export function Dashboard() {
  // Store activity types, e.g. ["Run", "Ride", "Hike", ...]
  const allTypes = Array.from(
    new Set(
      activitiesFromFile.features.map((feature) => feature.properties.type)
    )
  ).sort();

  // Track state of dropdown
  const [selectedTypeChart, setSelectedTypeChart] = useState(allTypes[0]);

  // Store activity years, e.g. ["2019", "2020", "2021", ...]
  const allYears = ["Select all"].concat(
    Array.from(
      new Set(
        activitiesFromFile.features.map((feature) =>
          feature.properties.start_date_local.substring(0, 4)
        )
      )
    ).sort()
  );

  // Track state of dropdown
  const [selectedYearChart, setSelectedYearChart] = useState(allYears[0]);

  return (
    <div>
      <Container>
        <h1 className="text-gray-600 text-3xl font-medium">Dashboard</h1>
        <h2 className="text-slate-400 text-lg md:text-xl font-light mb-8 mt-2">
          Analyze your activities
        </h2>
        <div className="2xl:grid 2xl:grid-cols-2 2xl:gap-6">
          <div className="mb-6 2xl:mb-0 p-6 text-gray-600 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <h2 className="title text-lg md:text-xl mb-4">
              Count of all activities by type
            </h2>
            <BarChart selectedYearChart={selectedYearChart} />
            {/* hidding dropdown for small screens because there is a bug with overflow / z-index */}
            <div className="hidden 2xl:block ">
              <p className="mt-8 title text-lg md:text-xl mb-2">Select year:</p>
              <DropdownYear
                allYears={allYears}
                selectedYearChart={selectedYearChart}
                setSelectedYearChart={setSelectedYearChart}
              />
            </div>
          </div>
          <div className="p-6 text-gray-600 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <h2 className="title text-lg md:text-xl mb-4">
              Distance of selected type over time
            </h2>
            <AreaChart selectedTypeChart={selectedTypeChart} />
            <p className="mt-8 title text-lg md:text-xl mb-2">Select type:</p>
            <DropdownType
              allTypes={allTypes}
              selectedTypeChart={selectedTypeChart}
              setSelectedTypeChart={setSelectedTypeChart}
            />
          </div>
        </div>
        <br />
      </Container>
    </div>
  );
}
