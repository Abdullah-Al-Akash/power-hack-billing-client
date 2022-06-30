import React from 'react';

const BillingList = ({ information }) => {
        const { _id, name, amount, email, phone } = information;
        return (
                <tr>
                        <th>{_id}</th>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{amount}</td>
                        <td><button class="btn btn-outline  btn-sm mr-2">Edit</button>  |  <button class="btn btn-outline btn-sm ml-2">Delete</button></td>
                </tr>
        );
};

export default BillingList;