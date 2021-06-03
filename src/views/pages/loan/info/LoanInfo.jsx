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
class LoanInfo extends Component{
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
        <Container>
                asdasdadasd
        </Container>
      </>
    )
  }
}

export default withStyles(styles)(LoanInfo);