import React, { useEffect, useState } from 'react'
import { getApiCall } from '../../api/ApiCall';
import { MAIN_URL } from '../../api/ApiRoutes';
import CustomerTable from '../CustomerTable/CustomerTable';
import CustomerPagination from '../Pagination/Pagination';

export const CustomerContext = React.createContext(null);
export const PaginationContext = React.createContext(null);

const CustomersDetails = () => {
    const [customersData, setCustomersData] = useState([]);
    const [toggleBid, setToggleBid] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersDataPerPage] = useState(7);
    const [sortOrder, setSortOrder] = useState('ASC')
    const indexOfLastPage = currentPage * customersDataPerPage;
    const indexOfFirstPage = indexOfLastPage - customersDataPerPage;
    const currentCustomerData = [...customersData].slice(indexOfFirstPage, indexOfLastPage);

    console.log(currentCustomerData, 'page');
    const handleChange = (event, value) => {
        event.preventDefault();
        setCurrentPage(value);
    };
    const fetchCustomerDetails = async () => {
        let response = await getApiCall(MAIN_URL);

        response = response.map((customer) => {
            customer.bidValue = Math.max(...customer.bids.map((bid) => {
                return bid.amount;
            }));
            return customer;
        });
        setCustomersData(response)
    }

    useEffect(() => {
        fetchCustomerDetails();
    }, [])

    const getBidAmount = (row) => {
        let maxBid;

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

        row.bidValue = maxBid;
        return row.bidValue;
    }


    const sortCustomerBids = (customerA, customerB) => {

        if (sortOrder === 'DES') {

            return customerB.bidValue - customerA.bidValue;
        }
        else if (sortOrder === 'ASC') {

            return customerA.bidValue - customerB.bidValue;
        }
    }
    return (
        <>
            <div><h1>Bidding List</h1></div>
            <CustomerContext.Provider value={{ currentCustomerData, getBidAmount, setToggleBid, sortCustomerBids, toggleBid, setSortOrder }}>
                <CustomerTable />
            </CustomerContext.Provider>

            <PaginationContext.Provider value={{ currentPage, customersData, customersDataPerPage, handleChange }}>
                <CustomerPagination />
            </PaginationContext.Provider>
        </>
    );
}

export default CustomersDetails;
