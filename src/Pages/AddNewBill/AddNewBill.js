import React from 'react';
import './AddNewBill.css';

const AddNewBill = ({ setBilling }) => {
        return (
                <div className="container mx-auto px-24 pt-24">
                        <div className="navbar bg-red-100">
                                <div className="flex-1">
                                        <a className="normal-case text-xl">Billings</a>
                                        <div className="form-control pl-12">
                                                <input type="text" placeholder="Search" className="input input-bordered input-sm " />
                                        </div>
                                </div>

                                <div className="flex-none gap-2">
                                        <div className="dropdown dropdown-end">
                                                <label onClick={() => setBilling(1)} for="billing-modal" className="btn btn-wide">Add New Bill</label>
                                        </div>
                                </div>
                        </div>
                </div>

        );
};

export default AddNewBill;