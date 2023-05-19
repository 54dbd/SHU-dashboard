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
import { cssTransition, toast, ToastContainer } from "react-toastify";
import DataTable from "../../../examples/Tables/DataTable";
import MDBox from "../../../components/MDBox";

export default function data(courseFilter, semesterFilter, courseNameFilter, semesterNameFilter) {
  const [courses, setCourses] = useState([]);
  const [result, setResult] = useState({ code: 0, content: "" });
  const [refresh, setRefresh] = useState(false);
  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
  });
  function handleSuccess(content) {
    toast.success(content, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: bounce,
      style: { fontSize: "15px" },
    });
  }
  function handleError(content) {
    toast.error(content, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: bounce,
      style: { fontSize: "10px" },
    });
  }
  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });
  useEffect(() => {
    let url = "/course-selection/";
    if (courseFilter && semesterFilter) {
      url += `?course_id=${courseFilter}&semester_id=${semesterFilter}`;
    } else if (courseFilter) {
      url += `?course_id=${courseFilter}`;
    } else if (semesterFilter) {
      url += `?semester_id=${semesterFilter}`;
    }
    api
      .get(url)
      .then((response) => {
        setCourses(response.data);
        handleSuccess(`根据${courseNameFilter},${semesterNameFilter}获取课程成功!`);
      })
      .catch((error) => {
        console.log(error);
        setResult({ code: 404, content: "获取课程失败!" });
        handleError(result.content);
      });
  }, [refresh, courseFilter, semesterFilter]);

  function removeCourse(course) {
    const classId = course.class_id.class_id;
    api
      .delete(`/course-selection/`, {
        data: {
          class_id: classId,
        },
      })
      .then(() => {
        handleSuccess("删除课程成功!");
        setCourses((prevCourses) =>
          prevCourses.filter((prevCourse) => prevCourse.class_id !== classId)
        );
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
        handleError("已经有成绩啦!不能退课啦!");
      });
  }

  const columns = [
    { Header: "课程名", accessor: "course_name", width: "25%", align: "left" },
    { Header: "课程号", accessor: "course_id", align: "left" },
    { Header: "成绩", accessor: "score", align: "center" },
    { Header: "教师姓名", accessor: "teacher", align: "center" },
    { Header: "上课时间", accessor: "time", align: "center" },
    { Header: "上课教室", accessor: "classroom", align: "center" },
    { Header: "选课情况", accessor: "selection", align: "center" },
    { Header: "操作", accessor: "action", align: "center" },
  ];

  const rows = courses.map((course) => ({
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
    selection: (
      <MDTypography variant="caption" fontWeight="medium">
        {course.class_id.current_selection} / {course.class_id.max_selection}
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
  }));
  return (
    <MDBox pt={3}>
      <DataTable
        table={{
          columns,
          rows,
        }}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        noEndBorder
      />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </MDBox>
  );
}
