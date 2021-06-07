import React, { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
import welcome from "../assets/img/brand/welcome-img.png";
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
    <Container style={{backgroundColor:'white', marginTop:0, height:1000, width:'100%'}}>
    {/* <Container style={{backgroundColor:'#b08ec1', height:1000, width:'100%'}}> */}
      <Row>
        <Col md='6'className='text-center justify-content-center' style={{marginTop:'5%'}}>
          <img src='https://www.kasikornbank.com/SiteCollectionDocuments/splash/img/queen-birthday2021/queen-shadow.png' style={{width:'90%',maxWidth: 484}}/>
        </Col>
        <Col  md='5' className='text-center justify-content-center' style={{marginTop:'15%'}}> 
          <img src={welcome} style={{width:'100%'}}/>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Index;
