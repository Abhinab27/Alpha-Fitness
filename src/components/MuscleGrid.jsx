import React from 'react';

const BODY_PARTS = [
    { name: 'Arms', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=600', color: '#00ff88' },
    { name: 'Legs', image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&q=80&w=600', color: '#00ccff' },
    { name: 'Back', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600', color: '#ff0055' },
    { name: 'Chest', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600', color: '#ffaa00' },
    { name: 'Shoulders', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600', color: '#9d00ff' },
    { name: 'Abs', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600', color: '#ff00aa' }
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
