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
import Checkbox from '@material-ui/core/Checkbox';


const styles = theme => ({
  formControl: {
    marginTop : 20,
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
    marginTop : 20,
    width : '90%',
  },
  accno : {
    marginTop : 10,
    minWidth : 300
  }
})

function AccountNumberMask(props) {
    const { inputRef, ...other } = props;
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[ /[0-9]/, '-', /\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/, '-',/\d/, /\d/,/\d/,/\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
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

class CreateLoan extends Component{
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
            <Detail classes={classes}/>
            <AccountDetail classes={classes}/>
            <GuaranteeDetail classes={classes} />
        <Footer />
        </Container>
      </>
    )
  }
}

class Detail extends Component {
    render () {
        const {classes} = this.props
        const onChange = (e) => {
          console.log(e.target.value)
        }
        return (
            <>
                <SubHeader header='รายละเอียด' isborder={false} />
                <Row className="d-flex align-items-center pt-0"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='5'>
                        <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">ประเภทผู้ขอสินเชื่อ</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value='10'
                            label="ประเภทผู้ขอสินเชื่อ"
                        >
                            <MenuItem value={10}>คนเดียว</MenuItem>
                            <MenuItem value={20}>หลายคน</MenuItem>
                        </Select>
                        </FormControl>
                    </Col>
                    <Col md='5'>
                        <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">ประเภทสินเชื่อ</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value='10'
                            label="ประเภทสินเชื่อ"
                        >
                            <MenuItem value={10}>เงินเชื่อเพื่อซื้อบ้าน</MenuItem>
                            <MenuItem value={20}>เงินเชื่อเพื่อซื้อรถ</MenuItem>
                            <MenuItem value={30}>เงินเชื่อเพื่อซื้อเรือ</MenuItem>
                        </Select>
                        </FormControl>
                    </Col>
                </Row>
                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='5'>
                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="ชื่อ-สกุล ผู้ขอสินเชื่อ"
                            defaultValue="แกน มงคลากร"
                            variant="outlined"
                        />
                    </Col>
                    <Col md='5'>
                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="วงเงิน (บาท)"
                            defaultValue="500,000"
                            variant="outlined"
                        />
                    </Col>
                </Row>
                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='5'>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                id="date"
                                label="วันเริ่มสัญญา"
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
                    <Col md='5'>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                id="date"
                                label="วันสิ้นสุดสัญญา"
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
                </Row>
                
                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'11%'}}  fluid>
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="วัตถุประสงค์การขอสินเชื่อ"
                        defaultValue="500,000"
                        variant="outlined"
                        multiline
                        rows={4}
                    />
                </Row>
            </>
        )
    }
}

class AccountDetail extends Component {
    render () {
        const {classes} = this.props
        const onChange = (e) => {
          console.log(e.target.value)
        }
        return (
            <>
                
                <SubHeader header='รายละเอียดบัญชีสำหรับการกู้' isborder={true} />
                <Row className="d-flex align-items-center pt-0"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='4' className='pt-3'>
                        <FormControl variant="outlined" className={classes.accno}>
                            <InputLabel  variant="outlined"  htmlFor="formatted-text-mask-input">เลขที่บัญชีธนาคาร</InputLabel>
                            <OutlinedInput
                            value='000000000000'
                            label='เลขที่บัญชีธนาคาร'
                            // style={{fontSize:25}}
                            onChange={onChange}
                            name="textmask"
                            id="formatted-text-mask-input"
                            inputComponent={AccountNumberMask}
                            variant="outlined"
                            />
                        </FormControl>
                    </Col>
                    <Col md='4' className='pt-3'>
                        <TextField
                        classes={{root: classes.accno}}
                        id="outlined-required"
                        label="ชื่อบัญชี"
                        defaultValue="นายแกน มงคลากร"
                        variant="outlined"
                        disabled
                        />
                    </Col>
                </Row>
            </>
        )
    }
}

