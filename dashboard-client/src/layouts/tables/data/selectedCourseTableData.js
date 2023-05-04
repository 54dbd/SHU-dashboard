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
  const [result, setResult] = useState("");

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
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [condition]);

  function removeCourse(course) {
    const classId = course.class_id.class_id;
    api
      .delete(`/course-selection/`, {
        data: {
          class_id: classId,
        },
      })
      .then(() => {
        setResult("删除课程成功!");
        setCourses((prevCourses) =>
          prevCourses.filter((prevCourse) => prevCourse.class_id !== classId)
        );
      })
      .catch(() => {
        setResult("已经有成绩啦!不能退课啦!");
      });
  }
  return {
    columns: [
      { Header: "课程名", accessor: "course_name", width: "25%", align: "left" },
      { Header: "课程号", accessor: "course_id", align: "left" },
      { Header: "成绩", accessor: "score", align: "center" },
      { Header: "教师姓名", accessor: "teacher", align: "center" },
      { Header: "上课时间", accessor: "time", align: "center" },
      { Header: "上课教室", accessor: "classroom", align: "center" },
      { Header: "操作", accessor: "action", align: "center" },
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
      score: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.grade || "无成绩"}
        </MDTypography>
      ),
      time: (
        <MDTypography variant="caption" fontWeight="medium">
          星期{course.class_id.time} {course.class_id.start}-{course.class_id.end}节
        </MDTypography>
      ),
      classroom: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.class_id.classroom}
        </MDTypography>
      ),
      teacher: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.class_id.teacher_id.name}
        </MDTypography>
      ),
      action: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="error"
          fontWeight="medium"
          onClick={() => removeCourse(course)}
        >
          退课
        </MDTypography>
      ),
      results: result,
    })),
  };
}
