'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Brain, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function InsightsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Your Insights 📊</h1>
        <p className="text-slate-500 mt-1">Patterns, trends, and reflections from your wellness journey.</p>
      </div>

      {/* Placeholder cards for upcoming analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-teal-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-teal-500" /> Mood This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center text-slate-300 text-sm border-2 border-dashed rounded-xl">
              📈 Start logging moods to see trends
            </div>
            <Link href="/dashboard/mood">
              <Button variant="outline" size="sm" className="mt-3 w-full text-teal-700 border-teal-200 hover:bg-teal-50">
                Log Your Mood
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-teal-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-500" /> Emotional Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center text-slate-300 text-sm border-2 border-dashed rounded-xl">
              🧠 Chat with Swahit to build your pattern map
            </div>
            <Link href="/dashboard/chatbot">
              <Button variant="outline" size="sm" className="mt-3 w-full text-teal-700 border-teal-200 hover:bg-teal-50">
                Talk to Swahit
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-teal-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <Brain className="w-4 h-4 text-teal-500" /> Wellness Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex flex-col items-center justify-center gap-2">
              <div className="text-5xl font-bold text-teal-600">—</div>
              <p className="text-xs text-slate-400">Complete your questionnaire to get scored</p>
            </div>
            <Link href="/dashboard/questionnaire">
              <Button variant="outline" size="sm" className="mt-3 w-full text-teal-700 border-teal-200 hover:bg-teal-50">
                Take Questionnaire
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-teal-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-500" /> Upcoming Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center text-slate-300 text-sm border-2 border-dashed rounded-xl">
              📅 No appointments yet
            </div>
            <Link href="/dashboard/appointments">
              <Button variant="outline" size="sm" className="mt-3 w-full text-teal-700 border-teal-200 hover:bg-teal-50">
                Book Appointment
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="border-amber-100 bg-amber-50/50 shadow-sm">
        <CardContent className="pt-6">
          <p className="text-sm text-amber-700">
            <strong>Coming Soon:</strong> Advanced mood trend charts, AI-generated weekly insights, and personalized wellness recommendations will be available in the Premium plan.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
