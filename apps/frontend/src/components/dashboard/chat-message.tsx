'use client';

import { HeartPulse, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
  emotionTag?: string;
}

export function ChatMessage({ role, content, timestamp, emotionTag }: ChatMessageProps) {
  const isAi = role === 'ai';

  return (
    <div className={cn("flex w-full gap-4 py-4 animate-in fade-in slide-in-from-bottom-2 duration-500", isAi ? "justify-start" : "justify-end")}>
      {/* AI Avatar */}
      {isAi && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center border border-teal-200">
          <HeartPulse className="w-5 h-5 text-teal-600" />
        </div>
      )}

      {/* Message Content */}
      <div className={cn("flex flex-col max-w-[80%] md:max-w-[70%]", isAi ? "items-start" : "items-end")}>
        <div className="flex items-baseline gap-2 mb-1.5 px-1">
          <span className="text-xs font-semibold text-slate-500">
            {isAi ? 'Swahit Guide' : 'You'}
          </span>
          <span className="text-[10px] text-slate-400">{timestamp}</span>
          {emotionTag && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-medium text-slate-500 border border-slate-200">
              {emotionTag}
            </span>
          )}
        </div>
        
        <div 
          className={cn(
            "px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm",
            isAi 
              ? "bg-white border border-teal-50 text-slate-700 rounded-tl-sm" 
              : "bg-teal-600 text-white rounded-tr-sm"
          )}
        >
          {content}
        </div>
      </div>

      {/* User Avatar */}
      {!isAi && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
          <User className="w-5 h-5 text-slate-400" />
        </div>
      )}
    </div>
  );
}
