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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState } from "react";
import MDBadge from "components/MDBadge";
// Overview page components
import Header from "layouts/profile/components/Header_noGpa";
// Data
// Images
import adminCourseGpaData from "./data/adminCourseGpaData";
import semesterData from "./data/semesterData";
import StudentDistributionChart from "./components/StudentDistributionChart";
import StudentDistributionChartBySemester from "./components/StudentDistributionChartBySemester";

function adminProfile() {
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedSemester, setSelectedSemester] = useState({});
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xl={6} xs={12}>
              <MDTypography variant="h4" fontWeight="bold">
                成绩表
              </MDTypography>
              {adminCourseGpaData(setSelectedCourse)}
            </Grid>
            <Grid item xs={12} xl={6}>
              <MDBadge badgeContent={selectedCourse.id} container color="error" />
              <MDTypography variant="h4" fontWeight="medium">
                课程绩点分布
              </MDTypography>
              <MDTypography variant="h6" fontWeight="regular">
                {selectedCourse.name}
              </MDTypography>
              {StudentDistributionChart(selectedCourse.id)}
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <Grid container spacing={1}>
            <Grid item xs={12} xl={8}>
              <MDTypography variant="h4" fontWeight="medium">
                全校成绩分布
              </MDTypography>
              {StudentDistributionChartBySemester(selectedSemester.id)}
            </Grid>
            <Grid item xs={12} xl={4}>
              <MDTypography variant="h4" fontWeight="medium">
                学期
              </MDTypography>
              {semesterData(setSelectedSemester)}
            </Grid>
          </Grid>
        </MDBox>
      </Header>

      <Footer />
    </DashboardLayout>
  );
}

export default adminProfile;
