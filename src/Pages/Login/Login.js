import React, { useState } from 'react';
import Users from '../../hooks/user';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = () => {
        const [users] = Users()
        const navigate = useNavigate();

        // Handle Registration Form:
        const [passwordError, setPasswordError] = useState('');
        const [emailError, setEmailError] = useState('');
        const [userNotFound, setUserNotFound] = useState('');
        const handleLogin = e => {
                e.preventDefault();
                let email = e.target.email?.value;
                let password = e.target.password.value;

                // Error Handling:
                if (!/^[0-9]{6}$/.test(password)) {
                        setPasswordError('Password Must be 6 digit number!')
                        return;
                }
                if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                        setEmailError("Enter Valid Email!")
                        return;
                }
                localStorage.setItem("user", email);

                fetch('https://power-hack-billing-backend.vercel.app/login', {
                        method: 'POST',
                        headers: {
                                'content-type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                })
                        .then(res => res.json())
                        .then(data => {
                                if (data.success) {
                                        localStorage.setItem("token", data.accessToken);
                                        const currentUser = users?.find(user => user?.email === email && user?.password == password);
                                        // localStorage.setItem("user", currentUser?.email);
                                        toast.success("Successfully Login");
                                        navigate('/');
                                        setUserNotFound('')
                                }
                                else {
                                        toast.error("Something went wrong. Please try again!");
                                        setUserNotFound('User not found!')
                                }
                        })
                setPasswordError('');
                setEmailError('')
        }

        // Navigate To Register:
        const navigateToRegister = () => {
                navigate('/registration')
        }
        return (
                <div className="flex justify-center items-center h-screen">
                        <div className="card w-96 bg-base-100 shadow-xl">
                                <div className="card-body">
                                        <h2 className="text-center font-bold text-2xl">Please Login!</h2>
                                        <div>
                                                <h4 className="font-bold text-sm">For Admin Credential: <br />Email: admin@gmail.com <br /> Password: 123456</h4>
                                                <h4 className="font-bold text-sm text-red-500">You can also register here! But you will only see your own bill-list there!</h4>
                                        </div>
                                        <form onSubmit={handleLogin}>
                                                <input type="email" name="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs mt-4" required />
                                                <h3 className="text-red-600 pl-2">{emailError ? emailError : ''}</h3>
                                                <input type="password" name="password" placeholder="Your Password" className="input input-bordered w-full max-w-xs mt-4" required />
                                                <h3 className="text-red-600 pl-2">{passwordError ? passwordError : ''}</h3>
                                                <input type="submit" value="Login" className="btn input-bordered w-full max-w-xs mt-4" />
                                                <h3 className="text-red-600 pl-2">{userNotFound ? userNotFound : ''}</h3>
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