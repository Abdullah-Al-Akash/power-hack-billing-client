import React from 'react';

const BillingList = ({ information, handleDeleteBill, handleUpdateBill }) => {
        const { _id, name, amount, email, phone } = information;

        return (

                <tr>
                        <td>{_id ? _id : 'loading'}</td>
                        <td className="">{name}</td>
                        <td className="">{email}</td>
                        <td className="">{phone}</td>
                        <td className="">{amount}</td>
                        <td className="">
                                <label htmlFor="billing-modal"
                                        onClick={() => handleUpdateBill(information)}
                                        className="btn btn-outline btn-success  btn-sm mr-2">Edit</label>
                                |
                                <button
                                        onClick={() => handleDeleteBill(information)}
                                        className="btn btn-outline btn-error btn-sm ml-2">Delete</button>
                        </td>
                </tr>
        );
};

export default BillingList;