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
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// import MDButton from "../../components/MDButton";
// import MDAlert from "../../components/MDAlert";
function Tables() {
  const { columns, rows, results } = selectedCourseTableData();
  const { columns: pColumns, rows: pRows, results: pResults } = allCourseTableData();
  // eslint-disable-next-line no-unused-vars
  const [showToast, setShowToast] = useState(false);
  function handleSuccess(content) {
    toast.success(content, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // onClose: () => setShowToast(false),
    });
  }
  function handleError(content) {
    toast.error(content, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // onClose: () => setShowToast(false),
    });
  }

  useEffect(() => {
    if (pResults === "选课成功!") {
      setShowToast(true);
      handleSuccess("选课成功!");
    } else if (pResults === "你已经选过这门课啦!") {
      setShowToast(true);
      handleError("你已经选过这门课啦!");
    } else if (results === "删除课程成功!") {
      setShowToast(true);
      handleSuccess("删除课程成功!");
    } else if (results === "已经有成绩啦！不能退课啦！") {
      setShowToast(true);
      handleError("已经有成绩啦！不能退课啦！");
    }
  }, [pResults, results]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
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
