import React from 'react';

const BillingList = ({ information, handleDeleteBill, handleUpdateBill }) => {
        const { _id, name, amount, email, phone } = information;
        return (
                <tr>
                        <th>{_id}</th>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{amount}</td>
                        <td><label for="billing-modal"
                                onClick={() => handleUpdateBill(information)}
                                class="btn btn-outline  btn-sm mr-2">Edit</label>  |  <button
                                        onClick={() => handleDeleteBill(information)}
                                        class="btn btn-outline btn-error btn-sm ml-2">Delete</button></td>
                </tr>
        );
};

export default BillingList;