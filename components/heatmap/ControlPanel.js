import React, { useState } from "react";
import ControlMetrics from "./ControlMetrics";
import ControlTypes from "./ControlTypes";
import ControlYears from "./ControlYears";

export default function ControlPanel({ activities, setActivities }) {
  // Store which types are checked by the user via selected checkboxes
  const [checkedTypes, setCheckedTypes] = useState([]);

  // Boolean check if all types should be used
  const [useAllTypes, setUseAllTypes] = useState(true);

  return (
    <div className="m-6 leading-loose text-gray-600">
      <h2 className="text-2xl">Heatmap</h2>
      <ControlMetrics
        activities={activities}
        checkedTypes={checkedTypes}
        useAllTypes={useAllTypes}
      />
      <ControlTypes
        activities={activities}
        setActivities={setActivities}
        checkedTypes={checkedTypes}
        setCheckedTypes={setCheckedTypes}
        useAllTypes={useAllTypes}
        setUseAllTypes={setUseAllTypes}
      />
      <ControlYears activities={activities} setActivities={setActivities} />
    </div>
  );
}
