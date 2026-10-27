import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <span style={{ fontWeight: '800', letterSpacing: '2px', color: 'var(--primary-color)' }}>ALPHA FITNESS</span>
                </div>
                <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
                    <NavLink to="/" className={({isActive}) => isActive ? "active-link" : ""}>Exercises</NavLink>
                    <NavLink to="/planner" className={({isActive}) => isActive ? "active-link" : ""}>Routine Planner</NavLink>
                    <NavLink to="/fitcorner" className={({isActive}) => isActive ? "active-link" : ""}>Fit Corner</NavLink>
                    
                    <button 
                        onClick={toggleTheme} 
                        className="theme-toggle-btn"
                        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        style={{
                            marginLeft: '20px',
                            background: 'var(--surface-hover)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '50%',
                            width: '38px',
                            height: '38px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-main)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}
                    >
                        {theme === 'light' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
