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
  { id: 'position', label:'ตำเเหน่ง', minWidth: 100 },
  { id: 'branch', label:'สาขา', minWidth: 100 },
  { id: 'gender', label:'เพศ', minWidth: 100 },
  { id: 'del', label: 'ลบ', minWidth: 5, button : true, color:'danger', innerText:'ลบ' },
  { id: 'edit', label: 'แก้ไข', minWidth: 5 , button : true, color:'warning', innerText:'แก้ไข'},
];

function createData(no, name, position, branch, gender) {
  return { no, name, position, branch, gender };
}

let rows = [];

const styles = theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
class EmployeeTable extends Component{
  render () {

    const {classes, staff_list} = this.props
    rows = []
    if(staff_list) staff_list.forEach((e, index)=>{
      rows.push(createData(index+1, `${e.staff_firstname} ${e.staff_middlename!='NULL' ? e.staff_middlename : ''} ${e.staff_lastname}`, e.position_name, e.branch_name, e.staff_gender=='male' ? 'ชาย' : 'หญิง'))
    })
    return (
      <>
      <Container className="mt--7" style={{borderRadius:10 , fontFamily:'Thasadith'}}> 
          <Container className='pb-4'>
            <Button color="primary" type="button" href='employee/create'>
            เพิ่มพนักงาน
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
export default withStyles(styles)(EmployeeTable);
