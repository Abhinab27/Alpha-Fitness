import React, { useState } from 'react';
import { fetchExercises } from '../api';
import Hero from '../components/Hero';
import MuscleGrid from '../components/MuscleGrid';
import ExerciseList from '../components/ExerciseList';

export default function Home() {
    const [selectedPart, setSelectedPart] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSelectPart = async (partName) => {
        setSelectedPart(partName);
        setLoading(true);
        const data = await fetchExercises(partName);
        setExercises(data);
        setLoading(false);

        // Scroll to the exercises section
        setTimeout(() => {
            document.getElementById('exercise-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const clearSelection = () => {
        setSelectedPart(null);
        setExercises([]);
    };

    return (
        <div>
            <Hero />
            <MuscleGrid selectedPart={selectedPart} onSelectPart={handleSelectPart} />
            <ExerciseList
                selectedPart={selectedPart}
                exercises={exercises}
                loading={loading}
                onClose={clearSelection}
            />
        </div>
    );
}
