import React, { useEffect, useState } from 'react';

const Users = () => {
        const [user, setUser] = useState([]);

        useEffect(() => {
                fetch('http://localhost:5000/members')
                        .then(res => res.json())
                        .then(data => setUser(data))
        }, [])
        return [user];
};

export default Users;