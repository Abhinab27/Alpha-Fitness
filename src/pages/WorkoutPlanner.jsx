import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Dumbbell, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import '../index.css';

export default function WorkoutPlanner() {
    const navigate = useNavigate();

    const weeklySchedule = [
        {
            day: 'Monday',
            type: 'workout',
            planId: 'seed-push',
            name: 'Push Day (Chest / Shoulders / Triceps)',
            color: '#C97D60',
            description: 'Focused on upper body pushing movements to build the chest, deltoids, and triceps.',
            exercises: [
                { name: 'Barbell Bench Press', bodyPart: 'Chest', equipment: 'Barbell' },
                { name: 'Incline Dumbbell Press', bodyPart: 'Chest', equipment: 'Dumbbell' },
                { name: 'Dumbbell Fly', bodyPart: 'Chest', equipment: 'Dumbbell' },
                { name: 'Chest Dip', bodyPart: 'Chest', equipment: 'Bodyweight' },
                { name: 'Cable Crossover', bodyPart: 'Chest', equipment: 'Cable' },
                { name: 'Push-Up', bodyPart: 'Chest', equipment: 'Bodyweight' },
                { name: 'Overhead Dumbbell Press', bodyPart: 'Shoulders', equipment: 'Dumbbell' },
                { name: 'Arnold Press', bodyPart: 'Shoulders', equipment: 'Dumbbell' },
                { name: 'Lateral Raise', bodyPart: 'Shoulders', equipment: 'Dumbbell' },
                { name: 'Front Dumbbell Raise', bodyPart: 'Shoulders', equipment: 'Dumbbell' },
                { name: 'Tricep Overhead Extension', bodyPart: 'Upper arms', equipment: 'Dumbbell' },
                { name: 'Cable Tricep Pushdown', bodyPart: 'Upper arms', equipment: 'Cable' },
                { name: 'Skull Crusher', bodyPart: 'Upper arms', equipment: 'Barbell' }
            ]
        },
        {
            day: 'Tuesday',
            type: 'workout',
            planId: 'seed-pull',
            name: 'Pull Day (Back / Biceps)',
            color: '#60a5fa',
            description: 'Focused on upper body pulling patterns to construct back thickness, lat width, and arm strength.',
            exercises: [
                { name: 'Barbell Row', bodyPart: 'Back', equipment: 'Barbell' },
                { name: 'Lat Pulldown', bodyPart: 'Back', equipment: 'Cable' },
                { name: 'Pull-Up', bodyPart: 'Back', equipment: 'Bodyweight' },
                { name: 'Dumbbell Single-Arm Row', bodyPart: 'Back', equipment: 'Dumbbell' },
                { name: 'Seated Cable Row', bodyPart: 'Back', equipment: 'Cable' },
                { name: 'Deadlift', bodyPart: 'Back', equipment: 'Barbell' },
                { name: 'Straight-Arm Cable Pulldown', bodyPart: 'Back', equipment: 'Cable' },
                { name: 'Dumbbell Pullover', bodyPart: 'Back', equipment: 'Dumbbell' },
                { name: 'Face Pull', bodyPart: 'Shoulders', equipment: 'Cable' },
                { name: 'Dumbbell Bicep Curl', bodyPart: 'Upper arms', equipment: 'Dumbbell' },
                { name: 'Hammer Curl', bodyPart: 'Upper arms', equipment: 'Dumbbell' },
                { name: 'Barbell Bicep Curl', bodyPart: 'Upper arms', equipment: 'Barbell' },
                { name: 'Preacher Curl', bodyPart: 'Upper arms', equipment: 'Barbell' }
            ]
        },
        {
            day: 'Wednesday',
            type: 'rest',
            name: 'Active Rest & Recovery Day',
            color: '#5E7B6C',
            description: 'Let your nervous system recover. Focus on light walking, hydration, and organic mobility stretching.'
        },
        {
            day: 'Thursday',
            type: 'workout',
            planId: 'seed-legs',
            name: 'Leg Day (Quads / Hamstrings / Core)',
            color: '#4ade80',
            description: 'Intense lower body session targeting quads, hamstrings, glutes, calves, and a complete abs circuit.',
            exercises: [
                { name: 'Barbell Back Squat', bodyPart: 'Upper legs', equipment: 'Barbell' },
                { name: 'Leg Press', bodyPart: 'Upper legs', equipment: 'Machine' },
                { name: 'Dumbbell Lunge', bodyPart: 'Upper legs', equipment: 'Dumbbell' },
                { name: 'Romanian Deadlift', bodyPart: 'Upper legs', equipment: 'Barbell' },
                { name: 'Lying Leg Curl', bodyPart: 'Upper legs', equipment: 'Machine' },
                { name: 'Bulgarian Split Squat', bodyPart: 'Upper legs', equipment: 'Dumbbell' },
                { name: 'Hip Thrust', bodyPart: 'Upper legs', equipment: 'Barbell' },
                { name: 'Standing Calf Raise', bodyPart: 'Upper legs', equipment: 'Bodyweight' },
                { name: 'Abdominal Crunch', bodyPart: 'Waist', equipment: 'Bodyweight' },
                { name: 'Hanging Leg Raise', bodyPart: 'Waist', equipment: 'Bodyweight' },
                { name: 'Russian Twist', bodyPart: 'Waist', equipment: 'Dumbbell' },
                { name: 'Plank', bodyPart: 'Waist', equipment: 'Bodyweight' },
                { name: 'Bicycle Crunch', bodyPart: 'Waist', equipment: 'Bodyweight' }
            ]
        },
        {
            day: 'Friday',
            type: 'workout',
            planId: 'seed-push',
            name: 'Push Day (Chest / Shoulders / Triceps)',
            color: '#C97D60',
            description: 'Volume progression session focusing on muscular hypertrophy and recovery details.',
            exercises: [
                { name: 'Barbell Bench Press', bodyPart: 'Chest', equipment: 'Barbell' },
                { name: 'Incline Dumbbell Press', bodyPart: 'Chest', equipment: 'Dumbbell' },
                { name: 'Dumbbell Fly', bodyPart: 'Chest', equipment: 'Dumbbell' },
                { name: 'Chest Dip', bodyPart: 'Chest', equipment: 'Bodyweight' },
                { name: 'Cable Crossover', bodyPart: 'Chest', equipment: 'Cable' },
                { name: 'Push-Up', bodyPart: 'Chest', equipment: 'Bodyweight' },
                { name: 'Overhead Dumbbell Press', bodyPart: 'Shoulders', equipment: 'Dumbbell' },
                { name: 'Arnold Press', bodyPart: 'Shoulders', equipment: 'Dumbbell' },
                { name: 'Lateral Raise', bodyPart: 'Shoulders', equipment: 'Dumbbell' },
                { name: 'Front Dumbbell Raise', bodyPart: 'Shoulders', equipment: 'Dumbbell' },
                { name: 'Tricep Overhead Extension', bodyPart: 'Upper arms', equipment: 'Dumbbell' },
                { name: 'Cable Tricep Pushdown', bodyPart: 'Upper arms', equipment: 'Cable' },
                { name: 'Skull Crusher', bodyPart: 'Upper arms', equipment: 'Barbell' }
            ]
        },
        {
            day: 'Saturday',
            type: 'workout',
            planId: 'seed-pull',
            name: 'Pull Day (Back / Biceps)',
            color: '#60a5fa',
            description: 'Upper back volume progression. Focus on mind-muscle contractions on every single rep.',
            exercises: [
                { name: 'Barbell Row', bodyPart: 'Back', equipment: 'Barbell' },
                { name: 'Lat Pulldown', bodyPart: 'Back', equipment: 'Cable' },
                { name: 'Pull-Up', bodyPart: 'Back', equipment: 'Bodyweight' },
                { name: 'Dumbbell Single-Arm Row', bodyPart: 'Back', equipment: 'Dumbbell' },
                { name: 'Seated Cable Row', bodyPart: 'Back', equipment: 'Cable' },
                { name: 'Deadlift', bodyPart: 'Back', equipment: 'Barbell' },
                { name: 'Straight-Arm Cable Pulldown', bodyPart: 'Back', equipment: 'Cable' },
                { name: 'Dumbbell Pullover', bodyPart: 'Back', equipment: 'Dumbbell' },
                { name: 'Face Pull', bodyPart: 'Shoulders', equipment: 'Cable' },
                { name: 'Dumbbell Bicep Curl', bodyPart: 'Upper arms', equipment: 'Dumbbell' },
                { name: 'Hammer Curl', bodyPart: 'Upper arms', equipment: 'Dumbbell' },
                { name: 'Barbell Bicep Curl', bodyPart: 'Upper arms', equipment: 'Barbell' },
                { name: 'Preacher Curl', bodyPart: 'Upper arms', equipment: 'Barbell' }
            ]
        },
        {
            day: 'Sunday',
            type: 'rest',
            name: 'Active Rest & Recovery Day',
            color: '#5E7B6C',
            description: 'Refuel muscles, perform deep breathing, and prepare mentally to crush the upcoming training cycle.'
        }
    ];

    return (
        <div className="container" style={{ paddingTop: '120px', minHeight: '85vh', paddingBottom: '5rem', maxWidth: '900px' }}>
            
            {/* Elegant Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '0.75rem', fontFamily: 'Lora, serif' }}>
                    Weekly Workout <span className="text-gradient">Schedule</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'Outfit, sans-serif' }}>
                    A simple, beautifully organized training progression sheet. Tap any active session below to begin your gym training.
                </p>
            </div>

            {/* Vertical Diary Schedule */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {weeklySchedule.map((item, idx) => {
                    const isWorkout = item.type === 'workout';
                    
                    return (
                        <div 
                            key={idx} 
                            style={{ 
                                background: 'var(--surface-color)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '20px',
                                padding: '2.5rem',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.01)',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                transition: 'transform 0.2s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {/* Card Top Title & Details */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                                <div>
                                    <span style={{ fontSize: '0.85rem', color: isWorkout ? 'var(--primary-color)' : 'var(--secondary-color)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        {item.day}
                                    </span>
                                    <h3 style={{ fontSize: '1.6rem', fontFamily: 'Lora, serif', margin: '5px 0', fontWeight: '600' }}>
                                        {item.name}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                                        {item.description}
                                    </p>
                                </div>
                                {isWorkout ? (
                                    <span style={{ fontSize: '0.8rem', background: 'rgba(201,125,96,0.1)', color: 'var(--primary-color)', padding: '5px 12px', borderRadius: '30px', fontWeight: 'bold' }}>
                                        💪 Active Split
                                    </span>
                                ) : (
                                    <span style={{ fontSize: '0.8rem', background: 'rgba(94,123,108,0.1)', color: 'var(--secondary-color)', padding: '5px 12px', borderRadius: '30px', fontWeight: 'bold' }}>
                                        💤 Sleep & Stretch
                                    </span>
                                )}
                            </div>

                            {/* Exercises List (Directly displayed for Beginners' ease) */}
                            {isWorkout && (
                                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem', fontWeight: 'bold' }}>
                                        Exercises Scheduled ({item.exercises.length})
                                    </h4>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '8px 1.5rem' }}>
                                        {item.exercises.map((ex, exIdx) => (
                                            <div key={exIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                                                <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>•</span>
                                                <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{ex.name}</span>
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', background: 'var(--surface-hover)', padding: '2px 6px', borderRadius: '4px' }}>
                                                    {ex.equipment}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Bottom Call to Action */}
                            {isWorkout ? (
                                <div style={{ display: 'flex', justifyContent: 'flex-start', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                                    <button 
                                        onClick={() => navigate(`/workout/${item.planId}`)}
                                        className="primary-button"
                                        style={{ 
                                            padding: '10px 24px', 
                                            borderRadius: '30px', 
                                            display: 'inline-flex', 
                                            alignItems: 'center', 
                                            gap: '8px', 
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        <Play size={14} fill="currentColor" /> Start Active Session
                                    </button>
                                </div>
                            ) : (
                                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Heart size={14} color="var(--primary-color)" /> Hydrate with Electrolytes</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><ShieldCheck size={14} color="var(--secondary-color)" /> Light Mobility Work</span>
                                </div>
                            )}

                        </div>
                    );
                })}
            </div>

            {/* Coach Quote Footer */}
            <div style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', border: '1px solid var(--glass-border)', borderRadius: '20px', background: 'var(--surface-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <p style={{ margin: 0, fontStyle: 'italic', fontFamily: 'Lora, serif', fontSize: '1.1rem', color: 'var(--primary-color)' }}>
                    "The secret of strength lies in the simplicity of progression."
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'bold', uppercase: true, letterSpacing: '0.5px' }}>
                    — ALPHA FITNESS COACH DIRECTIVE
                </span>
            </div>

        </div>
    );
}
