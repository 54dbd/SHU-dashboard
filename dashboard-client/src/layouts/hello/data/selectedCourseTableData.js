/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDBadge from "components/MDBadge";
import axios from "axios";

// Images
import { useEffect, useState } from "react";

export default function data() {
  const [courses, setCourses] = useState([]);
  const [result, setResult] = useState({ code: 0, content: "" });

  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });
  const condition = true;
  useEffect(() => {
    if (condition) {
      api
        .get(`/course-selection`)
        .then((response) => {
          setCourses(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          setResult({ code: 404, content: "获取课程失败!" });
          alert(error);
        });
    }
  }, [condition]);

  return {
    columns: [
      { Header: "课程名", accessor: "course_name", align: "left" },
      { Header: "课程号", accessor: "course_id", width: "10%", align: "left" },
      { Header: "平时成绩", accessor: "gp", align: "center" },
      { Header: "考试成绩", accessor: "exam", align: "center" },
      { Header: "综合成绩", accessor: "grade", align: "center" },
      { Header: "绩点", accessor: "gpa", align: "center" },
      { Header: "课程学分", accessor: "credit", align: "center" },
    ],

    rows: courses.map((course) => ({
      course_name: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.class_id.course_id.name}
        </MDTypography>
      ),
      course_id: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.class_id.course_id.course_id}
        </MDTypography>
      ),
      grade: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.grade || "无成绩"}
        </MDTypography>
      ),
      exam: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.exam || "无成绩"}
        </MDTypography>
      ),
      gp: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.gp || "无成绩"}
        </MDTypography>
      ),
      gpa: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.gpa || "无成绩"}
        </MDTypography>
      ),
      credit: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.class_id.course_id.credit}
        </MDTypography>
      ),
    })),
    results: result,
  };
}
