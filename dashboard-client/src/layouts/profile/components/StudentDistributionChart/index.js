import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import axios from "axios";

function StudentDistributionChart(selectedCourse) {
  const [num, setNum] = useState([]);
  const role = localStorage.getItem("UserPermission");
  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    let url = "/course-selection/getStudentDistribution/";
    if (selectedCourse) {
      url += `?class_id=${selectedCourse}`;
    }
    api.get(url).then((response) => {
      console.log("Success");
      setNum(response.data.num);
    });
  }, [selectedCourse]);
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

        // 如果role是teacher，那么颜色就是#eb4844，否则就是#5ab25e和#0f3443
        color: role === "admin" ? "#eb4844" : ["#5ab25e", "#0f3443"],
      },
    ],
  };
  return <ReactEcharts option={option} style={{ minHeight: "680px", width: "100%" }} />;
}

export default StudentDistributionChart;
