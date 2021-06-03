import React, {Component} from 'react'
import {Container, Row, Col} from "reactstrap";

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import { OutlinedInput } from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import axios from 'axios';

const styles = theme => ({
    formControl: {
    //   marginTop : 10,
      minWidth: '90%',
    },
    selectEmpty: {
    //   marginTop: theme.spacing(2),
    },
    radio: {
      '&$checked': {
        color: '#1C75FF'
      }
    },
    checked: {},
    inputname : {
      width : '90%',
      // minWidth:300
    }
  })

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
class PersonInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            gender :  null,
            prefix : null,
            status : null,
            career : null,
            education : null,
            firstname : null,
            middlename : null,
            lastname : null,
            income : null,
            phone_number : null,
            email : null,
            address : null,
            address_name : null,
            district_id : null,
            idcard : null,
            birthday : null,
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
        const {classes,career_list ,education_level,province_list} = this.props
        const {gender,prefix,status,career,education} = this.state


        let career_render = []
        if(career_list) career_list.forEach(e=>{
            career_render.push(<MenuItem value={e.career_id}>{e.career_name}</MenuItem>)
        })
        let education_render = []
        if(education_level) education_level.forEach(e=>{
            education_render.push(<MenuItem value={e.education_level_id}>{e.education_level_name}</MenuItem>)
        })
        return (
            <>
                <Container className='pb-5'>
                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%',verticalAlign:'super'}}  fluid>
                    <Col style={{verticalAlign:'text-top'}}>เพศต้นกำเนิด</Col>
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
                        style={{marginLeft:'10%'}}
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
                <Row className="d-flex align-items-center pt-2"  style={{marginLeft:'10%',verticalAlign:'super'}}  fluid>
                    <Col style={{verticalAlign:'text-top'}}>คำนำหน้า</Col>
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
                        style={{marginLeft:'10%'}}
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
                        style={{marginLeft:'10%'}}
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
                        onChange={(e)=>{
                          this.onChangeData('firstname', e.target.value)
                        }}
                        variant="outlined"
                    />
                </Col>
                <Col md='4' className='mt-4'>
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
                <Col md='4' className=' mt-4'>
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
                </Row>
                <Row className="d-flex align-items-center mt-3"  style={{marginLeft:'10%'}} fluid>
                <Col md='3' className='mt-4'>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">สถานภาพ</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={status}
                        label="สถานภาพ"
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
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="รายได้โดยประมาณ (บาท/เดือน)"
                        variant="outlined"
                        onChange={(e)=>{
                          this.onChangeData('income', e.target.value)
                        }}
                    />
                </Col>
                </Row>

                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='3' className='mt-4'>
                        
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
                    <Col md='3' className='mt-4'>
                        
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
                    <Col md='3' className='mt-4'>
                        
                         <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel  variant="outlined"  htmlFor="formatted-text-mask-input">เลขบัตรประจำตัวประชาชน</InputLabel>
                            <OutlinedInput
                            label='เลขบัตรประจำตัวประชาชน'
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
                    <Col md='3' className='mt-4'>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField
                                id="date"
                                label="วันเกิด"
                                type="date"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                variant="outlined"
                                onChange={(e)=>{
                                    console.log(e.target.value)
                                    this.onChangeData('birthday', e.target.value)
                                }}
                            />
                        </FormControl>
                    </Col>
                </Row>
                <Row className="d-flex align-items-center pt-5"  style={{marginLeft:'10%'}}  fluid>
                    <Col style={{verticalAlign:'text-top'}}>
                        <h3 className="display-6" style={{minWidth:150}}>ที่อยู่ติดต่อ :</h3>
                    </Col>
                </Row>
                <Address classes={classes} province_list={province_list} onChangeState={this.onChangeData} code='contract_'/>

                <Row className="d-flex align-items-center pt-5"  style={{marginLeft:'10%'}}  fluid>
                    <Col style={{verticalAlign:'text-top'}}>
                        <h3 className="display-6" style={{minWidth:150}}>ที่อยู่ที่ทำงาน :</h3>
                    </Col>
                </Row>
                <Address classes={classes} province_list={province_list} onChangeState={this.onChangeData} code='work_'/>
                
                </Container>
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
                
                    <Row className="d-flex align-items-center pt-2"  style={{marginLeft:'10%'}} fluid>
                        <Col md='5' className='mt-4'>
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
                        <Col md='6' className='mt-4'>
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
export default withStyles(styles)(PersonInfo);