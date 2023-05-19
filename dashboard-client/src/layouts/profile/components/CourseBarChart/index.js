import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import axios from "axios";

function CourseBarChart() {
  const [dataset, setDataset] = useState({});
  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    api.get("/course-selection/getStudentScore/").then((response) => {
      console.log("Success");
      setDataset(response.data);
    });
  }, []);
  const option = {
    dataset: dataset.dataset,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: { containLabel: true },
    xAxis: { name: "成绩", min: 60, max: 100 },
    yAxis: { name: "课程", type: "category" },
    visualMap: {
      orient: "horizontal",
      left: "center",
      min: 1,
      max: 4,
      text: ["4.0", "1"],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ["#6078ea", "#56b9ff", "#17ead9"],
      },
    },
    series: [
      {
        type: "bar",
        encode: {
          // Map the "amount" column to X axis.
          x: "成绩",
          // Map the "product" column to Y axis
          y: "课程",
        },
      },
    ],
  };
  return <ReactEcharts option={option} style={{ height: "600px", width: "100%" }} />;
}
export default CourseBarChart;
