const CATEGORY_MAP = {
    'Abs': 'waist',
    'Arms': 'upper arms',
    'Back': 'back',
    'Chest': 'chest',
    'Legs': 'upper legs',
    'Shoulders': 'shoulders'
};

const CACHE = {};

export const fetchExercises = async (bodyPart) => {
    const categoryId = CATEGORY_MAP[bodyPart];
    if (!categoryId) return [];

    if (CACHE[bodyPart]) {
        return CACHE[bodyPart];
    }

    try {
        const apiKey = import.meta.env.VITE_RAPIDAPI_KEY; // Requires .env file support
        const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${categoryId}?limit=12`;
        
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey || '',
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`RapidAPI error: ${response.status}`);
        }
        
        const data = await response.json();

        // Process and sanitize the response for ExerciseDB format
        const results = data.map((item) => ({
            id: item.id,
            name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            description: item.instructions 
                ? item.instructions.map(step => `<p>- ${step}</p>`).join('') 
                : '<p>No instructions available.</p>',
            muscles: item.target.charAt(0).toUpperCase() + item.target.slice(1),
            equipment: item.equipment.charAt(0).toUpperCase() + item.equipment.slice(1),
            image: item.gifUrl, // ExerciseDB provides gif URLs
            bodyPart: item.bodyPart.charAt(0).toUpperCase() + item.bodyPart.slice(1),
            target: item.target.charAt(0).toUpperCase() + item.target.slice(1)
        }));

        CACHE[bodyPart] = results;
        return results;
    } catch (error) {
        console.error("Failed to fetch exercises from RapidAPI - falling back to mock data", error);
        return getFallbackData(bodyPart);
    }
};

function getFallbackData(bodyPart) {
    return [
        {
            id: `${bodyPart}-1`,
            name: `${bodyPart} Hypertrophy Set`,
            description: `
                <p><strong>Instructions:</strong></p>
                <ol style="margin-left: 20px;">
                    <li>Set up the equipment appropriately for your height.</li>
                    <li>Engage your core and firmly plant your feet.</li>
                    <li>Initiate the movement focusing entirely on your ${bodyPart.toLowerCase()}.</li>
                    <li>Squeeze at the peak of contraction for one second.</li>
                    <li>Slowly lower the weight back to the starting position over 3 seconds.</li>
                </ol>
            `,
            muscles: bodyPart,
            equipment: 'Dumbbells, Barbell',
            image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: `${bodyPart}-2`,
            name: `Explosive ${bodyPart} Movement`,
            description: `
                <p><strong>Instructions:</strong></p>
                <ol style="margin-left: 20px;">
                    <li>Begin in an athletic stance.</li>
                    <li>Explosively drive the power through your ${bodyPart.toLowerCase()}.</li>
                    <li>Maintain a neutral spine and tight core throughout the movement.</li>
                    <li>Reset your starting position before beginning the next repetition.</li>
                </ol>
            `,
            muscles: bodyPart,
            equipment: 'Bodyweight',
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: `${bodyPart}-3`,
            name: `Isolating ${bodyPart} Curl/Press`,
            description: `
                <p><strong>Instructions:</strong></p>
                <ol style="margin-left: 20px;">
                    <li>Position yourself on the machine and select a moderate weight.</li>
                    <li>Perform the concentric phase forcefully.</li>
                    <li>Hold the maximum tension point briefly.</li>
                    <li>Control the eccentric release to maximize time-under-tension.</li>
                </ol>
            `,
            muscles: bodyPart,
            equipment: 'Cable Machine',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
        }
    ];
}
