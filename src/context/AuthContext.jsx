/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
            const token = localStorage.getItem('fitness_token');
            if (token) {
                try {
                    // Set authorization header for API requests
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.get('/api/auth/me');
                    setCurrentUser(response.data);
                } catch (error) {
                    console.error("Failed to verify user session token:", error.message);
                    localStorage.removeItem('fitness_token');
                    delete axios.defaults.headers.common['Authorization'];
                    setCurrentUser(null);
                }
            }
            setLoading(false);
        };
        verifySession();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            const { user, token } = response.data;
            
            localStorage.setItem('fitness_token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setCurrentUser(user);
            return user;
        } catch (error) {
            const errorMsg = error.response?.data?.error || "Login failed. Please check your credentials.";
            throw new Error(errorMsg);
        }
    };

    const signup = async (email, password, name) => {
        try {
            const response = await axios.post('/api/auth/signup', { email, password, name });
            const { user, token } = response.data;
            
            localStorage.setItem('fitness_token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setCurrentUser(user);
            return user;
        } catch (error) {
            const errorMsg = error.response?.data?.error || "Registration failed. Please try again.";
            throw new Error(errorMsg);
        }
    };

    const logout = () => {
        localStorage.removeItem('fitness_token');
        delete axios.defaults.headers.common['Authorization'];
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        signup,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
