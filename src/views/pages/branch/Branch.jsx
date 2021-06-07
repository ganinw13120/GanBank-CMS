import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import BranchHeader from "components/branch/BranchHeader.jsx";
import BranchTable from 'components/branch/BranchTable.jsx';
import axios from 'axios';

class Branch extends Component{
  constructor(props) {
    super(props)
    this.state = {
      branch_list : [],
      all_data : null
    }
  }
  componentDidMount () {
    axios.post('/cms/branch/info').then(res=>{
      console.log(res)
      this.setState({
        branch_list : res.data.branch_list,
        branch_count :  res.data.branch_count[0] ? res.data.branch_count[0].count : 0,
        transfer_branch : res.data.transfer[0]  ? res.data.transfer[0].branch_name : 0,
        transfer_amount : res.data.transfer[0] ? res.data.transfer[0].sum : 0,
        deposit_branch : res.data.deposit[0] ? res.data.deposit[0].branch_name : 0,
        deposit_amount : res.data.deposit[0] ? res.data.deposit[0].sum : 0,
        withdraw_branch : res.data.withdraw[0] ?res.data.withdraw[0].branch_name : 0,
        withdraw_amount : res.data.withdraw[0] ?res.data.withdraw[0].sum : 0,
      })
    })
  }
  render () {
    const {branch_list} = this.state
    return (
      <>
        <BranchHeader all_data={this.state.all_data}
        transfer_branch={this.state.transfer_branch}
        transfer_amount={this.state.transfer_amount}
        deposit_branch ={this.state.deposit_branch}
        deposit_amount ={this.state.deposit_amount}
        withdraw_branch={this.state.withdraw_branch}
        withdraw_amount={this.state.withdraw_amount}
        branch_count={this.state.branch_count}
        />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
        <BranchTable branch_list={branch_list} />
        {/* </Container> */}
      </>
    )
  }
}
export default Branch