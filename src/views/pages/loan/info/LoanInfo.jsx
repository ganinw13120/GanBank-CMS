import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";

import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Moment from 'react-moment';
import Swal from 'sweetalert2' 

const styles = theme => ({
  formControl: {
    marginTop: 20,
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
  inputname: {
    marginTop: 20,
    width: '90%',
  },
  accno: {
    marginTop: 10,
    minWidth: 300
  }
})
class LoanInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id : null,
      data : null,
      guarantee : [],
      guarantor : [],
      guarantee_owner : [],
      guarantor_owner : [],
      property : [],
    }
  }
  componentDidMount(){
    const { match: { params } } = this.props;
    axios.post('/cms/loan/find', {loan_id : params.id}).then(res=>{
      console.log(res.data)
      this.setState({
        id : params.id,
        data : res.data.data[0],
        guarantee : res.data.guarantee,
        guarantor : res.data.person,
        guarantee_owner : res.data.guarantee_owner,
        property : res.data.property,
        property_owner : res.data.property_owner,
      })
    })
  }
  updateStatus = (val) => {
    Swal.fire({
      title: 'ยืนยันการเปลี่ยนสถานะสินเชื่อ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire('กำลังทำรายการเปลี่ยนสถานะสินเชื่อ..')
          const data = {
            id : this.state.id,
            new_status : val
          }
          axios.post('/cms/loan/update', data).then(res=>{
              Swal.fire({
                  title: 'สำเร็จ!',
                  icon: 'success',
                  confirmButtonText:
                    '<a href="/cms/loan" style="text-decoration: none;color:white;">กลับไปหน้าหลัก</a>',
                })
          })
          .catch(function (error) {
            Swal.fire({
                title: 'ไม่สำเร็จ!',
                icon: 'error',
                html: error.response.data.message,
                confirmButtonText:
                  '<a href="/cms/loan" style="text-decoration: none;color:white;">กลับไปหน้าหลัก</a>',
              })
          })
      }
    })
  }
  render() {
    const { classes } = this.props
    return (
      <>
        <Header id={this.state.id}
          data={this.state.data}/>
        <Container className="" style={{ marginLeft: '0%' }} fluid>
          {this.state.data ? <Detail classes={classes}  
          data={this.state.data}
          guarantee ={this.state.guarantee}
          guarantor ={this.state.guarantor}
          guarantee_owner ={this.state.guarantee_owner}
          property_owner ={this.state.property_owner}
          property ={this.state.property}
          /> : '' }
          <Footer updateStatus={this.updateStatus} />
        </Container>
      </>
    )
  }
}
class Header extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    console.log(this.props) 
    return (
      <div className="header bg-gradient-info pb-3 md-5 pt-7" style={{ zIndex: -1 }}>

        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col>
              <h1 className="display-2 text-white text-bold" >รายละเอียดสินเชื่อ</h1>
              <h2 className=" text-white" >สินเชื่อเลขที่ : {this.props.id}</h2>
              <h2 className=" text-white" >สถานะปัจจุบัน : {this.props.data ? this.props.data.loan_status==='accepted' ? 'ได้รับการอนุมัติ' : this.props.data.loan_status==='pending' ? 'รอการอนุมัติ' : 'ไม่อนุมัติ' : ''}</h2>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
class Footer extends Component {
  render() {
    return (
      <Row className="d-flex align-items-center mt-5 justify-content-md-flex-end" style={{ marginLeft: '10%', paddingBottom: 100 }} fluid>

        <Button color="secondary" type="button" onClick={(e)=>{
          this.props.updateStatus('declined')
        }}>
          ไม่อนุมัติ
              </Button>
        <Button color="primary" type="button" onClick={(e)=>{
          this.props.updateStatus('accepted')
        }}>
          อมุมัติ
              </Button>
      </Row>
    )
  }
}
class SubHeader extends Component {
  render() {
    const { header, isborder } = this.props
    const border = isborder ? '1px solid #DADADA' : ''
    return (
      <>
        <Container className="d-flex align-items-center pt-2" style={{ marginLeft: '0%', marginTop: 40, borderTop: border }} fluid>
          <Row>
            <Col className='pr-8'>
              <Container>
                <h1 className="display-6 pt-3 pb-4 " >{header}</h1>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
class Detail extends Component {
  render() {
    const { classes,data } = this.props
    let guarantor_render = []
    if(this.props.guarantor) {
      guarantor_render.push(<SubHeader header='ผู้ค้ำประกัน' isborder={true} />)
      this.props.guarantor.forEach(e=>{
      guarantor_render.push(<>

      <Container className="d-flex align-items-center" style={{ marginLeft: '0%'}} fluid>
        <Row>
          <Col className='pr-8'>
            <Container>
              <h3 className="display-6 pt-3 pb-4 " >บุคคลค้ำประกันที่ {guarantor_render.length}</h3>
            </Container>
          </Col>
        </Row>
      </Container>
          <Container>
            ชื่อ-สกุล : {e.guarantor_firstname} {e.guarantor_middlename} {e.guarantor_lastname}
              </Container>
          <Container>
            เลขบัตรประจำตัวประชาชน : {e.guarantor_idcard_number}
              </Container>
          <Container>
            ความสัมพันธ์กับผู้กู้ : {e.guarantor_relation_name}
              </Container>
          <Container>
            อาชีพ  : {e.career_name}
              </Container>
          <Container>
            รายได้โดยประมาณ : {e.guarantor_income.toLocaleString()} บาทต่อเดือน
              </Container>
          <Container>
            ค่าใช้จ่ายส่วนตัวโดยประมาณ : {e.guarantor_outcome.toLocaleString()} บาทต่อเดือน
              </Container>
          <Container>
            อีเมล : {e.guarantor_email}
              </Container>
          <Container style={{marginBottom:20}}>
            เบอร์โทร : {e.guarantor_phone_number}
              </Container>
      
      </>)
    })
  }
  let property_render = []
  if(this.props.property) {
    property_render.push(<SubHeader header='หลักประกันอสังหาริมทรัพย์' isborder={true} />)
    this.props.property.forEach(e=>{
      let property_owners = [];
      this.props.property_owner.forEach(item=>{
        if(item.property_id==e.property_id) property_owners.push(<><Row><Col md='2'></Col><Col>{property_owners.length+1}. {item.property_owner_name}</Col></Row></>)
      })
      property_render.push(<>

        <Container className="d-flex align-items-center" style={{ marginLeft: '0%'}} fluid>
          <Row>
            <Col className='pr-8'>
              <Container>
                <h3 className="display-6 pt-3 pb-4 " >หลักประกันที่ {property_render.length}</h3>
              </Container>
            </Col>
          </Row>
        </Container>
          <Container>
            รายละเอียดหลักประกัน : {e.property_name}
              </Container>
          <Container>
            เนื้อที่ :  {e.property_area} ไร่
              </Container>
          <Container>
            ชื่อ-สกุล เจ้าของกรมสิทธิ์ : {property_owners}
              </Container>
          <Container>
            จังหวัด : {e.province_name}
               </Container>
          <Container>
            เขต/อำเภอ : {e.amphur_name}
               </Container>
          <Container>
            แขวง/ตำบล  : {e.district_name}
                </Container>
          <Container style={{marginBottom:20}}>
            รหัสไปรษณีย์  : {e.district_postcode}
              </Container>
            
    </>)
  })
}
let guarantee_render = []
if(this.props.guarantee) {
  guarantee_render.push(<SubHeader header='หลักประกันอื่น ๆ' isborder={true} />)
  this.props.guarantee.forEach(e=>{
    let guarantee_owners = [];
    this.props.guarantee_owner.forEach(item=>{
      if(item.guarantee_id==e.guarantee_id) guarantee_owners.push(<><Row><Col md='2'></Col><Col>{guarantee_owners.length+1}. {item.guarantee_owner_name}</Col></Row></>)
    })
    guarantee_render.push(<>

      <Container className="d-flex align-items-center" style={{ marginLeft: '0%'}} fluid>
        <Row>
          <Col className='pr-8'>
            <Container>
              <h3 className="display-6 pt-3 pb-4 " >หลักประกันที่ {guarantee_render.length}</h3>
            </Container>
          </Col>
        </Row>
      </Container>
        <Container>
          รายละเอียดหลักประกัน : {e.guarantee_name}
            </Container>
        <Container>
          มูลค่า :  {e.guarantee_price} บาท
            </Container>
        <Container>
          {guarantee_owners.length!=0 ? 'ชื่อ-สกุล เจ้าของกรมสิทธิ์ :' : ''} {guarantee_owners}
            </Container>
          
  </>)
})
}
    return (
      <>
        <SubHeader header='รายละเอียด' isborder={false} />
        <Col style={{wordSpacing:10, letterSpacing:.7}} >
          <Container>
            ประเภทสินเชื่อ : {data.loan_type_name}
            </Container>
          <Container>
            ชื่อ-สกุล ผู้ขอสินเชื่อ : {data.loan_request_name}
              </Container>
          <Container>
            วงเงิน : {data.loan_amount} บาท
              </Container>
          <Container>
            วันเริ่มสัญญา : 
                  <Moment format="YYYY/MM/DD" style={{paddingLeft:10}}>
                    {data.loan_start_date}
                  </Moment>
              </Container>

          <Container>
            วันสิ้นสุดสัญญา :
                  <Moment format="YYYY/MM/DD" style={{paddingLeft:10}}>
                    {data.loan_end_date}
                  </Moment>
              </Container>
          <Container>
            วัตถุประสงค์การขอสินเชื่อ : {data.loan_purpose}
              </Container>
          {guarantor_render}
          {property_render}
          {guarantee_render}
        </Col>
      </>
    )
  }
}
export default withStyles(styles)(LoanInfo);