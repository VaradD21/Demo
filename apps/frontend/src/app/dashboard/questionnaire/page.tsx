'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';

export default function QuestionnairePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      q: 'How have you been feeling lately?',
      options: [
        { val: 0, label: '😊 Good', desc: 'Feeling positive and energized' },
        { val: 1, label: '😐 Okay', desc: 'Just an average day' },
        { val: 2, label: '😔 Low', desc: 'Feeling down or unmotivated' },
        { val: 3, label: '😣 Very stressed', desc: 'Overwhelmed by emotions or events' },
      ],
    },
    {
      id: 2,
      q: 'How often do you feel anxious?',
      options: [
        { val: 0, label: 'Rarely', desc: 'Almost never feel anxious' },
        { val: 1, label: 'Sometimes', desc: 'Occasionally feel worried' },
        { val: 2, label: 'Often', desc: 'Frequently experience anxiety' },
      ],
    },
    {
      id: 3,
      q: 'How is your sleep?',
      options: [
        { val: 0, label: 'Good', desc: 'Restful and consistent' },
        { val: 1, label: 'Average', desc: 'Some disruptions' },
        { val: 2, label: 'Poor', desc: 'Difficulty sleeping or feeling exhausted' },
      ],
    },
    {
      id: 4,
      q: 'Do you feel motivated daily?',
      options: [
        { val: 0, label: 'Yes', desc: 'Ready to tackle the day' },
        { val: 1, label: 'Sometimes', desc: 'Depends on the day' },
        { val: 2, label: 'No', desc: 'Struggling to find drive' },
      ],
    },
  ];

  const handleSelect = (val: number) => {
    setAnswers({ ...answers, [step]: val });
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateScore = () => {
    const total = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    // Lower score is better based on the values in the template
    if (total <= 2) return { text: 'You seem to be doing great! Keep up the good habits.', color: 'text-emerald-600', bg: 'bg-emerald-50', score: total };
    if (total <= 5) return { text: 'You are doing okay, but might be experiencing some mild stress. Take time to relax.', color: 'text-amber-600', bg: 'bg-amber-50', score: total };
    return { text: 'You seem to be under significant stress. We highly recommend talking to Swahit or booking an appointment.', color: 'text-rose-600', bg: 'bg-rose-50', score: total };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = calculateScore();
    try {
      await fetchApi('/questionnaire', {
        method: 'POST',
        body: JSON.stringify({
          score: result.score,
          feedback: result.text,
          answers,
        }),
      });
    } catch (error) {
      console.error('Failed to save questionnaire', error);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-100 rounded-2xl">
            <Brain className="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Mental Wellness Check</h1>
            <p className="text-slate-500 mt-1">Answer honestly. This helps us support you better 💙</p>
          </div>
        </div>
      </div>

      <Card className="border-teal-50 shadow-sm rounded-3xl bg-white overflow-hidden">
        {submitted ? (
          <div className="p-12 text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Assessment Complete</h2>
            
            <div className={`p-6 rounded-2xl mb-8 ${calculateScore().bg}`}>
              <p className={`text-lg font-medium ${calculateScore().color}`}>
                {calculateScore().text}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href="/dashboard/ai">
                <Button className="bg-teal-600 hover:bg-teal-700 rounded-xl">Talk to Swahit</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="rounded-xl border-teal-200 text-teal-700 hover:bg-teal-50">Go Home</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 w-full">
              <div 
                className="h-full bg-teal-500 transition-all duration-500"
                style={{ width: `${((step) / questions.length) * 100}%` }}
              />
            </div>

            <div className="p-8 md:p-12">
              <span className="text-sm font-bold tracking-widest text-teal-600 uppercase mb-4 block">
                Question {step + 1} of {questions.length}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 leading-snug">
                {questions[step].q}
              </h2>

              <div className="grid gap-4">
                {questions[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt.val)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all group hover:-translate-y-1 ${
                      answers[step] === opt.val 
                        ? 'border-teal-500 bg-teal-50' 
                        : 'border-slate-100 hover:border-teal-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-semibold text-lg ${answers[step] === opt.val ? 'text-teal-900' : 'text-slate-800'}`}>
                          {opt.label}
                        </p>
                        <p className="text-slate-500 text-sm mt-1">{opt.desc}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        answers[step] === opt.val ? 'border-teal-500' : 'border-slate-200'
                      }`}>
                        {answers[step] === opt.val && <div className="w-3 h-3 bg-teal-500 rounded-full" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-12 flex justify-between items-center pt-6 border-t border-slate-100">
                <Button 
                  variant="ghost" 
                  disabled={step === 0}
                  onClick={() => setStep(step - 1)}
                  className="text-slate-500"
                >
                  Previous
                </Button>
                
                {step === questions.length - 1 ? (
                  <Button 
                    onClick={handleSubmit}
                    disabled={answers[step] === undefined || isSubmitting}
                    className="bg-teal-600 hover:bg-teal-700 px-8 rounded-full"
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    See Results
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setStep(step + 1)}
                    disabled={answers[step] === undefined}
                    className="bg-slate-800 hover:bg-slate-900 px-8 rounded-full"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
