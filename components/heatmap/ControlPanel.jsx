import React, { useState } from "react";
import { activities as activitiesFromFile } from "../../data/activities";

export default function ControlPanel({ activities, setActivities }) {
  // Store activity types, e.g. ["Run", "Ride", "Hike", ...]
  const types = ["Select All"].concat(
    Array.from(
      new Set(
        activitiesFromFile.features.map((feature) => feature.properties.type)
      )
    ).sort()
  );
  // Store years of activities, e.g. ["2019", "2020", "2021", ...]
  const years = ["Select All"].concat(
    Array.from(
      new Set(
        activitiesFromFile.features.map((feature) =>
          feature.properties.start_date_local.substring(0, 4)
        )
      )
    ).sort()
  );
  // Store which activities are checked by the user via selected checkboxes
  const [checkedTypes, setCheckedTypes] = useState(types);

  // Update activities based on selected types
  function filterActivitiesByType(activities, types) {
    const features = activities.features.filter((feature) => {
      return types.includes(feature.properties.type);
    });
    return { type: "FeatureCollection", features };
  }

  // Add/remove checked item from list
  const handleCheckType = (event) => {
    var updatedList = [...checkedTypes];
    if (event.target.checked) {
      if (event.target.value == "Select All") {
        updatedList = [...types];
      } else {
        updatedList = [...checkedTypes, event.target.value];
      }
    } else {
      if (event.target.value == "Select All") {
        updatedList = [];
      } else {
        updatedList.splice(checkedTypes.indexOf(event.target.value), 1);
      }
    }
    // Update state of types which are selected
    setCheckedTypes(updatedList.sort());
    //  Update state of activities in Heatmap.js based on selected types--> heatmap changes
    setActivities(filterActivitiesByType(activitiesFromFile, updatedList));
  };

  // Return css classes based on whether item is checked
  var isSelectAllMetrics = (checkedTypes) =>
    checkedTypes.includes("Select All") == true
      ? checkedTypes.length - 1
      : checkedTypes.length;
  var isChecked = (item) => (checkedTypes.includes(item) ? true : false);

  // TODO: Add date filter func
  console.log("Dates");
  console.log(years);
  console.log(
    activities.features.filter((feature) => {
      return ["2020", "2021", "2022"].includes(
        feature.properties.start_date_local.substring(0, 4)
      );
    })
  );

  return (
    <div className="m-6 leading-loose text-gray-600">
      <h2 className="text-2xl">Heatmap</h2>
      <p className="text-slate-400">
        Showing <span />
        {activities.features.length} activities of <span />
        {isSelectAllMetrics(checkedTypes)} different types from {} to {}
      </p>
      <hr />
      <div>
        <div className="mt-4">
          <div className="title">Select activities to visualize:</div>
          <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {types.map((item, index) => (
              <div className="flex items-center pl-4 rounded border border-gray-200 hover:bg-gray-100">
                <div key={index}>
                  <input
                    value={item}
                    type="checkbox"
                    checked={isChecked(item)}
                    onChange={handleCheckType}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="py-4 ml-4 w-full text-sm font-medium text-gray-900">
                    {item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* TODO */}
        <div className="mt-4">
          <div className="title">Select years to visualize:</div>
          <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {years.map((item, index) => (
              <div className="flex items-center pl-4 rounded border border-gray-200 hover:bg-gray-100">
                <div key={index}>
                  <input
                    value={item}
                    type="checkbox"
                    checked={isChecked(item)}
                    onChange={handleCheckType}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="py-4 ml-4 w-full text-sm font-medium text-gray-900">
                    {item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
