import React from "react";
import { activities as activitiesFromFile } from "../../data/activities";

export default function ControlMetrics({
  activities,
  checkedTypes,
  useAllTypes,
}) {
  // Different metrics for heatmap subtitle
  const metricNumActivities = activities.features.length;
  const metricNumTypes =
    useAllTypes == true
      ? Array.from(
          new Set(
            activitiesFromFile.features.map(
              (feature) => feature.properties.type
            )
          )
        ).length
      : checkedTypes.length;
  const metricYearHelper = Array.from(
    new Set(
      activities.features.map((feature) =>
        feature.properties.start_date_local.substring(0, 4)
      )
    )
  ).sort();
  const metricYearFrom =
    metricYearHelper.length == 0 ? "-" : metricYearHelper[0];
  const metricYearTo =
    metricYearHelper.length == 0
      ? "-"
      : metricYearHelper[metricYearHelper.length - 1];

  return (
    <div>
      <p className="text-slate-400">
        Showing <span />
        {metricNumActivities} sports activities of <span />
        {metricNumTypes} <span /> different types from <span />
        {metricYearFrom} to {metricYearTo}
      </p>
      <hr />
    </div>
  );
}
