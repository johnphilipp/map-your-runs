import React, { useEffect, useState } from "react";
import { activities as activitiesFromFile } from "../../data/activities";
import {
  ResponsiveContainer,
  Label,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function BarChartComp() {
  // Count how often each type appears in dataset
  let typeCountDict = {};
  for (const feature of activitiesFromFile.features) {
    if (typeCountDict[feature.properties.type]) {
      typeCountDict[feature.properties.type] += 1;
    } else {
      typeCountDict[feature.properties.type] = 1;
    }
  }
  typeCountDict = Object.entries(typeCountDict);

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
      <div className="z-100">
        <ResponsiveContainer width="95%" height={400}>
          <BarChart width={730} height={250} data={typeCountArr}>
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
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
