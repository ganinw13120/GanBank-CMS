import React, { Component } from "react";
import { Form , Container, Row, Col, Button} from "reactstrap";

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MaskedInput from 'react-text-mask';
import { OutlinedInput } from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2' 

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
        mask={[ /[0-9]/,/\d/, /\d/, '-',  /\d/,'-', /\d/, /\d/, /\d/, /\d/, '-',/\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }

class Transfer extends Component{
  constructor (props) {
    super(props)
    this.state = {
        dest_no : null,
        dest_name : null,
        origin_no : null,
        origin_name : null,
        amount : null,
        bank_list : [],
        bank : null
    }
  }
  componentDidMount () {
    axios.post('/cms/transaction/prepare').then(res=>{
      this.setState({
        bank_list : res.data,
      })
    })
  }
  onChangeData = (field,val) => {
    this.setState({
        [field] : val
    })
  }
  formSubmit = () => {
    console.log('submit..')

    Swal.fire({
      title: 'ยืนยันการทำรายการ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire('กำลังทำรายการ..')
          const data = this.state
          data.bank_list = null
          data.dest_no = data.dest_no.replace(/-/g, '').trim()
          data.origin_no = data.origin_no.replace(/-/g, '').trim()
          data.token = localStorage.getItem('token')
          console.log(data)
          axios.post('/cms/transaction/transfer', data).then(res=>{
              Swal.fire({
                  title: 'สำเร็จ!',
                  icon: 'success',
                  confirmButtonText:
                    '<a href="/cms/transaction" style="text-decoration: none;color:white;">กลับไปหน้าหลัก</a>',
                })
          })
          .catch(function (error) {
            Swal.fire({
                title: 'ไม่สำเร็จ!',
                icon: 'error',
                html: error.response.data.message,
                confirmButtonText:
                  '<a href="/cms/transaction" style="text-decoration: none;color:white;">กลับไปหน้าหลัก</a>',
              })
          })
      }
    })
  }
  render () {
    const {classes} = this.props
    const {bank_list,dest_no,dest_name,origin_no, origin_name, amount, bank} = this.state
    const submitable = dest_no && dest_name && origin_no && origin_name && amount && amount!=0 && bank
    return (
      <>
        <Header/>

        <Container className="" style={{marginLeft:'0%'}} fluid>
        <Origin classes={classes} onChangeData={this.onChangeData}/>
        <Destination  classes={classes} onChangeData={this.onChangeData} bank_list={bank_list}/>
        <Footer formSubmit={this.formSubmit} submitable={submitable}/>
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
                    <h1 className="display-2 text-white text-bold" >แบบฟอร์มการโอนเงิน</h1>
                    </Col>
                </Row>
                </Container>
            </div>
        )
    }
}

class Origin extends Component {
    constructor (props) {
        super(props)
        this.state = {
            origin_no : null,
            origin_name : null,
        }
    }
    onAccountChange = (val) =>{
        const data = {
            account_no : val.replace(/-/g, '').trim()
        }
        axios.post('/cms/account/name', data).then(res=>{
            const {onChangeData} = this.props
            onChangeData('origin_name', res.data.account_name)
            this.setState({
                origin_name : res.data.account_name
            })
        })
    }
    render () {
        const {classes,onChangeData} = this.props 
        const {origin_name} = this.state
        return (
            <>
                <Container className="pt-5" style={{marginLeft:'0%'}} fluid>
                    <Row>
                        <Col className='pr-0'>
                        <Container>
                            <h1 className="display-6 pt-3" style={{minWidth:150}}>บัญชีต้นทาง</h1>
                        </Container>
                        </Col>
                        <Col md='8'>
                            <Row>
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
                            </Row>
                            <Row className='mt-3'>
                                <TextField
                                classes={{root: classes.accno}}
                                id="outlined-required"
                                label={!origin_name?'ชื่อบัญชี':''}
                                value={origin_name?origin_name:''}
                                variant="outlined"
                                disabled
                                />
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

class Destination extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dest_no : null,
            dest_name : null,
        }
    }
    onAccountChange = (val) =>{
        const data = {
            account_no : val.replace(/-/g, '').trim()
        }
        axios.post('/cms/account/name', data).then(res=>{
        // console.log(res)
        const {onChangeData} = this.props
        onChangeData('dest_name', res.data.account_name)
            this.setState({
                dest_name : res.data.account_name
            })
        })
    }
    onChangeBank = (e) => {
        this.setState({
            bank : e.target.value
        })
    }
    render () {
        const {classes,onChangeData,bank_list} = this.props
        const {bank, dest_name} = this.state
        let bank_render = []
        if(bank_list) bank_list.forEach(e=>{
            bank_render.push(<MenuItem value={e.bank_id}>{e.bank_name}</MenuItem>)
        })
        return (
            <>
                <Container className="pt-4 mt-5" style={{marginLeft:'0%', borderTop:'1px solid #DADADA'}} fluid>
                    <Row>
                        <Col className='pr-0'>
                        <Container>
                            <h1 className="display-6 pt-3" style={{minWidth:150}}>บัญชีปลายทาง</h1>
                        </Container>
                        </Col>
                        <Col md='8' className='ml-3'>
                            <Row>
                                <FormControl variant="outlined" className={classes.accno}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">ธนาคาร</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={bank}
                                        onChange={
                                            (e)=>{
                                                this.onChangeBank(e)
                                                onChangeData('bank', e.target.value)
                                            }
                                        }
                                        label="------------"
                                    >
                                        {bank_render}
                                    </Select>
                                    </FormControl>
                                </FormControl>
                            </Row>
                            <Row className='mt-3'> 
                                <FormControl variant="outlined" className={classes.accno}>
                                    <InputLabel  variant="outlined"  htmlFor="formatted-text-mask-input">เลขที่บัญชีธนาคาร</InputLabel>
                                    <OutlinedInput
                                    label='เลขที่บัญชีธนาคาร'
                                    // style={{fontSize:25}}
                                    onChange={(e)=>{
                                        onChangeData('dest_no', e.target.value)
                                        this.onAccountChange(e.target.value)
                                    }}
                                    name="textmask"
                                    id="formatted-text-mask-input"
                                    inputComponent={AccountNumberMask}
                                    variant="outlined"
                                    />
                                </FormControl>
                            </Row>
                            <Row className='mt-3'> 
                                <TextField
                                classes={{root: classes.accno}}
                                id="outlined-required"
                                label={!dest_name?'ชื่อบัญชี':''}
                                value={dest_name?dest_name:''}
                                variant="outlined"
                                disabled
                                />
                            </Row>
                            <Row className='mt-3'> 
                                <TextField
                                classes={{root: classes.accno}}
                                id="outlined-required"
                                label="จำนวนเงิน (บาท)"
                                variant="outlined"
                                onChange={
                                    (e)=>{
                                        onChangeData('amount', e.target.value)
                                    }
                                }
                                />
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
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
                    ทำรายากร
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
export default withStyles(styles)(Transfer);