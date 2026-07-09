/* global process, Buffer */
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Token key secret for signing
const JWT_SECRET = process.env.JWT_SECRET || 'alpha_fitness_super_secret_key_12984';

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

// Helper to load users database
const getUsers = () => {
    try {
        const filePath = path.join(__dirname, 'data', 'users.json');
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]', 'utf-8');
            return [];
        }
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Failed to read users.json", error);
        return [];
    }
};

// Helper to save users database
const saveUsers = (users) => {
    try {
        const filePath = path.join(__dirname, 'data', 'users.json');
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
        console.error("Failed to write users.json", error);
    }
};

// Hash password with salt
const hashPassword = (password, salt) => {
    return crypto.createHmac('sha256', salt).update(password).digest('hex');
};

// Generate custom signed token: userId.signature
const generateToken = (userId) => {
    const signature = crypto.createHmac('sha256', JWT_SECRET).update(userId).digest('hex');
    return Buffer.from(userId).toString('base64') + '.' + signature;
};

// Verify signed token and return userId
const verifyToken = (token) => {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [encodedUserId, signature] = parts;
    try {
        const userId = Buffer.from(encodedUserId, 'base64').toString('utf-8');
        const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(userId).digest('hex');
        if (signature === expectedSignature) {
            return userId;
        }
    } catch {
        return null;
    }
    return null;
};

/* =========================================================================
   API Endpoints
   ========================================================================= */

// --- Authentication Endpoints ---

// 1. Signup Route
app.post('/api/auth/signup', (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: "Name, email, and password are required." });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }
    const users = getUsers();
    const normalizedEmail = email.toLowerCase().trim();
    if (users.some(u => u.email.toLowerCase().trim() === normalizedEmail)) {
        return res.status(400).json({ error: "An account with this email already exists." });
    }

    // Generate unique ID, salt, and password hash
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = hashPassword(password, salt);
    const userId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const newUser = {
        id: userId,
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        salt,
        joined: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    const token = generateToken(newUser.id);

    // Return user info excluding password credentials
    const { passwordHash: _, salt: __, ...userResponse } = newUser;
    res.status(201).json({ user: userResponse, token });
});

// 2. Login Route
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    const users = getUsers();
    const normalizedEmail = email.toLowerCase().trim();
    const user = users.find(u => u.email.toLowerCase().trim() === normalizedEmail);
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    const incomingHash = hashPassword(password, user.salt);
    if (incomingHash !== user.passwordHash) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = generateToken(user.id);

    const { passwordHash: _, salt: __, ...userResponse } = user;
    res.json({ user: userResponse, token });
});

// 3. Current User Route (token verification)
app.get('/api/auth/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "No authorization token provided." });
    }
    const token = authHeader.split(' ')[1];
    const userId = verifyToken(token);
    if (!userId) {
        return res.status(401).json({ error: "Invalid or expired session token." });
    }

    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: "User profile not found." });
    }

    const { passwordHash: _, salt: __, ...userResponse } = user;
    res.json(userResponse);
});

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
