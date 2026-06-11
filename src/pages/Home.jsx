import React, { useState, useEffect } from 'react';
import { 
    fetchExercises, 
    searchExercisesByName, 
    listExercisesByTarget, 
    listExercisesByEquipment, 
    listTargets, 
    listEquipment 
} from '../api';
import Hero from '../components/Hero';
import MuscleGrid from '../components/MuscleGrid';
import ExerciseList from '../components/ExerciseList';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function Home() {
    const [selectedPart, setSelectedPart] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);

    // Search and Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [targetMuscles, setTargetMuscles] = useState([]);
    const [equipmentTypes, setEquipmentTypes] = useState([]);
    
    const [activeTarget, setActiveTarget] = useState('');
    const [activeEquipment, setActiveEquipment] = useState('');

    // Fetch filters lists on mount
    useEffect(() => {
        const loadFilters = async () => {
            try {
                const [targetsData, equipData] = await Promise.all([
                    listTargets(),
                    listEquipment()
                ]);
                setTargetMuscles(targetsData);
                setEquipmentTypes(equipData);
            } catch (err) {
                console.error("Failed to load targets or equipment list for filters", err);
            }
        };
        loadFilters();
    }, []);

    const scrollToExercises = () => {
        setTimeout(() => {
            document.getElementById('exercise-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Main Body Part Click Selector
    const handleSelectPart = async (partName) => {
        // Clear other filter states
        setSearchTerm('');
        setActiveTarget('');
        setActiveEquipment('');

        setSelectedPart(partName);
        setLoading(true);
        const data = await fetchExercises(partName);
        setExercises(data);
        setLoading(false);
        scrollToExercises();
    };

    // Handle Search Submit
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        // Clear select filters
        setActiveTarget('');
        setActiveEquipment('');

        setSelectedPart(`Search: "${searchTerm}"`);
        setLoading(true);
        const data = await searchExercisesByName(searchTerm);
        setExercises(data);
        setLoading(false);
        scrollToExercises();
    };

    // Handle Target Muscle Filter Selection
    const handleTargetChange = async (target) => {
        if (!target) return;
        
        // Clear search and equipment filters
        setSearchTerm('');
        setActiveEquipment('');
        
        setActiveTarget(target);
        setSelectedPart(`Target: ${target.charAt(0).toUpperCase() + target.slice(1)}`);
        setLoading(true);
        const data = await listExercisesByTarget(target);
        setExercises(data);
        setLoading(false);
        scrollToExercises();
    };

    // Handle Equipment Filter Selection
    const handleEquipmentChange = async (equipment) => {
        if (!equipment) return;

        // Clear search and target filters
        setSearchTerm('');
        setActiveTarget('');

        setActiveEquipment(equipment);
        setSelectedPart(`Equipment: ${equipment.charAt(0).toUpperCase() + equipment.slice(1)}`);
        setLoading(true);
        const data = await listExercisesByEquipment(equipment);
        setExercises(data);
        setLoading(false);
        scrollToExercises();
    };

    const clearSelection = () => {
        setSelectedPart(null);
        setExercises([]);
        setSearchTerm('');
        setActiveTarget('');
        setActiveEquipment('');
    };

    return (
        <div>
            <Hero />

            {/* Premium Search & Filters Hub */}
            <section className="search-filters-hub container">
                <div className="glass search-filters-container">
                    <form onSubmit={handleSearchSubmit} className="search-bar-form">
                        <div className="search-input-wrapper">
                            <Search className="search-icon" size={20} />
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search exercises by name, body part..."
                                className="search-input"
                            />
                        </div>
                        <button type="submit" className="primary-button search-button">
                            Search
                        </button>
                    </form>

                    <div className="filters-row">
                        <div className="filter-group">
                            <SlidersHorizontal size={16} className="filter-icon" />
                            <select 
                                value={activeTarget}
                                onChange={(e) => handleTargetChange(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">Filter by Target Muscle</option>
                                {targetMuscles.map(target => (
                                    <option key={target} value={target}>
                                        {target.charAt(0).toUpperCase() + target.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <SlidersHorizontal size={16} className="filter-icon" />
                            <select 
                                value={activeEquipment}
                                onChange={(e) => handleEquipmentChange(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">Filter by Equipment</option>
                                {equipmentTypes.map(equip => (
                                    <option key={equip} value={equip}>
                                        {equip.charAt(0).toUpperCase() + equip.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

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
