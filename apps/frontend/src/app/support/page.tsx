import Link from 'next/link';
import { Mail, MessageCircle, Phone } from 'lucide-react';

export const metadata = {
  title: 'Support — Swahit',
  description: 'Get help, report issues, or contact the Swahit team.',
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <header className="px-6 lg:px-12 h-16 flex items-center border-b border-teal-100/50 bg-white/80">
        <Link href="/" className="text-teal-700 font-bold text-lg tracking-tight">← Swahit</Link>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-16 space-y-10">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Support & Help</h1>
          <p className="text-slate-500 mt-2 text-lg">We're here for you. Reach out anytime.</p>
        </div>

        {/* Crisis Banner */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <p className="font-semibold text-red-800 mb-1">🆘 In immediate distress?</p>
          <p className="text-red-700 text-sm">
            Please call emergency services or a crisis line now.<br />
            <strong>India:</strong> iCall — 9152987821 &nbsp;|&nbsp; <strong>USA:</strong> 988 &nbsp;|&nbsp; <strong>UK:</strong> 116 123 (Samaritans)
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid gap-5">
          <div className="bg-white border border-teal-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Email Support</h3>
              <p className="text-slate-500 text-sm mt-1">For account issues, billing, or feature requests.</p>
              <a href="mailto:support@swahit.app" className="text-teal-600 font-medium text-sm mt-2 inline-block hover:underline">
                support@swahit.app
              </a>
            </div>
          </div>

          <div className="bg-white border border-teal-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Chat Support</h3>
              <p className="text-slate-500 text-sm mt-1">Sign in and use the Swahit companion for general guidance.</p>
              <Link href="/login" className="text-teal-600 font-medium text-sm mt-2 inline-block hover:underline">
                Open Swahit →
              </Link>
            </div>
          </div>

          <div className="bg-white border border-teal-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Book a Session</h3>
              <p className="text-slate-500 text-sm mt-1">Connect with a licensed therapist or counselor on our platform.</p>
              <Link href="/login" className="text-teal-600 font-medium text-sm mt-2 inline-block hover:underline">
                Book Appointment →
              </Link>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Common Questions</h2>
          {[
            { q: 'Is Swahit a replacement for therapy?', a: 'No. Swahit is a supportive wellness tool. For serious concerns, please consult a licensed professional.' },
            { q: 'Is my data private?', a: 'Yes. Your conversations are private and never sold. Read our full Privacy Policy for details.' },
            { q: 'How do I delete my account?', a: 'Go to Settings > Account Actions > Delete My Account. This is permanent.' },
            { q: 'Are the doctors on Swahit licensed?', a: 'Yes. All professionals listed are verified and licensed in their respective fields.' },
          ].map(faq => (
            <div key={faq.q} className="bg-white border border-teal-100 rounded-2xl p-5 shadow-sm">
              <p className="font-semibold text-slate-800 text-sm">{faq.q}</p>
              <p className="text-slate-500 text-sm mt-1">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-100 text-sm text-slate-400 flex gap-4">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
      </main>
    </div>
  );
}
