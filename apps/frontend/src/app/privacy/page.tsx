import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Swahit',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <header className="px-6 lg:px-12 h-16 flex items-center border-b border-teal-100/50 bg-white/80">
        <Link href="/" className="text-teal-700 font-bold text-lg tracking-tight">← Swahit</Link>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-16 prose prose-slate prose-headings:text-teal-900 prose-a:text-teal-600">
        <h1>Privacy Policy</h1>
        <p className="text-slate-500 text-sm">Last updated: April 2026</p>

        <h2>1. What We Collect</h2>
        <p>We collect information you provide directly: name, email address, date of birth, gender, profession, and conversation data. We also collect usage data such as mood entries, questionnaire responses, and appointment history.</p>

        <h2>2. How We Use Your Data</h2>
        <ul>
          <li>To provide and personalize the Swahit AI companion experience</li>
          <li>To track your mood and wellness progress over time</li>
          <li>To facilitate appointment bookings with licensed professionals</li>
          <li>To improve our platform through anonymized analytics</li>
        </ul>

        <h2>3. We Never Sell Your Data</h2>
        <p><strong>Your personal and emotional data is never sold, rented, or shared with third-party advertisers.</strong> Your conversations with Swahit are private and used only to provide you with a better experience.</p>

        <h2>4. Data Storage</h2>
        <p>Your data is stored securely using encrypted databases. Conversation data is stored on protected servers. We follow industry-standard security practices.</p>

        <h2>5. AI Processing</h2>
        <p>Your messages are processed by Google's Gemini AI. By using Swahit, you consent to this processing for the purpose of generating supportive responses. We do not share your identity with Google — conversations are processed without your personal identifiers where possible.</p>

        <h2>6. Your Rights</h2>
        <ul>
          <li>Right to access your data</li>
          <li>Right to correct your information</li>
          <li>Right to delete your account and all data</li>
          <li>Right to withdraw consent at any time</li>
        </ul>

        <h2>7. Contact</h2>
        <p>For any privacy concerns, contact us at <a href="mailto:privacy@swahit.app">privacy@swahit.app</a>.</p>

        <div className="mt-10 pt-6 border-t border-slate-100 text-sm text-slate-400 not-prose flex gap-4">
          <Link href="/terms">Terms</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/support">Contact</Link>
        </div>
      </main>
    </div>
  );
}
