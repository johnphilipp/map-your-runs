import React, { useState } from "react";
import { activities as activitiesFromFile } from "../../data/activities";

export default function ControlTypes({
  activities,
  setActivities,
  checkedTypes,
  setCheckedTypes,
  useAllTypes,
  setUseAllTypes,
}) {
  // Store activity types/years, e.g. ["Run", "Ride", "Hike", ...] or ["2019", "2020", "2021", ...]
  const types = Array.from(
    new Set(
      activitiesFromFile.features.map((feature) => feature.properties.type)
    )
  ).sort();

  // Update activities based on selected types/years
  function filterActivitiesByType(activities, types) {
    const features = activities.features.filter((feature) => {
      return types.includes(feature.properties.type);
    });
    return { type: "FeatureCollection", features };
  }

  // Add/remove checked item from list and set activities
  const handleCheckType = (event) => {
    var updatedList = [...checkedTypes];
    if (event.target.checked) {
      updatedList = [...checkedTypes, event.target.value];
    } else {
      updatedList.splice(checkedTypes.indexOf(event.target.value), 1);
    }
    setCheckedTypes(updatedList.sort());
    setActivities(filterActivitiesByType(activitiesFromFile, updatedList));
  };

  // Update states if all types should be used
  const handleCheckUseAllTypes = (event) => {
    if (event.target.checked) {
      setUseAllTypes(true);
      setCheckedTypes([]);
      setActivities(filterActivitiesByType(activitiesFromFile, types));
    } else {
      setUseAllTypes(false);
      setActivities(filterActivitiesByType(activitiesFromFile, []));
    }
  };

  // Return css classes based on whether item is checked
  var isCheckedType = (item) => (checkedTypes.includes(item) ? true : false);

  return (
    <div className="mt-4">
      <div className="title">Select activities to visualize:</div>

      <div className="mb-4 flex items-center pl-4 rounded border border-gray-200 hover:bg-gray-100">
        <input
          value="useAllTypes"
          type="checkbox"
          checked={useAllTypes}
          onChange={handleCheckUseAllTypes}
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
        />
        <span className="py-4 ml-4 w-full text-sm font-medium text-gray-900">
          Select All
        </span>
      </div>

      <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {types.map((item, index) => (
          <div className="flex items-center pl-4 rounded border border-gray-200 hover:bg-gray-100">
            <div key={index}>
              <input
                disabled={useAllTypes}
                value={item}
                type="checkbox"
                checked={isCheckedType(item)}
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
  );
}
