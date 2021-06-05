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
  { id: 'code', label: 'เลขที่บัญชี', minWidth: 100 },
  { id: 'name', label: 'ชื่อบัญชี', minWidth: 100 },
  { id: 'type', label: 'ประเภท', minWidth: 100 },
  { id: 'del', label: 'ลบ', minWidth: 5, button : true, color:'danger', innerText:'ลบ' },
  { id: 'edit', label: 'แก้ไข', minWidth: 5 , button : true, color:'warning', innerText:'แก้ไข'},
];

function createData(no, code, name, type) {
  return { no, code, name, type };
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
class AccountTable extends Component{
  render () {

    const {classes, account_list} = this.props
    rows = [];
    if(account_list) account_list.forEach((e, index)=>{
      rows.push(createData(index+1, e.account_no, e.account_name, e.account_type_name))
    })
    return (
      <>
      <Container className="mt--7" style={{borderRadius:10 , fontFamily:'Thasadith'}}> 
          <Container className='pb-4'>
            <Button color="primary" type="button" href='account/create'>
              สร้างบัญชี
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
export default withStyles(styles)(AccountTable);
