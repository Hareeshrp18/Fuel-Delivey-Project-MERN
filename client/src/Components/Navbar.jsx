import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Homepage from './Homepage';
import Dpsignup from './Delivery-partner/Dpsignup';
import Fssignup from './Fuel-station/Fssignup';
import Usersignup from './User-page/Usersignup';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo">Fuel Delivery</div>
            <div className="hamburger-menu" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Usersignup">User</Link></li>
                <li><Link to="/Fssignup">Fuel Station</Link></li>
                <li><Link to="/Dpsignup">Delivery Partner</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
