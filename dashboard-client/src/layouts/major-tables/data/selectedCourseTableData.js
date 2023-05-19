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
  const [majors, setmajors] = useState([]);
  const [openNew, setOpenNew] = useState(false);
  const [result, setResult] = useState({ code: 0, content: "" });

  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    api
      .get("/major/")
      .then((response) => {
        setmajors(response.data);
        handleSuccess("获取专业成功!");
      })
      .catch((error) => {
        console.log(error);
        setResult({ code: 404, content: "获取专业失败!" });
        handleError(result.content);
      });
  }, [openNew]);

  function handleRemove(major) {
    console.log("删除专业", major.major_id);
    api.delete(`/major/${major.major_id}/`).then(() => {
      setResult({ code: 200, content: "删除专业成功!" });
      setmajors((prevmajors) =>
        prevmajors.filter((prevmajor) => prevmajor.major_id !== major.major_id)
      );
    });
  }
  const handleCloseNew = () => setOpenNew(false);

  const columns = [
    { Header: "专业号", accessor: "id", width: "25%", align: "left" },
    { Header: "专业名", accessor: "name", align: "left" },
    { Header: "操作", accessor: "action", align: "center" },
  ];
  const rows = majors.map((major) => ({
    id: (
      <MDTypography variant="caption" fontWeight="medium">
        {major.major_id}
      </MDTypography>
    ),
    name: (
      <MDTypography variant="caption" fontWeight="medium">
        {major.name}
      </MDTypography>
    ),
    action: (
      <Grid container spacing={1} direction="row">
        <Grid item>
          <MDButton
            variant="outlined"
            color="error"
            fontWeight="medium"
            onClick={() => handleRemove(major)}
          >
            删除
          </MDButton>
        </Grid>
      </Grid>
    ),
  }));
  function modalNew() {
    return (
      <Modal
        open={openNew}
        onClose={handleCloseNew}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {submitNew(handleCloseNew)}
      </Modal>
    );
  }
  function addmajor() {
    setOpenNew(true);
  }
  return (
    <MDBox pt={3}>
      <MDButton
        pt={3}
        variant="gradient"
        color="error"
        onClick={() => {
          addmajor();
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
      {modalNew(submitNew)}
    </MDBox>
  );
}
