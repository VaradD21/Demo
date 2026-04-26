'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth-context';
import { fetchApi } from '@/lib/api';

const MOODS = [
  { label: 'Happy', emoji: '😊', color: 'bg-amber-100 border-amber-300 text-amber-700', value: 'HAPPY' },
  { label: 'Calm', emoji: '😌', color: 'bg-teal-100 border-teal-300 text-teal-700', value: 'CALM' },
  { label: 'Anxious', emoji: '😰', color: 'bg-purple-100 border-purple-300 text-purple-700', value: 'ANXIOUS' },
  { label: 'Sad', emoji: '😔', color: 'bg-blue-100 border-blue-300 text-blue-700', value: 'SAD' },
  { label: 'Angry', emoji: '😤', color: 'bg-red-100 border-red-300 text-red-700', value: 'ANGRY' },
  { label: 'Tired', emoji: '😴', color: 'bg-slate-100 border-slate-300 text-slate-600', value: 'TIRED' },
];

export default function MoodPage() {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const fetchHistory = async () => {
    try {
      const data = await fetchApi('/mood');
      setHistory(data || []);
    } catch {}
  };

  useEffect(() => { fetchHistory(); }, []);

  const handleSubmit = async () => {
    if (!selectedMood) return;
    setLoading(true);
    try {
      await fetchApi('/mood', {
        method: 'POST',
        body: JSON.stringify({ mood: selectedMood, intensity, notes }),
      });
      setSubmitted(true);
      setSelectedMood(null);
      setNotes('');
      setIntensity(5);
      fetchHistory();
    } catch {} finally {
      setLoading(false);
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="p-6 lg:p-10 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Mood Tracker 🌡️</h1>
        <p className="text-slate-500 mt-1">Check in with how you're feeling. Small moments of reflection add up.</p>
      </div>

      <Card className="border-teal-100 shadow-sm">
        <CardHeader><CardTitle className="text-lg text-slate-700">How are you feeling right now?</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {MOODS.map(m => (
              <button
                key={m.value}
                onClick={() => { setSelectedMood(m.value); setSubmitted(false); }}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 text-sm font-medium transition-all ${
                  selectedMood === m.value
                    ? `${m.color} scale-105 shadow-sm`
                    : 'border-slate-200 hover:border-teal-200 hover:bg-teal-50/50'
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="text-sm font-medium text-slate-600 mb-2 block">Intensity: {intensity}/10</label>
                <input
                  type="range" min={1} max={10} value={intensity}
                  onChange={e => setIntensity(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>
              <Textarea
                placeholder="Any thoughts or notes? (optional)"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="resize-none border-teal-100 focus:ring-teal-500"
                rows={3}
              />
              <Button onClick={handleSubmit} disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
                {loading ? 'Saving...' : 'Log Mood'}
              </Button>
            </div>
          )}
          {submitted && (
            <div className="text-center py-4 text-teal-600 font-medium animate-in fade-in">
              ✓ Mood logged. Small step, big progress. 🌿
            </div>
          )}
        </CardContent>
      </Card>

      {history.length > 0 && (
        <Card className="border-teal-100 shadow-sm">
          <CardHeader><CardTitle className="text-lg text-slate-700">Recent Check-ins</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {history.slice(0, 10).map((entry: any) => {
                const m = MOODS.find(x => x.value === entry.mood);
                return (
                  <div key={entry.id} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                    <span className="text-xl">{m?.emoji || '🔵'}</span>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-slate-700">{m?.label || entry.mood}</span>
                      {entry.notes && <p className="text-xs text-slate-400 mt-0.5 truncate">{entry.notes}</p>}
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-teal-600 font-medium">{entry.intensity}/10</span>
                      <p className="text-xs text-slate-400">{formatDate(entry.createdAt)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
