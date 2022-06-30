import React from 'react';
import './BillingModal.css';

const BillingModal = ({ setBilling }) => {
        const handleForm = e => {
                e.preventDefault();
                const name = e.target.name.value;
                const email = e.target.email.value;
                const phone = e.target.phone.value;
                const amount = e.target.amount.value;

                console.log(name, email, phone, amount);
                setBilling(null);

        }
        return (
                <div>
                        <input type="checkbox" id="billing-modal" class="modal-toggle" />
                        <div class="modal">
                                <div class="modal-box relative">
                                        <label for="billing-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                        <h3 class="text-lg font-bold text-center">Please Submit the form!</h3>
                                        <form onSubmit={handleForm} className="lg:px-12 px-4 pb-4">
                                                <input type="text" name="name" placeholder="Full Name" class="input input-bordered w-full mt-8" />
                                                <input type="email" name="email" placeholder="Email" class="input input-bordered w-full mt-4" />
                                                <input type="number" name="phone" placeholder="Phone" class="input input-bordered w-full mt-4" />
                                                <input type="number" name="amount" placeholder="Paid Amount" class="input input-bordered w-full mt-4" />
                                                <input type="submit" class="btn input-sm w-full mt-4" />
                                        </form>
                                </div>
                        </div>
                </div>
        );
};

export default BillingModal;