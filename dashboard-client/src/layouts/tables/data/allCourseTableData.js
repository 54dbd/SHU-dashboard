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
  useEffect(() => {
    api
      .get(`/class/`)
      .then((response) => {
        setCourses(response.data);
        // console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function addCourse(course) {
    const classId = course.class_id;
    api
      .post(`/course-selection/`, {
        class_id: classId,
      })
      .then(() => {
        setResult("选课成功!");
        setCourses((prevCourses) => [...prevCourses, course]);
        // window.location.reload(); // 刷新页面
      })
      .catch((error) => {
        console.log(error);
        setResult("你已经选过这门课啦!");
      });
  }
  return {
    columns: [
      { Header: "课程名", accessor: "course_name", width: "25%", align: "left" },
      { Header: "课程号", accessor: "course_id", align: "left" },
      { Header: "学分", accessor: "point", align: "center" },
      { Header: "教师姓名", accessor: "teacher", align: "center" },
      { Header: "上课时间", accessor: "time", align: "center" },
      { Header: "上课教室", accessor: "classroom", align: "center" },
      { Header: "操作", accessor: "action", align: "center" },
    ],

    rows: courses.map((course) => ({
      course_name: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.course_id.name}
        </MDTypography>
      ),
      course_id: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.course_id.course_id}
        </MDTypography>
      ),
      point: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.course_id.credit}
        </MDTypography>
      ),
      time: (
        <MDTypography variant="caption" fontWeight="medium">
          星期{course.time} {course.start}-{course.end}节
        </MDTypography>
      ),
      classroom: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.classroom}
        </MDTypography>
      ),
      teacher: (
        <MDTypography variant="caption" fontWeight="medium">
          {course.teacher_id.name}
        </MDTypography>
      ),
      action: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="success"
          fontWeight="medium"
          onClick={() => addCourse(course)}
        >
          选课
        </MDTypography>
      ),
    })),
    results: result,
  };
}
