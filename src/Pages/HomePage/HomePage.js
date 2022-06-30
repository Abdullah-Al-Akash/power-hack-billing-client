import React, { useEffect, useState } from 'react';
import AddNewBill from '../AddNewBill/AddNewBill';
import BillingList from '../BillingList/BillingList';
import BillingModal from '../BillingModal/BillingModal';
import Navbar from '../Navbar/Navbar';

const HomePage = () => {
        const [billing, setBilling] = useState(null)
        const [informations, setInformations] = useState([]);

        // Load Date from Backend:
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
                                                                        information={information}
                                                                ></BillingList>)
                                                        }
                                                </tbody>
                                        </table>
                                </div>
                        </div>
                        {
                                billing && <BillingModal
                                        setBilling={setBilling}
                                ></BillingModal>
                        }
                </div>
        );
};

export default HomePage;