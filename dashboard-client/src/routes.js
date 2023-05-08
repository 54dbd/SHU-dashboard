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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Tables from "layouts/tables";
import ScoreTables from "layouts/score-tables";
import StudentTables from "layouts/student-tables";
import TeacherTables from "layouts/teacher-tables";
import DepartmentTables from "layouts/department-tables";
import CourseTables from "layouts/course-tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  // student only
  {
    type: "collapse",
    name: "课程管理",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
    permission: "student",
  },
  // teacher only
  {
    type: "collapse",
    name: "成绩管理",
    key: "score-tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/score-tables",
    component: <ScoreTables />,
    permission: "teacher",
  },
  // admin only
  {
    type: "collapse",
    name: "学生信息管理",
    key: "student-tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/student-tables",
    component: <StudentTables />,
    permission: "admin",
  },
  {
    type: "collapse",
    name: "教师信息管理",
    key: "teacher-tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/teacher-tables",
    component: <TeacherTables />,
    permission: "admin",
  },
  {
    type: "collapse",
    name: "学院信息管理",
    key: "department-tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/department-tables",
    component: <DepartmentTables />,
    permission: "admin",
  },
  {
    type: "collapse",
    name: "课程信息管理",
    key: "course-tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/course-tables",
    component: <CourseTables />,
    permission: "admin",
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
    permission: "admin",
  },
  {
    type: "collapse",
    name: "个人主页",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
    permission: "login",
  },
  // every one
  {
    type: "collapse",
    name: "登录",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    permission: "any",
  },
];

export default routes;
