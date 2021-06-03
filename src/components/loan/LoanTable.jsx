import React, { Component } from "react";
import {Container,Button } from "reactstrap";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'no', label: 'ลำดับที่', minWidth: 1 },
  { id: 'name', label: 'ชื่อ', minWidth: 100 },
  { id: 'type', label:'ประเภท', minWidth: 100 },
  { id: 'price', label:'มูลค่า', minWidth: 100 },
  { id: 'details', label:'รายละเอียด', minWidth: 5 , button : true, color:'warning', innerText:'รายละเอียด' , link:' loan/info'},
  { id: 'status', label:'สถานะ', minWidth: 100 },
  { id: 'approve', label: 'อนุมัติ', minWidth: 5, button : true, color:'success', innerText:'อนุมัติ', },
  { id: 'disapproved', label: 'ไม่อนุมัติ', minWidth: 5 , button : true, color:'danger', innerText:'ไม่อนุมัติ'},
];

function createData(no, name, type, price, status) {
  return { no, name, type, price, status };
}

const rows = [
  createData('1', 'นายแกน มงคลากร', 'เงินกู้เพื่อซื้อบ้าน', '500,000 บาท', 'รอการอนุมัติ'),
  createData('2', 'นายแกน มงคลากร', 'เงินกู้เพื่อซื้อบ้าน', '500,000 บาท', 'รอการอนุมัติ'),
  createData('3', 'นายแกน มงคลากร', 'เงินกู้เพื่อซื้อบ้าน', '500,000 บาท', 'รอการอนุมัติ'),
  createData('4', 'นายแกน มงคลากร', 'เงินกู้เพื่อซื้อบ้าน', '500,000 บาท', 'รอการอนุมัติ'),
  createData('5', 'นายแกน มงคลากร', 'เงินกู้เพื่อซื้อบ้าน', '500,000 บาท', 'รอการอนุมัติ'),
];

const styles = theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
class LoanTable extends Component{
  render () {

    const {classes} = this.props
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
                                  <Button color={column.color} outline size='sm' type="button" href={column.link} >{column.innerText}</Button>
                              </TableCell>
                              );
                          }
                          else 
                              return (
                              <TableCell key={column.id} align={column.align} style={{fontFamily:'Thasadith'}}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
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
