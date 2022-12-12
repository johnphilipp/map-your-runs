import React, { useEffect, useState } from "react";
import { activities as activitiesFromFile } from "../../data/activities";
import {
  ResponsiveContainer,
  Label,
  BarChart as BarChartComp,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function BarChart({ selectedYearChart }) {
  // Count how often each type appears in dataset
  let typeCountDict = {};
  for (const item of activitiesFromFile.features) {
    if (selectedYearChart == "Select all") {
      if (typeCountDict[item.properties.type]) {
        typeCountDict[item.properties.type] += 1;
      } else {
        typeCountDict[item.properties.type] = 1;
      }
    } else {
      if (
        item.properties.start_date_local.substring(0, 4) == selectedYearChart
      ) {
        if (typeCountDict[item.properties.type]) {
          typeCountDict[item.properties.type] += 1;
        } else {
          typeCountDict[item.properties.type] = 1;
        }
      }
    }
  }
  typeCountDict = Object.entries(typeCountDict);

  // Sort array by distance descending
  typeCountDict.sort(function (first, second) {
    if (first[1] < second[1]) return 1;
    if (first[1] > second[1]) return -1;
    return 0;
  });

  // Create new data structure for BarChart
  const typeCountArr = [];
  typeCountDict.map((item, index) => {
    typeCountArr[index] = { type: item[0], count: item[1] };
  });

  // Setup delayed chart loading
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <div>
        <ResponsiveContainer width="95%" height={300}>
          <BarChartComp width={730} height={250} data={typeCountArr}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" dy={10} />
            <YAxis dataKey="count">
              <Label
                style={{
                  textAnchor: "middle",
                  fontSize: "100%",
                  fill: "#7f8c8d",
                }}
                dx={-25}
                angle={270}
                value={"Count"}
              />
            </YAxis>
            <Tooltip />
            <Bar dataKey="count" fill="#f39c12" />
          </BarChartComp>
        </ResponsiveContainer>
      </div>
    );
  }
}
