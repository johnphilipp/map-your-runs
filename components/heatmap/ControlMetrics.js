import React from "react";

export default function ControlMetrics({
  activities,
  allTypes,
  checkedTypes,
  useAllTypes,
  allYears,
  checkedYears,
  useAllYears,
}) {
  // Calculate number of activities that are currently filtered
  const metricNumActivities = activities.features.length;

  // Calculate number of types that are currently filtered
  const metricNumTypes = () => {
    if (metricNumActivities == 0) {
      return "0";
    }
    return useAllTypes == true ? allTypes.length : checkedTypes.length;
  };

  // Calculate year from and year to of activities that are currently filtered
  const metricYearFromTo = () => {
    let metricYearHelper = useAllYears == true ? allYears : checkedYears;
    metricYearHelper = metricNumActivities == 0 ? [] : metricYearHelper;
    const metricYearFrom =
      metricYearHelper.length == 0 ? "-" : metricYearHelper[0];
    const metricYearTo =
      metricYearHelper.length == 0
        ? "-"
        : metricYearHelper[metricYearHelper.length - 1];
    return metricYearFrom + " to " + metricYearTo;
  };

  const metrics = (numActivities, numTypes, yearFromTo) => {
    return numActivities == 0
      ? "There are no activities to be displayed based on your current selection"
      : "Displaying " +
          numActivities +
          " sports activities of " +
          numTypes +
          " different types from " +
          yearFromTo;
  };

  const textColor = () => {
    return metricNumActivities == 0 ? "text-red-400" : "text-slate-400";
  };

  return (
    <div>
      <p className={textColor()}>
        {metrics(metricNumActivities, metricNumTypes(), metricYearFromTo())}
      </p>
      <hr />
    </div>
  );
}
