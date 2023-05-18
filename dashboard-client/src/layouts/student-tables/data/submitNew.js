// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MDInput from "components/MDInput";
// eslint-disable-next-line no-unused-vars
function submitNew(id, handleClose, majors, departments) {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [userId, setUserId] = useState("");
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
  formData.append("user_id_id", userId);
  formData.append("major_id", selectedMajor);
  formData.append("dept_id", selectedDepartment);
  formData.append("student_id", studentId);
  formData.append("name", studentName);
  const submit = () => {
    console.log(studentId);
    api
      .post("/student/", formData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Success");
          handleClose();
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <Card sx={style}>
      <MDBox
        variant="gradient"
        bgColor="error"
        borderRadius="lg"
        coloredShadow="error"
        mx={2}
        mt={-7}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          添加学生
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={3}>
            <MDInput
              type="number"
              size="small"
              label="用户ID"
              fullWidth
              onChange={(event) => setUserId(event.target.value)}
            />
          </MDBox>
          <MDBox mb={3}>
            <MDInput
              type="number"
              size="small"
              label="学号"
              fullWidth
              onChange={(event) => setStudentId(event.target.value)}
            />
          </MDBox>
          <MDBox mb={3}>
            <MDInput
              type="text"
              size="small"
              label="姓名"
              fullWidth
              onChange={(event) => setStudentName(event.target.value)}
            />
          </MDBox>
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
            <Autocomplete
              disablePortal
              id="专业"
              size="small"
              options={majors}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="专业" />}
              onInputChange={(event, newInputValue) => {
                // 获取departments中name为newInputValue的id
                const index = majors.findIndex((major) => major.name === newInputValue);
                setSelectedMajor(index + 1);
              }}
            />
          </MDBox>
          <MDBox mt={4}>
            <MDButton
              variant="gradient"
              color="error"
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

export default submitNew;
