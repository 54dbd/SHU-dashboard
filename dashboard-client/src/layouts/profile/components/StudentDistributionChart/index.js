import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import axios from "axios";

function StudentDistributionChart() {
  const [num, setNum] = useState([]);
  const [classFilter] = useState("50");
  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    let url = "/course-selection/getStudentDistribution/";
    if (classFilter) {
      url += `?class_id=${classFilter}`;
    }
    api.get(url).then((response) => {
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
    tooltip: {
      trigger: "axis",
      axisPointer: {
        shadowStyle: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        type: "shadow",
      },
    },
    series: [
      {
        data: num,
        type: "bar",
        color: ["#5ab25e", "#0f3443"],
      },
    ],
  };
  return <ReactEcharts option={option} />;
}

export default StudentDistributionChart;
