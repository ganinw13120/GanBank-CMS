import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import TransactionHeader from "components/transaction/TransactionHeader.jsx";
import TransactionTable from 'components/transaction/TransactionTable.jsx';

class Transaction extends Component{
  render () {
    return (
      <>
        <TransactionHeader />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <TransactionTable />
        {/* </Container> */}
      </>
    )
  }
}
export default Transaction