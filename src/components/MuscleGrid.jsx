import React from 'react';

const BODY_PARTS = [
    { name: 'Arms', image: '/exercises/Arms.png', color: '#C97D60' },
    { name: 'Legs', image: '/exercises/Legs.png', color: '#5E7B6C' },
    { name: 'Back', image: '/exercises/Back.png', color: '#8F6C5B' },
    { name: 'Chest', image: '/exercises/Barbell_Bench_Press.png', color: '#D0A38B' },
    { name: 'Shoulders', image: '/exercises/Shoulder.png', color: '#7B8B7B' },
    { name: 'Abs', image: '/exercises/Abs.png', color: '#A88B7B' }
];

export default function MuscleGrid({ selectedPart, onSelectPart }) {
    return (
        <section id="workouts" className="muscle-groups-section container">
            <div className="section-header">
                <h2>Target <span className="text-gradient">Muscle Groups</span></h2>
                <p>Select a body part to view corresponding tailored exercises and routines.</p>
            </div>

            <div className="grid">
                {BODY_PARTS.map((part) => (
                    <div
                        key={part.name}
                        className={`muscle-card ${selectedPart === part.name ? 'active' : ''}`}
                        onClick={() => onSelectPart(part.name)}
                        style={{ '--card-color': part.color }}
                    >
                        <img src={part.image} alt={part.name} className="card-image" />
                        <div className="card-overlay glass">
                            <h3>{part.name}</h3>
                            <div className="card-action">View Exercises &rarr;</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
