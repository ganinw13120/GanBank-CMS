import React, { Component } from "react";
import { Container, Row, Col, Button} from "reactstrap";

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
import { OutlinedInput } from '@material-ui/core';
import axios from 'axios';
import bcrypt from 'bcryptjs'
import Swal from 'sweetalert2' 
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
let info = {}

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

class EditEmployee extends Component{
  constructor (props) {
    super(props)
    this.state = {
        branch_list : [],
        province_list : [],
        education_level : [],
        branch_id : null,
        info_complete : false,
        address : null,
        address_name : null,
        district_id : null,
        position_id :null,
        position_list : null,
    }
  }
  componentDidMount () {
    axios.post('/cms/staff/prepare').then(res=>{
        this.setState({
            branch_list : res.data.branch,
            province_list : res.data.Province,
            education_level : res.data.education_level,
            position_list : res.data.Position
        })
    })
  }
  onChangeBranch = (e) => {
    this.setState({
        branch_id : e,
    })
  }
  onPositionChange = (e) => {
    this.setState({
        position_id : e,
    })
  }
  onChangeInfo = (e) => {
    this.setState({
        info_complete : e,
    })
  }
  onChangeAddress = (e) => {
    this.setState({
        district_id : e
    })
  }
  onChangeState = (field, val) => {
    this.setState({
        [field] : val
    })
  }
  formsubmit = () => {
    Swal.fire({
        title: 'ยืนยันการแก้ไขพนักงาน',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('กำลังแก้ไขพนักงาน..')
            const { match: { params } } = this.props;
            const {branch_id, address, address_name, district_id, position_id} = this.state
            let data = info
            data.branch_id = branch_id
            data.address = address
            data.address_name = address_name
            data.district_id = district_id
            data.position_id = position_id
            data.staff_id = params.id
            data.idcard = data.idcard.replace(/-/g, '')
            data.phone_number = data.phone_number.replace(/-/g, '')
            console.log(data)
            axios.post('/cms/staff/edit', data).then(res=>{
                Swal.fire({
                    title: 'สำเร็จ!',
                    icon: 'success',
                    confirmButtonText:
                      '<a href="/cms/employee" style="text-decoration: none;color:white;">กลับไปหน้าหลัก</a>',
                  })
            })
        }
      })
  }
  render () {
    const {classes} = this.props
    const {branch_list, province_list, education_level,branch_id,info_complete, district_id, address, address_name, position_list} = this.state
    const submitable = branch_id != null && info_complete && district_id && address && address_name
    return (
      <>
        <Header/>

        <Container className="" style={{marginLeft:'0%'}} fluid>
        <Branch classes={classes} branch_list={branch_list} onChangeBranch={this.onChangeBranch} />
        <Position classes={classes} position_list={position_list} onChangePosition={this.onPositionChange} />
        <StaffInfo classes={classes} education_level={education_level} onChangeInfo={this.onChangeInfo}/>
        <Address classes={classes} province_list={province_list} onChangeAddress={this.onChangeAddress} onChangeState={this.onChangeState}/>
        <Footer submitable={submitable} formsubmit={this.formsubmit}/>
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
                    <h1 className="display-2 text-white text-bold" >แบบฟอร์มแก้ไขข้อมูลพนักงาน</h1>
                    </Col>
                </Row>
                </Container>
            </div>
        )
    }
}

