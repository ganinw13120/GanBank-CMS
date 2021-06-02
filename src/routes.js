import Index from "views/Index.js";
// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
// import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";
import Account from 'views/pages/account';
import Branch from 'views/pages/branch';
import Employee from 'views/pages/employee'
import Transaction from 'views/pages/transaction'
import Loan from 'views/pages/loan'
import Promotion from 'views/pages/promotion'
import Customer from 'views/pages/Customer'
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/cms",
  },
  {
    path: "/account",
    name: "บัญชีธนาคาร",
    icon: "ni ni-folder-17 text-blue",
    component: Account,
    layout: "/cms",
  },
  {
    path: "/branch",
    name: "สาขา",
    icon: "ni ni-shop text-info",
    component: Branch,
    layout: "/cms",
  },
  {
    path: "/employee",
    name: "พนักงาน",
    icon: "ni ni-single-02 text-red",
    component: Employee,
    layout: "/cms",
  },
  {
    path: "/transaction",
    name: "ธุรกรรม",
    icon: "ni ni-single-02 text-yellow",
    component: Transaction,
    layout: "/cms",
  },
  {
    path: "/loan",
    name: "เงินเชื่อ",
    icon: "ni ni-archive-2 text-warning",
    component: Loan,
    layout: "/cms",
  },
  {
    path: "/promotion",
    name: "โปรโมชั่น",
    icon: "ni ni-archive-2 text-warning",
    component: Promotion,
    layout: "/cms",
  },
  {
    path: "/Customer",
    name: "Customer",
    icon: "ni ni-shop text-red",
    component: Customer,
    layout: "/cms",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/cms",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/cms",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/cms",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/cms",
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  // },
];

export default routes;
