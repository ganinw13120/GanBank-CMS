import React, { Component } from "react";
import { Container, Row, Col, Button} from "reactstrap";

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
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
        mask={[ /[0-9]/, '-', /\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/, '-',/\d/, /\d/,/\d/,/\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }

class Deposit extends Component{
  constructor (props) {
    super(props)
    this.state = {
      transaction_type : null,
      account_no : null,
      transaction_amount : null,
      transaction_executor_name : null,
      account_name : null
    }
  }
  onChangeData = (field,val) => {
    this.setState({
        [field] : val
    })
  }
  formsubmit = (e) => {
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
          data.account_no = data.account_no.replace(/-/g, '').trim()
          console.log(data)
          axios.post('/cms/transaction/create', data).then(res=>{
              Swal.fire({
                  title: 'สำเร็จ!',
                  icon: 'success',
                  confirmButtonText:
                    '<a href="/cms/transaction" style="text-decoration: none;color:white;">กลับไปหน้าหลัก</a>',
                })
          })
      }
    })
  }
  render () {
    const {classes} = this.props
    const {transaction_type,account_no,transaction_amount,transaction_executor_name,account_name} = this.state
    const submitable = transaction_type && account_no && account_no != '' && transaction_amount && transaction_amount != '' && transaction_executor_name && transaction_executor_name != '' && account_name
    return (
      <>
        <Header/>

        <Container className="" style={{marginLeft:'0%'}} fluid>
            <TransactionType classes={classes} onChangeData={this.onChangeData}/>
            <TransactinoDetail classes={classes} onChangeData={this.onChangeData}/>
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
                    <h1 className="display-2 text-white text-bold" >แบบฟอร์มการฝาก / ถอน</h1>
                    </Col>
                </Row>
                </Container>
            </div>
        )
    }
}

class TransactionType extends Component {
    constructor (props) {
      super(props)
      this.state = {
        transaction_type : null,
      }
    }
    onTypeChange = (e) => {
      this.setState({
        transaction_type : e.target.value
      })
    }
    render () {
        const {classes,onChangeData} = this.props
        const {transaction_type} = this.state
        return (
            <>
                <Container className="pt-0" style={{marginLeft:'0%'}} fluid>
                    <Row className='pt-5' >
                        <Col className='pr-0'>
                        <Container>
                            <h1 className="display-6 pt-3" style={{minWidth:150}}>ธุรกรรม</h1>
                        </Container>
                        </Col>
                        <Col md='8' className='ml-3'>
                            <Radio
                                classes={{root: classes.radio, checked: classes.checked}}
                                checked={transaction_type==1}
                                onChange={(e)=>{
                                  onChangeData('transaction_type', e.target.value)
                                  this.onTypeChange(e)
                                }}
                                value="1"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                            ฝาก
                            <Radio
                                classes={{root: classes.radio, checked: classes.checked}}
                                style={{marginLeft:'5%'}}
                                checked={transaction_type==3}
                                onChange={(e)=>{
                                  onChangeData('transaction_type', e.target.value)
                                  this.onTypeChange(e)
                                }}
                                value="3"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                            ถอน
                        </Col>
                    </Row>
                    </Container>
            </>
        )
    }
}

class TransactinoDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account_name : null
    }
  }
  onAccountChange = (val) =>{
    const data = {
      account_no : val.replace(/-/g, '').trim()
    }
    axios.post('/cms/account/name', data).then(res=>{
      // console.log(res)
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
                <SubHeader header='รายละเอียด' isborder={true} />
                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='4'>
                        <FormControl variant="outlined" className={classes.accno}>
                            <InputLabel  variant="outlined"  htmlFor="formatted-text-mask-input">เลขที่บัญชีธนาคาร</InputLabel>
                            <OutlinedInput
                            label='เลขที่บัญชีธนาคาร'
                            // style={{fontSize:25}}
                            onChange={(e)=>{
                              onChangeData('account_no', e.target.value)
                              this.onAccountChange(e.target.value)
                            }}
                            name="textmask"
                            id="formatted-text-mask-input"
                            inputComponent={AccountNumberMask}
                            variant="outlined"
                            />
                        </FormControl>
                    </Col>
                    <Col md='4'>
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
                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%'}}  fluid>
                    <Col md='4'>
                        <TextField
                        classes={{root: classes.accno}}
                        id="outlined-required"
                        label="ผู้ทำธุรกรรม"
                        onChange={(e)=>{
                          onChangeData('transaction_executor_name', e.target.value)
                        }}
                        variant="outlined"
                        />
                    </Col>
                    <Col md='4'>
                        <TextField
                        classes={{root: classes.accno}}
                        id="outlined-required"
                        label="จำนวน (บาท)"
                        onChange={(e)=>{
                          onChangeData('transaction_amount', e.target.value)
                        }}
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
      const {formsubmit,submitable} = this.props
        return (
            <Row className="d-flex align-items-center mt-5 justify-content-md-flex-end"  style={{marginLeft:'10%', paddingBottom:100}} fluid>

                <Button color="secondary" type="button">
                    ยกเลิก
                </Button>
                <Button color="primary" type="button" disabled={!submitable} onClick={formsubmit}>
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
export default withStyles(styles)(Deposit);