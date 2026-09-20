import type { Metadata } from 'next';
import { InfoPage, InfoSection } from '@/components/info-page';

export const metadata: Metadata = {
  title: 'Community Guidelines',
  description: 'How we keep WorldOverIP a friendly and respectful place to share travel stories.',
};

export default function GuidelinesPage() {
  return (
    <InfoPage
      title="Community Guidelines"
      intro="A few simple rules to keep WorldOverIP friendly for everyone."
    >
      <InfoSection title="Be kind">
        <p>
          Disagree politely, celebrate other people’s trips and keep comments constructive.
          Harassment, hate speech and bullying are not welcome.
        </p>
      </InfoSection>

      <InfoSection title="Share real experiences">
        <p>
          Write about trips you actually took and be honest about the good and the bad. Please do
          not post spam, fake stories or hidden advertising.
        </p>
      </InfoSection>

      <InfoSection title="Respect people and privacy">
        <p>
          Ask before posting photos where other people are clearly recognisable, and never share
          private details such as addresses or travel plans of other people.
        </p>
      </InfoSection>

      <InfoSection title="Respect places and local culture">
        <p>
          Follow local rules and customs, leave nature as you found it and think twice before
          sharing the exact location of fragile or protected spots.
        </p>
      </InfoSection>

      <InfoSection title="Stay safe">
        <p>
          Do not encourage dangerous or illegal behaviour. If you see something that breaks these
          guidelines, let us know at support@worldoverip.com.
        </p>
      </InfoSection>
    </InfoPage>
  );
}