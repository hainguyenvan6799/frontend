import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <h2>Dưới đây là các Link</h2>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/import-users">Import Users</Link>
        </div>
    )
}

export default Nav;