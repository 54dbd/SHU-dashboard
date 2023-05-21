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
import MDButton from "components/MDButton";
import DataTable from "../../../examples/Tables/DataTable";

export default function data(setSelectedCourse) {
  const [courses, setCourses] = useState([]);

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
          setSelectedCourse({ id: response.data[0].class_id, name: response.data[0].course_name });
          setCourses(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [condition]);

  const columns = [
    { Header: "开课ID", accessor: "class_id", align: "left" },
    { Header: "课程名", accessor: "course_name", align: "left" },
    { Header: "学期", accessor: "semester", align: "center" },
    { Header: "综合绩点", accessor: "gpa", align: "center" },
    { Header: "操作", accessor: "actions", align: "center" },
  ];

  const rows = courses.map((course) => ({
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
    actions: (
      <MDButton
        variant="outlined"
        color="error"
        onClick={() => {
          setSelectedCourse({ id: course.class_id, name: course.course_name });
        }}
      >
        查看成绩分布
      </MDButton>
    ),
  }));
  return (
    <DataTable
      table={{ columns: columns.valueOf(), rows: rows.valueOf() }}
      isSorted={false}
      entriesPerPage={false}
      showTotalEntries={false}
      noEndBorder
    />
  );
}
