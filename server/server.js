/* global process */
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Helper to load exercises JSON database
const getExercises = () => {
    try {
        const filePath = path.join(__dirname, 'data', 'exercises.json');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Failed to read exercises.json", error);
        return [];
    }
};


/* =========================================================================
   API Endpoints
   ========================================================================= */


// 1. Get status
app.get('/api/status', (req, res) => {
    res.json({ status: "OK", databaseSize: getExercises().length });
});

// 2. List unique body parts
app.get('/api/exercises/bodyPartList', (req, res) => {
    const exercises = getExercises();
    const bodyParts = new Set(exercises.map(ex => ex.bodyPart.toLowerCase()));
    res.json(Array.from(bodyParts));
});

// 3. List unique target muscles
app.get('/api/exercises/targetList', (req, res) => {
    const exercises = getExercises();
    const targets = new Set(exercises.map(ex => ex.target.toLowerCase()));
    res.json(Array.from(targets));
});

// 4. List unique equipment types
app.get('/api/exercises/equipmentList', (req, res) => {
    const exercises = getExercises();
    const equipment = new Set(exercises.map(ex => ex.equipment.toLowerCase()));
    res.json(Array.from(equipment));
});

// 5. Get all exercises (with limit, offset, and optional bodyPart)
app.get('/api/exercises', (req, res) => {
    let exercises = getExercises();
    const { limit, offset, bodyPart } = req.query;

    if (bodyPart) {
        exercises = exercises.filter(ex => ex.bodyPart.toLowerCase() === bodyPart.toLowerCase());
    }

    const start = parseInt(offset) || 0;
    const size = parseInt(limit) || exercises.length;
    res.json(exercises.slice(start, start + size));
});

// 6. Get exercises by bodyPart
app.get('/api/exercises/bodyPart/:bodyPart', (req, res) => {
    const { bodyPart } = req.params;
    const { limit, offset } = req.query;
    let exercises = getExercises().filter(ex => ex.bodyPart.toLowerCase() === bodyPart.toLowerCase());

    const start = parseInt(offset) || 0;
    const size = parseInt(limit) || exercises.length;
    res.json(exercises.slice(start, start + size));
});

// 7. Get exercises by target muscle
app.get('/api/exercises/target/:target', (req, res) => {
    const { target } = req.params;
    const { limit, offset } = req.query;
    let exercises = getExercises().filter(ex => ex.target.toLowerCase() === target.toLowerCase());

    const start = parseInt(offset) || 0;
    const size = parseInt(limit) || exercises.length;
    res.json(exercises.slice(start, start + size));
});

// 8. Get exercises by equipment type
app.get('/api/exercises/equipment/:equipment', (req, res) => {
    const { equipment } = req.params;
    const { limit, offset } = req.query;
    let exercises = getExercises().filter(ex => ex.equipment.toLowerCase() === equipment.toLowerCase());

    const start = parseInt(offset) || 0;
    const size = parseInt(limit) || exercises.length;
    res.json(exercises.slice(start, start + size));
});

// 9. Search exercises by name (case-insensitive search)
app.get('/api/exercises/name/:name', (req, res) => {
    const { name } = req.params;
    const { limit, offset } = req.query;
    const query = name.toLowerCase();

    let exercises = getExercises().filter(ex => 
        ex.name.toLowerCase().includes(query) || 
        ex.bodyPart.toLowerCase().includes(query) ||
        ex.target.toLowerCase().includes(query)
    );

    const start = parseInt(offset) || 0;
    const size = parseInt(limit) || exercises.length;
    res.json(exercises.slice(start, start + size));
});

// 10. Get exercise detail by ID
app.get('/api/exercises/exercise/:id', (req, res) => {
    const { id } = req.params;
    const exercise = getExercises().find(ex => ex.id === id);
    
    if (exercise) {
        res.json(exercise);
    } else {
        res.status(404).json({ error: `Exercise with ID ${id} not found.` });
    }
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 Alpha Fitness Backend running on port ${PORT}`);
    console.log(`📊 Local exercises database loaded successfully.`);
    console.log(`=================================================`);
});
