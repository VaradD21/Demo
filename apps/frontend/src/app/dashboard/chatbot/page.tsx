'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChatMessage } from '@/components/dashboard/chat-message';
import { Send, MoreHorizontal, Eraser, Leaf, Plus, Calendar, X } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { fetchApi } from '@/lib/api';
import Link from 'next/link';

type Message = {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
};

export default function ChatbotPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showEscalationBanner, setShowEscalationBanner] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  useEffect(() => {
    const loadThreads = async () => {
      try {
        const threads = await fetchApi('/chatbot/threads');
        if (threads?.length > 0) {
          const latestThreadId = threads[0].id;
          setSessionId(latestThreadId);
          loadHistory(latestThreadId);
        }
      } catch {}
    };
    loadThreads();
  }, []);

  const loadHistory = async (id: string) => {
    try {
      const history = await fetchApi(`/chatbot/thread/${id}`);
      if (history?.length > 0) {
        setMessages(history.map((msg: any) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          timestamp: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date(msg.createdAt)),
        })));
      } else {
        setMessages([]);
      }
    } catch {}
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date()),
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetchApi('/chatbot/message', {
        method: 'POST',
        body: JSON.stringify({ sessionId, content: currentInput }),
      });

      if (response.session && !sessionId) setSessionId(response.session.id);

      // Show appointment CTA if backend detected distress
      if (response.suggestProfessional) setShowEscalationBanner(true);

      const aiMsg: Message = {
        id: response.message.id || (Date.now() + 1).toString(),
        role: 'ai',
        content: response.message.content,
        timestamp: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date()),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "I'm having trouble connecting right now. Please check your connection or try again.",
        timestamp: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date()),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const startNewChat = () => { setSessionId(null); setMessages([]); setShowEscalationBanner(false); };

  const handleClear = async () => {
    if (sessionId) {
      try { await fetchApi(`/chatbot/thread/${sessionId}`, { method: 'DELETE' }); } catch {}
    }
    setSessionId(null);
    setMessages([]);
    setShowEscalationBanner(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-teal-100/50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#f8fafc] rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Swahit Companion 🌿</h1>
            <p className="text-xs text-teal-600 font-medium">Your calm space for reflection and support.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={startNewChat}
            className="text-teal-700 hover:bg-teal-50 hover:border-teal-200">
            <Plus className="w-4 h-4 mr-1.5" /> New
          </Button>
          <Button variant="outline" size="sm" onClick={handleClear}
            className="text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200">
            <Eraser className="w-4 h-4 mr-1.5" /> Clear
          </Button>
        </div>
      </div>

      {/* Escalation Banner */}
      {showEscalationBanner && (
        <div className="mb-4 flex items-start gap-3 bg-teal-50 border border-teal-200 rounded-2xl p-4 animate-in slide-in-from-top-2">
          <Calendar className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-teal-800">A professional might help</p>
            <p className="text-xs text-teal-700 mt-0.5">
              Swahit is here for you, and speaking with a licensed therapist can offer deeper support.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/dashboard/appointments">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 h-8 rounded-xl">
                Book Session
              </Button>
            </Link>
            <button onClick={() => setShowEscalationBanner(false)} className="text-teal-400 hover:text-teal-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <Card className="flex-1 overflow-hidden flex flex-col bg-[#fafafa] border-teal-100/50 shadow-sm rounded-3xl relative">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0d9488 1px, transparent 0)', backgroundSize: '24px 24px' }} />

        <div className="flex-1 overflow-y-auto p-5 scroll-smooth z-10">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-700">
              <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-teal-300" />
              </div>
              <h2 className="text-xl font-bold text-slate-700">Welcome to your safe space.</h2>
              <p className="text-slate-500 max-w-sm">
                I'm here to listen, support, and guide you without judgment.
                How are you feeling today, {user?.name?.split(' ')[0] || 'Friend'}?
              </p>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {messages.map((msg) => <ChatMessage key={msg.id} {...msg} />)}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 py-2 px-2 animate-pulse">
                  <MoreHorizontal className="w-4 h-4" />
                  <span className="text-sm">Swahit is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-teal-50 z-10">
          <div className="relative flex items-center bg-slate-50 border border-teal-100 rounded-2xl p-1 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all shadow-sm">
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Share your thoughts here..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-[15px] h-12 shadow-none"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="rounded-xl bg-teal-600 hover:bg-teal-700 text-white h-12 w-12 shrink-0 shadow-md shadow-teal-600/20"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            Swahit AI is a supportive tool — not a therapist. In crisis, please call emergency services.
          </p>
        </div>
      </Card>
    </div>
  );
}
