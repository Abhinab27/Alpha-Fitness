import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WorkoutPlanner from './pages/WorkoutPlanner';
import ActiveWorkout from './pages/ActiveWorkout';
import FitCorner from './pages/FitCorner';
import './index.css';

export default function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/planner" element={<WorkoutPlanner />} />
                    <Route path="/workout/:planId" element={<ActiveWorkout />} />
                    <Route path="/fitcorner" element={<FitCorner />} />
                </Routes>
                <footer className="footer container text-center">
                    <p>Copyright 2026 Alpha Fitness. Built for Peak Performance.</p>
                </footer>
            </div>
        </Router>
    );
}
