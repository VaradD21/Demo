import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions — Swahit',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <header className="px-6 lg:px-12 h-16 flex items-center border-b border-teal-100/50 bg-white/80">
        <Link href="/" className="text-teal-700 font-bold text-lg tracking-tight">← Swahit</Link>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-16 prose prose-slate prose-headings:text-teal-900 prose-a:text-teal-600">
        <h1>Terms & Conditions</h1>
        <p className="text-slate-500 text-sm">Last updated: April 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By creating a Swahit account and using our services, you agree to these Terms & Conditions. If you do not agree, please do not use Swahit.</p>

        <h2>2. Nature of Service</h2>
        <p>Swahit provides a digital wellness companion and mental wellness tools. Swahit is not a medical service and does not replace professional therapy or psychiatric care. See our <Link href="/disclaimer">Disclaimer</Link> for full details.</p>

        <h2>3. Eligibility</h2>
        <p>You must be at least 18 years of age to use Swahit. By registering, you confirm you meet this age requirement.</p>

        <h2>4. User Responsibilities</h2>
        <ul>
          <li>Provide accurate registration information</li>
          <li>Maintain confidentiality of your account credentials</li>
          <li>Use the service for lawful, personal wellness purposes only</li>
          <li>Not attempt to misuse, reverse-engineer, or disrupt the service</li>
        </ul>

        <h2>5. Subscription & Payments</h2>
        <p>Swahit offers free and premium subscription tiers. Premium subscriptions are billed monthly or annually. Cancellations take effect at the end of the billing period. We reserve the right to modify pricing with 30 days notice.</p>

        <h2>6. Appointment Bookings</h2>
        <p>Appointments made through Swahit are with independent licensed professionals. Swahit is not responsible for the quality, outcomes, or advice of third-party professionals.</p>

        <h2>7. Intellectual Property</h2>
        <p>All content, design, and technology on the Swahit platform is the property of Swahit and may not be reproduced without permission.</p>

        <h2>8. Termination</h2>
        <p>We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time from your Settings page.</p>

        <h2>9. Limitation of Liability</h2>
        <p>Swahit is provided "as is". We are not liable for any direct or indirect damages arising from the use of this service. Use Swahit as a supplement to, not a replacement for, professional care.</p>

        <h2>10. Changes to Terms</h2>
        <p>We may update these terms periodically. Continued use of Swahit after changes constitutes acceptance of the updated terms.</p>

        <div className="mt-10 pt-6 border-t border-slate-100 text-sm text-slate-400 not-prose flex gap-4">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/support">Contact</Link>
        </div>
      </main>
    </div>
  );
}
