import React, { useState } from "react";
import welcome from "../assets/img/brand/welcome-img.png";
import {
  Container,
  Row,
  Col,
} from "reactstrap";

const Index = () => {
  return (
    <>
    <Container style={{backgroundColor:'white', marginTop:0, height:1000, width:'100%'}}>
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
