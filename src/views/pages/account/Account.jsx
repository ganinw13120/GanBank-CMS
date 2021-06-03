import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AccountHeader from "components/account/AccountHeader.jsx";
import AccountTable from 'components/account/AccountTable.jsx';
import axios from 'axios';

class Account extends Component{

  constructor (props) {
    super(props)
    this.state = {
      account_list : [],
    }
  }
  componentDidMount () {
    axios.post('/cms/account/info').then(res=>{
      this.setState({
        account_list : res.data,
      })
    })
  }
  render () {
    const {account_list} = this.state
    return (
      <>
      
        <Switch>
          <Route
            path='create'
            component={AccountTable}
            key='1'
          />
          {/* <Redirect from="*" to="/cms/index" /> */}
        </Switch>
        <AccountHeader />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <AccountTable account_list={account_list} />
        {/* </Container> */}
      </>
    )
  }
}
export default Account