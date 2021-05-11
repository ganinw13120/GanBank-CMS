import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import BranchHeader from "components/branch/BranchHeader.jsx";
import AccountTable from 'components/account/AccountTable.js';

class Branch extends Component{
  render () {
    return (
      <>
        <BranchHeader />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <AccountTable />
        {/* </Container> */}
      </>
    )
  }
}
export default Branch