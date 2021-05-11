import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import AccountHeader from "components/account/AccountHeader.jsx";
import AccountTable from 'components/account/AccountTable.js';

class Account extends Component{
  render () {
    return (
      <>
      
        <Switch>
          <Route
            path='create'
            component={AccountTable}
            key='1'
          />
          {/* <Redirect from="*" to="/cms/index" /> */}
        </Switch>
        <AccountHeader />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <AccountTable />
        {/* </Container> */}
      </>
    )
  }
}
export default Account