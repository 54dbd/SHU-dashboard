import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import axios from "axios";

function StudentDistributionChartBySemester(selectedSemester) {
  const [num, setNum] = useState([]);
  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    if (selectedSemester === "0") {
      api.get("/course-selection/getStudentDistributionByAllSemester/").then((response) => {
        console.log("Success");
        setNum(response.data.num);
      });
    } else {
      console.log(selectedSemester);
      let url = "/course-selection/getStudentDistributionBySemester/";
      if (selectedSemester) {
        url += `?semester_id=${selectedSemester}`;
      }
      api.get(url).then((response) => {
        console.log("Success");
        setNum(response.data.num);
      });
    }
  }, [selectedSemester]);
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
        color: "#eb4844",
      },
    ],
  };
  return <ReactEcharts option={option} style={{ height: "700px", width: "100%" }} />;
}

export default StudentDistributionChartBySemester;
