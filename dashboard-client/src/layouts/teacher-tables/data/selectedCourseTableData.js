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
  const [teachers, setteachers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [result, setResult] = useState({ code: 0, content: "" });
  const teacherID = localStorage.getItem("id");
  const [departments, setDepartments] = useState([]);

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
        setteachers(response.data);
        handleSuccess("获取教师成功!");
      })
      .catch((error) => {
        console.log(error);

        setResult({ code: 404, content: "获取教师失败!" });
        handleError(result.content);
      })
      .finally(() => {
        api
          .get("/department/")
          .then((response) => {
            setDepartments(response.data);
            console.log(departments);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, [teacherID, open, openNew]);

  function changeInformation(teacher) {
    console.log(teacher);
    // api
    //   .delete(`/teacher-selection/`, {
    //     data: {
    //       class_id: classId,
    //     },
    //   })
    //   .then(() => {
    //     setResult({ code: 200, content: "删除课程成功!" });
    //     setteachers((prevteachers) =>
    //       prevteachers.filter((prevteacher) => prevteacher.class_id !== classId)
    //     );
    //     // 刷新页面
    //     // window.location.reload();
    //   })
    //   .catch((error) => {
    //     setResult({ code: 404, content: "已经有成绩啦!不能退课啦!" });
    //   });
  }
  function handleClick(teacher) {
    console.log(departments);
    setOpen(true);
    setId(teacher.teacher_id);
    changeInformation(teacher);
  }
  function handleRemove(teacher) {
    console.log("删除教师", teacher.teacher_id);
    api.delete(`/teacher/${teacher.teacher_id}/`).then(() => {
      setResult({ code: 200, content: "删除教师成功!" });
      setteachers((prevteachers) =>
        prevteachers.filter((prevteacher) => prevteacher.teacher_id !== teacher.teacher_id)
      );
    });
  }
  const handleCloseModify = () => setOpen(false);
  const handleCloseNew = () => setOpenNew(false);

  const columns = [
    { Header: "工号", accessor: "id", width: "25%", align: "left" },
    { Header: "姓名", accessor: "name", align: "left" },
    { Header: "学院", accessor: "department", align: "left" },
    { Header: "操作", accessor: "action", align: "center" },
  ];
  const rows = teachers.map((teacher) => ({
    id: (
      <MDTypography variant="caption" fontWeight="medium">
        {teacher.teacher_id}
      </MDTypography>
    ),
    name: (
      <MDTypography variant="caption" fontWeight="medium">
        {teacher.name}
      </MDTypography>
    ),
    department: (
      <MDTypography variant="caption" fontWeight="medium">
        {teacher.dept_id.name}
      </MDTypography>
    ),
    action: (
      <Grid container spacing={1} direction="row">
        <Grid item>
          <MDButton
            variant="outlined"
            color="info"
            fontWeight="medium"
            onClick={() => handleClick(teacher)}
          >
            修改信息
          </MDButton>
        </Grid>
        <Grid item>
          <MDButton
            variant="outlined"
            color="error"
            fontWeight="medium"
            onClick={() => handleRemove(teacher)}
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
        {submitForm(id, handleCloseModify, departments)}
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
        {submitNew(id, handleCloseNew, departments)}
      </Modal>
    );
  }
  function addteacher() {
    setOpenNew(true);
  }
  return (
    <MDBox pt={3}>
      <MDButton
        pt={3}
        variant="gradient"
        color="error"
        onClick={() => {
          addteacher();
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
