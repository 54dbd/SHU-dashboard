// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import axios from "axios";
import MDInput from "components/MDInput";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
function submitForm(id, handleClose, departments, handleError) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    boxShadow: 24,
    p: 4,
  };
  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });

  const formData = new FormData();
  formData.append("dept_id", id);
  formData.append("address", address);
  formData.append("phone", phone);
  const submit = () => {
    api
      .put(`/department/${id}/`, formData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Success");
          handleClose();
        }
      })
      .catch((error) => {
        alert(error);
        handleError(error);
      });
  };
  return (
    <Card sx={style}>
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        mx={2}
        mt={-7}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          信息修改
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={3}>
            <MDInput
              type="number"
              size="small"
              label="电话号码"
              fullWidth
              onChange={(event) => setPhone(event.target.value)}
            />
          </MDBox>
          <MDBox mb={3}>
            <MDInput
              type="text"
              size="small"
              label="地址"
              fullWidth
              onChange={(event) => setAddress(event.target.value)}
            />
          </MDBox>
          <MDBox mt={4}>
            <MDButton
              variant="gradient"
              color="info"
              fullWidth
              onClick={(option) => submit(option)}
            >
              提交
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default submitForm;
