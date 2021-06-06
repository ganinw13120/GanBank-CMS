import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import PromotionHeader from "components/Promotion/PromotionHeader.jsx";
import PromotionTable from 'components/Promotion/PromotionTable.jsx';
import axios from 'axios';

class Promotion extends Component{
  constructor (props) {
    super(props)
    this.state = {
      promotion_list : []
    }
  }
  componentDidMount () {
    axios.post('/cms/promotion/get').then(res=>{
      this.setState({
        promotion_list : res.data
      })
    })
  }
  render () {
    return (
      <>
        <PromotionHeader />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <PromotionTable promotion_list={this.state.promotion_list} />
        {/* </Container> */}
      </>
    )
  }
}
export default Promotion