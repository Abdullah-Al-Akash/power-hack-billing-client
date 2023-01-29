import React from 'react';

const BillingList = ({ information, handleDeleteBill, handleUpdateBill }) => {
        const { _id, name, amount, email, phone } = information;

        return (
                <tr>
                        <td>{_id ? _id : 'loading'}</td>
                        <td className="mx-auto p-4 pl-20">{name}</td>
                        <td className="mx-auto pl-8">{email}</td>
                        <td className="mx-auto pl-32">{phone}</td>
                        <td className="mx-auto pl-32">{amount}</td>
                        <td className="mx-auto pl-32">
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