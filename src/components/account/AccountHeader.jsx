import React, { Component } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class AccountHeader extends Component{
  render () {
    console.log(this.props)
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
                            จำนวนบัญชีธนาคาร
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.count ? this.props.count.toLocaleString() : 0}
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
                          <i className="fa fa-arrow-up" /> {this.props.count_this_month ? this.props.count_this_month.toLocaleString() : 0}
                        </span>{" "}
                        <span className="text-nowrap">ในเดือนนี้</span>
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
                            ประเภทบัญชีที่มากที่สุด
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.props.most_type ? this.props.most_type.account_type_name :''}
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
                            {this.props.most_type ? this.props.most_type.count.toLocaleString() : ''}
                        </span>{" "}
                        <span className="text-nowrap">บัญชี</span>
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
                            มูลค่าเงินฝาก
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{this.props.deposit && this.props.deposit.sum ? this.props.deposit.sum.toLocaleString() : ''}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="mr-2">
                          เฉลี่ย {this.props.deposit && this.props.deposit.avg ? this.props.deposit.avg.toFixed(1).toLocaleString() : ''} บาท
                        </span>{" "}
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
                            บัญชีที่ใช้งาน
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{this.props.active}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          {this.props.suspend}
                        </span>{" "}
                        <span className="text-nowrap">บัญชี ถูกระงับ</span>
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

export default AccountHeader;
