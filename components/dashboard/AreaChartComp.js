import React, { useEffect, useState } from "react";
import { activities as activitiesFromFile } from "../../data/activities";
import {
  ResponsiveContainer,
  Label,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function AreaChartComp({ selectedTypeChart }) {
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

  // Create new data structure for AreaChart
  let typeLogArr = [];
  let counter = 0;
  activitiesFromFile.features.map((item) => {
    if (item.properties.type == selectedTypeChart) {
      typeLogArr[counter] = {
        type: selectedTypeChart,
        start_date_local: item.properties.start_date_local.substring(0, 10),
        distance: Math.round(item.properties.distance / 10) / 100,
      };
      counter++;
    }
  });
  typeLogArr.reverse();

  // Setup delayed chart load
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
      <div className="z-110">
        <ResponsiveContainer width="95%" height={400} className="z-120">
          <AreaChart
            className="z-130"
            width={730}
            height={250}
            data={typeLogArr}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f39c12" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f39c12" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="start_date_local" dy={10} />
            <YAxis dataKey="distance">
              <Label
                style={{
                  textAnchor: "middle",
                  fontSize: "100%",
                  fill: "#7f8c8d",
                }}
                dx={-25}
                angle={270}
                value={"Distance (km)"}
              />
            </YAxis>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="distance"
              stroke="#f39c12"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
