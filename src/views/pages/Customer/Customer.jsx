import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import CustomerHeader from "components/Customer/CustomerHeader.jsx";
import CustomerTable from 'components/Customer/CustomerTable.jsx';

class Customer extends Component{
  render () {
    return (
      <>
        <CustomerHeader />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <CustomerTable />
        {/* </Container> */}
      </>
    )
  }
}
export default Customer