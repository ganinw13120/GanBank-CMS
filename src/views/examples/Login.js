import React, { Component } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import bcrypt from 'bcryptjs'
import axios from 'axios';
import Swal from 'sweetalert2' 

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phone_number : null,
      password : null,
      remember_me : false
    }
  }
  onChangeData = (field,val) => {
    this.setState({
        [field] : val
    })
  }
  login = () => {
          Swal.fire('กำลังเข้าสู่ระบบ..')
          let data = this.state
          console.log(data.password)
          data.password = data.password ? bcrypt.hashSync(data.password, 8) : ''
          console.log(data)
          data.phone_number = data.phone_number ? data.phone_number.replace(/-/g, '') : ''
          axios.post('/cms/auth/login', data).then(res=>{
            const history = useHistory();
            history.push('/cms')
          })
          .catch(function (error) {
            Swal.fire({
                title: 'ไม่สำเร็จ!',
                icon: 'error',
                html: error.response.data.message,
              })
          })
  }
  render () {
    console.log(this.state)
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>เข้าสู่ระบบผ่านเบอร์โทร เเละรหัสผ่านของพนักงาน</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="เบอร์โทร"
                      type="phone_number"
                      onChange={(e)=>{
                        this.onChangeData('phone_number', e.target.value)
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="รหัสผ่าน"
                      type="password"
                      autoComplete="new-password"
                      onChange={(e)=>{
                        this.onChangeData('password', e.target.value)
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                  <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onChange={(e)=>{
                          this.onChangeData('remember_me', e.target.checked)
                        }}
                        value='on'
                    /> Remember me
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={this.login}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
  
};

export default Login;
