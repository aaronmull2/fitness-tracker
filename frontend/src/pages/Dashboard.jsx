import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import api from '../services/api';
import WorkoutForm from '../components/WorkoutForm';

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  const fetchLogs = useCallback(async () => {
    try {
      const res = await api.get('/workoutlogs');
      setLogs(res.data);
    } catch {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Build chart data: weight over time per exercise
  const chartData = [...logs].reverse().map(log => ({
    date: new Date(log.date).toLocaleDateString(),
    weight: log.weight,
    exercise: log.exercise?.name ?? 'Unknown',
  }));

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Fitness Tracker</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <WorkoutForm onSaved={fetchLogs} />

      <h3>Progress Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit="kg" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Weight (kg)" />
        </LineChart>
      </ResponsiveContainer>

      <h3>Workout History</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Date', 'Exercise', 'Sets', 'Reps', 'Weight (kg)'].map(h => (
              <th key={h} style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.5rem' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td style={{ padding: '0.5rem' }}>{new Date(log.date).toLocaleDateString()}</td>
              <td style={{ padding: '0.5rem' }}>{log.exercise?.name ?? '—'}</td>
              <td style={{ padding: '0.5rem' }}>{log.sets}</td>
              <td style={{ padding: '0.5rem' }}>{log.reps}</td>
              <td style={{ padding: '0.5rem' }}>{log.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
