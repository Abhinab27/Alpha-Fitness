import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container nav-content">
                <div className="logo">
                    <span className="text-gradient">ALPHA FITNESS</span>
                </div>
                <div className="nav-links">
                    <NavLink to="/" className={({isActive}) => isActive ? "active-link" : ""}>Exercises</NavLink>
                    <NavLink to="/planner" className={({isActive}) => isActive ? "active-link" : ""}>My Plan</NavLink>
                    <NavLink to="/diet" className={({isActive}) => isActive ? "active-link" : ""}>Nutrition</NavLink>
                </div>
            </div>
        </nav>
    );
}
