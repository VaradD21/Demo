'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/auth-context';
import { fetchApi } from '@/lib/api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import logo from '@/images/logo.png';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
  dob: z.string().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  profession: z.string().optional(),
});

type AuthFormData = z.infer<typeof authSchema>;

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData, type: 'login' | 'register') => {
    setIsLoading(true);
    try {
      const endpoint = type === 'login' ? '/auth/login' : '/auth/register';
      const result = await fetchApi(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (type === 'login') {
        login(result.access_token, result.user);
        toast.success('Welcome back to your safe space.');
      } else {
        toast.success('Account created! Please log in to begin.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-teal-100/50 shadow-2xl shadow-teal-900/5 bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden">
      <CardHeader className="space-y-2 text-center pt-8">
        <div className="flex justify-center mb-6 pt-6">
          <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center border border-teal-100/50 shadow-sm">
            <Image src={logo} alt="Swahit Logo" width={48} height={48} className="object-contain" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-800">Welcome to Swahit</CardTitle>
        <CardDescription className="text-slate-500">
          Your journey to mental wellness begins here.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-teal-50/50 rounded-xl p-1">
            <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm">Log In</TabsTrigger>
            <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleSubmit((data) => onSubmit(data, 'login'))} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-600">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  {...register('email')}
                  className={`bg-slate-50/50 border-slate-200 h-11 focus-visible:ring-teal-500 ${errors.email ? 'border-red-300 focus-visible:ring-red-500' : ''}`}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-600">Password</Label>
                  <a href="#" className="text-xs text-teal-600 hover:text-teal-700 font-medium">Forgot password?</a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  className={`bg-slate-50/50 border-slate-200 h-11 focus-visible:ring-teal-500 ${errors.password ? 'border-red-300 focus-visible:ring-red-500' : ''}`}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>
              <Button className="w-full h-12 mt-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-base transition-colors" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Log In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleSubmit((data) => onSubmit(data, 'register'))} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name" className="text-slate-600">Preferred Name</Label>
                  <Input
                    id="reg-name"
                    placeholder="How should we call you?"
                    {...register('name')}
                    className="bg-slate-50/50 border-slate-200 h-11 focus-visible:ring-teal-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-dob" className="text-slate-600">Date of Birth</Label>
                  <Input
                    id="reg-dob"
                    type="date"
                    {...register('dob')}
                    className="bg-slate-50/50 border-slate-200 h-11 focus-visible:ring-teal-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-phone" className="text-slate-600">Phone Number</Label>
                  <Input
                    id="reg-phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    {...register('phone')}
                    className="bg-slate-50/50 border-slate-200 h-11 focus-visible:ring-teal-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-gender" className="text-slate-600">Gender</Label>
                  <select
                    id="reg-gender"
                    {...register('gender')}
                    className="flex h-11 w-full rounded-md border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-profession" className="text-slate-600">Profession</Label>
                <select
                  id="reg-profession"
                  {...register('profession')}
                  className="flex h-11 w-full rounded-md border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select profession</option>
                  <option value="student">Student</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-slate-600">Email Address</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="For secure access"
                  {...register('email')}
                  className={`bg-slate-50/50 border-slate-200 h-11 focus-visible:ring-teal-500 ${errors.email ? 'border-red-300 focus-visible:ring-red-500' : ''}`}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password" className="text-slate-600">Password</Label>
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="At least 6 characters"
                  {...register('password')}
                  className={`bg-slate-50/50 border-slate-200 h-11 focus-visible:ring-teal-500 ${errors.password ? 'border-red-300 focus-visible:ring-red-500' : ''}`}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>
              
              <div className="rounded-lg bg-teal-50 p-3 mt-4 text-center">
                <p className="text-xs font-medium text-teal-800 flex items-center justify-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Your info will not be sold or shown to anyone or any organization at any cost. It is safe.
                </p>
              </div>

              <Button className="w-full h-12 mt-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-base transition-colors" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Begin Your Journey
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col bg-slate-50/50 mt-4 py-6 border-t border-slate-100">
        <p className="text-xs text-center text-slate-400 max-w-xs mx-auto leading-relaxed">
          Your privacy is our priority. By joining, you agree to our <a href="#" className="underline hover:text-teal-600">Terms of Service</a> and <a href="#" className="underline hover:text-teal-600">Privacy Policy</a>.
        </p>
      </CardFooter>
    </Card>
  );
}
