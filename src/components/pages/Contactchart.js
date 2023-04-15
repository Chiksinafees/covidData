import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import "./Contactchart.css";
const Contactchart = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const chartData = {
        labels: Object.keys(data.cases),
        datasets: [
          {
            label: "Cases",
            data: Object.values(data.cases),
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: false,
          },
        ],
      };

      const ctx = document.getElementById("myChart");
      new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Cases",
              },
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <div>
      <h1 className="text-center">covid current cases</h1>
      <canvas id="myChart" />
    </div>
  );
};

export default Contactchart;
