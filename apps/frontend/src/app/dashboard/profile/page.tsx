'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';
import { User, Mail, Phone, Calendar, Briefcase } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  return (
    <div className="p-6 lg:p-10 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">My Profile</h1>
        <p className="text-slate-500 mt-1">Your personal information and account details.</p>
      </div>

      {/* Avatar + Name header */}
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-3xl bg-teal-100 flex items-center justify-center text-teal-600 text-3xl font-bold shadow-sm">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">{user?.name || 'User'}</h2>
          <p className="text-sm text-teal-600 font-medium">{user?.email}</p>
          <span className="inline-block mt-1 px-2.5 py-0.5 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-200">
            Free Plan
          </span>
        </div>
      </div>

      <Card className="border-teal-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-slate-700">Personal Information</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditing(!editing)}
            className="text-teal-700 border-teal-200 hover:bg-teal-50"
          >
            {editing ? 'Cancel' : 'Edit'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-5">
          {[
            { label: 'Full Name', icon: User, value: user?.name || '—', field: 'name' },
            { label: 'Email Address', icon: Mail, value: user?.email || '—', field: 'email' },
            { label: 'Phone', icon: Phone, value: '—', field: 'phone' },
            { label: 'Date of Birth', icon: Calendar, value: '—', field: 'dob' },
            { label: 'Profession', icon: Briefcase, value: '—', field: 'profession' },
          ].map(field => (
            <div key={field.field} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                <field.icon className="w-4 h-4 text-teal-600" />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-slate-400">{field.label}</Label>
                {editing && field.field !== 'email' ? (
                  <Input defaultValue={field.value === '—' ? '' : field.value} className="mt-1 h-8 text-sm border-teal-100" />
                ) : (
                  <p className="text-sm font-medium text-slate-700 mt-0.5">{field.value}</p>
                )}
              </div>
            </div>
          ))}

          {editing && (
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl mt-2">
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="border-red-100 shadow-sm">
        <CardHeader><CardTitle className="text-base text-slate-700">Account Actions</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-slate-500">These actions are permanent and cannot be undone.</p>
          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
            Delete My Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
