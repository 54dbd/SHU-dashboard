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
import selectedCourseTableData from "layouts/tables/data/selectedCourseTableData";
import allCourseTableData from "layouts/tables/data/allCourseTableData";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import ClassIcon from "@mui/icons-material/Class";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { Collapse, List, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";

function Tables() {
  const [openCourseMenu, setOpenCourseMenu] = useState(false);
  const [openSemesterMenu, setOpenSemesterMenu] = useState(false);
  const [courseFilter, setCourseFilter] = useState("");
  const [courseNameFilter, setCourseNameFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [semesterNameFilter, setSemesterNameFilter] = useState("");

  const [openCourseMenu2, setOpenCourseMenu2] = useState(false);
  const [openSemesterMenu2, setOpenSemesterMenu2] = useState(false);
  const [courseFilter2, setCourseFilter2] = useState("");
  const [courseNameFilter2, setCourseNameFilter2] = useState("");
  const [semesterFilter2, setSemesterFilter2] = useState("");
  const [semesterNameFilter2, setSemesterNameFilter2] = useState("");
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [allSemesters, setAllSemesters] = useState([]);
  const studentId = localStorage.getItem("id");
  const handleCourseClick = () => {
    setOpenCourseMenu(!openCourseMenu);
  };
  const handleSemesterClick = () => {
    setOpenSemesterMenu(!openSemesterMenu);
  };
  const handleCourseClick2 = () => {
    setOpenCourseMenu2(!openCourseMenu2);
  };
  const handleSemesterClick2 = () => {
    setOpenSemesterMenu2(!openSemesterMenu2);
  };

  const handleChooseSemester = (event) => {
    setSemesterNameFilter(event.currentTarget.getAttribute("name"));
    setSemesterFilter(event.currentTarget.getAttribute("id"));
  };
  const handleChooseCourse = (event) => {
    setCourseNameFilter(event.currentTarget.getAttribute("name"));
    setCourseFilter(event.currentTarget.getAttribute("id"));
  };
  const handleChooseSemester2 = (event) => {
    setSemesterNameFilter2(event.currentTarget.getAttribute("name"));
    setSemesterFilter2(event.currentTarget.getAttribute("id"));
  };
  const handleChooseCourse2 = (event) => {
    setCourseNameFilter2(event.currentTarget.getAttribute("name"));
    setCourseFilter2(event.currentTarget.getAttribute("id"));
  };

  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });
  useEffect(() => {
    api.get(`/student/${studentId}/courses/`).then((response) => {
      // 往course最前面加一个all
      response.data.unshift({ class_id__course_id__name: "", class_id__course_id: "" });
      console.log(response.data);
      setCourses(response.data);
    });
    api.get(`/student/${studentId}/semesters/`).then((response) => {
      // semesters中会有重复的，需要去重
      const tempSemesters = response.data.filter(
        (item, index, self) =>
          self.findIndex((t) => t.class_id__semester_id === item.class_id__semester_id) === index
      );
      // 往semesters最前面加一个all
      tempSemesters.unshift({ class_id__semester_id__name: "", class_id__semester_id: "" });
      setSemesters(tempSemesters);
    });
    api.get(`/course/`).then((response) => {
      response.data.unshift({ course_id: "", name: "" });
      console.log(response.data);
      setAllCourses(response.data);
    });
    api.get(`/semester/`).then((response) => {
      // 往semesters最前面加一个all
      response.data.unshift({ semester_id: "", name: "" });
      setAllSemesters(response.data);
    });
  }, [studentId]);
  const CourseNotificationList = courses.map((item) => (
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText
          primary={item.class_id__course_id__name || "全部"}
          key={item.class_id__course_id || "0"}
          id={item.class_id__course_id || ""}
          name={item.class_id__course_id__name || "全部"}
          onClick={handleChooseCourse}
          style={{ color: "white" }}
        />
      </ListItemButton>
    </List>
  ));
  const CourseNotificationList2 = allCourses.map((item) => (
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText
          primary={item.name || "全部"}
          key={item.course_id || "0"}
          id={item.course_id || ""}
          name={item.name || "全部"}
          onClick={handleChooseCourse2}
          style={{ color: "white" }}
        />
      </ListItemButton>
    </List>
  ));
  const SemesterNotificationList = semesters.map((item) => (
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText
          primary={item.class_id__semester_id__name || "全部"}
          key={item.class_id__semester_id__semester_id || "0"}
          id={item.class_id__semester_id__semester_id || ""}
          name={item.class_id__semester_id__name || "全部"}
          onClick={handleChooseSemester}
          style={{ color: "white" }}
        />
      </ListItemButton>
    </List>
  ));
  const SemesterNotificationList2 = allSemesters.map((item) => (
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText
          primary={item.name || "全部"}
          key={item.semester_id || "0"}
          id={item.semester_id || ""}
          name={item.name || "全部"}
          onClick={handleChooseSemester2}
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
  const renderCourseMenu2 = () => (
    <div>
      <ListItemButton onClick={handleCourseClick2}>
        <ListItemIcon>
          <ClassIcon fontSize="large" style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="课程" style={{ color: "white" }} />
        {openCourseMenu2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCourseMenu2} timeout="auto" unmountOnExit>
        {CourseNotificationList2}
      </Collapse>
    </div>
  );
  const renderSemesterMenu2 = () => (
    <div>
      <ListItemButton onClick={handleSemesterClick2}>
        <ListItemIcon>
          <AccessTimeFilledIcon fontSize="large" style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="学期" style={{ color: "white" }} />
        {openSemesterMenu2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSemesterMenu2} timeout="auto" unmountOnExit>
        {SemesterNotificationList2}
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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h4" color="white">
                  已选课程
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
              <MDBox pt={3}>
                {selectedCourseTableData(
                  courseFilter,
                  semesterFilter,
                  courseNameFilter,
                  semesterNameFilter
                )}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h4" color="white">
                  可选课程
                </MDTypography>
                <MDTypography variant="h6" color="white" opacity={0.8}>
                  {semesterNameFilter2 ? `学期：${semesterNameFilter2}` : "全部学期"}
                </MDTypography>
                <MDTypography variant="h6" color="white" opacity={0.8}>
                  {semesterNameFilter2 ? `课程：${courseNameFilter2}` : "全部课程 "}
                </MDTypography>
                {renderCourseMenu2()}
                {renderSemesterMenu2()}
              </MDBox>
              <MDBox pt={3}>
                {allCourseTableData(
                  courseFilter2,
                  semesterFilter2,
                  courseNameFilter2,
                  semesterNameFilter2
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
