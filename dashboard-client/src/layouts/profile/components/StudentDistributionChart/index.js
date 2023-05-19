import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import axios from "axios";

function StudentDistributionChart() {
  const [num, setNum] = useState([]);
  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    api.get("/course-selection/getStudentDistribution").then((response) => {
      console.log("Success");
      setNum(response.data.num);
    });
  }, []);
  const option = {
    xAxis: {
      type: "category",
      data: [0, 1.0, 1.5, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0],
    },
    yAxis: {
      name: "人数",
      type: "value",
    },
    series: [
      {
        data: num,
        type: "bar",
      },
    ],
  };
  return <ReactEcharts option={option} />;
}

export default StudentDistributionChart;
