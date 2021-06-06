import React, { Component } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class BranchHeader extends Component{
  render () {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8" style={{zIndex:-1}}>
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            จำนวนสาขา
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.branch_count ? this.props.branch_count : ''}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row> 
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            สาขาที่มีการโอนเงินมากที่สุด
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.transfer_branch ? this.props.transfer_branch : 'ออนไลน์'}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                            {this.props.transfer_amount ? this.props.transfer_amount : 'ออนไลน์'}
                        </span>{" "}
                        <span className="text-nowrap">บาท</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            สาขาที่มีการถอนเงินมากที่สุด
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            
                          {this.props.withdraw_branch ? this.props.withdraw_branch : 'ออนไลน์'}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          {this.props.withdraw_amount ? this.props.withdraw_amount : 'ออนไลน์'}
                        </span>{" "}
                        <span className="text-nowrap">บาท</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            สาขาที่มีการฝากเงินมากที่สุด
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {this.props.deposit_branch ? this.props.deposit_branch : 'ออนไลน์'}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          {this.props.deposit_amount ? this.props.deposit_amount : 'ออนไลน์'}
                        </span>{" "}
                        <span className="text-nowrap">บาท</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default BranchHeader;
