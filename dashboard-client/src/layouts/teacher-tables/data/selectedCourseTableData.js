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
export default function data() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({ code: 0, content: "" });
  const studentID = localStorage.getItem("id");
  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    api
      .get("/teacher/")
      .then((response) => {
        setStudents(response.data);
        handleSuccess("获取学生成功!");
      })
      .catch(() => {
        setResult({ code: 404, content: "获取学生失败!" });
        handleError(result.content);
      });
  }, [studentID]);

  function changeScore(student) {
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
    setOpen(true);
    changeScore(student);
  }
  function handleRemove(student) {
    console.log("删除课程", student);
  }
  const handleClose = () => setOpen(false);
  const columns = [
    { Header: "学号", accessor: "id", width: "25%", align: "left" },
    { Header: "姓名", accessor: "name", align: "left" },
    { Header: "GPA", accessor: "gpa", align: "left" },
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
    action: (
      <Grid spacing={1}>
        <Grid item>
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="info"
            fontWeight="medium"
            onClick={() => handleClick(student)}
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
            onClick={() => handleRemove()}
          >
            删除
          </MDTypography>
        </Grid>
      </Grid>
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
        {submitForm()}
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
