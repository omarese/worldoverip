import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { InfoPage, InfoSection } from '@/components/info-page';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the WorldOverIP team.',
};

export default function ContactPage() {
  return (
    <InfoPage title="Contact" intro="Questions, feedback or something to report? We’d love to hear from you.">
      <InfoSection title="Email us">
        <a
          href="mailto:support@worldoverip.com"
          className="inline-flex items-center space-x-2 font-bold text-slate-900 hover:text-sky-600 transition"
        >
          <Mail className="w-4 h-4 text-sky-600" />
          <span>support@worldoverip.com</span>
        </a>
      </InfoSection>
    </InfoPage>
  );
}