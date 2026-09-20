import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoPage, InfoSection } from '@/components/info-page';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The rules for using WorldOverIP.',
};

// NOTE: This is a plain-language starting draft. Have it reviewed before launch.
export default function TermsPage() {
  return (
    <InfoPage
      title="Terms of Service"
      intro="The basic rules for using WorldOverIP. Last updated: 20 September 2026."
    >
      <InfoSection title="Your account">
        <p>
          You are responsible for your account and for keeping your password safe. You must be old
          enough to agree to these terms where you live.
        </p>
      </InfoSection>

      <InfoSection title="Your content">
        <p>
          You own the stories and photos you post. By posting them you allow WorldOverIP to
          display them on the site. Only post content you have the right to share.
        </p>
      </InfoSection>

      <InfoSection title="Community rules">
        <p>
          Everyone must follow our{' '}
          <Link href="/guidelines" className="font-bold text-slate-900 underline hover:text-sky-600">
            community guidelines
          </Link>
          . We may remove content or close accounts that break them.
        </p>
      </InfoSection>

      <InfoSection title="Use at your own risk">
        <p>
          Stories are personal experiences shared by community members. Always check local rules,
          safety information and current conditions before you travel.
        </p>
      </InfoSection>

      <InfoSection title="Changes">
        <p>
          We may update these terms from time to time. If we make important changes we will let
          you know on the site.
        </p>
      </InfoSection>

      <InfoSection title="Contact">
        <p>Questions? Email support@worldoverip.com.</p>
      </InfoSection>
    </InfoPage>
  );
}