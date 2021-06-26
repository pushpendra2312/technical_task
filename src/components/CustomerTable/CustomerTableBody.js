import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { CustomerContext } from '../CustomerDetails/CustomersDetails';

const CustomerTableBody = () => {
    const { currentCustomerData, getBidAmount } = useContext(CustomerContext);


    return (
        <TableBody>
            {currentCustomerData.map((row) => {
                return (
                    <TableRow key={row.id}>
                        <TableCell align="left">
                            {`${row.firstname} ${row.lastname}`}
                            <Avatar src={row.avatarUrl}></Avatar>
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.phone}</TableCell>
                        <TableCell align="left">{row.hasPremium ? "True" : "False"}</TableCell>
                        <TableCell align="left">{getBidAmount(row)}</TableCell>
                        <TableCell><Link to={`bidPage/${row.id}`}> Bid Details</Link></TableCell>
                    </TableRow>)
            })}
        </TableBody>
    );
}


export default CustomerTableBody;
