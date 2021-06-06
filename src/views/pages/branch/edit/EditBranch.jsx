import React, { Component } from "react";
import {  Container, Row, Col, Button} from "reactstrap";
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
import { OutlinedInput } from '@material-ui/core';
import Swal from 'sweetalert2'


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
    width : '80%',
  }
})

function PostcodeMask(props) {
    const { inputRef, ...other } = props;
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[ /[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }

class EditBranch extends Component{
  constructor (props) {
    super(props)
    this.state = {
        district_id : null,
        name : null,
        address : null,
    }
  }
  onDistrictFill = (id) => {
      this.setState({
          district_id : id
      })
  }
  onNameChange = (val) => {
    this.setState({
        name : val.target.value
    })
  }
  onAddressChange = (val) => {
    this.setState({
        address : val.target.value
    })
  }
  formsubmit = (val) => {
    Swal.fire({
        title: 'ยืนยันเเก้ไขสาขา',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('กำลังเเก้ไขสาขา...')
            const { match: { params } } = this.props;
            const {name, address, district_id} = this.state
            const data =  {
                branch_name : name,
                branch_address : address, 
                district_id : ""+district_id,
                branch_id : params.id
            }
            axios.post('/cms/branch/edit', data).then(res=>{
                Swal.fire({
                    title: 'สำเร็จ!',
                    icon: 'success',
                    confirmButtonText:
                      '<a href="/cms/branch" style="text-decoration: none;color:white;">กลับไปหน้าหลัก</a>',
                  })
            })
        }
      })
  }
  render () {
    const {classes} = this.props
    const {district_id, name, address} = this.state
    const submitable = district_id && name && address && district_id != null && name != null && address != null && district_id != '' && name != '' && address != ''
    return (
      <>
        <Header/>
        <Address classes={classes} onDistrictFill={this.onDistrictFill} onNameChange={this.onNameChange} onAddressChange={this.onAddressChange} />
        <Footer submitable={submitable} formsubmit={this.formsubmit} />
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
                    <h1 className="display-2 text-white text-bold" >แบบฟอร์มการแก้ไขสาขา</h1>
                    </Col>
                </Row>
                </Container>
            </div>
        )
    }
}

class Address extends Component {
    componentDidMount () {
        axios.post('/cms/address/province', {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }).then(res=>{
            this.setState({
                province_list : res.data.Province
            })
        })
    }
    constructor(props) {
        super(props)
        this.state = {
            province : '',
            amphur : '',
            district : '',
            province_list : [],
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
            console.log(res.data.Amphur)
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
            console.log(res.data.District)
            this.setState({
                district_list : res.data.District,
                postcode : []
            })
        })
    }
    onChangeDistrict = (e) => {
        const {onDistrictFill} = this.props
        const {district_list} = this.state
        let postCode = ''
        district_list.forEach(item=>{
            if(item.district_id==e.target.value) postCode=item.district_postcode
        })
        this.setState({
            district : e.target.value,
            postcode : postCode
        })
        onDistrictFill(e.target.value)
    }
    render () {
        const {province, amphur, district,province_list,amphur_list, district_list,postcode} = this.state
        const {classes, onDistrictFill, onNameChange, onAddressChange} = this.props
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
                <SubHeader header='รายละเอียดสาขา' />
                    <Row className="d-flex align-items-center mt-3"  style={{marginLeft:'11%'}} fluid>
                            <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="ชื่อสาขา"
                            variant="outlined"
                            onChange={onNameChange}
                            />
                    </Row>
                    <Row className="d-flex align-items-center mt-3"  style={{marginLeft:'11%'}} fluid>
                        <TextField
                                classes={{root: classes.inputname}}
                                id="outlined-required"
                                label="ที่อยู่"
                                variant="outlined"
                                onChange={onAddressChange}
                                />
                    </Row>
                    <Row className="d-flex align-items-center mt-3"  style={{marginLeft:'10%'}} fluid>
                        <Col md='3' className='mt-4'>
                            <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">{province_list.lenght ==0 ? 'กรุณารอสักครู่' : 'จังหวัด'}</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={province}
                                label="จังหวัด"
                                onChange={this.onChangeProvince}
                            >
                                {province_render}
                            </Select>
                            </FormControl>
                        </Col>
                        <Col md='2' className='mt-4'>
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
                        <Col md='2' className='mt-4'>
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
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel  variant="outlined"  htmlFor="formatted-text-mask-input">รหัสไปรษณีย์</InputLabel>
                                <OutlinedInput
                                label="รหัสไปรษณีย์"
                                name="textmask"
                                id="formatted-text-mask-input"
                                variant="outlined"
                                value={postcode}
                                disabled
                                />
                            </FormControl>
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
                แก้ไขสาขา
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
                <Container className="d-flex align-items-center pt-2"  style={{marginLeft:'0%',marginTop:40}} fluid>
                    <Row>
                        <Col className='pr-8'>
                        <Container>
                        <h1 className="display-6 pt-3 pb-4 ml-3" >{header}</h1>
                        </Container>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
export default withStyles(styles)(EditBranch);