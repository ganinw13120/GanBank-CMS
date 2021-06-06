import React, { Component } from "react";
import { Form, Container, Row, Col, Button } from "reactstrap";

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2' 
import axios from 'axios';
import { PanoramaSharp } from "@material-ui/icons";


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
class EditPromotion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name : null,
            detail : null
        }
    }
    onChangeState = (field, val) => {
      this.setState({
          [field] : val
      })
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        axios.post('/cms/promotion/getbyid', {id:params.id}).then(res=>{
            console.log(res)
            this.setState({
                name : res.data.promotion_title,
                detail : res.data.promotion_detail
            })
        })
    }
    formsubmit = ()=>{
        Swal.fire({
            title: 'ยืนยันการสร้างโปรโมชั่น',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('กำลังสร้างโปรโมชั่น..')
                const data = this.state
                console.log(data)
                axios.post('/cms/promotion/create', data).then(res=>{
                    Swal.fire({
                        title: 'สำเร็จ!',
                        icon: 'success',
                        confirmButtonText:
                          '<a href="/cms/promotion" style="text-decoration: none;color:white;">กลับไปหน้าหลัก</a>',
                      })
                })
            }
          })
    }
    render() {
        const { classes } = this.props
        const submitabled = this.state.name && this.state.detail && this.state.name != '' && this.state.detail != ''
        return (
            <>
                <Header />

                <Container className="" style={{ marginLeft: '0%' }} fluid>
                    
                    <SubHeader header='รายละเอียด' isborder={false} />
                    <Row className="d-flex align-items-center pt-3" style={{ marginLeft: '10%' }} fluid>
                        <Col md='5'>
                            <TextField
                                classes={{ root: classes.inputname }}
                                id="outlined-required"
                                label={this.state.name ? '' : "ชื่อโปรโมชั่น"}
                                value={this.state.name}
                                onChange={(e)=>{
                                    this.onChangeState('name', e.target.value)
                                }}
                                variant="outlined"
                            />
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-center pt-3" style={{ marginLeft: '11%' }} fluid>
                        <TextField
                            classes={{ root: classes.inputname }}
                            id="outlined-required"
                            label= {this.state.detail ? '':"รายละเอียด"}
                            onChange={(e)=>{
                                this.onChangeState('detail', e.target.value)
                            }}
                            variant="outlined"
                            value={this.state.detail}
                            multiline
                            rows={4}
                        />
                    </Row>
                    <Footer formsubmit={this.formsubmit} submitable={submitabled}/>
                </Container>
            </>
        )
    }
}

class Header extends Component {
    render() {
        return (
            <div className="header bg-gradient-info pb-3 pt-5 pt-md-8" style={{ zIndex: -1 }}>

                <Container className="d-flex align-items-center" fluid>
                    <Row>
                        <Col>
                            <h1 className="display-2 text-white text-bold" >แบบฟอร์มแก้ไขโปรโมชั่น</h1>
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

                <Button color="secondary" type="button">
                    ยกเลิก
                </Button>
                <Button color="primary" type="button" disabled={!this.props.submitable} onClick={this.props.formsubmit}>
                    บันทึก
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
                                <h1 className="display-6 pt-3 pb-4" >{header}</h1>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
export default withStyles(styles)(EditPromotion);