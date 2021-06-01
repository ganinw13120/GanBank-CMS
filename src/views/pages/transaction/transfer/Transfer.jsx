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

class Transfer extends Component{
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
        <Origin classes={classes}/>
        <Destination  classes={classes}/>
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
                    <h1 className="display-2 text-white text-bold" >แบบฟอร์มการโอนเงิน</h1>
                    </Col>
                </Row>
                </Container>
            </div>
        )
    }
}

class Origin extends Component {
    render () {
        const {classes} = this.props
        const onChange = (e) => {
          console.log(e.target.value)
        }
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
                            </Row>
                            <Row className='mt-3'>
                                <TextField
                                classes={{root: classes.accno}}
                                id="outlined-required"
                                label="ชื่อบัญชี"
                                defaultValue="นายแกน มงคลากร"
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
    render () {
        const {classes} = this.props
        const onChange = (e) => {
          console.log(e.target.value)
        }
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
                                        value='10'
                                        label="------------"
                                    >
                                        <MenuItem value={10}>Gan Banking</MenuItem>
                                        <MenuItem value={20}>ธนาคารกสิกรไทย</MenuItem>
                                        <MenuItem value={30}>ธนาคารกรุงเทพ</MenuItem>
                                    </Select>
                                    </FormControl>
                                </FormControl>
                            </Row>
                            <Row className='mt-3'> 
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
                            </Row>
                            <Row className='mt-3'> 
                                <TextField
                                classes={{root: classes.accno}}
                                id="outlined-required"
                                label="จำนวนเงิน (บาท)"
                                defaultValue="999"
                                variant="outlined"
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
        return (
            <Row className="d-flex align-items-center mt-5 justify-content-md-flex-end"  style={{marginLeft:'10%', paddingBottom:100}} fluid>

                <Button color="secondary" type="button">
                    ยกเลิก
                </Button>
                <Button color="primary" type="button">
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