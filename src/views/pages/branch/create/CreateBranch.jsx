import React, { Component } from "react";
import { Form , Container, Row, Col, Button} from "reactstrap";
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
import { OutlinedInput } from '@material-ui/core';

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

class CreateBranch extends Component{
  constructor (props) {
    super(props)
    this.state = {
      person_amount : 1
    }
  }
  onChangeProvince = (e) => {
      console.log(e.target.value)
  }
  render () {
    const onChange = (e) => {
      console.log(e)
    }
    const {classes} = this.props
    return (
      <>
        <Header/>
        <Address classes={classes} onChangeProvince={this.onChangeProvince}/>
        <Footer />
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
                    <h1 className="display-2 text-white text-bold" >แบบฟอร์มการเพิ่มสาขา</h1>
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
                amphur_list : res.data.Amphur
            })
          })
    }
    onChangeAmphur = (e) => {
        this.setState({
            amphur : e.target.value
        })
    }
    onChangeDistrict = (e) => {
        this.setState({
            district : e.target.value
        })
    }
    render () {
        const {province, amphur, district,province_list,amphur_list} = this.state
        const {classes, onChangeProvince} = this.props
        let province_render = []
        if(province_list.length!=0)province_list.forEach(e=>{
            province_render.push(<MenuItem value={e.province_id}>{e.province_name}</MenuItem>)
        })
        let amphur_render = []
        if(amphur_list.length!=0)amphur_list.forEach(e=>{
            amphur_render.push(<MenuItem value={e.amphur_id}>{e.amphur_name}</MenuItem>)
        })
        return (
            <>
                <SubHeader header='รายละเอียดสาขา' />
                    <Row className="d-flex align-items-center mt-3"  style={{marginLeft:'11%'}} fluid>
                            <TextField
                            classes={{root: classes.inputname}}
                            id="outlined-required"
                            label="ชื่อสาขา"
                            defaultValue="สาขาเซนทรัลพระราม 2"
                            variant="outlined"
                            />
                    </Row>
                    <Row className="d-flex align-items-center mt-3"  style={{marginLeft:'11%'}} fluid>
                        <TextField
                                classes={{root: classes.inputname}}
                                id="outlined-required"
                                label="ที่อยู่"
                                defaultValue="สาขาเซนทรัลพระราม 2 ชั้น 10"
                                variant="outlined"
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
                                disabled={true}
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
                            >
                                <MenuItem value={10}>บางมด</MenuItem>
                                <MenuItem value={20}>ผักไห่</MenuItem>
                                <MenuItem value={30}>ลาดน้ำเค็ม</MenuItem>
                            </Select>
                            </FormControl>
                        </Col>
                        <Col md='2' className='mt-4'>
                            <FormControl variant="outlined" className={classes.accno}>
                                <InputLabel  variant="outlined"  htmlFor="formatted-text-mask-input">รหัสไปรษณีย์</InputLabel>
                                <OutlinedInput
                                label="รหัสไปรษณีย์"
                                name="textmask"
                                id="formatted-text-mask-input"
                                variant="outlined"
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
        return (
            <Row className="d-flex align-items-center mt-5 justify-content-md-flex-end"  style={{marginLeft:'10%', paddingBottom:100}} fluid>

                <Button color="secondary" type="button">
                ยกเลิก
                </Button>
                <Button color="primary" type="button">
                เพิ่มสาขา
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
export default withStyles(styles)(CreateBranch);