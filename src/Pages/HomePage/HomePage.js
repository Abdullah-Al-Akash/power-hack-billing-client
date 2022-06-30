import React, { useEffect, useState } from 'react';
import './HomePage.css';
import AddNewBill from '../AddNewBill/AddNewBill';
import BillingList from '../BillingList/BillingList';
import BillingModal from '../BillingModal/BillingModal';
import Navbar from '../Navbar/Navbar';
import { toast } from 'react-toastify';

const HomePage = () => {
        const [billing, setBilling] = useState(null)
        const [updateModal, setUpdateModal] = useState(null)
        const [informations, setInformations] = useState([]);
        const [updateInformation, setUpdateInformation] = useState({});
        const [pageCount, setPageCount] = useState(0);
        const [currentPage, setCurrentPage] = useState(0);
        const [size, setSize] = useState(10);

        useEffect(() => {
                fetch('http://localhost:5000/bill-count')
                        .then(res => res.json())
                        .then(data => {
                                const count = data.count;
                                const pages = Math.ceil(count / 10);
                                setPageCount(pages);
                        })
        }, [])


        // Delete Billing Information:
        const handleDeleteBill = deletedBill => {
                const sure = window.confirm(`Are you sure to delete ${deletedBill.name} ?`);
                if (sure) {
                        const url = `http://localhost:5000/api/delete-billing/${deletedBill._id}`;
                        fetch(url, {
                                method: 'DELETE',
                        })
                                .then(res => res.json())
                                .then(data => {
                                        if (data.deletedCount > 0) {
                                                toast.success(`Successfully Delete Billing Information!`);
                                        }
                                        else {
                                                toast("something went wrong! Please try again");
                                        }
                                })
                }
        }

        // Update Billing Information:
        const handleUpdateBill = billingInformation => {
                setUpdateModal(1);
                setUpdateInformation(billingInformation)
        }

        // Load Data from Backend:
        useEffect(() => {
                fetch(`http://localhost:5000/api/billing-list?page=${currentPage}&size=${size}`)
                        .then(res => res.json())
                        .then(data => setInformations(data))
        }, [informations])

        if (informations.length === 0) {
                return <div class="flex justify-center items-center">
                        <div class="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
                                <span class="visually-hidden">Loading...</span>
                        </div>
                </div>
        }
        return (
                <div>
                        <Navbar></Navbar>
                        <AddNewBill
                                setBilling={setBilling}
                        ></AddNewBill>
                        <div className="container mx-auto px-24 pt-4">
                                <div class="overflow-x-auto">
                                        <table class="table w-full">
                                                <thead>
                                                        <tr>
                                                                <th>Billing ID</th>
                                                                <th>Full Name</th>
                                                                <th>Email</th>
                                                                <th>Phone</th>
                                                                <th>Paid Amount</th>
                                                                <th>Action</th>
                                                        </tr>
                                                </thead>
                                                <tbody>
                                                        {
                                                                informations.map(information => <BillingList
                                                                        key={information._id}
                                                                        information={information}
                                                                        handleDeleteBill={handleDeleteBill}
                                                                        handleUpdateBill={handleUpdateBill}
                                                                ></BillingList>)
                                                        }
                                                </tbody>
                                        </table>
                                </div>
                                <div className="text-center mt-12 mb-12">
                                        {
                                                [...Array(pageCount).keys()].map(number => <button
                                                        onClick={() => setCurrentPage(number)}
                                                        className={`btn btn-outline btn-sm ml-3 ${currentPage === number ? 'selected' : ''}`}
                                                >
                                                        {number + 1}
                                                </button>)
                                        }
                                </div>
                        </div>
                        {
                                billing && <BillingModal
                                        setBilling={setBilling}
                                        method="POST"
                                ></BillingModal>
                        }
                        {
                                updateModal && <BillingModal
                                        setBilling={setBilling}
                                        method="PUT"
                                        updateInformation={updateInformation}
                                        setUpdateModal={setUpdateModal}
                                ></BillingModal>
                        }
                </div >
        );
};

export default HomePage;