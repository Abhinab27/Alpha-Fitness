import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Calendar, Play, Trash2, Dumbbell, Clock } from 'lucide-react';
import '../index.css';

export default function WorkoutPlanner() {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    const [showNewPlanModal, setShowNewPlanModal] = useState(false);
    const [newPlanName, setNewPlanName] = useState('');

    useEffect(() => {
        const storedPlans = localStorage.getItem('fitness_plans');
        if (storedPlans) {
            setPlans(JSON.parse(storedPlans));
        } else {
            // Seed a default plan if none exists
            const defaultPlan = [
                { id: 'default-1', name: 'My First Routine', exercises: [], color: '#FCC757' }
            ];
            setPlans(defaultPlan);
            localStorage.setItem('fitness_plans', JSON.stringify(defaultPlan));
        }
    }, []);

    const createPlan = (e) => {
        e.preventDefault();
        if (!newPlanName.trim()) return;

        const colors = ['#FCC757', '#FFA9A9', '#4ade80', '#60a5fa', '#c084fc'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const updatedPlans = [...plans, {
            id: Date.now().toString(),
            name: newPlanName,
            exercises: [],
            color: randomColor
        }];

        setPlans(updatedPlans);
        localStorage.setItem('fitness_plans', JSON.stringify(updatedPlans));
        setNewPlanName('');
        setShowNewPlanModal(false);
    };

    const deletePlan = (id) => {
        const updatedPlans = plans.filter(p => p.id !== id);
        setPlans(updatedPlans);
        localStorage.setItem('fitness_plans', JSON.stringify(updatedPlans));
    };

    const removeExerciseFromPlan = (planId, indexToRemove) => {
        const updatedPlans = plans.map(plan => {
            if (plan.id === planId) {
                const updatedExercises = plan.exercises.filter((_, idx) => idx !== indexToRemove);
                return { ...plan, exercises: updatedExercises };
            }
            return plan;
        });
        setPlans(updatedPlans);
        localStorage.setItem('fitness_plans', JSON.stringify(updatedPlans));
    };

    const totalExercises = plans.reduce((acc, plan) => acc + plan.exercises.length, 0);

    return (
        <div className="container" style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '3rem' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                <div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}><span className="text-gradient">My Routines</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', display: 'flex', gap: '15px' }}>
                        <span><Calendar size={16} style={{display: 'inline', verticalAlign: '-3px'}}/> {plans.length} Routines</span>
                        <span><Dumbbell size={16} style={{display: 'inline', verticalAlign: '-3px'}}/> {totalExercises} Exercises</span>
                    </p>
                </div>
                <button className="primary-button" onClick={() => setShowNewPlanModal(true)} style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '12px 24px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)' }}>
                    <PlusCircle size={20} /> Build New Routine
                </button>
            </div>

            {/* Plans Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
                {plans.length === 0 ? (
                    <div className="glass" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 2rem', color: 'var(--text-muted)', borderRadius: '24px' }}>
                        <Calendar size={64} style={{ opacity: 0.3, marginBottom: '1.5rem', color: 'var(--primary-color)' }} />
                        <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>Your Canvas is Empty</h3>
                        <p style={{ fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto' }}>Create a new routine block here, then head over to the exercises page to fill it up.</p>
                    </div>
                ) : (
                    plans.map(plan => {
                        const coverImage = plan.exercises.length > 0 ? plan.exercises[0].image : null;
                        
                        return (
                            <div key={plan.id} className="glass" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0, overflow: 'hidden', borderRadius: '24px', transition: 'transform 0.3s ease, box-shadow 0.3s ease', position: 'relative', border: `1px solid rgba(255,255,255,0.05)` }}
                                 onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 10px 30px ${plan.color}20`; }}
                                 onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                {/* Dynamic Cover Image Header */}
                                <div style={{ 
                                    height: '140px', 
                                    position: 'relative', 
                                    background: coverImage ? `url(${coverImage}) center/cover no-repeat` : `linear-gradient(135deg, ${plan.color}20, rgba(0,0,0,0.8))`,
                                    borderBottom: `2px solid ${plan.color}`
                                }}>
                                    {/* Dark Gradient Overlay for readability */}
                                    {coverImage && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9, 10, 15, 1), rgba(9, 10, 15, 0.2))' }}></div>}
                                    
                                    <div style={{ position: 'absolute', bottom: '15px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2 }}>
                                        <div>
                                            <span style={{ background: plan.color, color: '#000', fontSize: '0.75rem', fontWeight: 'bold', padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase', marginBottom: '8px', display: 'inline-block' }}>
                                                {plan.exercises.length} Exercises
                                            </span>
                                            <h3 style={{ fontSize: '1.6rem', margin: 0, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{plan.name}</h3>
                                        </div>
                                        <button onClick={() => deletePlan(plan.id)} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)', transition: 'all 0.2s ease' }}
                                                onMouseEnter={e => { e.currentTarget.style.background = '#ff4c4c'; e.currentTarget.style.borderColor = '#ff4c4c'; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                                                title="Delete Routine"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Exercise List Area */}
                                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                                    {plan.exercises.length === 0 ? (
                                        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontStyle: 'italic', textAlign: 'center' }}>
                                                Empty block. Navigate to the exercises to fill this plan.
                                            </p>
                                        </div>
                                    ) : (
                                        plan.exercises.map((ex, idx) => (
                                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', padding: '8px', borderRadius: '12px', transition: 'background 0.2s ease' }}
                                                 onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                                 onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
                                            >
                                                <img src={ex.image} alt={ex.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                                                <div style={{ flexGrow: 1, minWidth: 0 }}>
                                                    <p style={{ margin: 0, fontWeight: '600', fontSize: '0.95rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ex.name}</p>
                                                    <p style={{ margin: 0, fontSize: '0.8rem', color: plan.color, opacity: 0.9 }}>{ex.target}</p>
                                                </div>
                                                <button onClick={() => removeExerciseFromPlan(plan.id, idx)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '8px', transition: 'color 0.2s ease' }}
                                                        onMouseEnter={e => e.currentTarget.style.color = '#ff4c4c'}
                                                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                                        title="Remove Exercise"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                                
                                {/* Start Workout Action */}
                                <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <button onClick={() => navigate(`/workout/${plan.id}`)} className="primary-button" disabled={plan.exercises.length === 0} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1.1rem', padding: '14px', borderRadius: '16px', opacity: plan.exercises.length === 0 ? 0.3 : 1, filter: plan.exercises.length === 0 ? 'grayscale(100%)' : 'none' }}>
                                        <Play fill="currentColor" size={18} /> {plan.exercises.length === 0 ? 'Add Exercises to Start' : 'Start Workout'}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Default New Plan Modal */}
            {showNewPlanModal && (
                <div className="video-modal-overlay" style={{ zIndex: 1000 }} onClick={() => setShowNewPlanModal(false)}>
                    <div className="glass" style={{ padding: '2.5rem', width: '100%', maxWidth: '450px', cursor: 'default', borderRadius: '24px', position: 'relative', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--primary-color)' }}></div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.8rem', margin: 0 }}>New Routine</h3>
                            <button onClick={() => setShowNewPlanModal(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                        </div>
                        
                        <form onSubmit={createPlan} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Routine Name</label>
                                <input required type="text" value={newPlanName} onChange={e => setNewPlanName(e.target.value)} style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1.1rem', transition: 'border-color 0.3s ease' }} placeholder="e.g. Back and Biceps" autoFocus />
                            </div>
                            <button type="submit" className="primary-button" style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
                                <PlusCircle size={20} /> Build Routine
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
