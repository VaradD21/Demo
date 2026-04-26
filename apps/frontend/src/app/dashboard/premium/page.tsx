'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Diamond, ArrowLeft, Gem } from 'lucide-react';
import Link from 'next/link';

export default function PremiumPage() {
  const plans = [
    {
      name: 'Silver',
      price: '₹19,999',
      duration: '/ year',
      color: 'text-slate-500',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      popular: false,
      features: [
        'Free unlimited AI chat',
        'Medical certificate provided',
        '1 month doctor call access',
        '2 months Gold tier access trial',
      ]
    },
    {
      name: 'Gold',
      price: '₹34,999',
      duration: '/ year',
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-200 shadow-lg scale-105 z-10 relative',
      popular: true,
      features: [
        'All Silver benefits included',
        '1 month community service participation',
        'Special health notifications & alerts',
        'Priority appointment booking',
      ]
    },
    {
      name: 'Platinum',
      price: '₹49,999',
      duration: '/ year',
      color: 'text-slate-800',
      bg: 'bg-slate-100',
      border: 'border-slate-300',
      popular: false,
      features: [
        'All Gold benefits included',
        '3 months community service participation',
        '24/7 Priority VIP support hotline',
        'Dedicated wellness coach assigned',
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Diamond className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-4">Swahit Premium</h1>
        <p className="text-xl text-slate-500">Choose a plan that suits your wellness journey. Invest in your mental health today.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <Card key={i} className={`rounded-3xl bg-white ${plan.border} transition-all hover:shadow-xl`}>
            {plan.popular && (
              <div className="bg-amber-500 text-white text-xs font-bold uppercase tracking-widest text-center py-1.5 rounded-t-3xl absolute top-0 w-full left-0">
                Most Popular
              </div>
            )}
            <CardHeader className={`pt-10 pb-8 text-center ${plan.popular ? 'mt-2' : ''}`}>
              <CardTitle className="text-xl font-bold text-slate-800 mb-2">{plan.name}</CardTitle>
              <div className="flex justify-center items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                <span className="text-slate-500 font-medium">{plan.duration}</span>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <div className={`mt-0.5 p-1 rounded-full ${plan.bg}`}>
                      <Check className={`w-3 h-3 ${plan.color}`} />
                    </div>
                    <span className="text-sm leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="px-8 pb-10">
              <Button 
                className={`w-full h-12 rounded-xl text-base font-semibold shadow-sm ${
                  plan.popular 
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
                onClick={() => alert(`Redirecting to payment gateway for ${plan.name} plan...`)}
              >
                {plan.popular && <Gem className="w-4 h-4 mr-2" />}
                Choose {plan.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
