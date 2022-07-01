import React, { useEffect, useState } from 'react';
import './HomePage.css';
import AddNewBill from '../AddNewBill/AddNewBill';
import BillingList from '../BillingList/BillingList';
import BillingModal from '../BillingModal/BillingModal';
import Navbar from '../Navbar/Navbar';
import { toast } from 'react-toastify';
import Users from '../../hooks/user';

const HomePage = () => {
        const [searchBillList, setSearchBillList] = useState([]);
        const [billing, setBilling] = useState(null)
        const [updateModal, setUpdateModal] = useState(null)
        const [informations, setInformations] = useState([]);
        const [updateInformation, setUpdateInformation] = useState({});
        const [pageCount, setPageCount] = useState(0);
        const [currentPage, setCurrentPage] = useState(0);
        const [size, setSize] = useState(10);

        // Local Storage:
        const [user] = Users();
        const memberLogin = localStorage?.getItem("user");
        const currentMember = user?.find(u => u?.email === memberLogin ? memberLogin : '');

        // Load Data from Backend:
        const [amount, setAmount] = useState(0);
        useEffect(() => {
                const urlForAdmin = `https://powerhack-paybill.herokuapp.com/api/billing-list?page=${currentPage}&size=${size}`;
                const urlForUser = `https://powerhack-paybill.herokuapp.com/api/billing-list?page=${currentPage}&size=${size}&email=${currentMember?.email}`;
                fetch(currentMember?.role === 'admin' ? urlForAdmin : urlForUser)
                        .then(res => res.json())
                        .then(data => {
                                setInformations(data)
                                const totalAmount = informations?.reduce((accumulator, object) => {
                                        return accumulator + parseFloat(object.amount);
                                }, 0);
                                setAmount(totalAmount);
                        })
        }, [informations, searchBillList])

        useEffect(() => {
                const urlForAdmin = `https://powerhack-paybill.herokuapp.com/bill-count`;
                const urlForUser = `https://powerhack-paybill.herokuapp.com/bill-count?email=${currentMember?.email}`;
                fetch(currentMember?.role === 'admin' ? urlForAdmin : urlForUser)
                        .then(res => res.json())
                        .then(data => {
                                const count = data.count;
                                const pages = Math.ceil(count / 10);
                                setPageCount(pages);
                        })
        }, [])


        // Delete Billing Information:
        const handleDeleteBill = deletedBill => {
                const sure = window.confirm(`Are you sure to delete ${deletedBill.name} ?`);
                if (sure) {
                        const url = `https://powerhack-paybill.herokuapp.com/api/delete-billing/${deletedBill._id}`;
                        fetch(url, {
                                method: 'DELETE',
                        })
                                .then(res => res.json())
                                .then(data => {
                                        if (data.deletedCount > 0) {
                                                toast.success(`Successfully Delete Billing Information!`);
                                        }
                                        else {
                                                toast("something went wrong! Please try again");
                                        }
                                })
                }
        }

        // Update Billing Information:
        const handleUpdateBill = billingInformation => {
                setUpdateModal(1);
                setUpdateInformation(billingInformation)
        }

        // Search Bill List:
        const [searchField, setSearchField] = useState('');
        const searchBill = e => {
                const searchText = e.target.value;
                setSearchField(searchText)
                const matchResult = informations?.filter(info => info.name.toLowerCase().includes(searchText.toLowerCase()) || info.email.toLowerCase().includes(searchText.toLowerCase()) || info.phone.includes(searchText))
                setSearchBillList(matchResult);
        }
        return (
                <div className="relative">
                        <Navbar
                                amount={amount}
                                currentMember={currentMember}
                        ></Navbar>
                        {/* Add New Bill */}
                        <div className="bg-red-100 pb-20">
                                <div className="container mx-auto px-20 pt-24">
                                        <div className="navbar px-8 rounded pt-4 pb-4 bg-red-300">
                                                <div className="flex-1">
                                                        <a className="normal-case text-xl font-bold">Billings</a>
                                                        <div className="form-control pl-12">
                                                                <input onChange={searchBill} type="text" placeholder="Search" className="input input-bordered " />
                                                        </div>
                                                </div>

                                                <div className="flex-none gap-2">
                                                        <div className="dropdown dropdown-end">
                                                                <label onClick={() => setBilling(1)} for="billing-modal" className="btn btn-wide bg-black">Add New Bill</label>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div className="container mx-auto px-24 pt-4">
                                        <div className="overflow-x-auto">
                                                <table className="table w-full">
                                                        <thead>
                                                                <tr>
                                                                        <th className="text-lg text-green-500">Billing ID</th>
                                                                        <th className="text-lg text-green-500">Full Name</th>
                                                                        <th className="text-lg text-green-500">Email</th>
                                                                        <th className="text-lg text-green-500">Phone</th>
                                                                        <th className="text-lg text-green-500">Paid Amount</th>
                                                                        <th className="text-lg text-green-500">Action</th>
                                                                </tr>
                                                        </thead>
                                                        <tbody>

                                                                {
                                                                        searchField.length ? searchBillList.map(information => <BillingList
                                                                                key={information._id}
                                                                                information={information}
                                                                                handleDeleteBill={handleDeleteBill}
                                                                                handleUpdateBill={handleUpdateBill}
                                                                        ></BillingList>)
                                                                                : informations.map(information => <BillingList
                                                                                        key={information._id}
                                                                                        information={information}
                                                                                        handleDeleteBill={handleDeleteBill}
                                                                                        handleUpdateBill={handleUpdateBill}
                                                                                ></BillingList>)
                                                                }
                                                        </tbody>
                                                </table>
                                        </div>
                                        <div className="text-center mt-12 mb-12">
                                                {
                                                        [...Array(pageCount).keys()].map(number => <button
                                                                onClick={() => setCurrentPage(number)}
                                                                className={`btn btn-outline btn-sm ml-3 ${currentPage === number ? 'selected' : ''}`}
                                                        >
                                                                {number + 1}
                                                        </button>)
                                                }
                                        </div>
                                </div>
                        </div>
                        {/* For Update */}
                        {
                                billing && <BillingModal
                                        setBilling={setBilling}
                                        method="POST"
                                        currentMember={currentMember}
                                ></BillingModal>
                        }
                        {/* For Add New Bill */}
                        {
                                updateModal && <BillingModal
                                        setBilling={setBilling}
                                        method="PUT"
                                        updateInformation={updateInformation}
                                        setUpdateModal={setUpdateModal}
                                        currentMember={currentMember}
                                ></BillingModal>
                        }
                </div >
        );
};

export default HomePage;