import { useState } from 'react';
import { getHealthCheck, getRandomColors } from './services/api';
import './App.css';

import { Color } from './types/colors';
import Swatch from './components/swatch';

function App() {
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [colors, setColors] = useState<Color[] | null>(null);
    const [count, setCount] = useState<number>(5);

    const handleHealthCheck = async () => {
        try {
            const response = await getHealthCheck('Hello Frontend');
            setMessage(response.message);
            setError(null);
        } catch {
            setError('Failed to fetch health check');
            setMessage(null);
        }
    };

    const handleRandomColors = async () => {
        try {
            const response = await getRandomColors(count);
            setColors(response);
            setError(null);
        } catch {
            setError('Failed to fetch random colors');
            setMessage(null);
        }
    }

    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setCount(parseInt(event.target.value));
    }

    return (
        <div className="App">
            <h1>React App</h1>
            <button onClick={handleHealthCheck}>Check Health</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h1>Random Colors</h1>
            <button onClick={handleRandomColors}>Get Random Colors</button>
            <input type="number" placeholder="Amount of Colors" onChange={handleCountChange } />
            {colors && <p>{colors.length} colors</p>}
            {colors && colors.length > 0 ? (
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    {colors.map((color, index) => (
                        <Swatch key={index} color={color} />
                    ))}
                </div>
            ) : (
                <p>No colors available. Please generate colors.</p>
            )}
        </div>
    );  
}
             
           
    
export default App;
