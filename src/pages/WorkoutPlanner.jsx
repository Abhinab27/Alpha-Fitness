import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Dumbbell, ShieldCheck, Heart, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import '../index.css';

// Map exercise names to their image filenames in /exercises/
const exerciseImageMap = {
    // Push Day exercises
    'Barbell Bench Press': '/exercises/Barbell_Bench_Press.png',
    'Incline Dumbbell Press': '/exercises/Incline_Dumbell_Press.png',
    'Dumbbell Fly': '/exercises/Dumbbell_Fly.png',
    'Chest Dip': '/exercises/Chest_Dips.png',
    'Cable Crossover': '/exercises/Cable_Crossover.png',
    'Push-Up': '/exercises/Push-Up.png',
    'Overhead Dumbbell Press': '/exercises/Overhead_Dumbbell_Press.png',
    'Arnold Press': '/exercises/Arnold_Press.png',
    'Lateral Raise': '/exercises/Lateral_Raise.png',
    'Front Dumbbell Raise': '/exercises/Front_Dumbbell_Raise.png',
    'Tricep Overhead Extension': '/exercises/Tricep_Overhead_Extension.png',
    'Cable Tricep Pushdown': '/exercises/Cable_Tricep_Pushdown.png',
    'Skull Crusher': '/exercises/Skull_Crusher.png',

    // Pull Day exercises
    'Barbell Row': '/exercises/Barbell_Row.png',
    'Lat Pulldown': '/exercises/Lat_Pulldown.png',
    'Pull-Up': '/exercises/Pull-Up.png',
    'Dumbbell Single-Arm Row': '/exercises/Dumbbell_Single-Arm_Row.png',
    'Seated Cable Row': '/exercises/Seated_Cable_Row.png',
    'Deadlift': '/exercises/Deadlift.png',
    'Straight-Arm Cable Pulldown': '/exercises/Straight-Arm_Cable_Pulldown.png',
    'Dumbbell Pullover': '/exercises/Dumbbell_Pullover.png',
    'Face Pull': '/exercises/Face_Pull.png',
    'Dumbbell Bicep Curl': '/exercises/Dumbell_Bicep_Curl.png',
    'Hammer Curl': '/exercises/Hammer_Curl.png',
    'Barbell Bicep Curl': '/exercises/Barbell_Bicep_Curl.png',
    'Preacher Curl': '/exercises/Preacher_Curl.png',

    // Leg Day exercises
    'Barbell Back Squat': '/exercises/Barbell_Back_Squat.png',
    'Leg Press': '/exercises/Leg_Press.png',
    'Dumbbell Lunge': '/exercises/Dumbell_Lunge.png',
    'Romanian Deadlift': '/exercises/Romanian_Deadlift.png',
    'Lying Leg Curl': '/exercises/Lying_Leg_Curl.png',
    'Bulgarian Split Squat': '/exercises/Bulgarian_Split_Squat.png',
    'Hip Thrust': '/exercises/Hip_Thrust.png',
    'Standing Calf Raise': '/exercises/Standing_Calf_Raise.png',
    'Abdominal Crunch': '/exercises/Abdominal_Crunch.png',
    'Hanging Leg Raise': '/exercises/Hanging_Leg_Raise.png',
    'Russian Twist': '/exercises/Russian_Twist.png',
    'Plank': '/exercises/Plank.png',
    'Bicycle Crunch': '/exercises/Bicycle_Crunch.png',
};

