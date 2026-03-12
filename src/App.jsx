import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WorkoutPlanner from './pages/WorkoutPlanner';
import DietTracker from './pages/DietTracker';
import ActiveWorkout from './pages/ActiveWorkout';
import './index.css';

export default function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/planner" element={<WorkoutPlanner />} />
                    <Route path="/diet" element={<DietTracker />} />
                    <Route path="/workout/:planId" element={<ActiveWorkout />} />
                </Routes>
                <footer className="footer container text-center">
                    <p>Copyright 2026 Alpha Fitness. This is a beginner project.</p>
                </footer>
            </div>
        </Router>
    );
}
