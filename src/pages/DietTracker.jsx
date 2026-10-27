import React, { useState, useEffect } from 'react';
import { PlusCircle, Utensils, Flame, Droplets, Beef } from 'lucide-react';
import '../index.css';

export default function DietTracker() {
    const [meals, setMeals] = useState([]);
    const [dateString, setDateString] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newMeal, setNewMeal] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '' });

    // Daily Goals (could be customizable later)
    const goals = { calories: 2500, protein: 180, carbs: 250, fat: 70 };

    useEffect(() => {
        const today = new Date().toLocaleDateString();
        setDateString(today);
        const storedDiet = localStorage.getItem(`diet_${today}`);
        if (storedDiet) {
            setMeals(JSON.parse(storedDiet));
        }
    }, []);

    const saveMeal = (e) => {
        e.preventDefault();
        if (!newMeal.name || !newMeal.calories) return;

        const updatedMeals = [...meals, {
            ...newMeal,
            id: Date.now().toString(),
            calories: Number(newMeal.calories),
            protein: Number(newMeal.protein || 0),
            carbs: Number(newMeal.carbs || 0),
            fat: Number(newMeal.fat || 0)
        }];

        setMeals(updatedMeals);
        localStorage.setItem(`diet_${dateString}`, JSON.stringify(updatedMeals));
        setNewMeal({ name: '', calories: '', protein: '', carbs: '', fat: '' });
        setShowAddModal(false);
    };

    const deleteMeal = (id) => {
        const updatedMeals = meals.filter(m => m.id !== id);
        setMeals(updatedMeals);
        localStorage.setItem(`diet_${dateString}`, JSON.stringify(updatedMeals));
    };

    const totals = meals.reduce((acc, curr) => ({
        calories: acc.calories + curr.calories,
        protein: acc.protein + curr.protein,
        carbs: acc.carbs + curr.carbs,
        fat: acc.fat + curr.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    return (
        <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2>Daily Nutrition</h2>
                    <p style={{ color: 'var(--text-muted)' }}>{dateString}</p>
                </div>
                <button className="primary-button" onClick={() => setShowAddModal(true)} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <PlusCircle size={18} /> Add Meal
                </button>
            </div>

            {/* Macro Summary Dashboard */}
            <div className="macro-summary glass" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem', padding: '2rem' }}>
                
                <div className="macro-card" style={{ textAlign: 'center' }}>
                    <Flame size={32} color="#FCC757" style={{ marginBottom: '10px' }} />
                    <h3 style={{ fontSize: '2rem', margin: '5px 0' }}>{totals.calories} <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>/ {goals.calories} kcal</span></h3>
                    <p style={{ color: 'var(--text-muted)' }}>Calories</p>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '10px' }}>
                        <div style={{ width: `${Math.min(100, (totals.calories/goals.calories)*100)}%`, height: '100%', background: '#FCC757', borderRadius: '3px' }}></div>
                    </div>
                </div>

                <div className="macro-card" style={{ textAlign: 'center' }}>
                    <Beef size={32} color="#FFA9A9" style={{ marginBottom: '10px' }} />
                    <h3 style={{ fontSize: '1.5rem', margin: '5px 0' }}>{totals.protein}g <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>/ {goals.protein}g</span></h3>
                    <p style={{ color: 'var(--text-muted)' }}>Protein</p>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '10px' }}>
                        <div style={{ width: `${Math.min(100, (totals.protein/goals.protein)*100)}%`, height: '100%', background: '#FFA9A9', borderRadius: '3px' }}></div>
                    </div>
                </div>

                <div className="macro-card" style={{ textAlign: 'center' }}>
                    <Utensils size={32} color="#4ade80" style={{ marginBottom: '10px' }} />
                    <h3 style={{ fontSize: '1.5rem', margin: '5px 0' }}>{totals.carbs}g <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>/ {goals.carbs}g</span></h3>
                    <p style={{ color: 'var(--text-muted)' }}>Carbs</p>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '10px' }}>
                        <div style={{ width: `${Math.min(100, (totals.carbs/goals.carbs)*100)}%`, height: '100%', background: '#4ade80', borderRadius: '3px' }}></div>
                    </div>
                </div>

                <div className="macro-card" style={{ textAlign: 'center' }}>
                    <Droplets size={32} color="#60a5fa" style={{ marginBottom: '10px' }} />
                    <h3 style={{ fontSize: '1.5rem', margin: '5px 0' }}>{totals.fat}g <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>/ {goals.fat}g</span></h3>
                    <p style={{ color: 'var(--text-muted)' }}>Fats</p>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '10px' }}>
                        <div style={{ width: `${Math.min(100, (totals.fat/goals.fat)*100)}%`, height: '100%', background: '#60a5fa', borderRadius: '3px' }}></div>
                    </div>
                </div>

            </div>

            {/* Meal Log List */}
            <h3 style={{ marginBottom: '1.5rem' }}>Today's Log</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {meals.length === 0 ? (
                    <div className="glass" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        <Utensils size={40} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                        <p>No meals logged today. Start tracking to hit your goals!</p>
                    </div>
                ) : (
                    meals.map(meal => (
                        <div key={meal.id} className="glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{meal.name}</h4>
                                <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    <span>🥩 {meal.protein}g</span>
                                    <span>🍚 {meal.carbs}g</span>
                                    <span>🥑 {meal.fat}g</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FCC757' }}>
                                    {meal.calories} <span style={{fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-muted)'}}>kcal</span>
                                </div>
                                <button onClick={() => deleteMeal(meal.id)} style={{ background: 'transparent', border: 'none', color: '#ff4c4c', cursor: 'pointer', opacity: 0.7 }}>✕</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Meal Modal Overlay */}
            {showAddModal && (
                <div className="video-modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="glass" style={{ padding: '2rem', width: '100%', maxWidth: '500px', cursor: 'default' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3>Log a Meal</h3>
                            <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                        </div>
                        
                        <form onSubmit={saveMeal} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Meal Name</label>
                                <input required type="text" value={newMeal.name} onChange={e => setNewMeal({...newMeal, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} placeholder="e.g. Chicken Breast & Rice" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Total Calories</label>
                                <input required type="number" value={newMeal.calories} onChange={e => setNewMeal({...newMeal, calories: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} placeholder="kcal" />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Protein (g)</label>
                                    <input type="number" value={newMeal.protein} onChange={e => setNewMeal({...newMeal, protein: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Carbs (g)</label>
                                    <input type="number" value={newMeal.carbs} onChange={e => setNewMeal({...newMeal, carbs: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Fats (g)</label>
                                    <input type="number" value={newMeal.fat} onChange={e => setNewMeal({...newMeal, fat: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} />
                                </div>
                            </div>
                            <button type="submit" className="primary-button" style={{ marginTop: '1rem', width: '100%', padding: '15px' }}>Save Meal</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
