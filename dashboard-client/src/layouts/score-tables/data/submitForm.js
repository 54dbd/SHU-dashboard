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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";

function submitForm(id, handleClose, handleError) {
  const [exam, setExam] = useState("");
  const [gp, setGp] = useState("");
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
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });
  const formData = new FormData();
  formData.append("exam", exam);
  formData.append("gp", gp);
  const submit = () => {
    console.log(gp, exam);
    // 发送登录请求
    api
      .put(`/course-selection/${id}/`, formData)
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
        bgColor="success"
        borderRadius="lg"
        coloredShadow="success"
        mx={2}
        mt={-7}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          成绩提交
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={3}>
            <MDInput
              type="number"
              size="small"
              label="平时分"
              fullWidth
              helperText="平时分区间为(0~100)"
              onChange={(event) => setGp(event.target.value)}
            />
          </MDBox>
          <MDBox mb={3}>
            <MDInput
              type="number"
              label="考试成绩"
              size="small"
              fullWidth
              helperText="考试成绩区间为(0~100)"
              onChange={(event) => setExam(event.target.value)}
            />
          </MDBox>
          <MDBox mt={4}>
            <MDButton variant="gradient" color="success" fullWidth onClick={() => submit()}>
              提交
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default submitForm;
