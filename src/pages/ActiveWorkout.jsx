/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ChevronRight, ChevronLeft, Pause, Play, RotateCcw } from 'lucide-react';
import DOMPurify from 'dompurify';
import { listExercises } from '../api';

const SEED_PLANS = [
    {
        id: 'seed-push',
        name: 'Push Day (Chest / Shoulders / Triceps)',
        color: '#C97D60',
        exerciseNames: [
            'Barbell Bench Press',
            'Incline Dumbbell Press',
            'Dumbbell Fly',
            'Chest Dip',
            'Cable Crossover',
            'Push-Up',
            'Tricep Overhead Extension',
            'Cable Tricep Pushdown',
            'Skull Crusher'
        ]
    },
    {
        id: 'seed-pull',
        name: 'Pull Day (Back / Biceps)',
        color: '#60a5fa',
        exerciseNames: [
            'Barbell Row',
            'Lat Pulldown',
            'Pull-Up',
            'Dumbbell Single-Arm Row',
            'Seated Cable Row',
            'Deadlift',
            'Straight-Arm Cable Pulldown',
            'Dumbbell Pullover',
            'Dumbbell Bicep Curl',
            'Hammer Curl',
            'Barbell Bicep Curl',
            'Preacher Curl'
        ]
    },
    {
        id: 'seed-legs',
        name: 'Leg Day (Quads / Hamstrings / Core)',
        color: '#4ade80',
        exerciseNames: [
            'Barbell Back Squat',
            'Leg Press',
            'Dumbbell Lunge',
            'Romanian Deadlift',
            'Lying Leg Curl',
            'Bulgarian Split Squat',
            'Hip Thrust',
            'Standing Calf Raise',
            'Abdominal Crunch',
            'Hanging Leg Raise',
            'Russian Twist',
            'Plank',
            'Bicycle Crunch'
        ]
    }
];

const initializePlans = (allExercises) => {
    return SEED_PLANS.map(seed => {
        const exercises = seed.exerciseNames.map(name => {
            const found = allExercises.find(ex => ex.name.toLowerCase() === name.toLowerCase());
            if (found) return found;
            return {
                id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                name: name,
                bodyPart: 'Various',
                target: 'Various',
                equipment: 'Bodyweight',
                image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
                description: '<p>Perform 3 sets of 10-12 repetitions. Focus on slow eccentric contractions and full range of motion.</p>'
            };
        });
        return {
            id: seed.id,
            name: seed.name,
            color: seed.color,
            exercises
        };
    });
};

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
        const loadPlan = async () => {
            let plans = [];
            const storedPlans = localStorage.getItem('fitness_plans');
            if (storedPlans) {
                plans = JSON.parse(storedPlans);
            }

            let foundPlan = plans.find(p => p.id === planId);
            
            // If the plan doesn't exist, seed default plans
            if (!foundPlan) {
                try {
                    const allExercises = await listExercises(150, 0);
                    const seededPlans = initializePlans(allExercises);
                    localStorage.setItem('fitness_plans', JSON.stringify(seededPlans));
                    foundPlan = seededPlans.find(p => p.id === planId);
                } catch (error) {
                    console.error("Failed to seed default plans:", error);
                }
            }

            if (foundPlan && foundPlan.exercises && foundPlan.exercises.length > 0) {
                setPlan(foundPlan);
            } else {
                navigate('/planner');
            }
        };

        loadPlan();
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
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Workout Complete!</h2>
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
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-main)' }}>Rest Period</h2>
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
                    <div style={{ background: 'var(--surface-hover)', display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                        <img src={currentExercise.image} alt={currentExercise.name} style={{ width: '100%', maxWidth: '400px', height: 'auto' }} />
                    </div>
                    
                    {/* Content Area */}
                    <div style={{ padding: '2rem', flexGrow: 1 }}>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                            <span className="exercise-tag" style={{ background: 'rgba(255, 126, 179, 0.15)', color: '#ff7eb3', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>{currentExercise.bodyPart}</span>
                            <span className="exercise-tag" style={{ background: 'rgba(252, 199, 87, 0.15)', color: '#fcc757', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>{currentExercise.target}</span>
                            <span className="exercise-tag" style={{ background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>{currentExercise.equipment}</span>
                        </div>
                        
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{currentExercise.name}</h3>
                        
                        <div className="exercise-desc" style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-muted)' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentExercise.description) }} />
                    </div>

                    {/* Controls Footer */}
                    <div style={{ padding: '2rem', background: 'var(--bg-color)', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
