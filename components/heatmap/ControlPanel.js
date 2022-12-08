import React from "react";
import ControlMetrics from "./ControlMetrics";
import ControlTypes from "./ControlTypes";
import ControlYears from "./ControlYears";

export default function ControlPanel({
  activities,
  allTypes,
  allYears,
  checkedTypes,
  setCheckedTypes,
  checkedYears,
  setCheckedYears,
  useAllTypes,
  setUseAllTypes,
  useAllYears,
  setUseAllYears,
}) {
  // This component is only used to collect all control components in one place
  return (
    <div className="m-6 leading-loose text-gray-600">
      <h2 className="text-2xl">Heatmap</h2>
      <ControlMetrics
        activities={activities}
        allTypes={allTypes}
        checkedTypes={checkedTypes}
        useAllTypes={useAllTypes}
        allYears={allYears}
        checkedYears={checkedYears}
        useAllYears={useAllYears}
      />
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
  );
}
