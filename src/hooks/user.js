import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Users = () => {
        const [user, setUser] = useState([]);
        // useEffect(() => {
        //         fetch('https://powerhack-paybill.herokuapp.com/members')
        //                 .then(res => res.json())
        //                 .then(data => setUser(data))
        // }, [])
        // return [user];
        const navigate = useNavigate()
        useEffect(() => {
                fetch('https://powerhack-paybill.herokuapp.com/members', {
                        method: 'GET',
                        headers: {
                                authorization: `Bearer ${localStorage?.getItem('token')}`
                        }
                })
                        .then(res => {
                                if (res.status === 401 || res.status === 403) {
                                        navigate('/login');
                                }
                                return res.json()
                        })
                        .then(data => {
                                setUser(data)
                        })
        }, [])
        return [user];
};

export default Users;