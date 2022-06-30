import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Registration = () => {

        const navigate = useNavigate();
        // Handle Registration Form:
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
                                if (result.insertedId) {
                                        localStorage.setItem("user", email);
                                        navigate('/home');
                                        toast.success("Registration Successfully Done!");
                                }
                                else {
                                        toast("Something Went Wrong. Please ry again!")
                                }
                        })
        }
        return (
                <div className="flex justify-center items-center h-screen">
                        <div class="card w-96 bg-base-100 shadow-xl">
                                <div class="card-body">
                                        <h2 class="text-center font-bold text-2xl">Registration Now</h2>
                                        <form onSubmit={handleRegistration}>
                                                <input type="text" name="name" placeholder="Your Name" class="input input-bordered w-full max-w-xs mt-8" required />
                                                <input type="email" name="email" placeholder="Your Email" class="input input-bordered w-full max-w-xs mt-4" required />
                                                <input type="password" name="password" placeholder="Your Password" class="input input-bordered w-full max-w-xs mt-4" required />
                                                <input type="submit" value="Registration" class="btn input-bordered w-full max-w-xs mt-4" />
                                        </form>
                                </div>
                        </div>
                </div>
        );
};

export default Registration;