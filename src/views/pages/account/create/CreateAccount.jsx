import React, { Component } from "react";
import { Form , Container, Row, Col, Button} from "reactstrap";

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

import PersonInfo from '../../../../components/account/create/PersonInfo.jsx'

const styles = theme => ({
  formControl: {
    marginTop : 10,
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
  inputname : {
    width : '90%',
  }
})
class CreateAccount extends Component{
  constructor (props) {
    super(props)
    this.state = {
      person_amount : 1
    }
  }
  render () {
    const onChange = (e) => {
      console.log(e)
    }
    const addPerson = (e) => {
      const {person_amount} = this.state
      this.setState({
        person_amount : person_amount+1
      })
      console.log(person_amount)
    }
    const {person_amount } = this.state
    const {classes} = this.props
    const person_infomation = []
    let i = 0
    for (i=0 ; i < person_amount ; i++ ){ 
      person_infomation.push((<PersonInfo/>))
    }
    return (
      <>
        <div className="header bg-gradient-info pb-3 pt-5 pt-md-8" style={{zIndex:-1}}>

        <Container className="d-flex align-items-center" fluid>
            <Row>
                <Col>
                  <h1 className="display-2 text-white text-bold" >แบบฟอร์มการเปิดบัญชีธนาคาร</h1>
                </Col>
            </Row>
            </Container>
        </div>

        <Container className="pt-5" style={{marginLeft:'0%'}} fluid>
            <Row>
                <Col className='pr-8'>
                  <Container>
                    <h1 className="display-6 pt-3" style={{minWidth:150}}>ข้อมูลบัญชี</h1>
                  </Container>
                </Col>
                <Col md='8'>
                  <Row>
                    <Col className=''>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">สาขา</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value='10'
                          label="Age"
                        >
                          <MenuItem value={10}>สาขามหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี</MenuItem>
                          <MenuItem value={20}>สาขาพระราม 3</MenuItem>
                          <MenuItem value={30}>สาขาพระราม 2</MenuItem>
                        </Select>
                      </FormControl>
                    </Col>
                    <Col className=''>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">ประเภท</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value='10'
                          label="Age"
                        >
                          <MenuItem value={10}>บัญชีออมทรัพย์</MenuItem>
                          <MenuItem value={20}>บัญชีฝากประจำ</MenuItem>
                          <MenuItem value={30}>บัญชีเงินล้าน</MenuItem>
                        </Select>
                      </FormControl>
                    </Col>
                  </Row>
                  <Row className='pt-4 pl-3'>
                    <TextField
                      classes={{root: classes.inputname}}
                      id="outlined-required"
                      label="ชื่อบัญชี"
                      defaultValue="บริจาคช่วยโควิด 19 ณ วัดพุทธ"
                      variant="outlined"
                    />
                  </Row>
                </Col>
            </Row>
        </Container>
        <Container className="d-flex align-items-center pt-2"  style={{marginLeft:'0%',marginTop:40, borderTop:'1px solid #DADADA'}} fluid>
            <Row>
                <Col className='pr-8'>
                  <Container>
                  <h1 className="display-6 pt-3" >ข้อมูลผู้เปิดบัญชี</h1>
                  </Container>
                </Col>
            </Row>
        </Container>
        {person_infomation.map((val,inex)=>{
          return (val)
        })}
        <Container onClick={addPerson}>
          <Row className='pt-2 ml-5'>
            <i className='ni ni-fat-add mr-3' style={{width:20,fontSize:20, paddingTop:2}}></i><h3>เพิ่มข้อมูลผู้ฝากร่วม</h3>
          </Row>
        </Container>
        <Container className="d-flex align-items-center pt-2"  style={{marginLeft:'0%',marginTop:40, borderTop:'1px solid #DADADA'}} fluid>
            <Row>
                <Col className='pr-8'>
                  <Container>
                  <h1 className="display-6 pt-3" >ที่อยู่สำหรับการติดต่อ</h1>
                  </Container>
                </Col>
            </Row>
        </Container>
        <Container>
          <Row className="d-flex align-items-center"  style={{marginLeft:'10%'}} fluid>
            <Col md='5' className='mt-4'>
                <TextField
                  classes={{root: classes.inputname}}
                  id="outlined-required"
                  label="ชื่อสถานที่ติดต่อ"
                  defaultValue="ตึกแดง"
                  variant="outlined"
                />
            </Col>
            <Col md='6' className='mt-4'>
                <TextField
                  classes={{root: classes.inputname}}
                  id="outlined-required"
                  label="ที่อยู่ติดต่อ"
                  defaultValue="126 ถ. ประชาอุทิศ"
                  variant="outlined"
                />
            </Col>
          </Row>
          <Row className="d-flex align-items-center mt-3"  style={{marginLeft:'10%'}} fluid>

          <Col md='3' className='mt-4'>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">จังหวัด</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value='10'
                  label="Age"
                >
                  <MenuItem value={10}>กรุงเทพมหานคร</MenuItem>
                  <MenuItem value={20}>อ่างทอง</MenuItem>
                  <MenuItem value={30}>พระนครศรีอยุธยา</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col md='3' className='mt-4'>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">เขต / อำเภอ</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value='10'
                  label="Age"
                >
                  <MenuItem value={10}>ทุ่งครุ</MenuItem>
                  <MenuItem value={20}>คลองเตย</MenuItem>
                  <MenuItem value={30}>สยาม</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col md='3' className='mt-4'>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">เเขวง / ตำบล</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value='10'
                  label="Age"
                >
                  <MenuItem value={10}>บางมด</MenuItem>
                  <MenuItem value={20}>ผักไห่</MenuItem>
                  <MenuItem value={30}>ลาดน้ำเค็ม</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col md='2' className='mt-4'>
                <TextField
                  classes={{root: classes.inputname}}
                  id="outlined-required"
                  label="รหัสไปรษณีย์"
                  defaultValue="11111"
                  variant="outlined"
                />
            </Col>
          </Row>

          <Row className="d-flex align-items-center mt-5 justify-content-md-flex-end"  style={{marginLeft:'10%', paddingBottom:100}} fluid>

            <Button color="secondary" type="button">
              ยกเลิก
            </Button>
            <Button color="primary" type="button">
              ยืนยันการเปิดบัญชี
            </Button>
          </Row>
          </Container>
      </>
    )
  }
}

export default withStyles(styles)(CreateAccount);