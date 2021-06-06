import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import TransactionHeader from "components/transaction/TransactionHeader.jsx";
import TransactionTable from 'components/transaction/TransactionTable.jsx';
import axios from 'axios';

class Transaction extends Component{
  constructor (props) {
    super(props)
    this.state = {
      transaction_list : [],
      deposit : 0,
      deposit_this_month : 0,
      transaction : 0,
      transaction_this_month : 0,
      withdraw : 0,
      withdraw_this_month : 0,
      transfer : 0,
      transfer_this_month : 0,
    }
  }
  componentDidMount () {
    axios.post('/cms/transaction/info').then(res=>{
      console.log(res)
      this.setState({
        transaction_list : res.data.transaction_list,
        deposit : res.data.deposit[0].count,
        deposit_this_month : res.data.deposit_this_month[0].count,
        transaction : res.data.transaction_count[0].count,
        transaction_this_month : res.data.transaction_count_this_month[0].count,
        withdraw : res.data.withdraw[0].count,
        withdraw_this_month : res.data.withdraw_this_month[0].count,
        transfer : res.data.transfer[0].count,
        transfer_this_month : res.data.transfer_this_month[0].count,
      })
    })
  }
  render () {
    const {transaction_list} = this.state
    return (
      <>
        <TransactionHeader
        deposit={this.state.deposit}
        deposit_this_month={this.state.deposit_this_month}
        transaction={this.state.transaction}
        transaction_this_month={this.state.transaction_this_month}
        withdraw={this.state.withdraw}
        withdraw_this_month={this.state.withdraw_this_month}
        transfer={this.state.transfer}
        transfer_this_month={this.state.transfer_this_month}
        />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <TransactionTable transaction_list={transaction_list} />
        {/* </Container> */}
      </>
    )
  }
}
export default Transaction