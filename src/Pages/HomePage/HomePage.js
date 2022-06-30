import React from 'react';
import AddNewBill from '../AddNewBill/AddNewBill';
import Navbar from '../Navbar/Navbar';

const HomePage = () => {
        return (
                <div>
                        <Navbar></Navbar>
                        <AddNewBill></AddNewBill>
                </div>
        );
};

export default HomePage;