class GuaranteeDetail extends Component {
    constructor (props) {
      super(props)
      this.state = {
        person_amount : 1,
        property_amount : 1,
        other_amount : 1
      }
    }
    render () {
        const {person_amount, property_amount, other_amount} = this.state
        const {classes} = this.props
        const onChange = (e) => {
          console.log(e.target.value)
        }
        const addPerson = (e) => {
          const {person_amount} = this.state
          this.setState({
            person_amount : person_amount+1
          })
        }
        const addProperty = (e) => {
          const {property_amount} = this.state
          this.setState({
            property_amount : property_amount+1
          })
        }
        const addOther = (e) => {
          const {other_amount} = this.state
          this.setState({
            other_amount : other_amount+1
          })
        }
        let person_infomation = []
        let property_infomation = []
        let other_infomation = []
        let i = 0
        for (i=0 ; i < person_amount ; i++ ){ 
            person_infomation.push(<GuranteePerson  classes={classes}/>)
        }
        for (i=0 ; i < property_amount ; i++ ){ 
            property_infomation.push(<GuaranteeProperty  classes={classes}/>)
        }
        for (i=0 ; i < other_amount ; i++ ){ 
            other_infomation.push(<GuaranteeOther  classes={classes}/>)
        }
        return (
            <>
                <SubHeader header='รายละเอียดหลักประกัน' isborder={true} />

                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    /> บุคคล
                </Row>
                {person_infomation.map((val,inex)=>{
                    return (val)
                })}
                <Row className="d-flex align-items-center"  style={{marginLeft:'10%'}}  fluid onClick={addPerson}>  
                    <i className='ni ni-fat-add mr-3' style={{width:20,fontSize:20}}></i><h3>เพิ่มข้อมูลผู้คำประกัน</h3>
                </Row>

                <Row className="d-flex align-items-center pt-5"  style={{marginLeft:'10%', marginTop:50}}  fluid>
                    <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    /> อสังหาริมทรัพย์
                </Row>
                {property_infomation.map((val,inex)=>{
                    return (val)
                })}
                <Row className="d-flex align-items-center"  style={{marginLeft:'10%'}}  fluid onClick={addProperty}>  
                    <i className='ni ni-fat-add mr-3' style={{width:20,fontSize:20}}></i><h3>เพิ่มข้อมูลอสังหาริมทรัพย์</h3>
                </Row>

                <Row className="d-flex align-items-center pt-5"  style={{marginLeft:'10%', marginTop:50}}  fluid>
                    <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    /> หลักประกันอื่น ๆ
                </Row>
                {other_infomation.map((val,inex)=>{
                    return (val)
                })}
                <Row className="d-flex align-items-center"  style={{marginLeft:'10%'}}  fluid onClick={addOther}>  
                    <i className='ni ni-fat-add mr-3' style={{width:20,fontSize:20}}></i><h3>เพิ่มข้อมูลหลักประกันอื่น ๆ</h3>
                </Row>
            </>
        )
    }
}

class GuranteePerson extends Component {
    render () {
        const {classes} = this.props
        const onChange = (e) => {
          console.log(e.target.value)
        }
        return (
            <>
            
             <Row className="d-flex align-items-center pt-5"  style={{marginLeft:'10%'}}  fluid>
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

                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='4'>

                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="ชื่อบัญชี"
                        defaultValue="นายแกน มงคลากร"
                        variant="outlined"
                        disabled
                        />
                    
                    </Col>
                    <Col md='3'>
                        <FormControl variant="outlined" className={classes.inputname}>
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

                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='2'>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">ความสัมพันธ์กับผู้กู้</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value='10'
                                label="ความสัมพันธ์กับผู้กู้"
                            >
                                <MenuItem value={10}>ผู้ปกครอง</MenuItem>
                                <MenuItem value={20}>เพื่อน</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                    <Col md='2'>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">อาชีพ</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value='10'
                                label="อาชีพ"
                            >
                                <MenuItem value={10}>ค้าขาย</MenuItem>
                                <MenuItem value={20}>รับจ้าง</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                    <Col md='4'>

                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="รายได้โดยประมาณ (บาท/เดือน)"
                            defaultValue="15,000"
                            variant="outlined"
                        />
                    </Col>
                    <Col md='4'>

                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="ค่าใช้จ่ายส่วนตัวโดยประมาณ (บาท/เดือน)"
                            defaultValue="14,000"
                            variant="outlined"
                        />
                    </Col>
                </Row>

                <Row className="d-flex align-items-center pt-3 pb-5"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='3'>
                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="อีเมล"
                            defaultValue="gan@gmail.com"
                            variant="outlined"
                        />
                    </Col>   
                    <Col md='3'>
                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="เบอร์โทร"
                            defaultValue="0888888888"
                            variant="outlined"
                        />
                    </Col>    
                </Row>
            </>
        )
    }
}

