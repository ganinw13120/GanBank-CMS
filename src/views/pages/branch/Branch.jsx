import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import BranchHeader from "components/branch/BranchHeader.jsx";
import BranchTable from 'components/branch/BranchTable.jsx';
import axios from 'axios';

class Branch extends Component{
  constructor(props) {
    super(props)
    this.state = {
      branch_list : []
    }
  }
  componentDidMount () {
    axios.post('/cms/branch/info').then(res=>{
      this.setState({
        branch_list : res.data
      })
    })
  }
  render () {
    const {branch_list} = this.state
    return (
      <>
        <BranchHeader totalnum={branch_list.length}/>
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
        <BranchTable branch_list={branch_list} />
        {/* </Container> */}
      </>
    )
  }
}
export default Branch