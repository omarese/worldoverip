import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How eSIMs work",
  description: "A short guide to installing a travel eSIM and what to compare before you buy.",
};

export default function GuidePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12">
      <h1 className="font-serif text-4xl">How travel eSIMs work</h1>
      <p className="mt-4 text-lg text-muted">
        An eSIM is a digital SIM. You buy a data plan, scan a QR code or tap an install link, and
        your phone uses a local or regional network without swapping plastic.
      </p>
      <ol className="mt-8 space-y-6">
        <li>
          <h2 className="font-serif text-2xl">Check compatibility</h2>
          <p className="mt-2 text-muted">
            Most phones from 2018 onward support eSIM, including iPhone XS and later and many
            Pixel, Galaxy, and Pixel-class Androids. Your device must be carrier-unlocked.
          </p>
        </li>
        <li>
          <h2 className="font-serif text-2xl">Keep your home line</h2>
          <p className="mt-2 text-muted">
            Dual SIM lets you leave your regular number on for SMS codes while the eSIM handles
            data. Turn off data roaming on the home line so you are not billed twice.
          </p>
        </li>
        <li>
          <h2 className="font-serif text-2xl">Compare more than sticker price</h2>
          <p className="mt-2 text-muted">
            Look at validity, hotspot, 5G, and fair-use on unlimited plans. A $6 1 GB pack can be
            worse value than a $18 10 GB pack if you work from cafes all week.
          </p>
        </li>
        <li>
          <h2 className="font-serif text-2xl">Install before you fly</h2>
          <p className="mt-2 text-muted">
            Download the plan on Wi-Fi at home. Activate on landing. If a QR fails, most providers
            let you install manually with SM-DP+ details from their app.
          </p>
        </li>
      </ol>
    </main>
  );
}
