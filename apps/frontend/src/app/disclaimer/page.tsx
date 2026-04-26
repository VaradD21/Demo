import Link from 'next/link';

export const metadata = {
  title: 'Disclaimer — Swahit',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <header className="px-6 lg:px-12 h-16 flex items-center border-b border-teal-100/50 bg-white/80">
        <Link href="/" className="text-teal-700 font-bold text-lg tracking-tight">← Swahit</Link>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-16 prose prose-slate prose-headings:text-teal-900 prose-a:text-teal-600">
        <h1>Important Disclaimer</h1>
        <p className="text-slate-500 text-sm">Last updated: April 2026</p>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 my-6 not-prose">
          <p className="text-amber-800 font-semibold text-sm">⚠️ Emergency Notice</p>
          <p className="text-amber-700 text-sm mt-1">
            If you are in immediate danger or experiencing a mental health emergency, please call your local emergency services immediately (e.g., iCall: 9152987821 in India, 988 in USA, 116 123 in UK).
            Swahit is not a crisis service.
          </p>
        </div>

        <h2>Not a Medical Service</h2>
        <p>Swahit is a digital wellness companion designed to provide emotional support, reflection tools, and general mental wellness guidance. <strong>Swahit is NOT a licensed medical service, therapy provider, or clinical mental health platform.</strong></p>
        <p>The AI companion (Swahit Guide) is not a licensed therapist, psychiatrist, psychologist, or medical professional. Conversations with the AI do not constitute therapy or medical advice.</p>

        <h2>What Swahit Can Help With</h2>
        <ul>
          <li>General emotional support and a space to reflect</li>
          <li>Guided journaling and mood tracking</li>
          <li>Mindfulness and stress management tips</li>
          <li>Connecting users with licensed professionals when appropriate</li>
        </ul>

        <h2>What Swahit Cannot Do</h2>
        <ul>
          <li>Diagnose any mental health condition</li>
          <li>Prescribe medication or treatments</li>
          <li>Replace a licensed therapist or doctor</li>
          <li>Handle emergencies or crises in real time</li>
        </ul>

        <h2>Doctor Appointments</h2>
        <p>Appointments booked through Swahit connect you with independent licensed professionals. Swahit facilitates the connection but is not responsible for the clinical advice or outcomes of those sessions.</p>

        <h2>Your Responsibility</h2>
        <p>By using Swahit, you acknowledge that it is a supplementary wellness tool. You are responsible for your own health decisions and for seeking qualified professional help when needed.</p>

        <div className="mt-10 pt-6 border-t border-slate-100 text-sm text-slate-400 not-prose flex gap-4">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/support">Contact</Link>
        </div>
      </main>
    </div>
  );
}
