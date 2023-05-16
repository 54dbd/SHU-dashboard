import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function submitForm(id, handleClose) {
  const [departments, setDepartments] = useState([]);
  const [majors, setMajors] = useState([]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    boxShadow: 24,
    p: 4,
  };
  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });
  useEffect(() => {
    api.get("/department/").then((response) => {
      setDepartments(response.data);
    });
    api.get(`/major/`).then((response) => {
      setMajors(response.data);
    });
  }, []);
  const formData = new FormData();
  formData.append("major", majors);
  // const navigate = useNavigate();
  const submit = () => {
    // 获取用户名和密码输入框的值

    // 发送登录请求
    api
      .put(`/student/${id}/`, formData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Success");
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
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
          信息修改
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={3}>
            <Autocomplete
              disablePortal
              id="学院"
              label="学院"
              options={departments}
              renderInput={(params) => <TextField {...params} label="name" />}
            />
          </MDBox>
          <MDBox mb={3}>
            <Autocomplete
              disablePortal
              id="专业"
              label="专业"
              options={majors}
              renderInput={(params) => <TextField {...params} label="name" />}
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
