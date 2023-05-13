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

import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import axios from "axios";
import { Icon } from "@mui/material";

function Header({ children }) {
  const [gpa, setGpa] = useState([]);
  const username = localStorage.getItem("username");
  const id = localStorage.getItem("id");
  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });
  useEffect(() => {
    api.get(`/user/${id}`).then((response) => {
      setGpa(response.data.student.gpa);
    });
  }, [id]);

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <MDAvatar src={burceMars} alt="profile-image" size="xxl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h2" fontWeight="medium">
                {username}
              </MDTypography>
              <MDTypography variant="h4" color="text" fontWeight="regular">
                {id}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item style={{ position: "absolute", right: "5%", top: "4%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <MDBox
                variant="gradient"
                bgColor="success"
                color="white"
                coloredShadow="success"
                borderRadius="xl"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="5rem"
                height="5rem"
                mt={-3}
              >
                <Icon fontSize="large" color="inherit">
                  school
                </Icon>
              </MDBox>
              <MDTypography variant="h4" fontWeight="medium">
                GPA: {gpa}
              </MDTypography>
            </div>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
