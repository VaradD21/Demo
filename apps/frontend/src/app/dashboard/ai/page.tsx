'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChatMessage } from '@/components/dashboard/chat-message';
import { HeartPulse, Send, MoreHorizontal, Eraser, Paperclip } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { fetchApi } from '@/lib/api';

type Message = {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
  emotionTag?: string;
};

export default function AIChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await fetchApi('/chat/history');
        if (history && history.length > 0) {
          setMessages(history.map((msg: any) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
            emotionTag: msg.emotionTag,
            timestamp: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date(msg.createdAt)),
          })));
        }
      } catch (error) {
        console.error('Failed to load chat history', error);
      }
    };
    loadHistory();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date()),
    };

    setMessages((prev) => [...prev, newMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetchApi('/chat', {
        method: 'POST',
        body: JSON.stringify({ content: currentInput }),
      });
      
      const aiResponse: Message = {
        id: response.id || (Date.now() + 1).toString(),
        role: 'ai',
        content: response.content,
        timestamp: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date()),
        emotionTag: response.emotionTag,
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Failed to send message', error);
      // Fallback response on error
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "I'm having trouble connecting to my servers right now. I'm here to listen, but I might be slow to respond.",
        timestamp: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date()),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-teal-100/50 mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#f8fafc] rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Swahit Guide</h1>
            <p className="text-sm text-teal-600 font-medium">Online and ready to listen</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleClear}
          className="text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
        >
          <Eraser className="w-4 h-4 mr-2" />
          Clear Chat
        </Button>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 overflow-hidden flex flex-col bg-[#fafafa] border-teal-100/50 shadow-sm rounded-3xl relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0d9488 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth z-10">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-700">
              <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mb-2">
                <HeartPulse className="w-10 h-10 text-teal-300" />
              </div>
              <h2 className="text-2xl font-bold text-slate-700">Welcome to your safe space.</h2>
              <p className="text-slate-500 max-w-sm text-lg">
                I'm here to listen, support, and guide you. How are you feeling today, {user?.name?.split(' ')[0] || 'Friend'}?
              </p>
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} {...msg} />
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 py-4 px-2 animate-pulse">
                  <MoreHorizontal className="w-5 h-5" />
                  <span className="text-sm font-medium">Swahit is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-teal-50 z-10">
          <div className="relative flex items-center bg-slate-50 border border-teal-100 rounded-2xl p-1 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all shadow-sm">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-teal-600 rounded-xl shrink-0">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your message here..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-[15px] h-12 shadow-none"
            />
            <Button 
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="rounded-xl bg-teal-600 hover:bg-teal-700 text-white h-12 w-12 shrink-0 shadow-md shadow-teal-600/20"
            >
              <Send className="w-5 h-5 ml-1" />
            </Button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-3 font-medium">
            Swahit AI can make mistakes. In a crisis, please reach out to emergency services.
          </p>
        </div>
      </Card>
    </div>
  );
}
