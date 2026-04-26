'use client';

import { Home, MessageSquare, Calendar, Settings, LogOut, BarChart3, Smile, User, Stethoscope } from 'lucide-react';
import Image from 'next/image';
import logo from '@/images/logo.png';
import { useAuth } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';

const navItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Swahit Companion', url: '/dashboard/chatbot', icon: MessageSquare },
  { title: 'Mood Tracker', url: '/dashboard/mood', icon: Smile },
  { title: 'Insights', url: '/dashboard/insights', icon: BarChart3 },
  { title: 'Appointments', url: '/dashboard/appointments', icon: Calendar },
  { title: 'Find a Doctor', url: '/dashboard/appointments', icon: Stethoscope },
];

const accountItems = [
  { title: 'My Profile', url: '/dashboard/profile', icon: User },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isActive = (url: string) =>
    pathname === url || (url !== '/dashboard' && pathname.startsWith(url));

  return (
    <Sidebar className="border-r border-teal-100 bg-[#f8fafc]">
      {/* Logo */}
      <div className="p-5 pb-3">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-600/10 flex items-center justify-center">
            <Image src={logo} alt="Swahit Logo" width={28} height={28} className="object-contain" />
          </div>
          <span className="font-bold text-xl text-teal-900 tracking-tight">Swahit</span>
        </Link>
      </div>

      <SidebarContent className="px-3 py-2">
        {/* Main Nav */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            My Space
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive(item.url)
                          ? 'bg-teal-100 text-teal-800'
                          : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                      }`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Nav */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive(item.url)
                          ? 'bg-teal-100 text-teal-800'
                          : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                      }`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t border-teal-100/50">
        <div className="flex items-center justify-between">
          <Link href="/dashboard/profile" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-700 truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
