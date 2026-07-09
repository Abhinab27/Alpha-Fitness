import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WorkoutPlanner from './pages/WorkoutPlanner';
import ActiveWorkout from './pages/ActiveWorkout';
import FitCorner from './pages/FitCorner';
import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import './index.css';

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="app-container">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/planner" element={<WorkoutPlanner />} />
                        <Route path="/workout/:planId" element={<ActiveWorkout />} />
                        <Route path="/fitcorner" element={<FitCorner />} />
                        <Route path="/auth" element={<Auth />} />
                    </Routes>
                    <footer className="footer container text-center">
                        <p>Copyright 2026 Alpha Fitness. Built for Peak Performance.</p>
                    </footer>
                </div>
            </AuthProvider>
        </Router>
    );
}
