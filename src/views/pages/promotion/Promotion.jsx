import React, { Component } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import PromotionHeader from "components/Promotion/PromotionHeader.jsx";
import PromotionTable from 'components/Promotion/PromotionTable.jsx';

class Promotion extends Component{
  render () {
    return (
      <>
        <PromotionHeader />
        {/* Page content */}
        {/* <Container className="mt--7" fluid> */}
          <PromotionTable />
        {/* </Container> */}
      </>
    )
  }
}
export default Promotion