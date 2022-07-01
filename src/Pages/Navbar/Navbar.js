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
                        <div className="container mx-auto px-12 navbar bg-stone-800 text-red-300 p-4 fixed top-0 z-50">
                                <div className="flex-1">
                                        <a className="btn btn-ghost normal-case text-white text-3xl">
                                                <span className="text-5xl text-green-400">P</span>ower <span className="text-2xl text-red-300">H</span>ack
                                        </a>
                                </div>
                                <div className="flex-none">
                                        <h2 className="text-xl font-bold mr-4">Paid Total: {amount}</h2>
                                        <div className="avatar online mr-4">
                                                <div className="w-12 rounded-full ring ring-red-300">
                                                        <img src="https://placeimg.com/192/192/people" />
                                                </div>
                                        </div>
                                        <button
                                                onClick={() => handleLogout()}
                                                className="btn bg-green-500 font-bold">Logout</button>
                                </div>
                        </div>
                        <div className="bg-red-100 pt-20">
                                <div className="flex justify-center pt-16 w-96 mx-auto">
                                        <marquee behavior="" direction="">
                                                <h3 className="text-4xl font-bold mr-4 text-orange-700 "><span className="text-stone-500">Welcome back</span> {currentMember?.name}!</h3>
                                        </marquee>
                                </div>
                        </div>
                </div>
        );
};

export default Navbar;