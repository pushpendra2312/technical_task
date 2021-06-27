import React, { useContext } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { CustomerContext } from '../CustomerDetails/CustomersDetails';

const CustomerTableHeader = () => {
    const { toggleMinOrMax, checkToggleMinOrMax, sortCustomers } = useContext(CustomerContext);
    return (
        <TableHead>
            <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Premium</TableCell>
                <TableCell align="left">Bid <Button color="secondary" onClick={() => checkToggleMinOrMax(toggleMinOrMax)}>{toggleMinOrMax}</Button></TableCell>
                <TableCell align="left">Sort <Button color="secondary" onClick={() => sortCustomers('ASC')}>ASC</Button><Button color="secondary" onClick={() => sortCustomers('DES')}>DES</Button></TableCell>
            </TableRow>
        </TableHead>
    );
}

export default CustomerTableHeader;
