import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ChevronRight, ChevronLeft, Pause, Play, RotateCcw } from 'lucide-react';
import DOMPurify from 'dompurify';

export default function ActiveWorkout() {
    const { planId } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [isResting, setIsResting] = useState(false);
    const [restTimeLeft, setRestTimeLeft] = useState(60); // 60 seconds default rest
    const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        const storedPlans = localStorage.getItem('fitness_plans');
        if (storedPlans) {
            const plans = JSON.parse(storedPlans);
            const foundPlan = plans.find(p => p.id === planId);
            if (foundPlan && foundPlan.exercises && foundPlan.exercises.length > 0) {
                setPlan(foundPlan);
            } else {
                navigate('/planner'); // Redirect if invalid or empty
            }
        } else {
            navigate('/planner');
        }
    }, [planId, navigate]);

    useEffect(() => {
        if (isResting && restTimeLeft > 0) {
            timerRef.current = setTimeout(() => setRestTimeLeft(prev => prev - 1), 1000);
        } else if (isResting && restTimeLeft === 0) {
            setIsResting(false);
        }
        return () => clearTimeout(timerRef.current);
    }, [isResting, restTimeLeft]);

    if (!plan) return <div className="container" style={{paddingTop: '100px'}}><div className="loader"></div></div>;

    const currentExercise = plan.exercises[currentExerciseIndex];

    const handleNext = () => {
        if (currentExerciseIndex < plan.exercises.length - 1) {
            setIsResting(true);
            setRestTimeLeft(60); // Reset rest timer
            setCurrentExerciseIndex(prev => prev + 1);
        } else {
            setIsWorkoutComplete(true);
        }
    };

    const handlePrevious = () => {
        if (currentExerciseIndex > 0) {
            setIsResting(false);
            setCurrentExerciseIndex(prev => prev - 1);
        }
    };
    
    const skipRest = () => {
        setIsResting(false);
    };

    const finishWorkout = () => {
        // Here you could save workout stats to local storage
        navigate('/planner');
    };

    if (isWorkoutComplete) {
        return (
            <div className="container" style={{ paddingTop: '100px', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="glass" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '500px', width: '100%', borderRadius: '24px' }}>
                    <CheckCircle size={80} color="#4ade80" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>Workout Complete!</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Great job finishing your <strong style={{color: plan.color}}>{plan.name}</strong> routine.
                    </p>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <button className="primary-button" onClick={finishWorkout} style={{ padding: '12px 30px', fontSize: '1.1rem' }}>
                            Finish & Return
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (isResting) {
        return (
            <div className="container" style={{ paddingTop: '100px', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="glass" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '500px', width: '100%', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, height: '4px', background: plan.color, transition: 'width 1s linear', width: `${(restTimeLeft / 60) * 100}%` }}></div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#fff' }}>Rest Period</h2>
                    <div style={{ fontSize: '5rem', fontWeight: 'bold', fontFamily: 'monospace', color: plan.color, marginBottom: '2rem', textShadow: `0 0 20px ${plan.color}40` }}>
                        0:{restTimeLeft < 10 ? `0${restTimeLeft}` : restTimeLeft}
                    </div>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Up next: <strong>{currentExercise.name}</strong></p>
                    
                    <button className="secondary-button" onClick={skipRest} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
                        <Play size={18} /> Skip Rest
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <span style={{ background: `${plan.color}20`, color: plan.color, padding: '4px 12px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '10px', display: 'inline-block' }}>{plan.name}</span>
                    <h2 style={{ margin: 0 }}>Exercise {currentExerciseIndex + 1} of {plan.exercises.length}</h2>
                </div>
                <button onClick={() => navigate('/planner')} style={{ background: 'rgba(255,100,100,0.1)', color: '#ff4c4c', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <XCircle size={18} /> End Workout
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                <div className="glass" style={{ padding: 0, overflow: 'hidden', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                    {/* Visual Media Area */}
                    <div style={{ background: '#fff', display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                        <img src={currentExercise.image} alt={currentExercise.name} style={{ width: '100%', maxWidth: '400px', height: 'auto', mixBlendMode: 'multiply' }} />
                    </div>
                    
                    {/* Content Area */}
                    <div style={{ padding: '2rem', flexGrow: 1 }}>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                            <span className="exercise-tag" style={{ background: '#ff7eb3', color: '#000' }}>{currentExercise.bodyPart}</span>
                            <span className="exercise-tag" style={{ background: '#fcc757', color: '#000' }}>{currentExercise.target}</span>
                            <span className="exercise-tag" style={{ background: '#4ade80', color: '#000' }}>{currentExercise.equipment}</span>
                        </div>
                        
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{currentExercise.name}</h3>
                        
                        <div className="exercise-desc" style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.8)' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentExercise.description) }} />
                    </div>

                    {/* Controls Footer */}
                    <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button 
                            className="secondary-button" 
                            onClick={handlePrevious} 
                            disabled={currentExerciseIndex === 0}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: currentExerciseIndex === 0 ? 0.3 : 1 }}
                        >
                            <ChevronLeft size={20} /> Previous
                        </button>
                        
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {plan.exercises.map((_, idx) => (
                                <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx === currentExerciseIndex ? plan.color : 'rgba(255,255,255,0.2)' }} />
                            ))}
                        </div>

                        <button 
                            className="primary-button" 
                            onClick={handleNext}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
                        >
                            {currentExerciseIndex === plan.exercises.length - 1 ? 'Finish Routine' : 'Complete Set'} <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