class Branch extends Component {
    constructor (props) {
        super(props)
        this.state = {
            branch_id : null
        }
    }
    onChangeBranchInComponent = (e) => {
        const {onChangeBranch} = this.props
        this.setState({
            branch_id : e.target.value
        })
        onChangeBranch(e.target.value)
    }
    render () {
        const {classes, branch_list} = this.props
        const {branch_id} = this.state
        let branch_render = []
        if(branch_list) branch_list.forEach(e=>{
            branch_render.push(<MenuItem value={e.branch_id}>{e.branch_name}</MenuItem>)
        })
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
                                value={branch_id}
                                label="Age"
                                onChange={this.onChangeBranchInComponent}
                                >
                                    {branch_render}
                                </Select>
                            </FormControl>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

class Position extends Component {
    constructor (props) {
        super(props)
        this.state = {
            position_id : null
        }
    }
    onChangePositionInComponent = (e) => {
        const {onChangePosition} = this.props
        this.setState({
            position_id : e.target.value
        })
        onChangePosition(e.target.value)
    }
    render () {
        const {classes, position_list} = this.props
        const {position_id} = this.state
        let position_render = []
        if(position_list) position_list.forEach(e=>{
            position_render.push(<MenuItem value={e.position_id}>{e.position_name}</MenuItem>)
        })
        return (
            <>
                <Container className="pt-5" style={{marginLeft:'0%'}} fluid>
                    <Row>
                        <Col className='pr-0'>
                        <Container>
                            <h1 className="display-6 pt-3" style={{minWidth:150}}>ตำเเหน่ง</h1>
                        </Container>
                        </Col>
                        <Col md='8'>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">เลือกตำเเหน่ง</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={position_id}
                                label="Age"
                                onChange={this.onChangePositionInComponent}
                                >
                                    {position_render}
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
    constructor (props) {
        super(props)
        this.state = {
            gender : null,
            prefix : null,
            firstname : null,
            middlename : null,
            lastname : null,
            status : null,
            education : null,
            birthday : null,
            idcard : null,
            email : null,
            phone_number : null,
            showpassword : false,
            password : null,
        }

    }
    onChangeData = (field,val) => {
        const temp = Object.assign({},this.state)
        temp[field] = val
        this.setState({
            [field] : val
        })
        info = temp
        temp.showpassword = 'test'
        const {onChangeInfo} = this.props
        onChangeInfo(!Object.values({temp}).some(v=>v==null||v==''))
    
    }
    
    handleClickShowPassword = (e) => {
        const {showpassword} = this.state
        this.setState({
            showpassword : !showpassword
        })
    }
    render () {
        const {classes,education_level,idcard} = this.props
        const {gender, prefix,status, education, showpassword, password} = this.state
        let education_render = []
        if(education_level) education_level.forEach(e=>{
            education_render.push(<MenuItem value={e.education_level_id}>{e.education_level_name}</MenuItem>)
        })
        return (
            <>
                <SubHeader header='ข้อมูลพนักงาน' />

                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col>เพศต้นกำเนิด</Col>
                    <Col style={{marginLeft:'-50%'}}>
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        checked={gender=='male'}
                        onChange={(e)=>{
                            this.onChangeData('gender', e.target.value)
                        }}
                        value="male"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    ชาย
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        style={{marginLeft:'5%'}}
                        checked={gender=='female'}
                        onChange={(e)=>{
                            this.onChangeData('gender', e.target.value)
                        }}
                        value="female"
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

                <Row className="d-flex align-items-center"  style={{marginLeft:'10%'}} fluid>
                <Col md='4' className='mt-4'>
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="ชื่อ"
                        variant="outlined"
                        onChange={(e)=>{
                            this.onChangeData('firstname', e.target.value)
                        }}
                    />
                </Col>
                <Col md='4' className='mt-4'>
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="ชื่อกลาง"
                        variant="outlined"
                        onChange={(e)=>{
                            this.onChangeData('middlename', e.target.value)
                        }}
                    />
                </Col>
                <Col md='4' className=' mt-4'>
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="นามสกุล"
                        variant="outlined"
                        onChange={(e)=>{
                            this.onChangeData('lastname', e.target.value)
                        }}
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
                        value={status}
                        label='สถานภาพ'
                        onChange={(e)=>{
                            this.onChangeData('status', e.target.value)
                        }}
                    >
                        <MenuItem value='single'>โสด</MenuItem>
                        <MenuItem value='marry'>แต่งงาน</MenuItem>
                        <MenuItem value='divorced'>หย่าร้าง</MenuItem>
                        <MenuItem value='separate'>แยกทาง</MenuItem>
                    </Select>
                    </FormControl>
                </Col>
                <Col md='3' className='mt-4'>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">วุฒิการศึกษา</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={education}
                        label="วุฒิการศึกษา"
                        onChange={(e)=>{
                            this.onChangeData('education', e.target.value)
                        }}
                    >
                        {education_render}
                    </Select>
                    </FormControl>
                </Col>
                <Col md='3' className='mt-4'>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField
                            id="date"
                            label="วันเกิด"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            variant="outlined"
                            onChange={(e)=>{
                                this.onChangeData('birthday', e.target.value)
                            }}
                        />
                    </FormControl>
                </Col>
                <Col md='3' className='mt-4'>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel  variant="outlined"  htmlFor="formatted-text-mask-input">เลขบัตรประจำตัวประชาชน</InputLabel>
                        <OutlinedInput
                        value={idcard}
                        label='เลขบัตรประจำตัวประชาชน'
                        // style={{fontSize:25}}
                        name="textmask"
                        id="formatted-text-mask-input"
                        inputComponent={IDCardMask}
                        variant="outlined"
                        onChange={(e)=>{
                            this.onChangeData('idcard', e.target.value)
                        }}
                        />
                    </FormControl>
                </Col>
                </Row>
                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='4' className='mt-4'>
                        
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
                    <Col md='4' className='mt-4'>
                        
                        <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="อีเมล"
                            variant="outlined"
                            onChange={(e)=>{
                                this.onChangeData('email', e.target.value)
                            }}
                        />
                    </Col>
                </Row>
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
        const {onChangeAddress} = this.props
        const {district_list} = this.state
        let postCode = ''
        district_list.forEach(item=>{
            if(item.district_id==e.target.value) postCode=item.district_postcode
        })
        this.setState({
            district : e.target.value,
            postcode : postCode
        })
        onChangeAddress(e.target.value)
    }
    onChangeData = (field,val) => {
        const {onChangeState} = this.props
        onChangeState(field, val)
    }
    render () {
        const {province, amphur, district,amphur_list, district_list,postcode} = this.state
        const {classes,province_list, onChangeState} = this.props
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
                <SubHeader header='ที่อยู่ติดต่อ'/>
                
                    <Row className="d-flex align-items-center"  style={{marginLeft:'10%'}} fluid>
                        <Col md='5' className='mt-4'>
                            <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="ชื่อสถานที่ติดต่อ"
                            variant="outlined"
                            onChange={(e)=>{
                                onChangeState('address_name', e.target.value)
                            }}
                            />
                        </Col>
                        <Col md='6' className='mt-4'>
                            <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="ที่อยู่ติดต่อ"
                            variant="outlined"
                            onChange={(e)=>{
                                onChangeState('address', e.target.value)
                            }}
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
                            value={province}
                            label="จังหวัด"
                            onChange={this.onChangeProvince}
                            label="Age"
                            >
                            {province_render}
                            </Select>
                        </FormControl>
                        </Col>
                        <Col md='3' className='mt-4'>
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
                        <Col md='3' className='mt-4'>
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
                        <Col md='2' className='mt-4'>
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
class Footer extends Component {
    render () {
        const {submitable, formsubmit} = this.props
        return (
            <Row className="d-flex align-items-center mt-5 justify-content-md-flex-end"  style={{marginLeft:'10%', paddingBottom:100}} fluid>

                <Button color="secondary" type="button">
                    ยกเลิก
                </Button>
                <Button color="primary" type="button" disabled={!submitable} onClick={formsubmit}>
                    แก้ไขพนักงาน
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
export default withStyles(styles)(EditEmployee);