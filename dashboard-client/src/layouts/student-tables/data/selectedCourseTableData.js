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
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [result, setResult] = useState({ code: 0, content: "" });
  const studentID = localStorage.getItem("id");
  const [departments, setDepartments] = useState([]);
  const [majors, setMajors] = useState([]);

  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    api
      .get("/student/")
      .then((response) => {
        setStudents(response.data);
        handleSuccess("获取学生成功!");
      })
      .catch(() => {
        setResult({ code: 404, content: "获取学生失败!" });
        handleError(result.content);
      })
      .finally(() => {
        api
          .get("/major/")
          .then((response) => {
            setMajors(response.data);
            console.log(majors);
          })
          .catch((error) => {
            alert(error);
          });
        api
          .get("/department/")
          .then((response) => {
            setDepartments(response.data);
            console.log(departments);
          })
          .catch((error) => {
            alert(error);
          });
      });
  }, [studentID, !open]);

  function changeInformation(student) {
    console.log(student);
    // api
    //   .delete(`/student-selection/`, {
    //     data: {
    //       class_id: classId,
    //     },
    //   })
    //   .then(() => {
    //     setResult({ code: 200, content: "删除课程成功!" });
    //     setstudents((prevstudents) =>
    //       prevstudents.filter((prevstudent) => prevstudent.class_id !== classId)
    //     );
    //     // 刷新页面
    //     // window.location.reload();
    //   })
    //   .catch(() => {
    //     setResult({ code: 404, content: "已经有成绩啦!不能退课啦!" });
    //   });
  }
  function handleClick(student) {
    console.log(departments);
    console.log(majors);
    setOpen(true);
    setId(student.student_id);
    changeInformation(student);
  }
  function handleRemove(student) {
    console.log("删除学生", student.student_id);
    api.delete(`/student/${student.student_id}/`).then(() => {
      setResult({ code: 200, content: "删除学生成功!" });
      setStudents((prevstudents) =>
        prevstudents.filter((prevstudent) => prevstudent.student_id !== student.student_id)
      );
    });
  }
  const handleCloseModify = () => setOpen(false);
  const handleCloseNew = () => setOpenNew(false);

  const columns = [
    { Header: "学号", accessor: "id", width: "25%", align: "left" },
    { Header: "姓名", accessor: "name", align: "left" },
    { Header: "GPA", accessor: "gpa", align: "left" },
    { Header: "学院", accessor: "department", align: "left" },
    { Header: "专业", accessor: "major", align: "left" },
    { Header: "操作", accessor: "action", align: "center" },
  ];
  const rows = students.map((student) => ({
    id: (
      <MDTypography variant="caption" fontWeight="medium">
        {student.student_id}
      </MDTypography>
    ),
    name: (
      <MDTypography variant="caption" fontWeight="medium">
        {student.name}
      </MDTypography>
    ),
    gpa: (
      <MDTypography variant="caption" fontWeight="medium">
        {student.gpa}
      </MDTypography>
    ),
    department: (
      <MDTypography variant="caption" fontWeight="medium">
        {student.dept_id.name}
      </MDTypography>
    ),
    major: (
      <MDTypography variant="caption" fontWeight="medium">
        {student.major_id.name}
      </MDTypography>
    ),
    action: (
      <Grid container spacing={1} direction="row">
        <Grid item>
          <MDButton
            variant="outlined"
            color="info"
            fontWeight="medium"
            onClick={() => handleClick(student)}
          >
            修改信息
          </MDButton>
        </Grid>
        <Grid item>
          <MDButton
            variant="outlined"
            color="error"
            fontWeight="medium"
            onClick={() => handleRemove(student)}
          >
            删除
          </MDButton>
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
        {submitForm(id, handleCloseModify, majors, departments, handleError)}
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
        {submitNew(id, handleCloseNew, majors, departments, handleError)}
      </Modal>
    );
  }
  function addStudent() {
    setOpenNew(true);
  }
  return (
    <MDBox pt={3}>
      <MDButton
        pt={3}
        variant="gradient"
        color="error"
        onClick={() => {
          addStudent();
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
      {modalModify(submitForm)}
      {modalNew(submitNew)}
    </MDBox>
  );
}
