import React, { useContext } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { CustomerContext } from '../CustomerDetails/CustomersDetails';

const CustomerTableHeader = () => {
    const { setToggleBid, sortCustomerBids, toggleBid } = useContext(CustomerContext);
    return (
        <TableHead>
            <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Premium</TableCell>
                <TableCell align="left">Bid <Button color="secondary" onClick={() => setToggleBid(!toggleBid)}>{toggleBid ? "MIN" : "MAX"}</Button></TableCell>
                <TableCell align="left">Sort <Button color="secondary" onClick={() => sortCustomerBids('ASC')}>ASC</Button><Button color="secondary" onClick={() => sortCustomerBids('DSC')}>DSC</Button></TableCell>
            </TableRow>
        </TableHead>
    );
}

export default CustomerTableHeader;
