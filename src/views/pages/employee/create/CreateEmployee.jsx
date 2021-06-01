import React, { Component } from "react";
import { Form , Container, Row, Col, Button} from "reactstrap";

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
    width : '80%',
  }
})

function IDCardMask(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[ /[1-9]/, '-', /\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/, /\d/, '-',/\d/, /\d/, '-',/\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }

class CreateEmployee extends Component{
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
    const {classes} = this.props
    return (
      <>
        <Header/>

        <Container className="" style={{marginLeft:'0%'}} fluid>
        <Branch classes={classes}/>
        <StaffInfo classes={classes} />
        <Address classes={classes} />
        <Footer />
        </Container>
      </>
    )
  }
}

class Header extends Component {
    render () {
        return (
            <div className="header bg-gradient-info pb-3 pt-5 pt-md-8" style={{zIndex:-1}}>

            <Container className="d-flex align-items-center" fluid>
                <Row>
                    <Col>
                    <h1 className="display-2 text-white text-bold" >แบบฟอร์มสมัครพนักงาน</h1>
                    </Col>
                </Row>
                </Container>
            </div>
        )
    }
}

class Branch extends Component {
    render () {
        const {classes} = this.props
        return (
            <>
                <Container className="pt-5" style={{marginLeft:'0%'}} fluid>
                    <Row>
                        <Col className='pr-0'>
                        <Container>
                            <h1 className="display-6 pt-3" style={{minWidth:150}}>สาขา</h1>
                        </Container>
                        </Col>
                        <Col md='8'>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">เลือกสาขา</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value='10'
                                label="Age"
                                >
                                <MenuItem value={10}>สาขามหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี</MenuItem>
                                <MenuItem value={20}>สาขาเซ็นทรัลพระราม 2</MenuItem>
                                <MenuItem value={30}>สาขาเซ็นทรัลพระราม 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

class StaffInfo extends Component {
    render () {
        const {classes} = this.props
        const onChange = (e) => {
          console.log(e.target.value)
        }
        return (
            <>
                <SubHeader header='ข้อมูลพนักงาน' />

                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col>เพศต้นกำเนิด</Col>
                    <Col style={{marginLeft:'-50%'}}>
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        checked={true}
                        onChange={onChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    ชาย
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        style={{marginLeft:'5%'}}
                        checked={false}
                        onChange={onChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    หญิง
                    </Col>
                </Row>
                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col>คำนำหน้า</Col>
                    <Col style={{marginLeft:'-50%'}}>
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        checked={true}
                        onChange={onChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    นาย
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        style={{marginLeft:'5%'}}
                        checked={false}
                        onChange={onChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    นาง
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        style={{marginLeft:'5%'}}
                        checked={false}
                        onChange={onChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    นางสาว
                    </Col>
                </Row>

                <Row className="d-flex align-items-center"  style={{marginLeft:'10%'}} fluid>
                <Col md='4' className='mt-4'>
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="ชื่อ"
                        defaultValue="แกน"
                        variant="outlined"
                    />
                </Col>
                <Col md='4' className='mt-4'>
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="ชื่อกลาง"
                        defaultValue="ดี"
                        variant="outlined"
                    />
                </Col>
                <Col md='4' className=' mt-4'>
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="นามสกุล"
                        defaultValue="มงคลากร"
                        variant="outlined"
                    />
                </Col>
                </Row>
                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='3' className='mt-4'>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">สถานภาพ</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value='10'
                        label="------------"
                    >
                        <MenuItem value={10}>โสด</MenuItem>
                        <MenuItem value={20}>แต่งงาน</MenuItem>
                        <MenuItem value={30}>หย่าร้าง</MenuItem>
                    </Select>
                    </FormControl>
                </Col>
                <Col md='3' className='mt-4'>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">วุฒิการศึกษา</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value='10'
                        label="---------------"
                    >
                        <MenuItem value={10}>มัธยมปลาย</MenuItem>
                        <MenuItem value={20}>ปริญญาตรี</MenuItem>
                        <MenuItem value={30}>ปริญญาโท</MenuItem>
                    </Select>
                    </FormControl>
                </Col>
                <Col md='3' className='mt-4'>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField
                            id="date"
                            label="วันเกิด"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            variant="outlined"
                        />
                    </FormControl>
                </Col>
                <Col md='3' className='mt-4'>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel  variant="outlined"  htmlFor="formatted-text-mask-input">เลขบัตรประจำตัวประชาชน</InputLabel>
                        <OutlinedInput
                        value=''
                        label='เลขบัตรประจำตัวประชาชน'
                        // style={{fontSize:25}}
                        onChange={onChange}
                        name="textmask"
                        id="formatted-text-mask-input"
                        inputComponent={IDCardMask}
                        variant="outlined"
                        />
                    </FormControl>
                </Col>
                </Row>
            </>
        )
    }
}

class Address extends Component {
    render () {
        const {classes} = this.props
        return (
            <>
                <SubHeader header='ที่อยู่ติดต่อ'/>
                
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
            </>
        )
    }
}
class Footer extends Component {
    render () {
        return (
            <Row className="d-flex align-items-center mt-5 justify-content-md-flex-end"  style={{marginLeft:'10%', paddingBottom:100}} fluid>

                <Button color="secondary" type="button">
                    ยกเลิก
                </Button>
                <Button color="primary" type="button">
                    เพิ่มพนักงาน
                </Button>
          </Row>
        )
    }
}

class SubHeader extends Component {
    render () {
        const {header} = this.props
        return (
            <>
                <Container className="d-flex align-items-center pt-2" style={{marginLeft:'0%',marginTop:40, borderTop:'1px solid #DADADA'}}  fluid>
                    <Row>
                        <Col className='pr-8'>
                        <Container>
                        <h1 className="display-6 pt-3 pb-4" >{header}</h1>
                        </Container>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
export default withStyles(styles)(CreateEmployee);