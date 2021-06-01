import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import LoanHeader from "components/loan/LoanHeader.jsx";
import LoanTable from 'components/loan/LoanTable.jsx';

class Loan extends Component{
  render () {
    return (
      <>
        <LoanHeader />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <LoanTable />
        {/* </Container> */}
      </>
    )
  }
}
export default Loan