import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import axios from "axios";

function GPAAreaChart() {
  const [gpa, setGpa] = useState([]);
  const [semesterId, setSemesterId] = useState([]);
  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    api.get("/course-selection/getStudentGpaBySemester").then((response) => {
      console.log("Success");
      setGpa(response.data.gpa);
      setSemesterId(response.data.semester_id);
    });
  }, []);
  const option = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: semesterId,
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    series: [
      {
        data: gpa,
        type: "line",
        areaStyle: {
          color: "#6078ea",
        },
      },
    ],
  };
  return <ReactEcharts option={option} />;
}

export default GPAAreaChart;
