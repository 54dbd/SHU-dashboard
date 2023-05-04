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
import DataTable from "examples/Tables/DataTable";

// Data
import selectedCourseTableData from "layouts/tables/data/selectedCourseTableData";
import allCourseTableData from "layouts/tables/data/allCourseTableData";
import { useState } from "react";
import MDAlert from "../../components/MDAlert";

function Tables() {
  const floatStyle = {
    position: "fixed",
    bottom: 0,
    right: 0,
    zIndex: 1000,
  };
  const [successSB, setSuccessSB] = useState("");
  const [errorSB, setErrorSB] = useState("");
  const openSuccessSB = (results) => setSuccessSB(results);
  const openErrorSB = (results) => setErrorSB(results);
  const { columns, rows, results } = selectedCourseTableData();
  const { columns: pColumns, rows: pRows, results: pResults } = allCourseTableData();
  if (pResults === "选课成功!" && !successSB) {
    openSuccessSB(pResults);
  } else if (pResults === "你已经选过这门课啦!" && !errorSB) {
    openErrorSB(pResults);
  } else if (results === "删除课程成功!" && !successSB) {
    openSuccessSB(results);
  } else if (results === "已经有成绩啦！不能退课啦！" && !errorSB) {
    openErrorSB(results);
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <div style={floatStyle}>{errorSB && <MDAlert color="error">{errorSB}</MDAlert>}</div>
            <div style={floatStyle}>
              {successSB && <MDAlert color="success">{successSB}</MDAlert>}
            </div>
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
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
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
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
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
