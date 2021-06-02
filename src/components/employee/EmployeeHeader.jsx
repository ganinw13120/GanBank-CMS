import React, { Component } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class EmployeeHeader extends Component{
  render () {
    const {most_position_name,most_position_num,totalnum,monthcount,oldest_age,youngest_age,most_branch_num,most_branch_name} = this.props
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
                            จำนวนพนักงาน
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {totalnum} 
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
                          {monthcount}
                        </span>{" "}
                        <span className="text-nowrap">พนักงานใหม่ในเดือนนี้</span>
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
                            อายุพนักงานที่มากที่สุด
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {oldest_age} ปี
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
                          {youngest_age} ปี 
                        </span>{" "}
                        <span className="text-nowrap">อายุพนักงานที่น้อยที่สุด</span>
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
                            สาขาที่มีพนักงานมากที่สุด
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {most_branch_name}
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
                           {most_branch_num}
                        </span>{" "}
                        <span className="text-nowrap">คน</span>
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
                            ตำเเหน่งที่มีพนักงานมากที่สุด
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {most_position_name}
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
                           {most_position_num}
                        </span>{" "}
                        <span className="text-nowrap">คน</span>
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

export default EmployeeHeader;
