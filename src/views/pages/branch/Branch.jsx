import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import BranchHeader from "components/branch/BranchHeader.jsx";
import BranchTable from 'components/branch/BranchTable.jsx';

class Branch extends Component{
  render () {
    return (
      <>
        <BranchHeader />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
        <BranchTable />
        {/* </Container> */}
      </>
    )
  }
}
export default Branch