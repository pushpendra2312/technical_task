import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApiCall } from '../../api/ApiCall';
import { MAIN_URL } from '../../api/ApiRoutes';
import { Avatar } from '@material-ui/core';
function CustomerBidDetails() {

    const { id } = useParams();
    const [customer, setCustomer] = useState({});
    const fetchCustomerDetails = async () => {
        let response = await getApiCall(`${MAIN_URL}/${id}`);
        console.log(response)
        setCustomer(response);
    }
    useEffect(() => {
        fetchCustomerDetails();
    }, [])


    return (
        <>
            <h1>
                {`${customer.firstname} ${customer.lastname}`}
            </h1>
            <Avatar src={customer.avatarUrl}></Avatar>


        </>
    )
}

export default CustomerBidDetails;
