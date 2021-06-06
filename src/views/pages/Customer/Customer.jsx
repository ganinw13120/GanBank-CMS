import React, { Component } from "react";
import CustomerHeader from "components/Customer/CustomerHeader.jsx";
import CustomerTable from 'components/Customer/CustomerTable.jsx';

import axios from 'axios';
class Customer extends Component{
  constructor(props) {
    super(props)
    this.state = {
      customer_list : []
    }
  }
  componentDidMount () {
    axios.post('/cms/customer/info').then(res=>{
      console.log(res)
      this.setState({
        customer_list : res.data
      })
    })
  }
  render () {
    return (
      <>
        <CustomerHeader />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <CustomerTable customer_list={this.state.customer_list} />
        {/* </Container> */}
      </>
    )
  }
}
export default Customer