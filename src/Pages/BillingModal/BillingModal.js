import React, { useState } from 'react';
import './BillingModal.css';
import { toast } from 'react-toastify';

const BillingModal = ({ setBilling, method, updateInformation, setUpdateModal, currentMember }) => {
        // Add New Billing Information:
        const [phoneError, setPhoneError] = useState('');
        const [emailError, setEmailError] = useState('');
        const [amountError, setAmountError] = useState('');
        const handleForm = e => {
                e.preventDefault();
                //Catch All Information:
                let name = e.target.name.value;
                let email = e.target.email.value;
                let phone = e.target.phone.value;
                let amount = e.target.amount.value;

                if (!/^(?:\+?88|0088)?01[15-9]\d{8}$/.test(phone)) {
                        setPhoneError("Enter Valid Phone Number!")
                        return;
                }
                if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                        setEmailError("Enter Valid Email!")
                        return;
                }
                if ((+amount) < 0) {
                        setAmountError("Enter Positive Amount!")
                        return;
                }
                // Set a Object for update and push data:
                const billingData = {
                        name: name,
                        email: email,
                        phone: phone,
                        amount: amount
                }

                // When Post method Apply:
                if (method === 'POST') {
                        const url = 'https://power-hack-billing-backend.vercel.app/api/add-billing';
                        fetch(url, {
                                method: method,
                                headers: {
                                        "content-type": "application/json"
                                },
                                body: JSON.stringify(billingData)
                        })
                                .then(res => res.json())
                                .then(result => {
                                        if (result.insertedId) {
                                                toast.success("Successfully Paid Bill!");
                                        }
                                        else {
                                                toast("Something Went Wrong. Please ry again!")
                                        }
                                })
                        setBilling(null);
                        setPhoneError('');
                        setEmailError('');
                        setAmountError('');
                }

                // When PUT method Apply:
                if (method === "PUT") {
                        const url = `https://power-hack-billing-backend.vercel.app/api/update-billing/${updateInformation._id}`
                        fetch(url, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(billingData)
                        })
                                .then(res => res.json())
                                .then(result => {
                                        if (result.modifiedCount > 0) {
                                                toast.success("Successfully Update Bill");
                                        }
                                        else {
                                                toast("Something went wrong!")
                                        }
                                })
                        setUpdateModal(null);
                }
                e.target.name.value = '';
                e.target.email.value = '';
                e.target.phone.value = '';
                e.target.amount.value = '';
        }

        return (
                <div>
                        <input type="checkbox" id="billing-modal" className="modal-toggle" />
                        <div className="modal">
                                <div className="modal-box relative">
                                        <label htmlFor="billing-modal" className="btn btn-sm btn-circle absolute right-2 top-2 bg-red-400">✕</label>
                                        <h3 className="font-bold text-center text-2xl mt-4 text-red-400">Submit Bill Details!</h3>
                                        <form onSubmit={handleForm} className="lg:px-12 px-4 pb-4">
                                                <input type="text" name="name" placeholder="Full Name" defaultValue={currentMember?.name} className="input input-bordered w-full mt-8" required />
                                                <input type="email" defaultValue={currentMember?.email} name="email" placeholder="Email" className="input input-bordered w-full mt-4" required />
                                                <h3 className="text-red-600 pl-2">{emailError ? emailError : ''}</h3>
                                                <input type="number" name="phone" placeholder="Phone" className="input input-bordered w-full mt-4" required />
                                                <h3 className="text-red-600 pl-2">{phoneError ? phoneError : ''}</h3>
                                                <input type="number" name="amount" placeholder="Paid Amount" className="input input-bordered w-full mt-4" required />
                                                <h3 className="text-red-600 pl-2">{amountError ? amountError : ''}</h3>
                                                <input type="submit" className="btn input-sm w-full mt-4 bg-red-400" />
                                        </form>
                                </div>
                        </div>
                </div>
        );
};

export default BillingModal;