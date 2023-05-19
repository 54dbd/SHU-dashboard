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
function submitNew(handleClose, departments, semesters, teachers, courses, handleError) {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");
  const [classSize, setClassSize] = useState("");
  const [classroom, setClassroom] = useState("");
  const starts = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const ends = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const times = ["一", "二", "三", "四", "五", "六", "日"];
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
  console.log(selectedCourses);
  const formData = new FormData();
  formData.append("dept_id", selectedDepartment);
  formData.append("course_id", selectedCourses);
  formData.append("teacher_id", selectedTeacher);
  formData.append("classroom", classroom);
  formData.append("max_selection", classSize);
  formData.append("time", selectedTime);
  formData.append("start", selectedStart);
  formData.append("end", selectedEnd);
  formData.append("semester_id", selectedSemester);
  const submit = () => {
    api
      .post("/class/", formData)
      .then(() => {
        console.log("Success");
        handleClose();
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
          添加开课
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={3}>
            <Autocomplete
              disablePortal
              id="课程"
              size="small"
              options={courses}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="课程" />}
              onInputChange={(event, newInputValue) => {
                const index = courses.findIndex((course) => course.name === newInputValue);
                setSelectedCourses(courses[index].course_id);
              }}
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
                setSelectedSemester(semesters[index].semester_id);
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
                setSelectedDepartment(departments[index].dept_id);
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
                setSelectedTeacher(teachers[index].teacher_id);
              }}
            />
          </MDBox>
          <MDBox mb={3}>
            <Autocomplete
              disablePortal
              id="上课日"
              size="small"
              options={times}
              renderInput={(params) => <TextField {...params} label="上课日" />}
              onInputChange={(event, newInputValue) => {
                setSelectedTime(newInputValue);
              }}
            />
          </MDBox>
          <MDBox mb={3}>
            <Autocomplete
              disablePortal
              id="课程开始节数"
              size="small"
              options={starts}
              renderInput={(params) => <TextField {...params} label="课程开始时间" />}
              onInputChange={(event, newInputValue) => {
                setSelectedStart(newInputValue);
              }}
            />
          </MDBox>
          <MDBox mb={3}>
            <Autocomplete
              disablePortal
              id="课程结束节数"
              size="small"
              options={ends}
              renderInput={(params) => <TextField {...params} label="课程结束时间" />}
              onInputChange={(event, newInputValue) => {
                setSelectedEnd(newInputValue);
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
              type="text"
              size="small"
              label="上课教室"
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
