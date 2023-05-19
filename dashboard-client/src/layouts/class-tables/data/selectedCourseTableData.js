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
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import submitForm from "./submitForm";
import submitNew from "./submitNew";
import DataTable from "../../../examples/Tables/DataTable";
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";

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
export default function data() {
  const [id, setId] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [Courses, setCourses] = useState([]);
  const [getCourse, setGetCourse] = useState([]);
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [result, setResult] = useState({ code: 0, content: "" });
  const CourseID = localStorage.getItem("id");
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    api
      .get("/class/")
      .then((response) => {
        setCourses(response.data);
        handleSuccess("获取课程成功!");
      })
      .catch(() => {
        setResult({ code: 404, content: "获取课程失败!" });
        handleError(result.content);
      })
      .finally(() => {
        api
          .get("/department/")
          .then((response) => {
            setDepartments(response.data);
          })
          .catch((error) => {
            alert(error);
          });
        api
          .get("/semester/")
          .then((response) => {
            setSemesters(response.data);
          })
          .catch((error) => {
            alert(error);
          });
        api
          .get("/teacher/")
          .then((response) => {
            setTeachers(response.data);
          })
          .catch((error) => {
            alert(error);
          });
        api
          .get("/course/")
          .then((response) => {
            setGetCourse(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      });
  }, [CourseID, open, openNew]);

  function changeInformation(Course) {
    console.log(Course);
    // api
    //   .delete(`/Course-selection/`, {
    //     data: {
    //       class_id: classId,
    //     },
    //   })
    //   .then(() => {
    //     setResult({ code: 200, content: "删除课程成功!" });
    //     setCourses((prevCourses) =>
    //       prevCourses.filter((prevCourse) => prevCourse.class_id !== classId)
    //     );
    //     // 刷新页面
    //     // window.location.reload();
    //   })
    //   .catch(() => {
    //     setResult({ code: 404, content: "已经有成绩啦!不能退课啦!" });
    //   });
  }
  function handleClick(Course) {
    console.log(departments);
    setOpen(true);
    setId(Course.course_id);
    changeInformation(Course);
  }
  function handleRemove(Course) {
    console.log("删除课程", Course.course_id);
    api.delete(`/class/${Course.course_id}/`).then(() => {
      handleSuccess("删除课程成功!");
      setCourses((prevCourses) =>
        prevCourses.filter((prevCourse) => prevCourse.course_id !== Course.course_id)
      );
    });
  }
  const handleCloseModify = () => setOpen(false);
  const handleCloseNew = () => setOpenNew(false);

  const columns = [
    { Header: "课程号", accessor: "id", width: "25%", align: "left" },
    { Header: "课程名", accessor: "name", align: "left" },
    { Header: "学期", accessor: "semester", align: "left" },
    { Header: "老师", accessor: "teacher", align: "left" },
    { Header: "教室", accessor: "classroom", align: "left" },
    { Header: "选课情况", accessor: "selection", align: "left" },
    { Header: "上课时间", accessor: "time", align: "left" },
    { Header: "操作", accessor: "action", align: "center" },
  ];
  const rows = Courses.map((Course) => ({
    id: (
      <MDTypography variant="caption" fontWeight="medium">
        {Course.course_id.course_id}
      </MDTypography>
    ),
    name: (
      <MDTypography variant="caption" fontWeight="medium">
        {Course.course_id.name}
      </MDTypography>
    ),
    semester: (
      <MDTypography variant="caption" fontWeight="medium">
        {Course.semester_id.name}
      </MDTypography>
    ),
    teacher: (
      <MDTypography variant="caption" fontWeight="medium">
        {Course.teacher_id.name}
      </MDTypography>
    ),
    classroom: (
      <MDTypography variant="caption" fontWeight="medium">
        {Course.classroom}
      </MDTypography>
    ),
    selection: (
      <MDTypography variant="caption" fontWeight="medium">
        {Course.current_selection} / {Course.max_selection}
      </MDTypography>
    ),
    time: (
      <MDTypography variant="caption" fontWeight="medium">
        星期{Course.time} {Course.start}-{Course.end}节
      </MDTypography>
    ),
    action: (
      <Grid spacing={1} direction="row">
        <Grid item>
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="info"
            fontWeight="medium"
            onClick={() => handleClick(Course)}
          >
            修改信息
          </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="error"
            fontWeight="medium"
            onClick={() => handleRemove(Course)}
          >
            删除
          </MDTypography>
        </Grid>
      </Grid>
    ),
  }));
  function modalModify() {
    return (
      <Modal
        open={open}
        onClose={handleCloseModify}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {submitForm(id, handleCloseModify, departments, semesters, teachers, handleError)}
      </Modal>
    );
  }
  function modalNew() {
    return (
      <Modal
        open={openNew}
        onClose={handleCloseNew}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {submitNew(handleCloseNew, departments, semesters, teachers, getCourse, handleError)}
      </Modal>
    );
  }
  function addCourse() {
    setOpenNew(true);
  }
  return (
    <MDBox pt={3}>
      <MDButton
        pt={3}
        variant="gradient"
        color="error"
        onClick={() => {
          addCourse();
        }}
        style={{ float: "right", marginRight: "20px", marginTop: "-70px" }}
      >
        <AddIcon />
      </MDButton>
      <DataTable
        table={{
          columns,
          rows,
        }}
        isSorted
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
      {modalModify()}
      {modalNew()}
    </MDBox>
  );
}