export default function WorkoutPlanner() {
    const navigate = useNavigate();
    const [expandedDay, setExpandedDay] = useState(null);

    const toggleDay = (idx) => {
        setExpandedDay(prev => prev === idx ? null : idx);
    };

    const weeklySchedule = [
        {
            day: 'Push Day',
            type: 'workout',
            planId: 'seed-push',
            name: 'Chest / Shoulders / Triceps',
            color: '#C97D60',
            icon: '🔥',
            description: 'Focused on upper body pushing movements to build the chest, deltoids, and triceps.',
            exercises: [
                { name: 'Barbell Bench Press', bodyPart: 'Chest', equipment: 'Barbell', sets: '4', reps: '8-10' },
                { name: 'Incline Dumbbell Press', bodyPart: 'Chest', equipment: 'Dumbbell', sets: '3', reps: '10-12' },
                { name: 'Dumbbell Fly', bodyPart: 'Chest', equipment: 'Dumbbell', sets: '3', reps: '12' },
                { name: 'Chest Dip', bodyPart: 'Chest', equipment: 'Bodyweight', sets: '3', reps: '10-12' },
                { name: 'Cable Crossover', bodyPart: 'Chest', equipment: 'Cable', sets: '3', reps: '12-15' },
                { name: 'Push-Up', bodyPart: 'Chest', equipment: 'Bodyweight', sets: '3', reps: 'To Failure' },
                { name: 'Overhead Dumbbell Press', bodyPart: 'Shoulders', equipment: 'Dumbbell', sets: '4', reps: '8-10' },
                { name: 'Arnold Press', bodyPart: 'Shoulders', equipment: 'Dumbbell', sets: '3', reps: '10-12' },
                { name: 'Lateral Raise', bodyPart: 'Shoulders', equipment: 'Dumbbell', sets: '4', reps: '12-15' },
                { name: 'Front Dumbbell Raise', bodyPart: 'Shoulders', equipment: 'Dumbbell', sets: '3', reps: '12' },
                { name: 'Tricep Overhead Extension', bodyPart: 'Triceps', equipment: 'Dumbbell', sets: '3', reps: '10-12' },
                { name: 'Cable Tricep Pushdown', bodyPart: 'Triceps', equipment: 'Cable', sets: '3', reps: '12-15' },
                { name: 'Skull Crusher', bodyPart: 'Triceps', equipment: 'Barbell', sets: '3', reps: '10-12' }
            ]
        },
        {
            day: 'Pull Day',
            type: 'workout',
            planId: 'seed-pull',
            name: 'Back / Biceps',
            color: '#60a5fa',
            icon: '💪',
            description: 'Focused on upper body pulling patterns to construct back thickness, lat width, and arm strength.',
            exercises: [
                { name: 'Barbell Row', bodyPart: 'Back', equipment: 'Barbell', sets: '4', reps: '8-10' },
                { name: 'Lat Pulldown', bodyPart: 'Back', equipment: 'Cable', sets: '3', reps: '10-12' },
                { name: 'Pull-Up', bodyPart: 'Back', equipment: 'Bodyweight', sets: '3', reps: 'To Failure' },
                { name: 'Dumbbell Single-Arm Row', bodyPart: 'Back', equipment: 'Dumbbell', sets: '3', reps: '10-12' },
                { name: 'Seated Cable Row', bodyPart: 'Back', equipment: 'Cable', sets: '3', reps: '10-12' },
                { name: 'Deadlift', bodyPart: 'Back', equipment: 'Barbell', sets: '4', reps: '5-8' },
                { name: 'Straight-Arm Cable Pulldown', bodyPart: 'Back', equipment: 'Cable', sets: '3', reps: '12-15' },
                { name: 'Dumbbell Pullover', bodyPart: 'Back', equipment: 'Dumbbell', sets: '3', reps: '12' },
                { name: 'Face Pull', bodyPart: 'Rear Delts', equipment: 'Cable', sets: '3', reps: '15-20' },
                { name: 'Dumbbell Bicep Curl', bodyPart: 'Biceps', equipment: 'Dumbbell', sets: '3', reps: '10-12' },
                { name: 'Hammer Curl', bodyPart: 'Biceps', equipment: 'Dumbbell', sets: '3', reps: '10-12' },
                { name: 'Barbell Bicep Curl', bodyPart: 'Biceps', equipment: 'Barbell', sets: '3', reps: '10-12' },
                { name: 'Preacher Curl', bodyPart: 'Biceps', equipment: 'Barbell', sets: '3', reps: '10-12' }
            ]
        },
        {
            day: 'Leg Day',
            type: 'workout',
            planId: 'seed-legs',
            name: 'Quads / Hamstrings / Core',
            color: '#4ade80',
            icon: '🦵',
            description: 'Intense lower body session targeting quads, hamstrings, glutes, calves, and a complete abs circuit.',
            exercises: [
                { name: 'Barbell Back Squat', bodyPart: 'Quads', equipment: 'Barbell', sets: '4', reps: '6-8' },
                { name: 'Leg Press', bodyPart: 'Quads', equipment: 'Machine', sets: '4', reps: '10-12' },
                { name: 'Dumbbell Lunge', bodyPart: 'Quads', equipment: 'Dumbbell', sets: '3', reps: '10 each' },
                { name: 'Romanian Deadlift', bodyPart: 'Hamstrings', equipment: 'Barbell', sets: '4', reps: '8-10' },
                { name: 'Lying Leg Curl', bodyPart: 'Hamstrings', equipment: 'Machine', sets: '3', reps: '12' },
                { name: 'Bulgarian Split Squat', bodyPart: 'Quads', equipment: 'Dumbbell', sets: '3', reps: '10 each' },
                { name: 'Hip Thrust', bodyPart: 'Glutes', equipment: 'Barbell', sets: '4', reps: '10-12' },
                { name: 'Standing Calf Raise', bodyPart: 'Calves', equipment: 'Bodyweight', sets: '4', reps: '15-20' },
                { name: 'Abdominal Crunch', bodyPart: 'Abs', equipment: 'Bodyweight', sets: '3', reps: '20' },
                { name: 'Hanging Leg Raise', bodyPart: 'Abs', equipment: 'Bodyweight', sets: '3', reps: '12-15' },
                { name: 'Russian Twist', bodyPart: 'Abs', equipment: 'Dumbbell', sets: '3', reps: '20' },
                { name: 'Plank', bodyPart: 'Core', equipment: 'Bodyweight', sets: '3', reps: '45-60s' },
                { name: 'Bicycle Crunch', bodyPart: 'Abs', equipment: 'Bodyweight', sets: '3', reps: '20' }
            ]
        },
        {
            day: 'Rest Day',
            type: 'rest',
            name: 'Active Recovery & Mobility',
            color: '#5E7B6C',
            icon: '🧘',
            description: 'Let your nervous system recover. Focus on light walking, hydration, deep stretching, and organic mobility work. Sleep 7-9 hours for optimal muscle repair.'
        }
    ];

    const bodyPartColors = {
        'Chest': '#C97D60',
        'Shoulders': '#7B8B7B',
        'Triceps': '#A88B7B',
        'Back': '#60a5fa',
        'Biceps': '#8B6FC0',
        'Rear Delts': '#7B8B7B',
        'Quads': '#4ade80',
        'Hamstrings': '#F59E0B',
        'Glutes': '#EC4899',
        'Calves': '#06B6D4',
        'Abs': '#EF4444',
        'Core': '#EF4444',
    };

    return (
        <div className="container" style={{ paddingTop: '120px', minHeight: '85vh', paddingBottom: '5rem', maxWidth: '960px' }}>
            
            {/* Elegant Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '0.75rem', fontFamily: 'Lora, serif' }}>
                    Training <span style={{ color: 'var(--primary-color)' }}>Routine</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'Outfit, sans-serif' }}>
                    A structured Push / Pull / Legs split designed for maximum hypertrophy and strength progression.
                </p>
            </div>

            {/* Routine Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {weeklySchedule.map((item, idx) => {
                    const isWorkout = item.type === 'workout';
                    const isExpanded = expandedDay === idx;
                    
                    return (
                        <div 
                            key={idx} 
                            style={{ 
                                background: 'var(--surface-color)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)'; }}
                        >
                            <div style={{ 
                                height: '4px', 
                                background: item.color,
                            }} />

                            <div style={{ padding: '2rem 2.5rem' }}>
                                {/* Card Top Title & Details */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                            <span style={{ 
                                                fontSize: '0.85rem', 
                                                color: item.color, 
                                                fontWeight: '800', 
                                                textTransform: 'uppercase', 
                                                letterSpacing: '1.5px' 
                                            }}>
                                                {item.day}
                                            </span>
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', fontFamily: 'Lora, serif', margin: '5px 0', fontWeight: '600' }}>
                                            {item.name}
                                        </h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, maxWidth: '600px' }}>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                                        {isWorkout ? (
                                            <span style={{ 
                                                fontSize: '0.8rem', 
                                                background: `${item.color}15`, 
                                                color: item.color, 
                                                padding: '5px 14px', 
                                                borderRadius: '30px', 
                                                fontWeight: 'bold',
                                                border: `1px solid ${item.color}30`
                                            }}>
                                                {item.exercises.length} Exercises
                                            </span>
                                        ) : (
                                            <span style={{ 
                                                fontSize: '0.8rem', 
                                                background: 'rgba(94,123,108,0.1)', 
                                                color: 'var(--secondary-color)', 
                                                padding: '5px 14px', 
                                                borderRadius: '30px', 
                                                fontWeight: 'bold' 
                                            }}>
                                                💤 Recovery
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Exercises Section */}
                                {isWorkout && (
                                    <div style={{ marginTop: '1.5rem' }}>
                                        {/* Toggle Button */}
                                        <button 
                                            onClick={() => toggleDay(idx)}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                background: 'var(--surface-hover)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: '12px',
                                                padding: '12px 16px',
                                                cursor: 'pointer',
                                                color: 'var(--text-main)',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Dumbbell size={16} color={item.color} />
                                                {isExpanded ? 'Hide Exercises' : 'View All Exercises'}
                                            </span>
                                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                        </button>

                                        {/* Expanded Exercise Cards with Images */}
                                        {isExpanded && (
                                            <div style={{ 
                                                marginTop: '1rem',
                                                display: 'grid', 
                                                gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', 
                                                gap: '12px',
                                                animation: 'fadeUp 0.3s ease forwards'
                                            }}>
                                                {item.exercises.map((ex, exIdx) => (
                                                    <div 
                                                        key={exIdx} 
                                                        style={{ 
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '12px',
                                                            background: 'var(--surface-hover)',
                                                            border: '1px solid var(--glass-border)',
                                                            borderRadius: '14px',
                                                            padding: '10px 12px',
                                                            transition: 'all 0.2s ease',
                                                        }}
                                                        onMouseEnter={e => {
                                                            e.currentTarget.style.borderColor = item.color + '60';
                                                            e.currentTarget.style.background = item.color + '08';
                                                        }}
                                                        onMouseLeave={e => {
                                                            e.currentTarget.style.borderColor = 'var(--glass-border)';
                                                            e.currentTarget.style.background = 'var(--surface-hover)';
                                                        }}
                                                    >
                                                        {/* Exercise Image */}
                                                        <div style={{
                                                            width: '56px',
                                                            height: '56px',
                                                            borderRadius: '12px',
                                                            overflow: 'hidden',
                                                            flexShrink: 0,
                                                            background: `${item.color}10`,
                                                            border: `1px solid ${item.color}20`,
                                                        }}>
                                                            <img
                                                                src={exerciseImageMap[ex.name] || '/exercises/placeholder.png'}
                                                                alt={ex.name}
                                                                loading="lazy"
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover',
                                                                }}
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                }}
                                                            />
                                                        </div>
                                                        
                                                        {/* Exercise Info */}
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <div style={{ 
                                                                fontSize: '0.88rem', 
                                                                fontWeight: '600', 
                                                                color: 'var(--text-main)',
                                                                marginBottom: '4px',
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis'
                                                            }}>
                                                                {ex.name}
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                                                <span style={{ 
                                                                    fontSize: '0.7rem', 
                                                                    background: `${bodyPartColors[ex.bodyPart] || item.color}18`,
                                                                    color: bodyPartColors[ex.bodyPart] || item.color,
                                                                    padding: '2px 7px', 
                                                                    borderRadius: '6px',
                                                                    fontWeight: '600'
                                                                }}>
                                                                    {ex.bodyPart}
                                                                </span>
                                                                <span style={{ 
                                                                    fontSize: '0.7rem', 
                                                                    color: 'var(--text-muted)',
                                                                    background: 'var(--surface-color)',
                                                                    padding: '2px 7px',
                                                                    borderRadius: '6px'
                                                                }}>
                                                                    {ex.sets} × {ex.reps}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Bottom Call to Action */}
                                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                                    {isWorkout ? (
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
                                    ) : (
                                        <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Heart size={14} color="var(--primary-color)" /> Hydrate with Electrolytes</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><ShieldCheck size={14} color="var(--secondary-color)" /> Light Mobility Work</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Sparkles size={14} color="#F59E0B" /> Sleep 7-9 Hours</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Coach Quote Footer */}
            <div style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', border: '1px solid var(--glass-border)', borderRadius: '20px', background: 'var(--surface-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <p style={{ margin: 0, fontStyle: 'italic', fontFamily: 'Lora, serif', fontSize: '1.1rem', color: 'var(--primary-color)' }}>
                    "The secret of strength lies in the simplicity of progression."
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                    — ALPHA FITNESS COACH DIRECTIVE
                </span>
            </div>

        </div>
    );
}
