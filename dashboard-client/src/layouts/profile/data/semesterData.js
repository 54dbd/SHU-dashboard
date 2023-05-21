/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDBadge from "components/MDBadge";
import axios from "axios";
// Images
import { useEffect, useState } from "react";
import MDButton from "components/MDButton";
import DataTable from "../../../examples/Tables/DataTable";

export default function data(setSelectedSemester) {
  const [semesters, setSemesters] = useState([]);

  const api = axios.create({
    baseURL: `http://localhost:8000/v1/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${localStorage.getItem("token")}`,
    },
  });
  const condition = true;
  useEffect(() => {
    if (condition) {
      api
        .get(`/semester/`)
        .then((response) => {
          // 添加一个 全部学期 的选项
          response.data.unshift({ semester_id: "0", name: "全部学期" });
          setSelectedSemester({ id: response.data[0].semester_id, name: response.data[0].name });
          setSemesters(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [condition]);

  const columns = [
    { Header: "学期ID", accessor: "semester_id", align: "center" },
    { Header: "学期名", accessor: "name", align: "center" },
    { Header: "操作", accessor: "actions", align: "center" },
  ];

  const rows = semesters.map((semester) => ({
    semester_id: (
      <MDTypography variant="caption" fontWeight="medium">
        {semester.semester_id}
      </MDTypography>
    ),
    name: (
      <MDTypography variant="caption" fontWeight="medium">
        {semester.name}
      </MDTypography>
    ),
    actions: (
      <MDButton
        variant="outlined"
        color="error"
        onClick={() => {
          setSelectedSemester({ id: semester.semester_id, name: semester.name });
        }}
      >
        查看学期成绩分布
      </MDButton>
    ),
  }));
  return (
    <DataTable
      table={{ columns: columns.valueOf(), rows: rows.valueOf() }}
      isSorted={false}
      entriesPerPage={false}
      showTotalEntries={false}
      noEndBorder
    />
  );
}
