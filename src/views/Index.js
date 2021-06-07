import React, { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid style={{letterSpacing:3}}>
                <Row>
                    <Col>
                    <h1 className="display-2 text-white text-bold" >ยืนดีต้อนรับสู่ Gan Banking</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <h2 className="mt-6" >ขอขอบคุณที่ให้ความไว้วางใจกับเรา Gan Banking</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <h2 className=" " >ขอขอบคุณทุกท่านที่ทำงานกันอย่างเต็มที่</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <h2 className=" " >สิ้นปีนี้มีโบนัส</h2>
                    </Col>
                </Row>
      </Container>
    </>
  );
};

export default Index;
