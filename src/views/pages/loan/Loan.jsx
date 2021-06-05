import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import LoanHeader from "components/loan/LoanHeader.jsx";
import LoanTable from 'components/loan/LoanTable.jsx';
import axios from 'axios';

class Loan extends Component{
  constructor (props) {
    super(props)
    this.state = {
      loan_list : [],
      loan_count_this_month : 0,
      loan_count : 0,
      total_amount : 0,
      total_amount_this_month : 0,
      approved_total_amount : 0,
      unapproved_total_amount : 0,
    }
  }
  changeStatus = (id, val) => {
    let cached = [...this.state.loan_list]
    cached.forEach(e=>{
      if(e.loan_id===id) {
        e.loan_status = val
      }
    })
    this.setState({
      loan_list : cached
    })
  }
  componentDidMount () {
    axios.post('/cms/loan/info').then(res=>{
      console.log(res)
      this.setState({
        loan_list : res.data.loan_list,
        loan_count_this_month : res.data.loan_count_this_month[0].count ? res.data.loan_count_this_month[0].count : 0,
        loan_count : res.data.loan_count[0].count ? res.data.loan_count[0].count : 0,
        total_amount : res.data.total_amount[0].sum ? res.data.total_amount[0].sum : 0,
        total_amount_this_month : res.data.total_amount_this_month[0].sum ? res.data.total_amount_this_month[0].sum : 0,
        approved_total_amount : res.data.approved_total_amount[0].sum ? res.data.approved_total_amount[0].sum : 0,
        unapproved_total_amount : res.data.unapproved_total_amount[0].sum ? res.data.unapproved_total_amount[0].sum : 0
      })
    })
  }
  render () {
    const {loan_list,loan_count_this_month,loan_count, total_amount ,total_amount_this_month, approved_total_amount, unapproved_total_amount} = this.state
    return (
      <>
        <LoanHeader loan_count_this_month={loan_count_this_month} 
          loan_count={loan_count} 
          total_amount={total_amount} 
          total_amount_this_month={total_amount_this_month} 
          unapproved_total_amount={unapproved_total_amount} 
          approved_total_amount={approved_total_amount}
        />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <LoanTable loan_list={loan_list} changeStatus={this.changeStatus}/>
        {/* </Container> */}
      </>
    )
  }
}
export default Loan