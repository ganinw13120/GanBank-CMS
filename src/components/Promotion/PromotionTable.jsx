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
  { id: 'name', label: 'ชื่อโปรโมชั่น', minWidth: 100 },
  { id: 'type', label:'ประเภท', minWidth: 100 },
  { id: 'date', label:'ระยะเวลาการจัดโปรโมชั่น', minWidth: 100 },
  { id: 'Detail', label:'รายละเอียด', minWidth: 100 },
  { id: 'del', label: 'ลบ', minWidth: 5, button : true, color:'danger', innerText:'ลบ' },
  { id: 'edit', label: 'แก้ไข', minWidth: 5 , button : true, color:'warning', innerText:'แก้ไข'},
];

function createData(no, name, type, date, Detail) {
  return { no, name, type, date, Detail };
}

const rows = [
  createData('1', 'ลดต้น ลดดอก', 'เงินกู้', '1-30 มีนาคม 2021', 'จ่ายเงินต้น ลดดอกเบี้ยทันที'),
  createData('2', 'ฝากประจำดอกเบี้ยสองเท่าจากที่อื่น', 'เงินฝาก', '15-31 มีนาคม 2021', 'เงินฝากประจำพิเศษ ระยะเวลา 5 เดือน อัตราดอกเบี้ย 0.425% ต่อปี'),
  createData('3', 'ลดต้น ลดดอก', 'เงินกู้', '1-30 มีนาคม 2021', 'จ่ายเงินต้น ลดดอกเบี้ยทันที'),
  createData('4', 'ฝากประจำดอกเบี้ยสองเท่าจากที่อื่น', 'เงินฝาก', '15-31 มีนาคม 2021', 'เงินฝากประจำพิเศษ ระยะเวลา 5 เดือน อัตราดอกเบี้ย 0.425% ต่อปี'),
  createData('5', 'ลดต้น ลดดอก', 'เงินกู้', '1-30 มีนาคม 2021', 'จ่ายเงินต้น ลดดอกเบี้ยทันที'),
  createData('6', 'ฝากประจำดอกเบี้ยสองเท่าจากที่อื่น', 'เงินฝาก', '15-31 มีนาคม 2021', 'เงินฝากประจำพิเศษ ระยะเวลา 5 เดือน อัตราดอกเบี้ย 0.425% ต่อปี'),
];

const styles = theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
class PromotionTable extends Component{
  render () {

    const {classes} = this.props
    return (
      <>
      <Container className="mt--7" style={{borderRadius:10 , fontFamily:'Thasadith'}}> 
          <Container className='pb-4'>
            <Button color="primary" type="button" href='promotion/create'>
            โปรโมชั่น
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
                                  <Button color={column.color} outline size='sm' type="button" >{column.innerText}</Button>
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
export default withStyles(styles)(PromotionTable);
