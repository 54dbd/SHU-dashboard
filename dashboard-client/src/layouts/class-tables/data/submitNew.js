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
function submitNew(id, handleClose, departments, semesters) {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [ClassId, setClassId] = useState("");
  const [ClassName, setClassName] = useState("");
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
  formData.append("dept_id", selectedDepartment);
  formData.append("Class_id", ClassId);
  formData.append("name", ClassName);
  const submit = () => {
    api
      .post("/class/", formData)
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
          添加教师
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={3}>
            <MDInput
              type="number"
              size="small"
              label="课程名"
              fullWidth
              onChange={(event) => setCourseName(event.target.value)}
            />
          </MDBox>
          <MDBox mb={3}>
            <Autocomplete
              disablePortal
              id="学期"
              size="small"
              options={semesters}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="学期" />}
              onInputChange={(event, newInputValue) => {
                const index = semesters.findIndex((semester) => semester.name === newInputValue);
                selectedSemester(index + 1);
              }}
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
              id="老师"
              size="small"
              options={teachers}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="老师" />}
              onInputChange={(event, newInputValue) => {
                const index = teachers.findIndex((teacher) => teacher.name === newInputValue);
                selectedTeacher(index + 1);
              }}
            />
          </MDBox>
          <MDBox mb={3}>
            <MDInput
              type="number"
              size="small"
              label="课程容量"
              fullWidth
              onChange={(event) => setClassSize(event.target.value)}
            />
          </MDBox>
          <MDBox mb={3}>
            <MDInput
              type="number"
              size="small"
              label="上课时间"
              fullWidth
              onChange={(event) => setClassroom(event.target.value)}
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
