import React from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = ({ currentMember, amount }) => {

        const navigate = useNavigate();
        const handleLogout = () => {
                navigate('/login');
                localStorage.removeItem("user");
        }

        return (
                <div>
                        <div class="container mx-auto px-12 navbar bg-stone-300">
                                <div class="flex-1">
                                        <a class="btn btn-ghost normal-case text-xl">Power Hack</a>
                                </div>
                                <div class="flex-none">
                                        <h2 className="text-xl font-bold mr-4">Paid Total: {amount}</h2>
                                        <div class="avatar online mr-4">
                                                <div class="w-12 rounded-full ring ring-black">
                                                        <img src="https://placeimg.com/192/192/people" />
                                                </div>
                                        </div>
                                        <button
                                                onClick={() => handleLogout()}
                                                class="btn">Logout</button>
                                </div>
                        </div>
                        <div className="flex justify-center mt-16">
                                <h3 className="text-3xl font-bold mr-4 text-orange-700 "><span className="text-stone-500">Welcome back</span> {currentMember?.name}!</h3>
                        </div>
                </div>
        );
};

export default Navbar;