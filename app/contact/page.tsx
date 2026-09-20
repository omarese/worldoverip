cat > app/contact/page.tsx <<'EOF'
import type { Metadata } from 'next';
import { InfoPage, InfoSection } from '@/components/info-page';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the WorldOverIP team.',
};

export default function ContactPage() {
  return (
    <InfoPage title="Contact" intro="Questions, feedback or something to report? We would love to hear from you.">
      <InfoSection title="Email us">
        <a href="mailto:support@worldoverip.com" className="font-bold text-slate-900 hover:text-sky-600 transition">
          support@worldoverip.com
        </a>
      </InfoSection>
    </InfoPage>
  );
}
EOF