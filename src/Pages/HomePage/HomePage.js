import React, { useEffect, useState } from 'react';
import './HomePage.css';
import AddNewBill from '../AddNewBill/AddNewBill';
import BillingList from '../BillingList/BillingList';
import BillingModal from '../BillingModal/BillingModal';
import Navbar from '../Navbar/Navbar';
import { toast } from 'react-toastify';
import Users from '../../hooks/user';

const HomePage = () => {
        const [billing, setBilling] = useState(null)
        const [updateModal, setUpdateModal] = useState(null)
        const [informations, setInformations] = useState([]);
        const [updateInformation, setUpdateInformation] = useState({});
        const [pageCount, setPageCount] = useState(0);
        const [currentPage, setCurrentPage] = useState(0);
        const [size, setSize] = useState(10);

        // Local Storage:
        const [user] = Users();
        const memberLogin = localStorage?.getItem("user");
        const currentMember = user?.find(u => u?.email === memberLogin ? memberLogin : '');

        // Load Data from Backend:
        const [amount, setAmount] = useState(0);
        useEffect(() => {

                const urlForAdmin = `http://localhost:5000/api/billing-list?page=${currentPage}&size=${size}`;
                const urlForUser = `http://localhost:5000/api/billing-list?page=${currentPage}&size=${size}&email=${currentMember?.email}`;
                fetch(currentMember?.role === 'admin' ? urlForAdmin : urlForUser)
                        .then(res => res.json())
                        .then(data => {
                                setInformations(data)
                                const totalAmount = informations?.reduce((accumulator, object) => {
                                        return accumulator + parseFloat(object.amount);
                                }, 0);
                                setAmount(totalAmount);
                        })
        }, [informations])

        useEffect(() => {
                const urlForAdmin = `http://localhost:5000/bill-count`;
                const urlForUser = `http://localhost:5000/bill-count?email=${currentMember?.email}`;
                fetch(currentMember?.role === 'admin' ? urlForAdmin : urlForUser)
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

        return (
                <div>
                        <Navbar
                                amount={amount}
                                currentMember={currentMember}
                        ></Navbar>
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
                        {/* For Update */}
                        {
                                billing && <BillingModal
                                        setBilling={setBilling}
                                        method="POST"
                                        currentMember={currentMember}
                                ></BillingModal>
                        }
                        {/* For Add New Bill */}
                        {
                                updateModal && <BillingModal
                                        setBilling={setBilling}
                                        method="PUT"
                                        updateInformation={updateInformation}
                                        setUpdateModal={setUpdateModal}
                                        currentMember={currentMember}
                                ></BillingModal>
                        }
                </div >
        );
};

export default HomePage;