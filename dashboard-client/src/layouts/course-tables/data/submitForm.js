// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import axios from "axios";
import MDInput from "components/MDInput";
import { useState } from "react";
import MDProgress from "components/MDProgress";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// eslint-disable-next-line no-unused-vars
function submitForm(id, handleClose, departments, handleError) {
  const [credit, setCredit] = useState("");
  const [percentage, setPercentage] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
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
  formData.append("credit", credit);
  formData.append("gp_percentage", percentage);
  formData.append("course_id", id);
  formData.append("dept_id", selectedDepartment);
  const submit = () => {
    api
      .put(`/course/${id}/`, formData)
      .then((response) => {
        if (response.status === 200) {
          console.log(selectedDepartment);
          console.log("Success");
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
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
            <Autocomplete
              disablePortal
              id="学院"
              size="small"
              options={departments}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="学院" />}
              onInputChange={(event, newInputValue) => {
                const index = departments.findIndex(
                  (department) => department.name === newInputValue
                );
                setSelectedDepartment(index + 1);
              }}
            />
          </MDBox>
          <MDBox mb={3}>
            <MDInput
              type="text"
              size="small"
              label="学分"
              fullWidth
              onChange={(event) => setCredit(event.target.value)}
            />
          </MDBox>
          <MDBox mb={3}>
            <MDInput
              type="text"
              size="small"
              label="平时分占比%"
              fullWidth
              onChange={(event) => setPercentage(event.target.value / 100)}
            />
            <MDProgress value={percentage * 100} variant="gradient" label />
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
