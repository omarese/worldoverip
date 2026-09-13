export type Provider = {
  slug: string;
  name: string;
  tagline: string;
  website: string;
  founded: string;
  coverage: string;
  strengths: string[];
  watchouts: string[];
};

export type Destination = {
  slug: string;
  name: string;
  region: string;
  kind: "country" | "region";
  flag: string;
  popular: boolean;
  summary: string;
  networks: string[];
};

export type Plan = {
  id: string;
  destinationSlug: string;
  providerSlug: string;
  dataGB: number | null;
  days: number;
  priceUsd: number;
  hotspot: boolean;
  fiveG: boolean;
  networks: string[];
};

export const providers: Provider[] = [
  {
    slug: "airalo",
    name: "Airalo",
    tagline: "Large destination catalog and easy in-app top-ups.",
    website: "https://www.airalo.com",
    founded: "2019",
    coverage: "200+ destinations",
    strengths: ["Huge country list", "Store in Apple Wallet on many plans", "Frequent starter packs"],
    watchouts: ["Unlimited is rare", "Per-GB price varies a lot by country"],
  },
  {
    slug: "nomad",
    name: "Nomad",
    tagline: "Clear pricing and strong regional / global packs.",
    website: "https://www.getnomad.app",
    founded: "2019",
    coverage: "190+ destinations",
    strengths: ["Transparent data sizes", "Good Europe and Asia regionals", "Reliable hotspot on most plans"],
    watchouts: ["Fewer ultra-cheap 1 GB day packs"],
  },
  {
    slug: "holafly",
    name: "Holafly",
    tagline: "Unlimited-data specialist for longer trips.",
    website: "https://esim.holafly.com",
    founded: "2017",
    coverage: "200+ destinations",
    strengths: ["True unlimited on many countries", "24/7 chat support", "Simple duration-based pricing"],
    watchouts: ["Hotspot often capped", "Usually not the cheapest per GB"],
  },
  {
    slug: "saily",
    name: "Saily",
    tagline: "NordVPN’s travel eSIM with straightforward plans.",
    website: "https://saily.com",
    founded: "2023",
    coverage: "190+ destinations",
    strengths: ["Clean checkout", "Solid mid-size data packs", "VPN bundle for some users"],
    watchouts: ["Newer brand, fewer regional SKUs"],
  },
  {
    slug: "ubigi",
    name: "Ubigi",
    tagline: "Carrier-grade eSIMs, strong in Japan, US, and Europe.",
    website: "https://www.ubigi.com",
    founded: "2017",
    coverage: "200+ destinations",
    strengths: ["Quality networks", "Car-maker partnerships", "Flexible top-ups"],
    watchouts: ["App UX is more utilitarian"],
  },
  {
    slug: "maya",
    name: "Maya Mobile",
    tagline: "Unlimited and high-data plans with hotspot included.",
    website: "https://mayamobile.com",
    founded: "2018",
    coverage: "160+ destinations",
    strengths: ["Hotspot included on unlimited", "Long-validity options", "Good for remote work"],
    watchouts: ["Not always cheapest for short weekends"],
  },
];

