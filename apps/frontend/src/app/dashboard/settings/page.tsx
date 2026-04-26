'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Shield, Moon, Globe } from 'lucide-react';

const ToggleRow = ({ icon: Icon, label, desc, defaultOn = false }: any) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center">
        <Icon className="w-4 h-4 text-teal-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </div>
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" defaultChecked={defaultOn} className="sr-only peer" />
      <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-teal-500 transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:after:translate-x-5" />
    </label>
  </div>
);

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Settings ⚙️</h1>
        <p className="text-slate-500 mt-1">Manage your preferences and account settings.</p>
      </div>

      <Card className="border-teal-100 shadow-sm">
        <CardHeader><CardTitle className="text-lg text-slate-700">Notifications</CardTitle></CardHeader>
        <CardContent>
          <ToggleRow icon={Bell} label="Daily Mood Reminder" desc="Gentle nudge to check in each day" defaultOn />
          <ToggleRow icon={Bell} label="Appointment Reminders" desc="Get reminders before your sessions" defaultOn />
          <ToggleRow icon={Bell} label="Weekly Insights" desc="Your wellness summary every Monday" />
        </CardContent>
      </Card>

      <Card className="border-teal-100 shadow-sm">
        <CardHeader><CardTitle className="text-lg text-slate-700">Privacy & Data</CardTitle></CardHeader>
        <CardContent>
          <ToggleRow icon={Shield} label="Share Usage Data" desc="Help us improve Swahit anonymously" />
          <ToggleRow icon={Moon} label="Dark Mode" desc="Reduce screen brightness (coming soon)" />
          <ToggleRow icon={Globe} label="Allow Personalization" desc="Let AI use your memory profile for better support" defaultOn />
        </CardContent>
      </Card>

      <Card className="border-teal-100 shadow-sm">
        <CardHeader><CardTitle className="text-lg text-slate-700">Legal & Compliance</CardTitle></CardHeader>
        <CardContent className="space-y-3 pt-2">
          {[
            { label: 'Terms & Conditions', href: '/terms' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Disclaimer', href: '/disclaimer' },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              className="block text-sm text-teal-600 hover:text-teal-800 hover:underline"
            >
              {item.label} →
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
