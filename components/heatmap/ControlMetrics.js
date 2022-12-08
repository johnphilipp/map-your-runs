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

  return (
    <div>
      <p className="text-slate-400">
        Showing <span />
        {metricNumActivities} sports activities of <span />
        {metricNumTypes()} <span /> different types from <span />
        {metricYearFromTo()}
      </p>
      <hr />
    </div>
  );
}