export const destinations: Destination[] = [
  {
    slug: "japan",
    name: "Japan",
    region: "Asia",
    kind: "country",
    flag: "🇯🇵",
    popular: true,
    summary: "Dense 4G/5G coverage in cities. Compare tourist packs before you land at NRT or HND.",
    networks: ["NTT Docomo", "KDDI au", "SoftBank"],
  },
  {
    slug: "united-states",
    name: "United States",
    region: "Americas",
    kind: "country",
    flag: "🇺🇸",
    popular: true,
    summary: "Coverage is excellent in metros. Check hotspot if you will tether a laptop.",
    networks: ["T-Mobile", "AT&T", "Verizon"],
  },
  {
    slug: "turkey",
    name: "Turkey",
    region: "Europe & Middle East",
    kind: "country",
    flag: "🇹🇷",
    popular: true,
    summary: "Strong tourist coverage in Istanbul, Antalya, and Cappadocia. Local SIMs are cheap; eSIMs win on convenience.",
    networks: ["Turkcell", "Vodafone TR", "Türk Telekom"],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    region: "Europe",
    kind: "country",
    flag: "🇬🇧",
    popular: true,
    summary: "5G is widely available. A Europe regional plan can be cheaper if you hop to the EU.",
    networks: ["EE", "Vodafone", "O2", "Three"],
  },
  {
    slug: "spain",
    name: "Spain",
    region: "Europe",
    kind: "country",
    flag: "🇪🇸",
    popular: true,
    summary: "Solid nationwide coverage. Unlimited plans are popular for two-week holidays.",
    networks: ["Movistar", "Orange", "Vodafone"],
  },
  {
    slug: "france",
    name: "France",
    region: "Europe",
    kind: "country",
    flag: "🇫🇷",
    popular: true,
    summary: "Reliable 5G in cities and trains. Regional Europe eSIMs often beat France-only packs.",
    networks: ["Orange", "SFR", "Bouygues", "Free"],
  },
  {
    slug: "italy",
    name: "Italy",
    region: "Europe",
    kind: "country",
    flag: "🇮🇹",
    popular: true,
    summary: "Good coverage in tourist corridors. Mountain towns can be spottier — pick a major MNO.",
    networks: ["TIM", "Vodafone", "WindTre"],
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "Asia",
    kind: "country",
    flag: "🇹🇭",
    popular: true,
    summary: "Airport kiosks are everywhere, but an eSIM ready before wheels-down is still faster.",
    networks: ["AIS", "TrueMove H", "dtac"],
  },
  {
    slug: "united-arab-emirates",
    name: "United Arab Emirates",
    region: "Middle East",
    kind: "country",
    flag: "🇦🇪",
    popular: true,
    summary: "Excellent 5G in Dubai and Abu Dhabi. VoIP apps can be restricted on some local networks.",
    networks: ["Etisalat", "du"],
  },
  {
    slug: "mexico",
    name: "Mexico",
    region: "Americas",
    kind: "country",
    flag: "🇲🇽",
    popular: true,
    summary: "Coverage is strong in cities and resorts. Confirm 5G if you need it outside major hubs.",
    networks: ["Telcel", "Movistar", "AT&T Mexico"],
  },
  {
    slug: "south-korea",
    name: "South Korea",
    region: "Asia",
    kind: "country",
    flag: "🇰🇷",
    popular: true,
    summary: "Among the world’s fastest 5G. Short high-data packs usually beat unlimited here.",
    networks: ["SK Telecom", "KT", "LG U+"],
  },
  {
    slug: "australia",
    name: "Australia",
    region: "Oceania",
    kind: "country",
    flag: "🇦🇺",
    popular: true,
    summary: "Cities are easy. Outback coverage is sparse on every provider — download maps.",
    networks: ["Telstra", "Optus", "Vodafone"],
  },
  {
    slug: "germany",
    name: "Germany",
    region: "Europe",
    kind: "country",
    flag: "🇩🇪",
    popular: false,
    summary: "Solid LTE nationwide. A 30-day Europe pack is often the better buy for rail trips.",
    networks: ["Telekom", "Vodafone", "O2"],
  },
  {
    slug: "indonesia",
    name: "Indonesia",
    region: "Asia",
    kind: "country",
    flag: "🇮🇩",
    popular: true,
    summary: "Bali and Jakarta are well covered. Island hopping still favors AIS/Telkomsel-backed eSIMs.",
    networks: ["Telkomsel", "XL Axiata", "Indosat"],
  },
  {
    slug: "greece",
    name: "Greece",
    region: "Europe",
    kind: "country",
    flag: "🇬🇷",
    popular: false,
    summary: "Mainland and popular islands are fine. Ferries and smaller islands can drop to 3G/4G.",
    networks: ["Cosmote", "Vodafone", "Wind"],
  },
  {
    slug: "portugal",
    name: "Portugal",
    region: "Europe",
    kind: "country",
    flag: "🇵🇹",
    popular: false,
    summary: "Lisbon and Porto have strong 5G. Pair with a Spain plan if you are road-tripping.",
    networks: ["MEO", "NOS", "Vodafone"],
  },
  {
    slug: "morocco",
    name: "Morocco",
    region: "Africa",
    kind: "country",
    flag: "🇲🇦",
    popular: false,
    summary: "Cities and tourist routes are covered. Atlas villages may need offline maps.",
    networks: ["Maroc Telecom", "Orange", "inwi"],
  },
  {
    slug: "brazil",
    name: "Brazil",
    region: "Americas",
    kind: "country",
    flag: "🇧🇷",
    popular: false,
    summary: "Metros have 5G. Long-distance buses benefit from larger data buckets.",
    networks: ["Vivo", "Claro", "TIM"],
  },
  {
    slug: "canada",
    name: "Canada",
    region: "Americas",
    kind: "country",
    flag: "🇨🇦",
    popular: false,
    summary: "Expensive local roaming. eSIMs usually beat US carrier add-ons for a one-week trip.",
    networks: ["Rogers", "Bell", "Telus"],
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    region: "Asia",
    kind: "country",
    flag: "🇻🇳",
    popular: true,
    summary: "Cheap data market. eSIM convenience still wins if you land late at SGN or HAN.",
    networks: ["Viettel", "Vinaphone", "Mobifone"],
  },
  {
    slug: "singapore",
    name: "Singapore",
    region: "Asia",
    kind: "country",
    flag: "🇸🇬",
    popular: false,
    summary: "Tiny geography, excellent 5G. A 1–3 GB pack is enough for most long weekends.",
    networks: ["Singtel", "StarHub", "M1"],
  },
  {
    slug: "europe",
    name: "Europe (regional)",
    region: "Europe",
    kind: "region",
    flag: "🇪🇺",
    popular: true,
    summary: "One eSIM across Schengen and the UK on many providers. Best when you visit 2+ countries.",
    networks: ["Multiple national partners"],
  },
  {
    slug: "asia",
    name: "Asia (regional)",
    region: "Asia",
    kind: "region",
    flag: "🌏",
    popular: false,
    summary: "Covers typical multi-stop routes (Japan–Korea–Thailand). Confirm the country list before buying.",
    networks: ["Multiple national partners"],
  },
  {
    slug: "global",
    name: "Global",
    region: "Worldwide",
    kind: "region",
    flag: "🌐",
    popular: true,
    summary: "Pay more per GB, skip swapping SIMs. Useful for long itineraries with mixed continents.",
    networks: ["Multiple national partners"],
  },
];

