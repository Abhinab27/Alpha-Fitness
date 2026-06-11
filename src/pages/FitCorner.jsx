import React, { useState } from 'react';
import { Apple, Droplet, Brain, Activity, Clock } from 'lucide-react';
import '../index.css';

export default function FitCorner() {
    const [activeTab, setActiveTab] = useState('nutrition');
    const [weight, setWeight] = useState(70); // in kg

    // Simple calculators that look like beginner-intermediate React code
    const dailyProtein = weight * 2; // 2g per kg rule of thumb
    const dailyWater = Math.round((weight * 35) / 100) / 10; // 35ml per kg, formatted in Liters
    const dailyCalories = weight * 33; // 33 kcal per kg general estimate

    return (
        <div className="container" style={{ paddingTop: '110px', minHeight: '85vh', paddingBottom: '4rem', maxWidth: '900px' }}>
            
            {/* Header section */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontFamily: 'Lora, serif', fontWeight: '600', marginBottom: '0.75rem' }}>
                    Wellness <span className="text-gradient">Fit Corner</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    Simple, practical fitness tips and calculators to help beginners and intermediates optimize nutrition, hydration, and mindset.
                </p>
            </div>

            {/* Simple Tab Buttons Container */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <button
                    onClick={() => setActiveTab('nutrition')}
                    className={`planner-tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
                    style={{ border: '1px solid var(--glass-border)', padding: '10px 18px', borderRadius: '20px' }}
                >
                    <Apple size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Nutrition
                </button>
                <button
                    onClick={() => setActiveTab('hydration')}
                    className={`planner-tab-btn ${activeTab === 'hydration' ? 'active' : ''}`}
                    style={{ border: '1px solid var(--glass-border)', padding: '10px 18px', borderRadius: '20px' }}
                >
                    <Droplet size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Hydration
                </button>
                <button
                    onClick={() => setActiveTab('mindset')}
                    className={`planner-tab-btn ${activeTab === 'mindset' ? 'active' : ''}`}
                    style={{ border: '1px solid var(--glass-border)', padding: '10px 18px', borderRadius: '20px' }}
                >
                    <Brain size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Mindset
                </button>
            </div>

            {/* Main Content Area */}
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px' }}>
                
                {/* 1. NUTRITION TAB */}
                {activeTab === 'nutrition' && (
                    <div>
                        <h3 style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Apple color="var(--primary-color)" /> Basic Nutrition Tips
                        </h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Eating right doesn't have to be complicated. Here are the core rules of thumb for building muscle and losing fat.
                        </p>

                        {/* Simple Calculator */}
                        <div className="glass-sub" style={{ padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 'bold' }}>Quick Macros Estimator</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Enter your Weight (kg):</label>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(Math.max(1, parseInt(e.target.value) || 0))}
                                    style={{ width: '90px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', fontWeight: 'bold', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                                <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', fontWeight: 'bold' }}>ESTIMATED CALORIES</span>
                                    <strong style={{ fontSize: '1.4rem', color: 'var(--primary-color)' }}>{dailyCalories} kcal</strong>
                                </div>
                                <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', fontWeight: 'bold' }}>DAILY PROTEIN GOAL</span>
                                    <strong style={{ fontSize: '1.4rem', color: 'var(--primary-color)' }}>{dailyProtein}g</strong>
                                </div>
                            </div>
                        </div>

                        {/* Basic Bullet Points */}
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-main)', lineHeight: '1.8rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><strong>Prioritize Protein:</strong> Try to eat protein in every meal (chicken, eggs, fish, tofu, or protein powder).</li>
                            <li><strong>Eat Whole Carbs:</strong> Choose oats, brown rice, potatoes, and whole wheat instead of sugary foods.</li>
                            <li><strong>Healthy Fats Matter:</strong> Keep fats in your diet (avocados, nuts, olive oil) for healthy hormone levels.</li>
                            <li><strong>Consistency is Key:</strong> It is better to eat well 80% of the time than to be on a strict diet you quit in a week.</li>
                        </ul>
                    </div>
                )}

                {/* 2. HYDRATION TAB */}
                {activeTab === 'hydration' && (
                    <div>
                        <h3 style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Droplet color="#60a5fa" /> Hydration Guide
                        </h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Proper hydration keeps your joints lubricated, prevents muscle cramps, and helps you lift heavier weights.
                        </p>

                        {/* Simple Calculator */}
                        <div className="glass-sub" style={{ padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 'bold' }}>Water Target Estimator</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Enter your Weight (kg):</label>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(Math.max(1, parseInt(e.target.value) || 0))}
                                    style={{ width: '90px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', fontWeight: 'bold', outline: 'none' }}
                                />
                            </div>
                            <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--glass-border)', maxWidth: '300px' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', fontWeight: 'bold' }}>DAILY WATER TARGET</span>
                                <strong style={{ fontSize: '1.4rem', color: '#60a5fa' }}>{dailyWater} Liters</strong>
                            </div>
                        </div>

                        {/* Hydration Tips */}
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-main)', lineHeight: '1.8rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><strong>Pre-Workout:</strong> Drink about 500ml of water 1-2 hours before you start gym training.</li>
                            <li><strong>Intra-Workout:</strong> Sip water continuously between exercise sets. Do not wait until you are thirsty.</li>
                            <li><strong>Electrolytes:</strong> If you sweat heavily, add a pinch of salt and lemon juice to your water to restore sodium levels.</li>
                        </ul>
                    </div>
                )}

                {/* 3. MINDSET TAB */}
                {activeTab === 'mindset' && (
                    <div>
                        <h3 style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Brain color="#a78bfa" /> Mindset & Form
                        </h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Building a fit physique requires consistency, mental focus, and correct exercise form.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                            <div className="glass-sub" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                                <h4 style={{ fontSize: '1.1rem', color: '#a78bfa', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Activity size={18} /> Mind-Muscle Connection
                                </h4>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                                    Instead of just moving the weight from point A to B, actively focus on feeling the target muscle stretch and squeeze on every single rep.
                                </p>
                            </div>

                            <div className="glass-sub" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                                <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-color)', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Clock size={18} /> Slow Down the Reps
                                </h4>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                                    Do not use momentum. Take 1 second to lift the weight (concentric) and 2 to 3 seconds to lower the weight (eccentric) under control.
                                </p>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(201,125,96,0.04)', border: '1px solid rgba(201,125,96,0.1)', padding: '1.5rem', borderRadius: '12px', marginTop: '2rem' }}>
                            <h5 style={{ color: 'var(--primary-color)', margin: '0 0 8px 0', fontSize: '1rem' }}>Golden Rule of lifting:</h5>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', fontStyle: 'italic' }}>
                                "Leave your ego at the gym door. Lifting lighter weights with perfect form will build much more muscle and prevent joint injuries than lifting heavy with bad form."
                            </p>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}
