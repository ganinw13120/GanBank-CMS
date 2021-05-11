import React, {Component} from 'react'
import {Container, Row, Col} from "reactstrap";

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    formControl: {
    //   marginTop : 10,
      minWidth: '90%',
    },
    selectEmpty: {
    //   marginTop: theme.spacing(2),
    },
    radio: {
      '&$checked': {
        color: '#1C75FF'
      }
    },
    checked: {},
    inputname : {
      width : '90%',
      // minWidth:300
    }
  })
class PersonInfo extends Component {
    render () {
        const onChange = (e) => {
          console.log(e)
        }
        const {classes} = this.props
        return (
            <>
                <Container className='pb-5'>
                <Row className="d-flex align-items-center pt-3"  style={{marginLeft:'10%',verticalAlign:'super'}}  fluid>
                    <Col style={{verticalAlign:'text-top'}}>เพศต้นกำเนิด</Col>
                    <Col style={{marginLeft:'-50%'}}>
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        checked={true}
                        onChange={onChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    ชาย
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        style={{marginLeft:'10%'}}
                        checked={false}
                        onChange={onChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    หญิง
                    </Col>
                </Row>
                <Row className="d-flex align-items-center pt-2"  style={{marginLeft:'10%',verticalAlign:'super'}}  fluid>
                    <Col style={{verticalAlign:'text-top'}}>คำนำหน้า</Col>
                    <Col style={{marginLeft:'-50%'}}>
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        checked={true}
                        onChange={onChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    นาย
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        style={{marginLeft:'10%'}}
                        checked={false}
                        onChange={onChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    นาง
                    <Radio
                        classes={{root: classes.radio, checked: classes.checked}}
                        style={{marginLeft:'10%'}}
                        checked={false}
                        onChange={onChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    นางสาว
                    </Col>
                </Row>
                <Row className="d-flex align-items-center"  style={{marginLeft:'10%'}} fluid>
                <Col md='4' className='mt-4'>
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="ชื่อ"
                        defaultValue="แกน"
                        variant="outlined"
                    />
                </Col>
                <Col md='4' className='mt-4'>
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="ชื่อกลาง"
                        defaultValue="ดี"
                        variant="outlined"
                    />
                </Col>
                <Col md='4' className=' mt-4'>
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="นามสกุล"
                        defaultValue="มงคลากร"
                        variant="outlined"
                    />
                </Col>
                </Row>
                <Row className="d-flex align-items-center mt-3"  style={{marginLeft:'10%'}} fluid>
                <Col md='3' className='mt-4'>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">สถานภาพ</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value='10'
                        label="Age"
                    >
                        <MenuItem value={10}>โสด</MenuItem>
                        <MenuItem value={20}>แต่งงาน</MenuItem>
                        <MenuItem value={30}>หย่าร้าง</MenuItem>
                    </Select>
                    </FormControl>
                </Col>
                <Col md='3' className='mt-4'>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">อาชีพ</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value='10'
                        label="Age"
                    >
                        <MenuItem value={10}>โจร</MenuItem>
                        <MenuItem value={20}>นักเรียน</MenuItem>
                        <MenuItem value={30}>โปรแกรมเมอร์</MenuItem>
                    </Select>
                    </FormControl>
                </Col>
                <Col md='3' className='mt-4'>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">วุฒิการศึกษา</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value='10'
                        label="Age"
                    >
                        <MenuItem value={10}>มัธยมปลาย</MenuItem>
                        <MenuItem value={20}>ปริญญาตรี</MenuItem>
                        <MenuItem value={30}>ปริญญาโท</MenuItem>
                    </Select>
                    </FormControl>
                </Col>
                <Col md='3' className='mt-4'>
                    <TextField
                        classes={{root: classes.inputname}}
                        id="outlined-required"
                        label="รายได้โดยประมาณ (บาท/เดือน)"
                        defaultValue="999,999,999"
                        variant="outlined"
                    />
                </Col>
                </Row>
                </Container>
            </>
        )
    }
}
export default withStyles(styles)(PersonInfo);