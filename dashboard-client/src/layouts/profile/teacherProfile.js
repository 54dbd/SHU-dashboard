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
// Overview page components
import Header from "layouts/profile/components/Header";
// Data
// Images
import DataTable from "../../examples/Tables/DataTable";
import teacherCourseGpaData from "./data/teacherCourseGpaData";
import StudentDistributionChart from "./components/StudentDistributionChart";

function teacherProfile() {
  const { columns, rows } = teacherCourseGpaData();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3} pt={2} px={2}>
          <Grid>
            <MDTypography variant="h4" fontWeight="bold">
              成绩表
            </MDTypography>
            <DataTable
              table={{ columns: columns.valueOf(), rows: rows.valueOf() }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h4" fontWeight="medium">
            课程绩点分布
          </MDTypography>
          <StudentDistributionChart />
        </MDBox>
      </Header>

      <Footer />
    </DashboardLayout>
  );
}

export default teacherProfile;
