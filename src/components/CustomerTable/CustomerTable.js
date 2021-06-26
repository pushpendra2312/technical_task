import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import CustomerTableHeader from './CustomerTableHeader';
import CustomerTableBody from './CustomerTableBody';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
}));

const CustomerTable = () => {
    const classes = useStyles();
    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <CustomerTableHeader />
                    <CustomerTableBody />
                </Table>
            </TableContainer>
        </>
    );
}


export default CustomerTable;
