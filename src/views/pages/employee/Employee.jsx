import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import EmployeeHeader from "components/employee/EmployeeHeader.jsx";
import EmployeeTable from 'components/employee/EmployeeTable.jsx';
import axios from 'axios';

class Employee extends Component{
  constructor (props) {
    super(props)
    this.state = {
      staff_list : [],
      month_staff : null,
      oldest_age : null,
      youngest_age : null,
      most_branch_name : '',
      most_branch_num : 0,
      most_position_name : '',
      most_position_num : 0,
    }
  }
  componentDidMount () {
    axios.post('/cms/staff/info').then(res=>{
      // console.log(res)
      let most_branch = {
        num : 0,
        name : '',
      }
      let most_position = {
        num : 0,
        name : '',
      }
      res.data.staff_list.forEach(e=>{
        if(e.staff_at_branch>most_branch.num) most_branch = {
          num : e.staff_at_branch,
          name : e.branch_name
        }
        if(e.staff_at_position>most_position.num) most_position = {
          num : e.staff_at_position,
          name : e.position_name
        }
      })
      this.setState({
        staff_list : res.data.staff_list,
        month_staff : res.data.month_detail[0].count,
        youngest_age : Math.round(res.data.staff_youngest[0].age/365),
        oldest_age : Math.round(res.data.staff_oldest[0].age/365),
        most_branch_name : most_branch.name,
        most_branch_num : most_branch.num,
        most_position_name : most_position.name,
        most_position_num : most_position.num
      })
    })
  }
  render () {
    const {most_position_name,most_position_num,staff_list,month_staff, youngest_age, oldest_age, most_branch_name, most_branch_num} = this.state
    return (
      <>
        <EmployeeHeader
          totalnum={staff_list.length} 
          monthcount={month_staff}
          youngest_age={youngest_age}  
          oldest_age={oldest_age}
          most_branch_name={most_branch_name}
          most_branch_num={most_branch_num}
          most_position_name={most_position_name}
          most_position_num={most_position_num}
        />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <EmployeeTable staff_list={staff_list}/>
        {/* </Container> */}
      </>
    )
  }
}
export default Employee