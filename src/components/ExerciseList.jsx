import React, { useState } from 'react';
import DOMPurify from 'dompurify';

export default function ExerciseList({ selectedPart, exercises, loading, onClose }) {
    const [expandedIds, setExpandedIds] = useState(new Set());

    const toggleDetails = (id) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    if (!selectedPart) return null;

    return (
        <section id="exercise-section" className="exercises-section container">
            <div className="exercise-header glass">
                <div>
                    <h2><span style={{ color: 'var(--primary-color)' }}>{selectedPart}</span> Workout Plan</h2>
                    <p>Specialized routine to maximize growth and strength.</p>
                </div>
                <button className="close-btn" onClick={onClose}>
                    ✕
                </button>
            </div>

            {loading ? (
                <div className="loading-state glass">
                    <p>Analyzing optimal {selectedPart.toLowerCase()} exercises...</p>
                </div>
            ) : (
                <div className="exercises-grid">
                    {exercises.map((exercise, index) => {
                        const exerciseId = exercise.id || index;
                        const isExpanded = expandedIds.has(exerciseId);

                        return (
                            <div
                                key={`${selectedPart}-${exerciseId}`}
                                className="exercise-card glass tutorial-style"
                            >
                                <img src={exercise.image} alt={exercise.name} loading="lazy" className="exercise-gif" />
                                
                                <div className="tutorial-tags-container">
                                    <span className="tutorial-tag tag-pink">
                                        {exercise.bodyPart || selectedPart}
                                    </span>
                                    <span className="tutorial-tag tag-yellow">
                                        {exercise.target || exercise.muscles || 'Target'}
                                    </span>
                                </div>

                                <div className="exercise-content">
                                    <h3 className="tutorial-title">{exercise.name}</h3>
                                    
                                    {isExpanded && (
                                        <div
                                            className="exercise-desc"
                                            style={{ marginTop: '15px' }}
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exercise.description) }}
                                        />
                                    )}

                                    <div className="action-buttons-group" style={{ marginTop: '15px' }}>
                                        <button
                                            onClick={() => toggleDetails(exerciseId)}
                                            className="secondary-button tutorial-btn"
                                            style={{ flex: '1 1 100%' }}
                                        >
                                            {isExpanded ? 'Hide Details' : 'View Instructions'}
                                        </button>
                                        
                                        <a 
                                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + ' exercise tutorial')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="secondary-button tutorial-btn youtube-btn"
                                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '5px', textDecoration: 'none', background: 'rgba(255, 0, 0, 0.1)', borderColor: 'rgba(255, 0, 0, 0.3)', color: '#ff4c4c' }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 0, 0, 0.25)'; e.currentTarget.style.borderColor = '#ff4c4c'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 0, 0, 0.1)'; e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)'; }}
                                        >
                                            ▶ YouTube Search
                                        </a>

                                        <a 
                                            href={`https://www.google.com/search?q=${encodeURIComponent('how to do ' + exercise.name + ' exercise properly')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="secondary-button tutorial-btn google-btn"
                                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '5px', textDecoration: 'none', background: 'rgba(0, 212, 255, 0.1)', borderColor: 'rgba(0, 212, 255, 0.3)', color: '#00d4ff' }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 212, 255, 0.25)'; e.currentTarget.style.borderColor = '#00d4ff'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'; e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)'; }}
                                        >
                                            Google Guide
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {exercises.length === 0 && (
                        <div className="empty-state">No exercises found.</div>
                    )}
                </div>
            )}
        </section>
    );
}
