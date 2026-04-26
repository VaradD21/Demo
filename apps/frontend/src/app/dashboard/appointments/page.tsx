'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, ArrowLeft, CheckCircle2, Clock, MapPin, UserRound, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';

export default function AppointmentsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', time: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchApi('/appointments', {
        method: 'POST',
        body: JSON.stringify({
          patientName: formData.name,
          location: formData.location,
          preferredTime: formData.time,
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to book appointment', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-100 rounded-2xl">
            <Calendar className="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Book Appointment</h1>
            <p className="text-slate-500 mt-1">Schedule a session with our certified professionals.</p>
          </div>
        </div>
      </div>

      <Card className="border-teal-50 shadow-sm rounded-3xl bg-white overflow-hidden">
        {submitted ? (
          <div className="p-12 text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Appointment Requested ✅</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              We have received your booking request. Our team will contact you shortly to confirm the details.
            </p>

            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => setSubmitted(false)}
                className="bg-teal-600 hover:bg-teal-700 rounded-xl"
              >
                Book Another
              </Button>
              <Link href="/dashboard">
                <Button variant="outline" className="rounded-xl border-teal-200 text-teal-700 hover:bg-teal-50">Go Home</Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Appointment Details</CardTitle>
              <CardDescription>Fill in your preferences below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-2 relative">
                <Label htmlFor="name" className="text-slate-700 font-medium">Your Name</Label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-slate-700 font-medium">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    id="location" 
                    placeholder="e.g. Online (Zoom) or Clinic" 
                    required 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-slate-700 font-medium">Preferred Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    id="time" 
                    type="datetime-local" 
                    required 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg"
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </Button>
              </div>

            </CardContent>
          </form>
        )}
      </Card>
    </div>
  );
}
