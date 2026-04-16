import { useState, useEffect } from 'react';
import api from '../services/api';

export default function WorkoutForm({ onSaved }) {
  const [exercises, setExercises] = useState([]);
  const [form, setForm] = useState({ exerciseId: '', sets: '', reps: '', weight: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/exercises').then(res => setExercises(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/workoutlogs', {
        exerciseId: parseInt(form.exerciseId),
        sets: parseInt(form.sets),
        reps: parseInt(form.reps),
        weight: parseFloat(form.weight),
      });
      setForm({ exerciseId: '', sets: '', reps: '', weight: '' });
      onSaved();
    } catch {
      setError('Failed to save workout.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Log a Workout</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select value={form.exerciseId} onChange={e => setForm({ ...form, exerciseId: e.target.value })} required style={{ marginRight: 8 }}>
        <option value="">Select exercise</option>
        {exercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
      </select>
      <input placeholder="Sets" type="number" value={form.sets} onChange={e => setForm({ ...form, sets: e.target.value })} required style={{ width: 60, marginRight: 8 }} />
      <input placeholder="Reps" type="number" value={form.reps} onChange={e => setForm({ ...form, reps: e.target.value })} required style={{ width: 60, marginRight: 8 }} />
      <input placeholder="Weight (kg)" type="number" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} required style={{ width: 100, marginRight: 8 }} />
      <button type="submit">Add</button>
    </form>
  );
}
