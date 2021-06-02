import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import EmployeeHeader from "components/employee/EmployeeHeader.jsx";
import EmployeeTable from 'components/employee/EmployeeTable.jsx';
import axios from 'axios';

class Employee extends Component{
  constructor (props) {
    super(props)
    this.state = {
      staff_list : []
    }
  }
  componentDidMount () {
    axios.post('/cms/staff/info').then(res=>{
      console.log(res)
      this.setState({
        staff_list : res.data
      })
    })
  }
  render () {
    const {staff_list} = this.state
    return (
      <>
        <EmployeeHeader />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <EmployeeTable staff_list={staff_list}/>
        {/* </Container> */}
      </>
    )
  }
}
export default Employee