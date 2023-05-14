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
import { useEffect, useState } from "react";
import { cssTransition, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Collapse, ListItemButton } from "@mui/material";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
// import MDButton from "../../components/MDButton";

// import MDAlert from "../../components/MDAlert";
function ScoreTables() {
  const [openCourseMenu, setOpenCourseMenu] = useState(false);
  const [openSemesterMenu, setOpenSemesterMenu] = useState(false);

  const { columns: sColumns, rows: sRows, results: sResults } = selectedCourseTableData();
  const handleCourseClick = () => {
    setOpenCourseMenu(!openCourseMenu);
  };
  const handleSemesterClick = () => {
    setOpenSemesterMenu(!openSemesterMenu);
  };

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
  const classList = [
    { id: 1, title: "Class 1" },
    { id: 2, title: "Class 2" },
    { id: 3, title: "Class 3" },
  ];
  const handleChoose = (event) => {
    console.log(event.currentTarget);
  };
  const NotificationList = classList.map((item) => (
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          key={item.id}
          onClick={handleChoose}
          style={{ color: "white" }}
        />
      </ListItemButton>
    </List>
  ));
  const renderCourseMenu = () => (
    <div>
      <ListItemButton onClick={handleCourseClick}>
        <ListItemIcon>
          <InboxIcon fontSize="large" style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="课程" style={{ color: "white" }} />
        {openCourseMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCourseMenu} timeout="auto" unmountOnExit>
        {NotificationList}
      </Collapse>
    </div>
  );
  const renderSemesterMenu = () => (
    <div>
      <ListItemButton onClick={handleSemesterClick}>
        <ListItemIcon>
          <InboxIcon fontSize="large" style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="学期" style={{ color: "white" }} />
        {openSemesterMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSemesterMenu} timeout="auto" unmountOnExit>
        {NotificationList}
      </Collapse>
    </div>
  );

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
                bgColor="success"
                borderRadius="lg"
                coloredShadow="success"
              >
                <MDTypography variant="h4" color="white">
                  已选课程
                </MDTypography>
                {renderCourseMenu()}
                {renderSemesterMenu()}
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

export default ScoreTables;
