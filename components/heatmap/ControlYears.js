import React, { useState } from "react";
import { activities as activitiesFromFile } from "../../data/activities";

export default function ControlYears({ activities, setActivities }) {
  // Store activity types/years, e.g. ["Run", "Ride", "Hike", ...] or ["2019", "2020", "2021", ...]
  const years = Array.from(
    new Set(
      activitiesFromFile.features.map((feature) =>
        feature.properties.start_date_local.substring(0, 4)
      )
    )
  ).sort();

  // Boolean check if all types/years should be used
  const [useAllYears, setUseAllYears] = useState(true);

  // Store which activities/years are checked by the user via selected checkboxes
  const [checkedYears, setCheckedYears] = useState([]);

  // Update activities based on selected types/years
  function filterActivitiesByYear(activities, years) {
    const features = activities.features.filter((feature) => {
      return years.includes(
        feature.properties.start_date_local.substring(0, 4)
      );
    });
    return { type: "FeatureCollection", features };
  }

  // Add/remove checked item from list and set activities
  const handleCheckYear = (event) => {
    var updatedList = [...checkedYears];
    if (event.target.checked) {
      updatedList = [...checkedYears, event.target.value];
    } else {
      updatedList.splice(checkedYears.indexOf(event.target.value), 1);
    }
    setCheckedYears(updatedList.sort());
    setActivities(filterActivitiesByYear(activitiesFromFile, updatedList));
  };

  // Update states if all years should be used
  const handleCheckUseAllYears = (event) => {
    if (event.target.checked) {
      setUseAllYears(true);
      setCheckedYears([]);
      setActivities(filterActivitiesByYear(activitiesFromFile, years));
    } else {
      setUseAllYears(false);
      setActivities(filterActivitiesByYear(activitiesFromFile, []));
    }
  };

  // Return css classes based on whether item is checked
  var isCheckedYear = (item) => (checkedYears.includes(item) ? true : false);

  return (
    <div className="mt-4">
      <div className="title">Select years to visualize:</div>

      <div className="mb-4 flex items-center pl-4 rounded border border-gray-200 hover:bg-gray-100">
        <input
          value="useAllYears"
          type="checkbox"
          checked={useAllYears}
          onChange={handleCheckUseAllYears}
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
        />
        <span className="py-4 ml-4 w-full text-sm font-medium text-gray-900">
          Select All
        </span>
      </div>

      <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {years.map((item, index) => (
          <div className="flex items-center pl-4 rounded border border-gray-200 hover:bg-gray-100">
            <div key={index}>
              <input
                disabled={useAllYears}
                value={item}
                type="checkbox"
                checked={isCheckedYear(item)}
                onChange={handleCheckYear}
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
