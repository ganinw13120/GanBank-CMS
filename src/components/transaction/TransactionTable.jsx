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
import Moment from 'react-moment';

const columns = [
  { id: 'no', label: 'เลขที่ธุรกรรม', minWidth: 1 },
  { id: 'type', label: 'ประเภทรายการ', minWidth: 100 },
  { id: 'amount', label:'จำนวนเงิน', minWidth: 100 },
  { id: 'time', label:'เวลา', minWidth: 100, time:true },
];

function createData(no, type, amount, time) {
  return { no, type, amount, time };
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
class TransactionTable extends Component{
  render () {

    const {classes, transaction_list} = this.props
    rows = [];
    if(transaction_list) transaction_list.forEach((e, index)=>{
      rows.push(createData(e.ID, e.Typename, e.Amount, e.TimeStamp))
    })
    return (
      <>
      <Container className="mt--7" style={{borderRadius:10 , fontFamily:'Thasadith'}}> 
          <Container className='pb-4'>
            <Button color="primary" type="button" href='transaction/deposit-withdraw'>
            ฝาก-ถอน
            </Button>
            <Button color="primary" type="button" href='transaction/transfer'>
            โอนเงิน
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
                          if(column.time) {
                              return (
                              <TableCell key={column.id} align={column.align} style={{fontFamily:'Thasadith'}}>
                                <Moment format="YYYY/MM/DD hh:mm:ss">
                                    {value}
                                </Moment>
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
export default withStyles(styles)(TransactionTable);
