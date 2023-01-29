import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Registration = () => {

        const navigate = useNavigate();
        // Handle Registration Form:
        const [passwordError, setPasswordError] = useState('');
        const [emailError, setEmailError] = useState('');
        const handleRegistration = e => {
                e.preventDefault();
                let name = e.target.name.value;
                let email = e.target.email.value;
                let password = e.target.password.value;

                const member = {
                        name: name,
                        email: email,
                        password: password
                }
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

                const url = 'http://localhost:5000/registration';
                fetch(url, {
                        method: "POST",
                        headers: {
                                "content-type": "application/json"
                        },
                        body: JSON.stringify(member)
                })
                        .then(res => res.json())
                        .then(result => {
                                console.log(result)
                                if (result.success) {
                                        localStorage.setItem("token", result.accessToken);
                                        toast.success("Registration Successfully Done!");
                                        navigate('/');

                                }
                                else {
                                        toast("Something Went Wrong. Please ry again!")

                                }
                        })
                setPasswordError('');
                setEmailError('')
        }

        // Navigate To Login:
        const navigateToLogin = () => {
                navigate('/login')
        }
        return (
                <div className="flex justify-center items-center h-screen">
                        <div className="card w-96 bg-base-100 shadow-xl">
                                <div className="card-body">
                                        <h2 className="text-center font-bold text-2xl">Registration Now</h2>
                                        <form onSubmit={handleRegistration}>
                                                <input type="text" name="name" placeholder="Your Name" className="input input-bordered w-full max-w-xs mt-8" required />
                                                <input type="email" name="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs mt-4" required />
                                                <h3 className="text-red-600 pl-2">{emailError ? emailError : ''}</h3>
                                                <input type="password" name="password" placeholder="Your Password" className="input input-bordered w-full max-w-xs mt-4" required />
                                                <h3 className="text-red-600 pl-2">{passwordError ? passwordError : ''}</h3>
                                                <input type="submit" value="Registration" className="btn input-bordered w-full max-w-xs mt-4" />

                                        </form>
                                </div>
                                <div className="pl-8 pb-12">
                                        <h3>Already have an account? Please <span
                                                onClick={() => navigateToLogin()}
                                                className="text-orange-700 font-bold cursor-pointer"
                                        >Login Here!</span></h3>
                                </div>
                        </div>
                </div>
        );
};

export default Registration;