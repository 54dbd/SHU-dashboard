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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import "animate.css/animate.min.css";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Collapse, ListItemButton } from "@mui/material";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ClassIcon from "@mui/icons-material/Class";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import selectedCourseTableData from "./data/selectedCourseTableData";
// import MDButton from "../../components/MDButton";

// import MDAlert from "../../components/MDAlert";
function ScoreTables() {
  const [openCourseMenu, setOpenCourseMenu] = useState(false);
  const [openSemesterMenu, setOpenSemesterMenu] = useState(false);
  const [courseFilter, setCourseFilter] = useState("");
  const [courseNameFilter, setCourseNameFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [semesterNameFilter, setSemesterNameFilter] = useState("");
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const teacherID = localStorage.getItem("id");
  const handleCourseClick = () => {
    setOpenCourseMenu(!openCourseMenu);
  };
  const handleSemesterClick = () => {
    setOpenSemesterMenu(!openSemesterMenu);
  };

  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });
  useEffect(() => {
    api.get(`/teacher/${teacherID}/courses/`).then((response) => {
      // 往course最前面加一个all
      response.data.unshift({ course_id__name: "", course_id_id: "" });
      setCourses(response.data);
    });
    api.get(`/teacher/${teacherID}/semesters/`).then((response) => {
      response.data.unshift({ course_id__name: "", course_id_id: "" });
      setSemesters(response.data);
    });
  }, [teacherID]);

  const handleChooseSemester = (event) => {
    setSemesterNameFilter(event.currentTarget.getAttribute("name"));
    setSemesterFilter(event.currentTarget.getAttribute("id"));
  };
  const handleChooseCourse = (event) => {
    setCourseNameFilter(event.currentTarget.getAttribute("name"));
    setCourseFilter(event.currentTarget.getAttribute("id"));
  };
  const CourseNotificationList = courses.map((item) => (
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText
          primary={item.course_id__name || "全部"}
          key={item.course_id_id || "0"}
          id={item.course_id_id || ""}
          name={item.course_id__name || "全部"}
          onClick={handleChooseCourse}
          style={{ color: "white" }}
        />
      </ListItemButton>
    </List>
  ));
  const SemesterNotificationList = semesters.map((item) => (
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText
          primary={item.semester_id__name || "全部"}
          key={item.semester_id_id || "0"}
          id={item.semester_id_id || ""}
          name={item.semester_id__name || "全部"}
          onClick={handleChooseSemester}
          style={{ color: "white" }}
        />
      </ListItemButton>
    </List>
  ));
  const renderCourseMenu = () => (
    <div>
      <ListItemButton onClick={handleCourseClick}>
        <ListItemIcon>
          <ClassIcon fontSize="large" style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="课程" style={{ color: "white" }} />
        {openCourseMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCourseMenu} timeout="auto" unmountOnExit>
        {CourseNotificationList}
      </Collapse>
    </div>
  );
  const renderSemesterMenu = () => (
    <div>
      <ListItemButton onClick={handleSemesterClick}>
        <ListItemIcon>
          <AccessTimeFilledIcon fontSize="large" style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="学期" style={{ color: "white" }} />
        {openSemesterMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSemesterMenu} timeout="auto" unmountOnExit>
        {SemesterNotificationList}
      </Collapse>
    </div>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="success"
                borderRadius="lg"
                coloredShadow="success"
              >
                <MDTypography variant="h2" color="white">
                  成绩表
                </MDTypography>
                <MDTypography variant="h6" color="white" opacity={0.8}>
                  {semesterNameFilter ? `学期：${semesterNameFilter}` : "全部学期"}
                </MDTypography>
                <MDTypography variant="h6" color="white" opacity={0.8}>
                  {semesterNameFilter ? `课程：${courseNameFilter}` : "全部课程 "}
                </MDTypography>
                {renderCourseMenu()}
                {renderSemesterMenu()}
              </MDBox>
              {selectedCourseTableData(
                courseFilter,
                semesterFilter,
                courseNameFilter,
                semesterNameFilter
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ScoreTables;
