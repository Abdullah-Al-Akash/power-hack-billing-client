import React, { useEffect, useState } from 'react';
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


        // Delete Billing Information:
        // Handle Delete Item:
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
                fetch('http://localhost:5000/api/billing-list')
                        .then(res => res.json())
                        .then(data => setInformations(data))
        }, [informations])
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