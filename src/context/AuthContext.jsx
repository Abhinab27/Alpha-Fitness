import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock checking for existing session in localStorage
        const storedUser = localStorage.getItem('fitness_user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Very basic mock login - in reality this goes to a real backend
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!email || !password) {
                    reject(new Error("Email and password required"));
                    return;
                }
                
                const mockUser = {
                    id: Math.random().toString(36).substr(2, 9),
                    email: email,
                    name: email.split('@')[0],
                    joined: new Date().toISOString()
                };
                
                localStorage.setItem('fitness_user', JSON.stringify(mockUser));
                setCurrentUser(mockUser);
                resolve(mockUser);
            }, 800);
        });
    };

    const signup = (email, password, name) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!email || !password || !name) {
                    reject(new Error("All fields are required"));
                    return;
                }
                
                const mockUser = {
                    id: Math.random().toString(36).substr(2, 9),
                    email: email,
                    name: name,
                    joined: new Date().toISOString()
                };
                
                localStorage.setItem('fitness_user', JSON.stringify(mockUser));
                setCurrentUser(mockUser);
                resolve(mockUser);
            }, 800);
        });
    };

    const logout = () => {
        localStorage.removeItem('fitness_user');
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
