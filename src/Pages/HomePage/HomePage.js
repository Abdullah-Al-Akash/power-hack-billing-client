import React, { useState } from 'react';
import AddNewBill from '../AddNewBill/AddNewBill';
import BillingModal from '../BillingModal/BillingModal';
import Navbar from '../Navbar/Navbar';

const HomePage = () => {
        const [billing, setBilling] = useState(null)
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
                                                        <tr>
                                                                <th>1</th>
                                                                <td>Cy Ganderton</td>
                                                                <td>Quality Control Specialist</td>
                                                                <td>Blue</td>
                                                                <td>200</td>
                                                                <td>Blue</td>
                                                        </tr>
                                                </tbody>
                                        </table>
                                </div>
                        </div>
                        {
                                billing && <BillingModal></BillingModal>
                        }
                </div>
        );
};

export default HomePage;