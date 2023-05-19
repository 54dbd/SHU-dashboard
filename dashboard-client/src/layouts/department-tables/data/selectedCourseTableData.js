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
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [result, setResult] = useState({ code: 0, content: "" });
  const departmentID = localStorage.getItem("id");
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
      .get("/department/")
      .then((response) => {
        setDepartments(response.data);
        handleSuccess("获取学院成功!");
      })
      .catch((error) => {
        console.log(error);
        setResult({ code: 404, content: "获取学院失败!" });
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
  }, [departmentID, open, openNew]);

  function changeInformation(department) {
    console.log(department);
    // api
    //   .delete(`/department-selection/`, {
    //     data: {
    //       class_id: classId,
    //     },
    //   })
    //   .then(() => {
    //     setResult({ code: 200, content: "删除课程成功!" });
    //     setDepartments((prevdepartments) =>
    //       prevdepartments.filter((prevdepartment) => prevdepartment.class_id !== classId)
    //     );
    //     // 刷新页面
    //     // window.location.reload();
    //   })
    //   .catch((error) => {
    //     setResult({ code: 404, content: "已经有成绩啦!不能退课啦!" });
    //   });
  }
  function handleClick(department) {
    console.log(department.dept_id);
    setOpen(true);
    setId(department.dept_id);
    changeInformation(department);
  }
  function handleRemove(department) {
    console.log("删除学院", department.dept_id);
    api.delete(`/department/${department.dept_id}/`).then(() => {
      setResult({ code: 200, content: "删除学院成功!" });
      setDepartments((prevdepartments) =>
        prevdepartments.filter((prevdepartment) => prevdepartment.dept_id !== department.dept_id)
      );
    });
  }
  const handleCloseModify = () => setOpen(false);
  const handleCloseNew = () => setOpenNew(false);

  const columns = [
    { Header: "学院号", accessor: "id", width: "25%", align: "left" },
    { Header: "学院名", accessor: "name", align: "left" },
    { Header: "地址", accessor: "address", align: "left" },
    { Header: "联系电话", accessor: "phone", align: "left" },
    { Header: "操作", accessor: "action", align: "center" },
  ];
  const rows = departments.map((department) => ({
    id: (
      <MDTypography variant="caption" fontWeight="medium">
        {department.dept_id}
      </MDTypography>
    ),
    name: (
      <MDTypography variant="caption" fontWeight="medium">
        {department.name}
      </MDTypography>
    ),
    address: (
      <MDTypography variant="caption" fontWeight="medium">
        {department.address}
      </MDTypography>
    ),
    phone: (
      <MDTypography variant="caption" fontWeight="medium">
        {department.phone}
      </MDTypography>
    ),
    action: (
      <Grid container spacing={1} direction="row">
        <Grid item>
          <MDButton
            variant="outlined"
            color="info"
            fontWeight="medium"
            onClick={() => handleClick(department)}
          >
            修改信息
          </MDButton>
        </Grid>
        <Grid item>
          <MDButton
            variant="outlined"
            color="error"
            fontWeight="medium"
            onClick={() => handleRemove(department)}
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
        {submitForm(id, handleCloseModify, departments, handleError)}
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
        {submitNew(id, handleCloseNew, departments, handleError)}
      </Modal>
    );
  }
  function adddepartment() {
    setOpenNew(true);
  }
  return (
    <MDBox pt={3}>
      <MDButton
        pt={3}
        variant="gradient"
        color="error"
        onClick={() => {
          adddepartment();
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
