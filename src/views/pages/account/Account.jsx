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
      count : 0,
      count_this_month : 0,
      active : 0,
      suspend : 0,
      most_type : {type_name: '',count:0},
      deposit : {avg:0, sum:0}
    }
  }
  componentDidMount () {
    let data = {}
    data.token = localStorage.getItem('token')
    axios.post('/cms/account/info',data).then(res=>{
      console.log(res)
      this.setState({
        account_list : res.data.account_list,
        count : res.data.account_count[0] ? res.data.account_count[0].count : 0,
        count_this_month : res.data.account_count_this_month[0]? res.data.account_count_this_month[0].count : 0,
        active : res.data.active[0] ? res.data.active[0].count : 0,
        suspend : res.data.suspend[0] ? res.data.suspend[0].count : 0,
        most_type : res.data.most_account_type[0] ? res.data.most_account_type[0] : 0,
        deposit :res.data.deposit[0]
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
        <AccountHeader
            count={this.state.count}
            count_this_month={this.state.count_this_month}
            active={this.state.active}
            suspend={this.state.suspend}
            most_type={this.state.most_type}
            deposit={this.state.deposit} />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <AccountTable account_list={account_list} />
        {/* </Container> */}
      </>
    )
  }
}
export default Account