class GuaranteeProperty extends Component {
    constructor (props) {
        super(props)
        this.state = {
            owner_amount : 1
        }
    }
    render () {
        const {owner_amount} = this.state
        const {classes} = this.props
        const onChange = (e) => {
          console.log(e.target.value)
        }
        let owner = []
        let i = 0
        for (i=0 ; i < owner_amount ; i++ ){ 
            owner.push(<PropertyOwner  classes={classes}/>)
        }
        const addOwner = (e) => {
          const {owner_amount} = this.state
          this.setState({
            owner_amount : owner_amount+1
          })
        }
        
        return (
            <>
            <Row className="d-flex align-items-center pt-5"  style={{marginLeft:'10%'}}  fluid>
                <Col md='8'>
                
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="รายละเอียดหลักประกัน"
                        defaultValue="ที่ดิน 10 ไร่ ใจกลางเมือง ติด BTS"
                        variant="outlined"
                    />
                </Col>
                <Col md='3'>
                
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="เนื้อที่"
                        defaultValue="10 ไร่"
                        variant="outlined"
                    />
                </Col>
            </Row>
            {owner.map((val,inex)=>{
                return (val)
            })}
            <Row className="d-flex align-items-center pt-2"  style={{marginLeft:'15%'}}  fluid onClick={addOwner}>
                <i className='ni ni-fat-add mr-3' style={{width:20,fontSize:20}}></i><h3>เพิ่มข้อมูลเจ้าของกรมสิทธิ์</h3>
            </Row>
            <Row className="d-flex align-items-center pt-2"  style={{marginLeft:'10%'}}  fluid onClick={addOwner}>
                <Col md='8'>
                    
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="รายละเอียดหลักประกัน"
                        defaultValue="ที่ดิน 10 ไร่ ใจกลางเมือง ติด BTS"
                        variant="outlined"
                    />
                </Col>
            </Row>
                    <Row className="d-flex align-items-center pt-2 pb-5"  style={{marginLeft:'10%'}} fluid>

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

class PropertyOwner extends Component {
    render () {
        const {classes} = this.props
        const onChange = (e) => {
          console.log(e.target.value)
        }
        return (
            <>
                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='5'>
                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="ชื่อ-สกุล เจ้าของกรมสิทธิ์"
                            defaultValue="นายแกน มงคลากร"
                            variant="outlined"
                        />
                    </Col>
                </Row>
            </>
        )
    }
}

class GuaranteeOther extends Component {
    constructor (props) {
        super(props)
        this.state = {
            owner_amount : 1
        }
    }
    render () {
        const {owner_amount} = this.state
        const {classes} = this.props
        const onChange = (e) => {
          console.log(e.target.value)
        }
        let owner = []
        let i = 0
        for (i=0 ; i < owner_amount ; i++ ){ 
            owner.push(<PropertyOwner  classes={classes}/>)
        }
        const addOwner = (e) => {
          const {owner_amount} = this.state
          this.setState({
            owner_amount : owner_amount+1
          })
        }
        return (
            <>
                <Row className="d-flex align-items-center pt-5"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='8'>
                    
                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="รายละเอียดหลักประกัน"
                            defaultValue="ที่ดิน 10 ไร่ ใจกลางเมือง ติด BTS"
                            variant="outlined"
                        />
                    </Col>
                    <Col md='3'>
                    
                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="มูลค่า (บาท)"
                            defaultValue="500,000"
                            variant="outlined"
                        />
                    </Col>
                </Row>
                {owner.map((val,inex)=>{
                    return (val)
                })}
                <Row className="d-flex align-items-center pt-2 pb-5"  style={{marginLeft:'15%'}}  fluid onClick={addOwner}>
                    <i className='ni ni-fat-add mr-3' style={{width:20,fontSize:20}}></i><h3>เพิ่มข้อมูลเจ้าของกรมสิทธิ์</h3>
                </Row>
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
                    <h1 className="display-2 text-white text-bold" >แบบฟอร์มขอสินเชื่อ</h1>
                    </Col>
                </Row>
                </Container>
            </div>
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
                    ขอสินเชื่อ
                </Button>
          </Row>
        )
    }
}

class SubHeader extends Component {
    render () {
        const {header, isborder} = this.props
        const border = isborder ? '1px solid #DADADA' : ''
        return (
            <>
                <Container className="d-flex align-items-center pt-2" style={{marginLeft:'0%',marginTop:40, borderTop:border}}  fluid>
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
export default withStyles(styles)(CreateLoan);