const providerDefaults: Record<
  string,
  { hotspot: boolean; fiveG: boolean; unlimited: boolean; priceBias: number }
> = {
  airalo: { hotspot: true, fiveG: true, unlimited: false, priceBias: 1 },
  nomad: { hotspot: true, fiveG: true, unlimited: false, priceBias: 0.96 },
  holafly: { hotspot: false, fiveG: true, unlimited: true, priceBias: 1.35 },
  saily: { hotspot: true, fiveG: true, unlimited: false, priceBias: 0.98 },
  ubigi: { hotspot: true, fiveG: true, unlimited: false, priceBias: 1.08 },
  maya: { hotspot: true, fiveG: true, unlimited: true, priceBias: 1.22 },
};

function hash(input: string) {
  let n = 0;
  for (let i = 0; i < input.length; i += 1) n = (n * 31 + input.charCodeAt(i)) >>> 0;
  return n;
}

function money(value: number) {
  return Math.round(value * 100) / 100;
}

function buildPlans(): Plan[] {
  const sizes = [
    { dataGB: 1, days: 7, base: 4.5 },
    { dataGB: 3, days: 15, base: 9 },
    { dataGB: 5, days: 30, base: 13 },
    { dataGB: 10, days: 30, base: 21 },
    { dataGB: 20, days: 30, base: 32 },
  ];
  const plans: Plan[] = [];

  for (const destination of destinations) {
    const regionBump =
      destination.kind === "region" ? (destination.slug === "global" ? 1.8 : 1.35) : 1;
    const destBump = 0.9 + (hash(destination.slug) % 25) / 100;

    for (const provider of providers) {
      const defaults = providerDefaults[provider.slug];
      if (defaults.unlimited && (destination.kind === "country" || destination.slug === "europe")) {
        for (const days of [7, 15, 30]) {
          plans.push({
            id: `${destination.slug}-${provider.slug}-unl-${days}`,
            destinationSlug: destination.slug,
            providerSlug: provider.slug,
            dataGB: null,
            days,
            priceUsd: money(days * (destination.kind === "region" ? 3.4 : 2.7) * defaults.priceBias * destBump),
            hotspot: defaults.hotspot,
            fiveG: defaults.fiveG,
            networks: destination.networks.slice(0, 2),
          });
        }
      }

      if (defaults.unlimited && provider.slug === "holafly") continue;

      for (const size of sizes) {
        if (destination.kind === "region" && size.dataGB === 1) continue;
        plans.push({
          id: `${destination.slug}-${provider.slug}-${size.dataGB}gb-${size.days}`,
          destinationSlug: destination.slug,
          providerSlug: provider.slug,
          dataGB: size.dataGB,
          days: size.days,
          priceUsd: money(size.base * defaults.priceBias * regionBump * destBump),
          hotspot: defaults.hotspot,
          fiveG: defaults.fiveG,
          networks: destination.networks.slice(0, provider.slug === "ubigi" ? 3 : 2),
        });
      }
    }
  }

  return plans;
}

export const plans = buildPlans();

export function getDestination(slug: string) {
  return destinations.find((item) => item.slug === slug);
}

export function getProvider(slug: string) {
  return providers.find((item) => item.slug === slug);
}

export function getPlansForDestination(slug: string) {
  return plans.filter((plan) => plan.destinationSlug === slug);
}

export function getPlansForProvider(slug: string) {
  return plans.filter((plan) => plan.providerSlug === slug);
}

export function pricePerGb(plan: Plan) {
  if (!plan.dataGB) return null;
  return plan.priceUsd / plan.dataGB;
}

export function formatData(plan: Plan) {
  return plan.dataGB === null ? "Unlimited" : `${plan.dataGB} GB`;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function cheapestPlan(list: Plan[]) {
  return [...list].sort((a, b) => a.priceUsd - b.priceUsd)[0];
}

export function bestValuePlan(list: Plan[]) {
  const metered = list.filter((plan) => plan.dataGB);
  if (!metered.length) return list[0];
  return [...metered].sort((a, b) => (pricePerGb(a) ?? 99) - (pricePerGb(b) ?? 99))[0];
}

export function searchDestinations(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return destinations;
  return destinations.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.region.toLowerCase().includes(q) ||
      item.slug.includes(q),
  );
}
