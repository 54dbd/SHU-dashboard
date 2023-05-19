// Material Dashboard 2 React layouts
import Tables from "layouts/tables";
import ScoreTables from "layouts/score-tables";
import StudentTables from "layouts/student-tables";
import TeacherTables from "layouts/teacher-tables";
import DepartmentTables from "layouts/department-tables";
import MajorTables from "layouts/major-tables";
import CourseTables from "layouts/course-tables";
import ClassTables from "layouts/class-tables";
import StudentProfile from "layouts/profile/studentProfile";
import TeacherProfile from "layouts/profile/teacherProfile";
import AdminProfile from "layouts/profile/adminProfile";
import SignIn from "layouts/authentication/sign-in";
import Hello from "layouts/hello";
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
    name: "专业信息管理",
    key: "major-tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/major-tables",
    component: <MajorTables />,
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
    name: "开课信息管理",
    key: "class-tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/class-tables",
    component: <ClassTables />,
    permission: "admin",
  },
  {
    type: "collapse",
    name: "个人主页",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <StudentProfile />,
    permission: "student",
  },
  {
    type: "collapse",
    name: "个人主页",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/teacher-profile",
    component: <TeacherProfile />,
    permission: "teacher",
  },
  {
    type: "collapse",
    name: "个人主页",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/admin-profile",
    component: <AdminProfile />,
    permission: "admin",
  },
  // every one
  {
    type: "collapse",
    name: "首页",
    key: "Hello",
    icon: <Icon fontSize="small">home</Icon>,
    route: "/Hello",
    component: <Hello />,
    permission: "any",
  },
  {
    type: "collapse",
    name: "登录",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/sign-in",
    component: <SignIn />,
    permission: "any",
  },
];

export default routes;
