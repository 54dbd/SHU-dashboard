import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

function submitForm() {
  const [exam, setExam] = useState("");
  const [gp, setGp] = useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    boxShadow: 24,
    p: 4,
  };
  // const navigate = useNavigate();
  const submit = () => {
    // 获取用户名和密码输入框的值

    // 发送登录请求
    fetch("http://localhost:8000/v1/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exam,
        gp,
      }),
    }).then((response) => {
      // 处理登录响应
      if (response.ok) {
        // 登录成功，保存 token 到本地存储
        console.log("Success");
      }
    });
  };
  return (
    <Card sx={style}>
      <MDBox
        variant="gradient"
        bgColor="success"
        borderRadius="lg"
        coloredShadow="success"
        mx={2}
        mt={-7}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          成绩提交
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={3}>
            <MDInput
              type="number"
              size="small"
              label="平时分"
              fullWidth
              helperText="平时分区间为(0~100)"
              onChange={(event) => setGp(event.target.value)}
            />
          </MDBox>
          <MDBox mb={3}>
            <MDInput
              type="number"
              label="考试成绩"
              size="small"
              fullWidth
              helperText="考试成绩区间为(0~100)"
              style={{ lineHeight: "100px" }}
              onChange={(event) => setExam(event.target.value)}
            />
          </MDBox>
          <MDBox mt={4}>
            <MDButton variant="gradient" color="success" fullWidth onClick={() => submit()}>
              提交
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default submitForm;
