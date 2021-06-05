import React, { Component } from "react";
import { Form, Container, Row, Col, Button } from "reactstrap";

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import { OutlinedInput } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  formControl: {
    marginTop: 20,
    minWidth: '90%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  radio: {
    '&$checked': {
      color: '#1C75FF'
    }
  },
  checked: {},
  inputname: {
    marginTop: 20,
    width: '90%',
  },
  accno: {
    marginTop: 10,
    minWidth: 300
  }
})
class LoanInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      person_amount: 1
    }
  }
  render() {
    const onChange = (e) => {
      console.log(e)
    }
    const { classes } = this.props
    return (
      <>
        <Header />
        <Container className="" style={{ marginLeft: '0%' }} fluid>
          <Detail classes={classes} />
          <Footer />
        </Container>
      </>
    )
  }
}
class Header extends Component {
  render() {
    return (
      <div className="header bg-gradient-info pb-3 pt-5 pt-md-8" style={{ zIndex: -1 }}>

        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col>
              <h1 className="display-2 text-white text-bold" >แบบฟอร์มขอสินเชื่อ</h1>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
class Footer extends Component {
  render() {
    return (
      <Row className="d-flex align-items-center mt-5 justify-content-md-flex-end" style={{ marginLeft: '10%', paddingBottom: 100 }} fluid>

        <Button color="secondary" type="button">
          ไม่อนุมัติ
              </Button>
        <Button color="primary" type="button">
          อมุมัติ
              </Button>
      </Row>
    )
  }
}
class SubHeader extends Component {
  render() {
    const { header, isborder } = this.props
    const border = isborder ? '1px solid #DADADA' : ''
    return (
      <>
        <Container className="d-flex align-items-center pt-2" style={{ marginLeft: '0%', marginTop: 40, borderTop: border }} fluid>
          <Row>
            <Col className='pr-8'>
              <Container>
                <h1 className="display-6 pt-3 pb-4 " >{header}</h1>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
class Detail extends Component {
  render() {
    const { classes } = this.props
    const onChange = (e) => {
      console.log(e.target.value)
    }
    return (
      <>
        <SubHeader header='รายละเอียด' isborder={false} />
        <Col >
          <Container>
            ประเภทผู้ขอสินเชื่อ : คนเดียว
              </Container>
          <Container>
            ประเภทสินเชื่อ : เงินเชื่อเพื่อซื้อบ้าน
              </Container>
          <Container>
            ชื่อ-สกุล ผู้ขอสินเชื่อ : แกน มงคลากร
              </Container>
          <Container>
            วงเงิน : 500,000 บาท
              </Container>
          <Container>
            วันเริ่มสัญญา : 24/05/2017
              </Container>

          <Container>
            วันสิ้นสุดสัญญา : 24/05/2017
              </Container>
          <Container>
            วัตถุประสงค์การขอสินเชื่อ : เงินไปซื้อบ้าน
              </Container>
          <Container>
            เลขที่บัญชีธนาคารสำหรับกู้ : 0-000-0000-0000
              </Container>
          <Container>
            ชื่อบัญชีธนาคารสำหรับกู้  : แกน มงคลากร
              </Container>
          <SubHeader header='ผู้ค้ำประกัน' isborder={false} />
          <Container>
            สถานะใช้หลักประกัน : ใช้
              </Container>
          <Container>
            ชื่อ-สกุล : นาย เจษฎา โสพุดอ่อน
              </Container>
          <Container>
            เลขบัตรประจำตัวประชาชน : 1-3501-01583-82-1
              </Container>
          <Container>
            ความสัมพันธ์กับผู้กู้ : ผู้ปกครอง
              </Container>
          <Container>
            อาชีพ  : ค้าขาย
              </Container>
          <Container>
            รายได้โดยประมาณ : 15,000 บาทต่อเดือน
              </Container>
          <Container>
            ค่าใช้จ่ายส่วนตัวโดยประมาณ : 200 บาทต่อเดือน
              </Container>
          <Container>
            อีเมล : gan@gmail.com
              </Container>
          <Container>
            เบอร์โทร :0888888888
              </Container>
          <SubHeader header='หลักประกันอสังหาริมทรัพย์' isborder={false} />
          <Container>
            สถานะใช้หลักประกัน : ใช้
              </Container>
          <Container>
            รายละเอียดหลักประกัน : ที่ดิน 10 ไร่ ใจกลางเมือง ติด BTS
              </Container>
          <Container>
            เนื้อที่ :  10 ไร่
              </Container>
          <Container>
            ชื่อ-สกุล เจ้าของกรมสิทธิ์ : นาย เจษฎา โสพุดอ่อน
              </Container>
          <Container>
            รายละเอียด : ที่ดิน 10 ไร่ ใจกลางเมือง ติด BTS
               </Container>
          <Container>
            จังหวัด: กรุงเทพมหานคร
               </Container>
          <Container>
            เขต/อำเภอ : ทุ่งครุ
               </Container>
          <Container>
            แขวง/ตำบล  : บางมด
                </Container>
          <Container>
            รหัสไปรษณีย์  : 10140
              </Container>
              <SubHeader header='หลักประกันอื่น' isborder={false} />
          <Container>
            สถานะใช้หลักประกัน : ใช้
              </Container>
          <Container>
            รายละเอียดหลักประกัน : ที่ดิน 10 ไร่ ใจกลางเมือง ติด BTS
              </Container>
          <Container>
            เนื้อที่ :  10 ไร่
              </Container>
          <Container>
            ชื่อ-สกุล เจ้าของกรมสิทธิ์ : นาย เจษฎา โสพุดอ่อน
              </Container>
          <Container>
            รายละเอียด : ที่ดิน 10 ไร่ ใจกลางเมือง ติด BTS
               </Container>
          <Container>
            จังหวัด: กรุงเทพมหานคร
               </Container>
          <Container>
            เขต/อำเภอ : ทุ่งครุ
               </Container>
          <Container>
            แขวง/ตำบล  : บางมด
                </Container>
          <Container>
            รหัสไปรษณีย์  : 10140
              </Container>
        </Col>
      </>
    )
  }
}
export default withStyles(styles)(LoanInfo);