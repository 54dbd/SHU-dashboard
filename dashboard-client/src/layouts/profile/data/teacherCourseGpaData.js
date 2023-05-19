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
        .get(`/course-selection/getStudentGpa/`)
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
      { Header: "开课ID", accessor: "class_id", align: "left" },
      { Header: "课程名", accessor: "course_name", align: "left" },
      { Header: "学期", accessor: "semester", align: "center" },
      { Header: "综合绩点", accessor: "gpa", align: "center" },
    ],

    rows: courses.map((course) => ({
      class_id: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.class_id}
        </MDTypography>
      ),
      course_name: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.course_name}
        </MDTypography>
      ),
      semester: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.semester}
        </MDTypography>
      ),
      gpa: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.gpa || 0}
        </MDTypography>
      ),
    })),
    results: result,
  };
}
