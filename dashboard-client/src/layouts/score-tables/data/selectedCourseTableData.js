// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDBadge from "components/MDBadge";
import axios from "axios";

// Images
import { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
import { Modal } from "@mui/material";

import { cssTransition, toast, ToastContainer } from "react-toastify";
import submitForm from "./submitForm";
import DataTable from "../../../examples/Tables/DataTable";
import MDBox from "../../../components/MDBox";

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
export default function data(courseFilter, semesterFilter, courseNameFilter, semesterNameFilter) {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({ code: 0, content: "" });
  const [id, setId] = useState(0);
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
  }, [courseFilter, semesterFilter, open]);

  function handleClick(course) {
    setOpen(true);
    setId(course.course_selection_id);
  }
  const handleClose = () => setOpen(false);
  function handleSubmit() {
    handleClose();
  }
  const columns = [
    { Header: "学期", accessor: "semester", width: "25%", align: "left" },
    { Header: "课程名", accessor: "course_name", align: "left" },
    { Header: "课程号", accessor: "course_id", align: "left" },
    { Header: "学生姓名", accessor: "name", align: "center" },
    { Header: "平时成绩", accessor: "gp", align: "center" },
    { Header: "考试成绩", accessor: "exam", align: "center" },
    { Header: "总成绩", accessor: "score", align: "center" },
    { Header: "上课时间", accessor: "time", align: "center" },
    { Header: "上课教室", accessor: "classroom", align: "center" },
    { Header: "操作", accessor: "action", align: "center" },
  ];
  const rows = courses.map((course) => ({
    name: (
      <MDTypography variant="caption" fontWeight="medium">
        {course.student_id.name}
      </MDTypography>
    ),
    semester: (
      <MDTypography variant="caption" fontWeight="medium">
        {course.class_id.semester_id.name}
      </MDTypography>
    ),
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
    gp: (
      <MDTypography variant="caption" fontWeight="medium">
        {course.gp || "无成绩"}
      </MDTypography>
    ),
    exam: (
      <MDTypography variant="caption" fontWeight="medium">
        {course.exam || "无成绩"}
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
    action: (
      <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="info"
        fontWeight="medium"
        onClick={() => handleClick(course)}
      >
        修改成绩
      </MDTypography>
    ),
  }));
  function modal() {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {submitForm(id, handleSubmit, handleError)}
      </Modal>
    );
  }

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
      {modal()}
    </MDBox>
  );
}
