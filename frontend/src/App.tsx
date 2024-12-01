import { useState } from 'react';
import { getHealthCheck } from './services/api';
import './App.css';

function App() {
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className="App">
            <h1>React App</h1>
            <button onClick={handleHealthCheck}>Check Health</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default App;
