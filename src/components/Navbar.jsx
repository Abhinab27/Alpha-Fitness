import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export default function Navbar() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Get first letter of name for user badge
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : 'U';
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <span className="text-gradient">ALPHA FITNESS</span>
                </div>
                <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
                    <NavLink to="/" className={({isActive}) => isActive ? "active-link" : ""}>Exercises</NavLink>
                    <NavLink to="/planner" className={({isActive}) => isActive ? "active-link" : ""}>Routine Planner</NavLink>
                    <NavLink to="/fitcorner" className={({isActive}) => isActive ? "active-link" : ""}>Fit Corner</NavLink>
                    
                    {currentUser ? (
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '2rem', gap: '15px' }}>
                            <div 
                                title={`Profile: ${currentUser.name} (${currentUser.email})`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'var(--surface-hover)',
                                    border: '1px solid var(--glass-border)',
                                    padding: '5px 12px',
                                    borderRadius: '30px',
                                    cursor: 'default'
                                }}
                            >
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold'
                                }}>
                                    {getInitials(currentUser.name)}
                                </div>
                                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>
                                    {currentUser.name.split(' ')[0]}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                title="Sign Out"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-muted)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'color 0.2s ease',
                                    padding: '5px'
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#ff4c4c'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <NavLink 
                            to="/auth" 
                            className={({isActive}) => isActive ? "active-link" : ""}
                            style={{ 
                                marginLeft: '2rem',
                                fontWeight: '700',
                                color: 'var(--primary-color)'
                            }}
                        >
                            Sign In
                        </NavLink>
                    )}
                    
                    {/* Elegant Sun/Moon Toggler */}
                    <button 
                        onClick={toggleTheme} 
                        className="theme-toggle-btn"
                        title={theme === 'light' ? 'Switch to Midnight Dark Mode' : 'Switch to Warm Light Mode'}
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
