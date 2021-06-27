import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getApiCall } from '../../api/ApiCall';
import { MAIN_URL } from '../../api/ApiRoutes';
import { Avatar, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

const useStyles = makeStyles((theme) => ({

    root: {
        margin: theme.spacing(5),
        width: 500

    },
    large: {
        width: theme.spacing(18),
        height: theme.spacing(18)

    }

}));


function CustomerBidDetails() {

    const { id } = useParams();
    const [customer, setCustomer] = useState({});
    const fetchCustomerDetails = async () => {
        let response = await getApiCall(`${MAIN_URL}/${id}`);
        setCustomer(response);
    }
    const history = useHistory();
    useEffect(() => {
        fetchCustomerDetails();
    }, []);

    const classes = useStyles();
    return (
        <div div className={classes.root}>
            <Button onClick={() => { history.goBack() }}> BAck</Button>
            <h1>
                {`${customer.firstname} ${customer.lastname}`}
            </h1>
            <Avatar src={customer.avatarUrl} className={classes.large}></Avatar>
            {Object.entries(customer).length !== 0 && customer.constructor === Object && <TableContainer component={Paper} elevation={8}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Bid Id</TableCell>
                            <TableCell align="left">Car</TableCell>
                            <TableCell align="left">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customer.bids.map((bid) => {
                            return (
                                <TableRow key={bid.id}>
                                    <TableCell align="left">{bid.id}</TableCell>
                                    <TableCell align="left">{bid.carTitle}</TableCell>
                                    <TableCell align="left">{bid.amount}</TableCell>
                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>}


        </div>
    );
}

export default CustomerBidDetails;
