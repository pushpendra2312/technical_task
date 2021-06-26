import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { PaginationContext } from '../CustomerDetails/CustomersDetails';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const CustomerPagination = () => {
    const classes = useStyles();
    const { currentPage, customersData, customersDataPerPage, handleChange } = useContext(PaginationContext);
    return (
        <div className={classes.root}>
            <p>Page: {currentPage}</p>
            <Pagination count={Math.ceil(customersData.length / customersDataPerPage)} page={currentPage} onChange={handleChange} />
        </div>
    )
}

export default CustomerPagination;