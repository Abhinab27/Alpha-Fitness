import React from 'react';

export default function Hero() {
    return (
        <header id="home" className="hero-section">
            <div className="hero-bg"></div>
            <div className="container hero-content glass">
                <h1 className="hero-title">Forge Your <br /><span className="text-gradient">Ultimate Physique</span></h1>
                <p className="hero-subtitle">
                    Explore targeted exercises, powerful routines, and expert instructions across all major muscle groups.
                    Elevate your training to the next level today.
                </p>
                <a href="#workouts" className="primary-button">
                    Start Training
                </a>
            </div>
        </header>
    );
}
