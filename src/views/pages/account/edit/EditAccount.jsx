import React, { Component } from "react";
import { Container, Row, Col, Button} from "reactstrap";

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Swal from 'sweetalert2'
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
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
    width : '90%',
  }
})

class EditAccount extends Component{
  constructor (props) {
    super(props)
    this.state = {
      person_amount : 1,
      branch_list : [],
      account_type : [],
      province_list : [],
      education_level : [],
      career_list : [],
      branch_selected : null,
      account_type_selected : null,
      info : [],
      account_name : null,
    }
  }
  componentDidMount () {
    axios.post('/cms/account/prepare').then(res=>{
      console.log(res.data)
      this.setState({
          branch_list : res.data.branch,
          account_type : res.data.account_type,
          province_list : res.data.Province,
          education_level : res.data.education_level,
          career_list : res.data.career,
      })
    })
  }
  onChangeData = (field,val) => {
    this.setState({
        [field] : val
    })
  }
  onInfoChange = (index, val) => {
    let cached = [...this.state.info]
    cached[index] = val
    this.setState({
      info : cached
    })
  }
  formSubmit = () => {
    
    Swal.fire({
      title: 'ยืนยันการเเก้ไขบัญชี',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire('กำลังแก้ไขบัญชี..')
          
          const temp = Object.assign({},this.state)
          const { match: { params } } = this.props;
          const data = {
            account_name : temp.account_name,
            account_type_selected : temp.account_type_selected,
            account_no : params.id
          }
          console.log(data)
          axios.post('/cms/account/edit', data).then(res=>{
              Swal.fire({
                  title: 'สำเร็จ!',
                  icon: 'success',
                  confirmButtonText:
                    '<a href="/cms/account" style="text-decoration: none;color:white;">กลับไปหน้าหลัก</a>',
                })
          })
      }
    })

  }
  render () {
    const addPerson = (e) => {
      const {person_amount} = this.state
      this.setState({
        person_amount : person_amount+1
      })
    }
    const {branch_list,account_type ,branch_selected,account_type_selected } = this.state
    const {classes} = this.props
    let branch_render = []
    if(branch_list) branch_list.forEach(e=>{
        branch_render.push(<MenuItem value={e.branch_id}>{e.branch_name}</MenuItem>)
    })
    
    let account_render = []
    if(account_type) account_type.forEach(e=>{
      account_render.push(<MenuItem value={e.account_type_id}>{e.account_type_name}</MenuItem>)
    })
    const isFill = (val) => {
      if(val==null||val=='') return false;
      return true;
    }
    let submitable = isFill(this.state.account_name) && isFill(account_type_selected) && isFill(branch_selected)
    return (
      <>
        <div className="header bg-gradient-info pb-3 pt-5 pt-md-8" style={{zIndex:-1}}>

        <Container className="d-flex align-items-center" fluid>
            <Row>
                <Col>
                  <h1 className="display-2 text-white text-bold" >แบบฟอร์มการแก้ไขบัญชีธนาคาร</h1>
                </Col>
            </Row>
            </Container>
        </div>

        <Container className="pt-5" style={{marginLeft:'0%'}} fluid>
            <Row>
                <Col className='pr-8'>
                  <Container>
                    <h1 className="display-6 pt-3" style={{minWidth:150}}>ข้อมูลบัญชี</h1>
                  </Container>
                </Col>
                <Col md='8'>
                  <Row>
                    <Col className=''>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">ประเภท</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={account_type_selected}
                          label="ประเภท"
                          onChange={(e)=>{
                            this.onChangeData('account_type_selected', e.target.value)
                          }}
                        >
                          {account_render}
                        </Select>
                      </FormControl>
                    </Col>
                  </Row>
                  <Row className='pt-4 pl-3'>
                    <TextField
                      classes={{root: classes.inputname}}
                      id="outlined-required"
                      label="ชื่อบัญชี"
                      variant="outlined"
                      onChange={(e)=>{
                        this.onChangeData('account_name', e.target.value)
                      }}
                    />
                  </Row>
                </Col>
            </Row>
        </Container>
        <Container className="d-flex align-items-center pt-2"  style={{marginLeft:'0%',marginTop:40}} fluid>
          <Row className="d-flex align-items-center mt-5 justify-content-md-flex-end"  style={{marginLeft:'10%', paddingBottom:100}} fluid>

            <Button color="secondary" type="button">
              ยกเลิก
            </Button>
            <Button color="primary" type="button" disabled={!submitable} onClick={this.formSubmit}>
              ยืนยันการแก้ไขบัญชี
            </Button>
          </Row>
          </Container>
      </>
    )
  }
}

export default withStyles(styles)(EditAccount);