import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, AlertCircle, Sparkles, Eye, EyeOff } from 'lucide-react';
import '../index.css';

export default function Auth() {
    const { login, signup, currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoginTab, setIsLoginTab] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // Form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Feedback states
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // Determine redirect path
    const from = location.state?.from?.pathname || "/";

    // Redirect if already logged in
    React.useEffect(() => {
        if (currentUser) {
            navigate(from, { replace: true });
        }
    }, [currentUser, navigate, from]);

    const handleTabChange = (isLogin) => {
        setIsLoginTab(isLogin);
        setError('');
        setSuccessMsg('');
        setPassword('');
        setConfirmPassword('');
    };

    const validateForm = () => {
        if (!email.trim() || !password) {
            setError("All fields are required.");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return false;
        }
        if (!isLoginTab) {
            if (!name.trim()) {
                setError("Name is required.");
                return false;
            }
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        if (!validateForm()) return;

        setLoading(true);
        try {
            if (isLoginTab) {
                await login(email, password);
                setSuccessMsg("Logged in successfully! Redirecting...");
                setTimeout(() => {
                    navigate(from, { replace: true });
                }, 1000);
            } else {
                await signup(email, password, name);
                setSuccessMsg("Account created successfully! Welcome to Alpha Fitness.");
                setTimeout(() => {
                    navigate(from, { replace: true });
                }, 1200);
            }
        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
            setLoading(false);
        }
    };

    return (
        <div style={{
            paddingTop: '130px',
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-color)',
            transition: 'background-color 0.3s ease',
            paddingBottom: '4rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '460px',
                padding: '0 1.5rem'
            }}>
                {/* Brand Logo & Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        background: 'rgba(201, 125, 96, 0.1)', 
                        borderRadius: '50%', 
                        width: '60px', 
                        height: '60px', 
                        marginBottom: '1rem',
                        border: '1px solid rgba(201, 125, 96, 0.2)'
                    }}>
                        <Sparkles size={28} color="var(--primary-color)" />
                    </div>
                    <h2 style={{ fontFamily: 'Lora, serif', fontSize: '2.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        {isLoginTab ? "Welcome " : "Begin Your "}
                        <span className="text-gradient">{isLoginTab ? "Back" : "Journey"}</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        {isLoginTab 
                            ? "Sign in to track routines and access personalization." 
                            : "Create an account to start building custom schedules."}
                    </p>
                </div>

                {/* Main Card */}
                <div className="glass" style={{
                    padding: '2.5rem',
                    borderRadius: '24px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.03)',
                    background: 'var(--surface-color)',
                    border: '1px solid var(--glass-border)'
                }}>
                    {/* Tab Toggler */}
                    <div style={{
                        display: 'flex',
                        background: 'var(--surface-hover)',
                        borderRadius: '30px',
                        padding: '5px',
                        marginBottom: '2rem',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <button
                            type="button"
                            onClick={() => handleTabChange(true)}
                            style={{
                                flex: 1,
                                padding: '10px 15px',
                                borderRadius: '25px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: isLoginTab ? '#ffffff' : 'var(--text-muted)',
                                background: isLoginTab ? 'var(--primary-color)' : 'transparent',
                                boxShadow: isLoginTab ? '0 4px 15px var(--primary-glow)' : 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTabChange(false)}
                            style={{
                                flex: 1,
                                padding: '10px 15px',
                                borderRadius: '25px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: !isLoginTab ? '#ffffff' : 'var(--text-muted)',
                                background: !isLoginTab ? 'var(--primary-color)' : 'transparent',
                                boxShadow: !isLoginTab ? '0 4px 15px var(--primary-glow)' : 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Create Account
                        </button>
                    </div>

                    {/* Alert Display */}
                    {error && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'rgba(255, 76, 76, 0.1)',
                            border: '1px solid rgba(255, 76, 76, 0.2)',
                            color: '#ff4c4c',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            marginBottom: '1.5rem',
                            lineHeight: '1.4'
                        }}>
                            <AlertCircle size={18} style={{ flexShrink: 0 }} />
                            <span>{error}</span>
                        </div>
                    )}

                    {successMsg && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'rgba(74, 222, 128, 0.1)',
                            border: '1px solid rgba(74, 222, 128, 0.2)',
                            color: '#4ade80',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            marginBottom: '1.5rem',
                            lineHeight: '1.4'
                        }}>
                            <span style={{ fontWeight: 'bold' }}>✓</span>
                            <span>{successMsg}</span>
                        </div>
                    )}

                    {/* Auth Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {/* Name Field (Sign Up Only) */}
                        {!isLoginTab && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Name</label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <User size={18} style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px 12px 46px',
                                            borderRadius: '30px',
                                            border: '1px solid var(--glass-border)',
                                            background: 'var(--bg-color)',
                                            color: 'var(--text-main)',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = 'var(--primary-color)';
                                            e.target.style.backgroundColor = 'var(--surface-color)';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'var(--glass-border)';
                                            e.target.style.backgroundColor = 'var(--bg-color)';
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Email Address</label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)' }} />
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px 12px 46px',
                                        borderRadius: '30px',
                                        border: '1px solid var(--glass-border)',
                                        background: 'var(--bg-color)',
                                        color: 'var(--text-main)',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onFocus={e => {
                                        e.target.style.borderColor = 'var(--primary-color)';
                                        e.target.style.backgroundColor = 'var(--surface-color)';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = 'var(--glass-border)';
                                        e.target.style.backgroundColor = 'var(--bg-color)';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Password</label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)' }} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px 46px 12px 46px',
                                        borderRadius: '30px',
                                        border: '1px solid var(--glass-border)',
                                        background: 'var(--bg-color)',
                                        color: 'var(--text-main)',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onFocus={e => {
                                        e.target.style.borderColor = 'var(--primary-color)';
                                        e.target.style.backgroundColor = 'var(--surface-color)';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = 'var(--glass-border)';
                                        e.target.style.backgroundColor = 'var(--bg-color)';
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '16px',
                                        color: 'var(--text-muted)',
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field (Sign Up Only) */}
                        {!isLoginTab && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Confirm Password</label>
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)' }} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px 12px 46px',
                                            borderRadius: '30px',
                                            border: '1px solid var(--glass-border)',
                                            background: 'var(--bg-color)',
                                            color: 'var(--text-main)',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = 'var(--primary-color)';
                                            e.target.style.backgroundColor = 'var(--surface-color)';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'var(--glass-border)';
                                            e.target.style.backgroundColor = 'var(--bg-color)';
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="primary-button"
                            style={{
                                marginTop: '1rem',
                                padding: '12px 24px',
                                borderRadius: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                fontWeight: '700',
                                fontSize: '1rem',
                                opacity: loading ? 0.75 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading 
                                ? (isLoginTab ? "Signing In..." : "Creating Account...") 
                                : (isLoginTab ? "Sign In" : "Register Now")}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
