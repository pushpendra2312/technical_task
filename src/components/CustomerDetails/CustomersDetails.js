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
    const [toggleSort, setToggleSort] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersDataPerPage] = useState(4);

    const indexOfLastPage = currentPage * customersDataPerPage;
    const indexOfFirstPage = indexOfLastPage - customersDataPerPage;
    const currentCustomerData = customersData.slice(indexOfFirstPage, indexOfLastPage);

    const handleChange = (event, value) => {
        event.preventDefault();
        setCurrentPage(value);
    };
    const fetchCustomerDetails = async () => {
        const response = await getApiCall(MAIN_URL);
        console.log(response)
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
        return maxBid;
    }

    const sortCustomerBids = () => {
        setToggleSort(!toggleSort);
    }

    return (
        <>
            <CustomerContext.Provider value={{ currentCustomerData, getBidAmount, setToggleBid, sortCustomerBids, toggleBid, toggleSort }}>
                <CustomerTable />
            </CustomerContext.Provider>

            <PaginationContext.Provider value={{ currentPage, customersData, customersDataPerPage, handleChange }}>
                <CustomerPagination />
            </PaginationContext.Provider>
        </>
    );
}

export default CustomersDetails;
