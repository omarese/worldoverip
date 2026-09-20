import type { Metadata } from 'next';
import { InfoPage, InfoSection } from '@/components/info-page';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How WorldOverIP handles your personal data.',
};

// NOTE: This is a plain-language starting draft. Have it reviewed and adjust it to match how
// accounts, hosting and analytics are actually set up before launch.
export default function PrivacyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      intro="A plain-language summary of how we handle your data. Last updated: 20 September 2026."
    >
      <InfoSection title="What we collect">
        <p>
          When you register we collect your username, email address and password (stored in a
          protected form). We also store the stories and other content you choose to post.
        </p>
      </InfoSection>

      <InfoSection title="How we use it">
        <p>
          We use your data to run your account, show your stories to the community, keep the site
          secure and answer your questions. We do not sell your personal data.
        </p>
      </InfoSection>

      <InfoSection title="What is public">
        <p>
          Your username and the stories you publish can be seen by other visitors. Your email
          address and password are never shown publicly.
        </p>
      </InfoSection>

      <InfoSection title="Your choices">
        <p>
          You can edit or delete your stories at any time. You can also ask us to access, correct
          or delete your data by emailing support@worldoverip.com.
        </p>
      </InfoSection>

      <InfoSection title="Cookies">
        <p>
          We use only the cookies needed to keep you logged in and the site working.
        </p>
      </InfoSection>

      <InfoSection title="Contact">
        <p>Questions about privacy? Email support@worldoverip.com.</p>
      </InfoSection>
    </InfoPage>
  );
}