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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// Authentication layout components
import BasicLayout from "../components/BasicLayout";
// import { useNavigate } from "react-router-dom";

// Images

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // const navigate = useNavigate();
  const login = () => {
    // 获取用户名和密码输入框的值

    // 发送登录请求
    fetch("http://localhost:8000/v1/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        // 处理登录响应
        if (response.ok) {
          // 登录成功，保存 token 到本地存储
          response.json().then((data) => {
            localStorage.setItem("token", data.access);
            localStorage.setItem("id", username);
          });
          // 跳转到首页
          window.location.href = "/";
        } else {
          // 登录失败，提示错误信息
          response.json().then(() => {
            alert("用户名或者密码错误！");
          });
        }
      })
      .catch((error) => {
        // 处理异常
        console.log(error);
        alert("登录失败，请稍后再试！");
      });
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            登录
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="用户名"
                fullWidth
                onChange={(event) => setUsername(event.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="密码"
                fullWidth
                onChange={(event) => setPassword(event.target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={() => login()}>
                登录
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
