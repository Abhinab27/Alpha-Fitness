import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

export default function ExerciseList({ selectedPart, exercises, loading, onClose }) {
    const [expandedIds, setExpandedIds] = useState(new Set());
    
    // Plan Management States
    const [plans, setPlans] = useState([]);
    const [selectedExerciseForPlan, setSelectedExerciseForPlan] = useState(null);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    useEffect(() => {
        // Load plans from local storage so we know where to save them
        const storedPlans = localStorage.getItem('fitness_plans');
        if (storedPlans) {
            setPlans(JSON.parse(storedPlans));
        }
    }, [selectedExerciseForPlan]); // Reload when modal opens just in case they created one

    const toggleDetails = (id) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const openAddToPlanModal = (exercise) => {
        setSelectedExerciseForPlan(exercise);
    };

    const confirmAddToPlan = (planId) => {
        if (!selectedExerciseForPlan) return;

        const updatedPlans = plans.map(plan => {
            if (plan.id === planId) {
                // Prevent duplicate exact exercises
                const exists = plan.exercises.find(e => e.id === selectedExerciseForPlan.id || e.name === selectedExerciseForPlan.name);
                if (!exists) {
                    return { ...plan, exercises: [...plan.exercises, selectedExerciseForPlan] };
                }
            }
            return plan;
        });

        localStorage.setItem('fitness_plans', JSON.stringify(updatedPlans));
        setPlans(updatedPlans);
        setSelectedExerciseForPlan(null);
        
        // Show subtle success toast
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    if (!selectedPart) return null;

    return (
        <section id="exercise-section" className="exercises-section container">
            <div className="exercise-header glass">
                <div>
                    <h2><span className="text-gradient">{selectedPart}</span> Workout Plan</h2>
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
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 className="tutorial-title">{exercise.name}</h3>
                                        <button 
                                            title="Add to Workout Plan"
                                            onClick={() => openAddToPlanModal(exercise)} 
                                            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: '10px' }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        </button>
                                    </div>
                                    
                                    {isExpanded && (
                                        <div
                                            className="exercise-desc"
                                            style={{ marginTop: '15px' }}
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exercise.description) }}
                                        />
                                    )}

                                    <div className="action-buttons-group">
                                        <button
                                            onClick={() => toggleDetails(exerciseId)}
                                            className="secondary-button tutorial-btn"
                                            style={{ marginTop: isExpanded ? '15px' : '0' }}
                                        >
                                            {isExpanded ? 'Hide Details' : 'View Instructions'}
                                        </button>
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
            {/* Add to Plan Modal */}
            {selectedExerciseForPlan && (
                <div className="video-modal-overlay" onClick={() => setSelectedExerciseForPlan(null)}>
                    <div className="glass" style={{ padding: '2rem', width: '100%', maxWidth: '400px', cursor: 'default' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3>Add to Routine</h3>
                            <button onClick={() => setSelectedExerciseForPlan(null)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                        </div>
                        
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            Save <strong>{selectedExerciseForPlan.name}</strong> to one of your custom workout plans.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                            {plans.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px' }}>No routines found.</p>
                                    <a href="#/planner" onClick={() => { window.location.hash = '#/planner'; setSelectedExerciseForPlan(null); }} style={{ color: '#FCC757', textDecoration: 'none', fontSize: '0.9rem' }}>Go create one in the Workout Planner!</a>
                                </div>
                            ) : (
                                plans.map(plan => {
                                    const isAlreadyAdded = plan.exercises.find(e => e.id === selectedExerciseForPlan.id || e.name === selectedExerciseForPlan.name);
                                    return (
                                        <button 
                                            key={plan.id}
                                            disabled={isAlreadyAdded}
                                            onClick={() => confirmAddToPlan(plan.id)}
                                            style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'space-between',
                                                padding: '12px 15px', 
                                                background: 'rgba(0,0,0,0.4)', 
                                                border: `1px solid ${plan.color}40`, 
                                                borderRadius: '8px',
                                                color: 'white',
                                                cursor: isAlreadyAdded ? 'not-allowed' : 'pointer',
                                                opacity: isAlreadyAdded ? 0.5 : 1,
                                                textAlign: 'left'
                                            }}
                                        >
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: plan.color }}></div>
                                                {plan.name}
                                            </span>
                                            {isAlreadyAdded && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Added</span>}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Success Toast */}
            {showSuccessToast && (
                <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: '#4ade80', color: '#000', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 9999, animation: 'fadeInOut 3s forwards' }}>
                    Exercise saved to routine!
                </div>
            )}
        </section>
    );
}
