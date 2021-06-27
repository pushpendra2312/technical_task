import React, { useEffect, useState } from 'react'
import { getApiCall } from '../../api/ApiCall';
import { MAIN_URL } from '../../api/ApiRoutes';
import CustomerTable from '../CustomerTable/CustomerTable';
import CustomerPagination from '../Pagination/Pagination';

export const CustomerContext = React.createContext(null);
export const PaginationContext = React.createContext(null);

const CustomersDetails = () => {
    const [customersData, setCustomersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersDataPerPage] = useState(7);
    const [toggleMinOrMax, setToggleMinOrMax] = useState('MAX');
    const indexOfLastPage = currentPage * customersDataPerPage;
    const indexOfFirstPage = indexOfLastPage - customersDataPerPage;
    const currentCustomerData = customersData.slice(indexOfFirstPage, indexOfLastPage);

    const handleChange = (event, value) => {
        event.preventDefault();
        setCurrentPage(value);
    };
    const fetchCustomerDetails = async () => {
        let response = await getApiCall(MAIN_URL);

        response = response.map((customer) => {
            customer.bids = customer.bids.sort((bidA, bidB) => {
                return bidB.amount - bidA.amount;
            });
            return customer;
        });
        setCustomersData(response);
    }

    useEffect(() => {
        fetchCustomerDetails();
    }, [])



    const showMaxOrMinBids = (row) => {

        if (row.bids.length === 0) {

            return 0;
        } else {

            if (toggleMinOrMax === 'MIN') {

                return row.bids[row.bids.length - 1].amount;
            } else if (toggleMinOrMax === 'MAX') {

                return row.bids[0].amount;
            }
        }
    }

    const checkToggleMinOrMax = (type) => {

        type === 'MAX' ? setToggleMinOrMax('MIN') : setToggleMinOrMax('MAX');
    }


    const sortCustomers = (sortType) => {

        const copy = [...customersData];
        let sortedCustomersData;
        if (sortType === 'ASC') {

            if (toggleMinOrMax === 'MAX') {

                sortedCustomersData = copy.sort((customerA, customerB) => {

                    if (customerA.bids.length > 0 && customerB.bids.length > 0)
                        return customerA.bids[0].amount - customerB.bids[0].amount;
                    else {

                        if (customerB.bids.length === 0) {

                            return 1;
                        } else {

                            return -1;
                        }
                    }

                })

            } else if (toggleMinOrMax === 'MIN') {

                sortedCustomersData = copy.sort((customerA, customerB) => {
                    if (customerA.bids.length > 0 && customerB.bids.length > 0)
                        return customerA.bids[customerA.bids.length - 1].amount - customerB.bids[customerB.bids.length - 1].amount;
                    else {

                        if (customerB.bids.length === 0) {

                            return 1;
                        } else {

                            return -1;
                        }
                    }
                })

            }

        } else if (sortType === 'DES') {

            if (toggleMinOrMax === 'MAX') {

                sortedCustomersData = copy.sort((customerA, customerB) => {

                    if (customerA.bids.length > 0 && customerB.bids.length > 0)
                        return customerB.bids[0].amount - customerA.bids[0].amount;
                    else {

                        if (customerA.bids.length === 0) {

                            return 1;
                        } else {

                            return -1;
                        }
                    }

                })

            } else if (toggleMinOrMax === 'MIN') {

                sortedCustomersData = copy.sort((customerA, customerB) => {
                    if (customerA.bids.length > 0 && customerB.bids.length > 0)
                        return customerB.bids[customerB.bids.length - 1].amount - customerA.bids[customerA.bids.length - 1].amount;
                    else {

                        if (customerA.bids.length === 0) {

                            return 1;
                        } else {

                            return -1;
                        }
                    }
                })

            }
        }


        setCustomersData(sortedCustomersData);
    }
    return (
        <>
            <div><h1>Bidding List</h1></div>
            <CustomerContext.Provider value={{ currentCustomerData, toggleMinOrMax, checkToggleMinOrMax, showMaxOrMinBids, sortCustomers }}>
                <CustomerTable />
            </CustomerContext.Provider>

            <PaginationContext.Provider value={{ currentPage, customersData, customersDataPerPage, handleChange }}>
                <CustomerPagination />
            </PaginationContext.Provider>
        </>
    );
}

export default CustomersDetails;
