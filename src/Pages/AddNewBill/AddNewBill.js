import React from 'react';
import './AddNewBill.css';

const AddNewBill = ({ setBilling }) => {
        return (
                <div className="container mx-auto px-24 pt-24">
                        <div class="navbar bg-red-100">
                                <div class="flex-1">
                                        <a class="normal-case text-xl">Billings</a>
                                        <div class="form-control pl-12">
                                                <input type="text" placeholder="Search" class="input input-bordered input-sm " />
                                        </div>
                                </div>

                                <div class="flex-none gap-2">
                                        <div class="dropdown dropdown-end">
                                                <label onClick={() => setBilling(1)} for="billing-modal" class="btn btn-wide">Add New Bill</label>
                                        </div>
                                </div>
                        </div>
                </div>

        );
};

export default AddNewBill;