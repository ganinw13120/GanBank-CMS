import React, { Component } from "react";
import {Container} from "reactstrap";

class CustomerHeader extends Component{
  render () {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8" style={{zIndex:-1}}>
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default CustomerHeader;
