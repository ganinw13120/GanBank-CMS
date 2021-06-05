import React, { Component } from "react";
import { Form, Container, Row, Col, Button } from "reactstrap";

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

function AccountNumberMask(props) {
    const { inputRef, ...other } = props;
    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[0-9]/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}
function IDCardMask(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[1-9]/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

class CreatePromotion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            person_amount: 1
        }
    }
    render() {
        const onChange = (e) => {
            console.log(e)
        }
        const { classes } = this.props
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
                                label="ชื่อโปรโมชั่น"
                                defaultValue="ลดต้น ลดดอก"
                                variant="outlined"
                            />
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-center pt-3" style={{ marginLeft: '11%' }} fluid>
                        <TextField
                            classes={{ root: classes.inputname }}
                            id="outlined-required"
                            label="รายละเอียด"
                            defaultValue="จ่ายเงินต้น ลดดอกเบี้ยทันที"
                            variant="outlined"
                            multiline
                            rows={4}
                        />
                    </Row>
                    <Footer />
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
                            <h1 className="display-2 text-white text-bold" >แบบฟอร์มเสนอโปรโมชั่น</h1>
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
                <Button color="primary" type="button">
                    สร้างโปรโมชั่น
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
export default withStyles(styles)(CreatePromotion);