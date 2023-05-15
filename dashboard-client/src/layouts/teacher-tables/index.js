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
import "animate.css/animate.min.css";
import selectedCourseTableData from "layouts/tables/data/selectedCourseTableData";
import { useEffect } from "react";
import { cssTransition, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import MDButton from "../../components/MDButton";
// import MDAlert from "../../components/MDAlert";
function TeacherTables() {
  // eslint-disable-next-line prefer-const
  const { columns: sColumns, rows: sRows, results: sResults } = selectedCourseTableData();
  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
  });
  function handleSuccess(content) {
    toast.success(content, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: bounce,
      // onClose: () => setShowToast(false),
    });
  }
  function handleError(content) {
    toast.error(content, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: bounce,
      // onClose: () => setShowToast(false),
    });
  }

  useEffect(() => {
    if (sResults.code === 200) {
      handleSuccess(sResults.content);
    } else if (sResults.code === 404) {
      handleError(sResults.content);
    }
  }, [sResults]);

  // sRows或者sColumns改变时，会触发useEffect，刷新页面内容
  // useEffect(() => {
  //   const { columns: tempColumns, rows: tempRows } = selectedCourseTableData();
  //   setSColumns(tempColumns);
  //   setSRows(tempRows);
  // }, [sResults]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
        theme="colored"
      />
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
                bgColor="error"
                borderRadius="lg"
                coloredShadow="error"
              >
                <MDTypography variant="h4" color="white">
                  成绩修改
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: sColumns.valueOf(), rows: sRows.valueOf() }}
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

export default TeacherTables;
