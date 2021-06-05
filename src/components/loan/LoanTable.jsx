import React, { Component } from "react";
import {Container,Button } from "reactstrap";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Swal from 'sweetalert2' 
import axios from 'axios';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'no', label: 'ลำดับที่', minWidth: 1 },
  { id: 'requst_name', label: 'ชื่อผู้ขอสินเชื่อ', minWidth: 100 },
  { id: 'type', label:'ประเภท', minWidth: 100 },
  { id: 'price', label:'มูลค่า', minWidth: 100 },
  { id: 'details', label:'รายละเอียด', minWidth: 5 , button : true, color:'warning', innerText:'รายละเอียด' , link:' loan/info'},
  { id: 'status', label:'สถานะ', minWidth: 100 },
  { id: 'approve', label: 'อนุมัติ', minWidth: 5, button : true, color:'success', innerText:'อนุมัติ', val:'accepted' },
  { id: 'disapproved', label: 'ไม่อนุมัติ', minWidth: 5 , button : true, color:'danger', innerText:'ไม่อนุมัติ', val:'declined'},
];

function createData(no, requst_name, type, price, status) {
  return { no, requst_name, type, price, status };
}

let rows = []

const styles = theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
class LoanTable extends Component{

  updateStatus = (val, id) => {
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
            id : id+'',
            new_status : val
          }
          axios.post('/cms/loan/update', data).then(res=>{
              Swal.fire({
                  title: 'สำเร็จ!',
                  icon: 'success'
                })
                this.props.changeStatus(id, val)
          })
          .catch(function (error) {
            Swal.fire({
                title: 'ไม่สำเร็จ!',
                icon: 'error',
                html: error.response.data.message,
              })
          })
      }
    })
  }

  render () {
    const {classes, loan_list} = this.props
    rows = [];
    if(loan_list) loan_list.forEach((e)=>{
      rows.push(createData(e.loan_id, e.loan_request_name, e.loan_type_name, e.loan_amount, e.loan_status=='pending' ? 'รอการอนุมัติ' : e.loan_status=='accepted' ? 'ได้รับการอนุมัติ' : 'ไม่อนุมัติ'))
    })
    return (
      <>
      <Container className="mt--7" style={{borderRadius:10 , fontFamily:'Thasadith'}}> 
          <Container className='pb-4'>
            <Button color="primary" type="button" href='loan/create'>
            ขอสินเชื่อ
            </Button>
          </Container>
          <Paper className={classes.root}>
          <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
              <TableHead>
                  <TableRow>
                  {columns.map((column) => (
                      <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth , fontFamily:'Thasadith'}}
                      >
                      {column.label}
                      </TableCell>
                  ))}
                  </TableRow>
              </TableHead>
              <TableBody>
              {rows.map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                          const value = row[column.id];
                          if(column.button) {
                              return (
                              <TableCell key={column.id} align={column.align} style={{fontFamily:'Thasadith'}}>
                                  <Button color={column.color} outline size='sm' type="button" href={column.link ? column.link+'/'+row.no : ''} onClick={()=>{ if(column.val) this.updateStatus(column.val, row.no) }}>{column.innerText}</Button>
                              </TableCell>
                              );
                          }
                          else 
                              return (
                              <TableCell key={column.id} align={column.align} style={{fontFamily:'Thasadith'}}>
                                 <i className="bg-success" /> {column.format && typeof value === 'number' ? column.format(value) : value}
                              </TableCell>
                              );
                      })}
                      </TableRow>
                ))}
              </TableBody>
              </Table>
          </TableContainer>
          </Paper>
      </Container>
      </>
    );
  }
}
export default withStyles(styles)(LoanTable);
