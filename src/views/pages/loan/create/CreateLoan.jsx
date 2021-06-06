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
import axios from 'axios';
import Swal from 'sweetalert2' 


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
    width : '80%',
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

    function PhoneMask(props) {
        const { inputRef, ...other } = props;
      
        return (
          <MaskedInput
            {...other}
            ref={(ref) => {
              inputRef(ref ? ref.inputElement : null);
            }}
            mask={[ /[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
          />
        );
      }
class CreateLoan extends Component{
  constructor (props) {
    super(props)
    this.state = {
        loan_type_list : [],
        province_list : [],
        loan_type : null,
        request_name : null,
        amount : null,
        start_date : null,
        stop_date : null,
        purpose : null,
        relation_list : [],
        career_list : [],
        person_info : [],
        property_info : [],
        other_info : [],
        phone_number : null,
    }
  }
  componentDidMount () {
    axios.post('/cms/loan/prepare').then(res=>{
        this.setState({
            loan_type_list : res.data.loan_type,
            province_list : res.data.Province,
            relation_list : res.data.relation_list,
            career_list : res.data.career
        })
    })
  }
  onChangeData = (field,val) => {
    this.setState({
        [field] : val
    })
  }
  formSubmit = () => {
    Swal.fire({
      title: 'ยืนยันการขอสินเชื่อ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire('กำลังทำรายการขอสินเชื่อ..')
          
          const temp = Object.assign({},this.state)
          temp.person_info.forEach(e=>{
            if(e.phone_number)e.phone_number = e.phone_number.replace(/-/g, '')
            if(e.idcard)e.idcard = e.idcard.replace(/-/g, '')
          })
          const data = {
            amount : temp.amount,
            loan_type : temp.loan_type,
            purpose : temp.purpose,
            request_name : temp.request_name,
            start_date : temp.start_date,
            stop_date : temp.stop_date,
            person_info : temp.person_info,
            property_info : temp.property_info,
            other_info : temp.other_info,
            phone_number : temp.phone_number.replace(/-/g, ''),
            branch : 5,
          }
          console.log(data)
          axios.post('/cms/loan/create', data).then(res=>{
              Swal.fire({
                  title: 'สำเร็จ!',
                  icon: 'success',
                  confirmButtonText:
                    '<a href="/cms/loan" style="text-decoration: none;color:white;">กลับไปหน้าหลัก</a>',
                })
          })
          .catch(function (error) {
            Swal.fire({
                title: 'ไม่สำเร็จ!',
                icon: 'error',
                html: error.response.data.message,
                confirmButtonText:
                  '<a href="/cms/loan" style="text-decoration: none;color:white;">กลับไปหน้าหลัก</a>',
              })
          })
      }
    })
  }
  render () {
    const {loan_type_list,relation_list, career_list,province_list, loan_type, request_name, amount, start_date, stop_date, purpose,phone_number} = this.state
    const {classes} = this.props
    const submitable = loan_type && request_name&& amount&& start_date&& stop_date&& purpose&& loan_type != null && request_name!= null&& amount!= null&& start_date!= null&& stop_date!= null&& purpose!= null && phone_number && phone_number != null
    return (
      <>
        <Header/>

        <Container className="" style={{marginLeft:'0%'}} fluid>
            <Detail classes={classes} loan_type_list={loan_type_list} onChangeData={this.onChangeData}/>
            {/* <AccountDetail classes={classes}  onChangeData={this.onChangeData}/> */}
            <GuaranteeDetail classes={classes} relation_list={relation_list} career_list={career_list} province_list={province_list} onChangeData={this.onChangeData}/>
        <Footer submitable={submitable} formSubmit={this.formSubmit} />
        </Container>
      </>
    )
  }
}

class Detail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loan_type : null,
            request_name : null,
            amount : null,
            start_date : null,
            stop_date : null,
            purpose : null,
            account_name : null,
            account_no : null,
            phone_number : null,
        }
    }
    onStateChange = (field,val) => {
      this.setState({
          [field] : val
      })
    }
    render () {
        const {classes, loan_type_list,onChangeData} = this.props
        const {loan_type} = this.state
        let loan_type_render = []
        if(loan_type_list) loan_type_list.forEach(e=>{
            loan_type_render.push(<MenuItem value={e.loan_type_id}>{e.loan_type_name}</MenuItem>)
        })
        return (
            <>
                <SubHeader header='รายละเอียด' isborder={false} />
                <Row className="d-flex align-items-center pt-0"  style={{marginLeft:'10%'}}  fluid>
                    {/* <Col md='5'>
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
                    </Col> */}
                    <Col md='5'>
                        <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">ประเภทสินเชื่อ</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="ประเภทสินเชื่อ"
                            value={loan_type}
                            onChange={(e)=>{
                                this.onStateChange('loan_type', e.target.value)
                                onChangeData('loan_type', e.target.value)
                            }}
                        >
                            {loan_type_render}
                        </Select>
                        </FormControl>
                    </Col>
                    <Col md='5'>
                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="ชื่อ-สกุล ผู้ขอสินเชื่อ"
                            onChange={(e)=>{
                                this.onStateChange('request_name', e.target.value)
                                onChangeData('request_name', e.target.value)
                            }}
                            variant="outlined"
                        />
                    </Col>
                </Row>
                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='5'>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel  variant="outlined"  htmlFor="formatted-text-mask-input">เบอร์โทร</InputLabel>
                            <OutlinedInput
                            label='เบอร์โทร'
                            name="textmask"
                            id="formatted-text-mask-input"
                            inputComponent={PhoneMask}
                            variant="outlined"
                            onChange={(e)=>{
                                this.onStateChange('phone_number', e.target.value)
                                onChangeData('phone_number', e.target.value)
                            }}
                            />
                        </FormControl>
                    </Col>
                    <Col md='5'>
                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="วงเงิน (บาท)"
                            onChange={(e)=>{
                                this.onStateChange('amount', e.target.value)
                                onChangeData('amount', e.target.value)
                            }}
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
                                onChange={(e)=>{
                                    this.onStateChange('start_date', e.target.value)
                                    onChangeData('start_date', e.target.value)
                                }}
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
                                onChange={(e)=>{
                                    this.onStateChange('stop_date', e.target.value)
                                    onChangeData('stop_date', e.target.value)
                                }} 
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
                        onChange={(e)=>{
                            this.onStateChange('purpose', e.target.value)
                            onChangeData('purpose', e.target.value)
                        }}
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
    constructor (props) {
        super(props) 
        this.state = {
            account_no : null,
            account_name : null
        }
    }
    onAccountChange = (val) =>{
        const data = {
            account_no : val.replace(/-/g, '').trim()
        }
        axios.post('/cms/account/name', data).then(res=>{
            const {onChangeData} = this.props
            onChangeData('account_name', res.data.account_name)
            this.setState({
                account_name : res.data.account_name
            })
        })
    }
    render () {
        const {classes, onChangeData} = this.props
        const {account_name} = this.state
        return (
            <>
                
                <SubHeader header='รายละเอียดบัญชีสำหรับการกู้' isborder={true} />
                <Row className="d-flex align-items-center pt-0"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='4' className='pt-3'>
                        <FormControl variant="outlined" className={classes.accno}>
                            <InputLabel  variant="outlined"  htmlFor="formatted-text-mask-input">เลขที่บัญชีธนาคาร</InputLabel>
                            <OutlinedInput
                            label='เลขที่บัญชีธนาคาร'
                            // style={{fontSize:25}}
                            onChange={(e)=>{
                                onChangeData('origin_no', e.target.value)
                                this.onAccountChange(e.target.value)
                            }}
                            name="textmask"
                            id="formatted-text-mask-input"
                            inputComponent={AccountNumberMask}
                            variant="outlined"
                            />
                        </FormControl>
                    </Col>
                    <Col md='7' className='pt-3'>
                                <TextField
                                classes={{root: classes.accno}}
                                id="outlined-required"
                                label={!account_name?'ชื่อบัญชี':''}
                                value={account_name?account_name:''}
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
        other_amount : 1,
        person_info : [],
        property_info : [],
        other_info : [],
      }
    }
    onPersonInfoChange = (index, val) => {
      let cached = [...this.state.person_info]
      cached[index] = val
      this.setState({
        person_info : cached
      })
      const {onChangeData} = this.props
      onChangeData('person_info', cached)
    }
    onPropertyInfoChange = (index, val) => {
      let cached = [...this.state.property_info]
      cached[index] = val
      this.setState({
        property_info : cached
      })
      const {onChangeData} = this.props
      onChangeData('property_info', cached)
    }
    onOtherInfoChange = (index, val) => {
      let cached = [...this.state.other_info]
      cached[index] = val
      this.setState({
        other_info : cached
      })
      const {onChangeData} = this.props
      onChangeData('other_info', cached)
    }
    render () {
        const {person_amount, property_amount, other_amount} = this.state
        const {classes, relation_list,career_list, province_list} = this.props
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
            person_infomation.push(<GuranteePerson index={i}  classes={classes} onInfoChange={this.onPersonInfoChange} relation_list={relation_list} career_list={career_list} province_list={province_list}/>)
        }
        for (i=0 ; i < property_amount ; i++ ){ 
            property_infomation.push(<GuaranteeProperty index={i}  classes={classes} onInfoChange={this.onPropertyInfoChange} province_list={province_list}/>)
        }
        for (i=0 ; i < other_amount ; i++ ){ 
            other_infomation.push(<GuaranteeOther index={i}  classes={classes} onInfoChange={this.onOtherInfoChange}/>)
        }
        return (
            <>
                <SubHeader header='รายละเอียดหลักประกัน' isborder={true} />

                {/* <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    /> บุคคล
                </Row> */}
                {person_infomation.map((val,inex)=>{
                    return (val)
                })}
                <Row className="d-flex align-items-center"  style={{marginLeft:'10%',borderBottom:'1px solid #DADADA'}}  fluid onClick={addPerson}>  
                    <i className='ni ni-fat-add mr-3' style={{width:20,fontSize:20}}></i><h3>เพิ่มข้อมูลผู้คำประกัน</h3>
                </Row>

                {/* <Row className="d-flex align-items-center pt-5"  style={{marginLeft:'10%', marginTop:50}}  fluid>
                    <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    /> อสังหาริมทรัพย์
                </Row> */}
                {property_infomation.map((val,inex)=>{
                    return (val)
                })}
                <Row className="d-flex align-items-center"  style={{marginLeft:'10%',borderBottom:'1px solid #DADADA'}}  fluid onClick={addProperty}>  
                    <i className='ni ni-fat-add mr-3' style={{width:20,fontSize:20}}></i><h3>เพิ่มข้อมูลอสังหาริมทรัพย์</h3>
                </Row>

                {/* <Row className="d-flex align-items-center pt-5"  style={{marginLeft:'10%', marginTop:50}}  fluid>
                    <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    /> หลักประกันอื่น ๆ
                </Row> */}
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
    constructor (props) {
        super(props)
        this.state = {
            prefix : null,
            firstname : null,
            middlename : null,
            lastname : null,
            idcard : null,
            relation : null,
            career : null,
            income : null,
            expenditure : null,
            email : null,
            tel : null
        }
    }
    onChangeData = (field,val) => {
        this.setState({
            [field] : val
        })
        const temp = Object.assign({},this.state)
        temp[field] = val
        const {onInfoChange,index} = this.props
        onInfoChange(index,temp)
    }
    render () {
        const {classes,relation_list,career_list} = this.props
        const {prefix,relation ,career} = this.state
        let relation_render = []
        if(relation_list) relation_list.forEach(e=>{
            relation_render.push(<MenuItem value={e.guarantor_relation_id}>{e.guarantor_relation_name}</MenuItem>)
        })
        let career_render = []
        if(career_list) career_list.forEach(e=>{
            career_render.push(<MenuItem value={e.career_id}>{e.career_name}</MenuItem>)
        })
        return (
            <>
            
             <Row className="d-flex align-items-center pt-5"  style={{marginLeft:'10%'}}  fluid>
                    <Col>คำนำหน้า</Col>
                    <Col style={{marginLeft:'-50%'}}>
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        checked={prefix=='นาย'}
                        onChange={(e)=>{
                            this.onChangeData('prefix', e.target.value)
                        }}
                        value="นาย"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    นาย
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        style={{marginLeft:'5%'}}
                        checked={prefix=='นาง'}
                        onChange={(e)=>{
                            this.onChangeData('prefix', e.target.value)
                        }}
                        value="นาง"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    นาง
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        style={{marginLeft:'5%'}}
                        checked={prefix=='นางสาว'}
                        onChange={(e)=>{
                            this.onChangeData('prefix', e.target.value)
                        }}
                        value="นางสาว"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    นางสาว
                    </Col>
                </Row>

                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='3'>

                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="ชื่อจริง"
                        onChange={(e)=>{
                            this.onChangeData('firstname', e.target.value)
                        }}
                        variant="outlined"
                        />
                    
                    </Col>
                    <Col md='3'>

                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="ชื่อกลาง"
                        onChange={(e)=>{
                            this.onChangeData('middlename', e.target.value)
                        }}
                        variant="outlined"
                        />
                    
                    </Col>
                    <Col md='3'>

                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="นามสกุล"
                        onChange={(e)=>{
                            this.onChangeData('lastname', e.target.value)
                        }}
                        variant="outlined"
                        />
                    
                    </Col>
                    <Col md='3'>
                        <FormControl variant="outlined" className={classes.inputname}>
                            <InputLabel  variant="outlined"  htmlFor="formatted-text-mask-input">เลขบัตรประจำตัวประชาชน</InputLabel>
                            <OutlinedInput
                            label='เลขบัตรประจำตัวประชาชน'
                            onChange={(e)=>{
                                this.onChangeData('idcard', e.target.value)
                            }}
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
                                onChange={(e)=>{
                                    this.onChangeData('relation', e.target.value)
                                }}
                                label="ความสัมพันธ์กับผู้กู้"
                                value={relation}
                            >
                                {relation_render}
                            </Select>
                        </FormControl>
                    </Col>
                    <Col md='2'>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">อาชีพ</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={career}
                                label="อาชีพ"
                                onChange={(e)=>{
                                    this.onChangeData('career', e.target.value)
                                }}
                            >
                                {career_render}
                            </Select>
                        </FormControl>
                    </Col>
                    <Col md='4'>

                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="รายได้โดยประมาณ (บาท/เดือน)"
                            onChange={(e)=>{
                                this.onChangeData('income', e.target.value)
                            }}
                            variant="outlined"
                        />
                    </Col>
                    <Col md='4'>

                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="ค่าใช้จ่ายส่วนตัวโดยประมาณ (บาท/เดือน)"
                            onChange={(e)=>{
                                this.onChangeData('expenditure', e.target.value)
                            }}
                            variant="outlined"
                        />
                    </Col>
                </Row>

                <Row className="d-flex align-items-center pt-3 pb-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='3'>
                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="อีเมล"
                            onChange={(e)=>{
                                this.onChangeData('email', e.target.value)
                            }}
                            variant="outlined"
                        />
                    </Col>   
                    <Col md='3'>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel  variant="outlined"  htmlFor="formatted-text-mask-input">เบอร์โทร</InputLabel>
                            <OutlinedInput
                            label='เบอร์โทร'
                            name="textmask"
                            id="formatted-text-mask-input"
                            inputComponent={PhoneMask}
                            variant="outlined"
                            onChange={(e)=>{
                                this.onChangeData('phone_number', e.target.value)
                            }}
                            />
                        </FormControl>
                    </Col>    
                </Row>
            <Address classes={classes} province_list={this.props.province_list} onChangeState={this.onChangeData} code='guarantor'/>
            </>
        )
    }
}

class GuaranteeProperty extends Component {
    constructor (props) {
        super(props)
        this.state = {
            owner_amount : 1,
            detail : null,
            area : null,
            owner_info : [],
        }
    }
    onChangeOwner = (index, val) => {
        let cached = [...this.state.owner_info]
        cached[index] = val
        this.setState({
            owner_info : cached
        })
    }
    onChangeData = (field,val) => {
        this.setState({
            [field] : val
        })
        const temp = Object.assign({},this.state)
        temp[field] = val
        const {onInfoChange,index} = this.props
        onInfoChange(index,temp)
    }
    render () {
        const {owner_amount} = this.state
        const {classes,province_list} = this.props
        let owner = []
        let i = 0
        for (i=0 ; i < owner_amount ; i++ ){ 
            owner.push(<PropertyOwner index={i}  classes={classes} onChangeOwner={this.onChangeOwner}/>)
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
                        onChange={(e)=>{
                            this.onChangeData('detail', e.target.value)
                        }}
                        variant="outlined"
                    />
                </Col>
                <Col md='3'>
                
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="เนื้อที่ (ไร่)"
                        onChange={(e)=>{
                            this.onChangeData('area', e.target.value)
                        }}
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
            <Address classes={classes} province_list={province_list} onChangeState={this.onChangeData} code='guarantee'/>
            </>
        )
    }
}

class Address extends Component {

    constructor(props) {
        super(props)
        this.state = {
            address : null,
            address_name : null,
            province : '',
            amphur : '',
            district : '',
            amphur_list : [],
            district_list : [],
            postcode : ''
        }
    }
    onChangeProvince = (e) => {
        this.setState({
            province : e.target.value
        })

        const data =  {
              province_id : ''+e.target.value
        }
        axios.post('/cms/address/amphur', data).then(res=>{
            this.setState({
                amphur_list : res.data.Amphur,
                district_list : [],
                postcode : ''
            })
        })
    }
    onChangeAmphur = (e) => {
        this.setState({
            amphur : e.target.value
        })

        const data =  {
              amphur_id : ''+e.target.value
        }
        axios.post('/cms/address/district', data).then(res=>{
            this.setState({
                district_list : res.data.District,
                postcode : []
            })
        })
    }
    onChangeDistrict = (e) => {
        const {onChangeState, code} = this.props
        const {district_list} = this.state
        let postCode = ''
        district_list.forEach(item=>{
            if(item.district_id==e.target.value) postCode=item.district_postcode
        })
        this.setState({
            district : e.target.value,
            postcode : postCode
        })
        onChangeState(code + 'district_id',e.target.value)
    }
    render () {
        const {province, amphur, district,amphur_list, district_list,postcode} = this.state
        const {classes,province_list, onChangeState,code} = this.props
        let province_render = []
        if(province_list.length!=0)province_list.forEach(e=>{
            province_render.push(<MenuItem value={e.province_id}>{e.province_name}</MenuItem>)
        })
        let amphur_render = []
        if(amphur_list.length!=0)amphur_list.forEach(e=>{
            amphur_render.push(<MenuItem value={e.amphur_id}>{e.amphur_name}</MenuItem>)
        })
        let district_render = []
        if(district_list.length!=0)district_list.forEach(e=>{
            district_render.push(<MenuItem value={e.district_id}>{e.district_name}</MenuItem>)
        })
        return (
            <>
                
                    <Row className="d-flex align-items-center"  style={{marginLeft:'10%'}} fluid>
                        <Col md='6' className=''>
                            <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="ที่อยู่"
                            variant="outlined"
                            onChange={(e)=>{
                                onChangeState(code+'address', e.target.value)
                            }}
                            />
                        </Col>
                        <Col md='5' className=''>
                            <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="ชื่อสถานที่"
                            variant="outlined"
                            onChange={(e)=>{
                                onChangeState(code+'address_name', e.target.value)
                            }}
                            />
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-center pb-5"  style={{marginLeft:'10%'}} fluid>

                    <Col md='3' className='mt-3'>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">จังหวัด</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={province}
                            label="จังหวัด"
                            onChange={this.onChangeProvince}
                            label="Age"
                            >
                            {province_render}
                            </Select>
                        </FormControl>
                        </Col>
                        <Col md='3' className='mt-3'>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">เขต / อำเภอ</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={amphur}
                            label="เขต / อำเภอ"
                            onChange={this.onChangeAmphur}
                            disabled={amphur_list.lenght==0}
                            >
                            {amphur_render}
                            </Select>
                        </FormControl>
                        </Col>
                        <Col md='3' className='mt-3'>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">เเขวง / ตำบล</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={district}
                            label="เเขวง / ตำบล"
                            onChange={this.onChangeDistrict}
                            disabled={district_list.lenght==0}
                            >
                            {district_render}
                            </Select>
                        </FormControl>
                        </Col>
                        <Col md='2' className='mt-3'>
                            <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="รหัสไปรษณีย์"
                            value={postcode}
                            disabled
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
        const {classes,onChangeOwner,index} = this.props
        return (
            <>
                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='5'>
                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="ชื่อ-สกุล เจ้าของกรมสิทธิ์"
                            onChange={(e)=>{
                                onChangeOwner(index, e.target.value)
                            }}
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
            owner_amount : 1,
            info : [],
            detail : null,
            price : null,
        }
    }

    onChangeOwner = (index, val) => {
        let cached = [...this.state.info]
        cached[index] = val
        this.setState({
          info : cached
        })
    }
    onChangeData = (field,val) => {
        this.setState({
            [field] : val
        })
        const temp = Object.assign({},this.state)
        temp[field] = val
        const {onInfoChange,index} = this.props
        onInfoChange(index,temp)
    }
    render () {
        const {owner_amount} = this.state
        const {classes,onInfoChange} = this.props
        let owner = []
        let i = 0
        for (i=0 ; i < owner_amount ; i++ ){ 
            owner.push(<PropertyOwner index={i} classes={classes} onChangeOwner={this.onChangeOwner}/>)
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
                            onChange={(e)=>{
                                this.onChangeData('detail', e.target.value)
                            }}
                            variant="outlined"
                        />
                    </Col>
                    <Col md='3'>
                    
                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="มูลค่า (บาท)"
                            onChange={(e)=>{
                                this.onChangeData('price', e.target.value)
                            }}
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
        const {submitable, formSubmit} = this.props
        return (
            <Row className="d-flex align-items-center mt-5 justify-content-md-flex-end"  style={{marginLeft:'10%', paddingBottom:100}} fluid>

                <Button color="secondary" type="button">
                    ยกเลิก
                </Button>
                <Button color="primary" type="button" disabled={!submitable} onClick={formSubmit}>
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