import React from 'react';
import Users from '../../hooks/user';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = () => {
        const [users] = Users()
        const navigate = useNavigate();

        const handleLogin = e => {
                e.preventDefault();
                let email = e.target.email.value;
                let password = e.target.password.value;

                const currentUser = users.find(user => user.email === email && user.password == password);
                if (currentUser) {
                        toast.success("Successfully Login");
                        localStorage.setItem("user", currentUser.email);
                        navigate('/');
                }
                else {
                        toast.error("Something went wrong. Please try again!")
                }
        }

        // Navigate To Register:
        const navigateToRegister = () => {
                navigate('/registration')
        }
        return (
                <div className="flex justify-center items-center h-screen">
                        <div class="card w-96 bg-base-100 shadow-xl">
                                <div class="card-body">
                                        <h2 class="text-center font-bold text-2xl">Please Login!</h2>
                                        <form onSubmit={handleLogin}>
                                                <input type="email" name="email" placeholder="Your Email" class="input input-bordered w-full max-w-xs mt-4" required />
                                                <input type="password" name="password" placeholder="Your Password" class="input input-bordered w-full max-w-xs mt-4" required />
                                                <input type="submit" value="Login" class="btn input-bordered w-full max-w-xs mt-4" />
                                        </form>
                                </div>
                                <div className="pl-8 pb-12">
                                        <h3>Not have any account? Please <span
                                                onClick={() => navigateToRegister()}
                                                className="text-orange-700 font-bold cursor-pointer"
                                        >Register Here!</span></h3>
                                </div>
                        </div>
                </div>
        );
};

export default Login;