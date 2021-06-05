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
    }
  }
  componentDidMount () {
    axios.post('/cms/transaction/info').then(res=>{
      this.setState({
        transaction_list : res.data,
      })
    })
  }
  render () {
    const {transaction_list} = this.state
    return (
      <>
        <TransactionHeader />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <TransactionTable transaction_list={transaction_list} />
        {/* </Container> */}
      </>
    )
  }
}
export default Transaction