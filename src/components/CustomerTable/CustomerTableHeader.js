import React, { useContext } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CustomerContext } from '../CustomerDetails/CustomersDetails';

const CustomerTableHeader = () => {
    const { setToggleBid, sortCustomerBids, toggleBid, toggleSort } = useContext(CustomerContext);
    return (
        <TableHead>
            <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Premium</TableCell>
                <TableCell align="left">Bid <button onClick={() => setToggleBid(!toggleBid)}>{toggleBid ? "MAX" : "MIN"}</button></TableCell>
                <TableCell align="left">Sort <button onClick={() => sortCustomerBids()}>{toggleSort ? "ASC" : "DSC"}</button></TableCell>
            </TableRow>
        </TableHead>
    );
}

export default CustomerTableHeader;
