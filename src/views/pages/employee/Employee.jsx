import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import EmployeeHeader from "components/employee/EmployeeHeader.jsx";
import EmployeeTable from 'components/employee/EmployeeTable.jsx';

class Employee extends Component{
  render () {
    return (
      <>
        <EmployeeHeader />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <EmployeeTable />
        {/* </Container> */}
      </>
    )
  }
}
export default Employee