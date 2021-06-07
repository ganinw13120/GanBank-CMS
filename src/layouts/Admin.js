import React from "react";
import { useLocation, Route, Switch, Redirect , useHistory} from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import CreateAccount from 'views/pages/account/create'
import EditAccount from 'views/pages/account/edit'
import CreateBranch from 'views/pages/branch/create'
import EditBranch from 'views/pages/branch/edit'
import CreateEmployee from 'views/pages/employee/create'
import EditEmployee from 'views/pages/employee/edit'

import Transfer from 'views/pages/transaction/transfer'
import Deposit from 'views/pages/transaction/deposit'
import CreateLoan from 'views/pages/loan/create'

import LoanInfo from 'views/pages/loan/info'

import routes from "routes.js";
import CreatePromotion from "views/pages/promotion/create/CreatePromotion";
import EditPromotion from "views/pages/promotion/edit/EditPromotion";
import axios from 'axios';

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-white");
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/cms" && (prop.role==='all'||prop.role===localStorage.getItem("level")||localStorage.getItem("level")==='manager')) {
        return (
          <Route exact 
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  // console.log()
  const history = useHistory();
  if(!localStorage.getItem('token')) {
    history.push('/auth/login')
  }
  else {
    axios.post('/cms/auth/check', {token:localStorage.getItem('token')}).then(res=>{
      console.log(res)
    })
    .catch(function (error) {
      console.log(error)
      localStorage.removeItem('token')
      localStorage.removeItem('level')
      document.body.classList.add("bg-info");
      history.push('/auth/login')
    })
  }

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/cms/index",
          imgSrc: require("../assets/img/brand/fullicon.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes)}
          <Route path='/cms/account/create' component={CreateAccount}></Route>
          <Route path='/cms/account/edit/:id' component={EditAccount}></Route>
          <Route path='/cms/branch/create' component={CreateBranch}></Route>
          <Route path='/cms/branch/edit/:id' component={EditBranch}></Route>
          <Route path='/cms/employee/create' component={CreateEmployee}></Route>
          <Route path='/cms/employee/edit/:id' component={EditEmployee}></Route>
          <Route path='/cms/transaction/transfer' component={Transfer}></Route>
          <Route path='/cms/transaction/deposit-withdraw' component={Deposit}></Route>
          <Route path='/cms/loan/create' component={CreateLoan}></Route>
          <Route path='/cms/loan/info/:id' component={LoanInfo}></Route>
          <Route path='/cms/promotion/create' component={CreatePromotion}></Route>
          <Route path='/cms/promotion/edit/:id' component={EditPromotion}></Route>
          <Redirect from="*" to="/cms/index" />
          
        </Switch>
        <Container fluid>
          {/* <AdminFooter /> */}
        </Container>
      </div>
    </>
  );
};

export default Admin;
