// src/pages/AnalyticsPage.jsx
import React, { useEffect, useState } from "react";
import SVGBarChart from "../components/SVGBarChart";

export default function AnalyticsPage() {
  const [data, setData] = useState([]);
  const cityCoordinates = { Mumbai: [100, 50], Delhi: [200, 70], Bangalore: [150, 150] };

  useEffect(() => {
    fetch("https://backend.jotish.in/backend_dev/gettabledata.php", {
      method: "POST",
      body: JSON.stringify({ username: "test", password: "123456" }),
    })
      .then((res) => res.json())
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Salary Distribution</h2>
      <SVGBarChart data={data} />

      <h2 className="text-xl font-bold mt-4 mb-2">Map View</h2>
      <svg width="500" height="300" className="border">
        {data.map((d, i) => {
          const [x, y] = cityCoordinates[d.city] || [0, 0];
          return <circle key={i} cx={x} cy={y} r="5" fill="red" />;
        })}
      </svg>
    </div>
  );
}