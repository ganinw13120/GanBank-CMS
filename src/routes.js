import Index from "views/Index.js";
import Login from "views/examples/Login.js";
import Account from 'views/pages/account';
import Branch from 'views/pages/branch';
import Employee from 'views/pages/employee'
import Transaction from 'views/pages/transaction'
import Loan from 'views/pages/loan'
import Promotion from 'views/pages/promotion'
import Customer from 'views/pages/Customer'
import Logout from 'views/pages/logout'
var routes = [
  {
    path: "/index",
    name: "หน้าแรก",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/cms",
    role : 'all',
  },
  {
    path: "/account",
    name: "บัญชีธนาคาร",
    icon: "ni ni-folder-17 text-blue",
    component: Account,
    layout: "/cms",
    role : 'staff',
  },
  {
    path: "/branch",
    name: "สาขา",
    icon: "ni ni-shop text-info",
    component: Branch,
    layout: "/cms",
    role : 'administrator',
  },
  {
    path: "/employee",
    name: "พนักงาน",
    icon: "ni ni-single-02 text-red",
    component: Employee,
    layout: "/cms",
    role : 'administrator',
  },
  {
    path: "/transaction",
    name: "ธุรกรรม",
    icon: "ni ni-single-copy-04 text-yellow",
    component: Transaction,
    layout: "/cms",
    role : 'staff',
  },
  {
    path: "/loan",
    name: "เงินเชื่อ",
    icon: "ni ni-archive-2 text-warning",
    component: Loan,
    layout: "/cms",
    role : 'staff',
  },
  {
    path: "/promotion",
    name: "โปรโมชั่น",
    icon: "ni ni-mobile-button text-blue",
    component: Promotion,
    layout: "/cms",
    role : 'administrator',
  },
  {
    path: "/customer",
    name: "ลูกค้า",
    icon: "ni ni-circle-08 text-primary",
    component: Customer,
    layout: "/cms",
    role : 'staff',
  },
  {
    path: "/logout",
    name: "ออกจากระบบ",
    icon: "ni ni-button-power text-red",
    component: Logout,
    layout: "/cms",
    role : 'all',
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    hide : true
  },
];

export default routes;
