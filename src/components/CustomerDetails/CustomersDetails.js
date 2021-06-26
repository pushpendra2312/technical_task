import React, { useEffect, useState } from 'react'
import { getApiCall } from '../../api/ApiCall';
import { MAIN_URL } from '../../api/ApiRoutes';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});




const CustomersDetails = () => {

    const [customersData, setCustomersData] = useState([]);
    const classes = useStyles();
    const [toggleBid, setToggleBid] = useState(false);
    const fetchCustomerDetails = async () => {

        const response = await getApiCall(MAIN_URL);
        console.log(response)
        setCustomersData(response)
    }

    useEffect(() => {

        fetchCustomerDetails();

    }, [])

    const getBidAmount = (row) => {
        let maxBid

        if (row.bids.length === 0) {

            return 0;
        } else {

            if (toggleBid) {

                maxBid = Math.min(...row.bids.map((bid) => {
                    return bid.amount;
                }));
            } else {

                maxBid = Math.max(...row.bids.map((bid) => {
                    return bid.amount;
                }));
            }
        }
        return maxBid;
    }


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Customer Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Phone</TableCell>
                        <TableCell align="left">Premium</TableCell>
                        <TableCell align="left">Bid <button onClick={() => setToggleBid(!toggleBid)}>{toggleBid ? "MAX" : "MIN"}</button></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customersData.map((row) => {


                        return (<TableRow key={row.id}>
                            <TableCell align="left">
                                {`${row.firstname} ${row.lastname}`}
                                <Avatar src={row.avatarUrl}></Avatar>
                            </TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.phone}</TableCell>
                            <TableCell align="left">{row.hasPremium ? "True" : "False"}</TableCell>
                            <TableCell align="left">{getBidAmount(row)}</TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default CustomersDetails;




