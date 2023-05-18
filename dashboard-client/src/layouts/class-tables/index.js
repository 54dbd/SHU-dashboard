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
import "react-toastify/dist/ReactToastify.css";
import selectedCourseTableData from "./data/selectedCourseTableData";

// import MDButton from "../../components/MDButton";

// import MDAlert from "../../components/MDAlert";
function ClassTable() {
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
                bgColor="error"
                borderRadius="lg"
                coloredShadow="error"
              >
                <MDTypography variant="h2" color="white">
                  开课管理
                </MDTypography>
              </MDBox>
              {selectedCourseTableData()}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ClassTable;
