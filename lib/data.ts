// Sample data for the travel-diary site.
// Replace this file with a real database (users, stories, likes) when the backend is ready.

export type Region = "Europe" | "Asia" | "Africa" | "Americas";

export type Destination = {
  slug: string;
  name: string;
  flag: string;
  region: Region;
  tint: string;
  blurb: string;
};

export type Author = {
  name: string;
  handle: string;
};

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  destinationSlug: string;
  author: Author;
  publishedAt: string; // YYYY-MM-DD
  readMinutes: number;
  likes: number;
};

export const regions: Region[] = ["Europe", "Asia", "Africa", "Americas"];

export const destinations: Destination[] = [
  { slug: "netherlands", name: "Netherlands", flag: "🇳🇱", region: "Europe", tint: "#FCD8B5", blurb: "Bikes, canals and cosy brown cafés." },
  { slug: "italy", name: "Italy", flag: "🇮🇹", region: "Europe", tint: "#FBE4D8", blurb: "Coastal roads, long lunches and old stone towns." },
  { slug: "spain", name: "Spain", flag: "🇪🇸", region: "Europe", tint: "#FCE5CD", blurb: "Late dinners, tapas bars and sunny plazas." },
  { slug: "united-kingdom", name: "United Kingdom", flag: "🇬🇧", region: "Europe", tint: "#D4F1F4", blurb: "Rolling hills, wild coastlines and friendly pubs." },
  { slug: "albania", name: "Albania", flag: "🇦🇱", region: "Europe", tint: "#FBE4D8", blurb: "Quiet bays, mountain passes and honest food." },
  { slug: "turkey", name: "Turkey", flag: "🇹🇷", region: "Asia", tint: "#FCD8B5", blurb: "Fairy chimneys, bazaars and endless tea." },
  { slug: "thailand", name: "Thailand", flag: "🇹🇭", region: "Asia", tint: "#D4F1F4", blurb: "Island boats, street noodles and warm evenings." },
  { slug: "indonesia", name: "Indonesia", flag: "🇮🇩", region: "Asia", tint: "#CFEBDD", blurb: "Rice terraces, volcanoes and temple mornings." },
  { slug: "china", name: "China", flag: "🇨🇳", region: "Asia", tint: "#FBE4D8", blurb: "Fast trains, spicy hotpot and ancient streets." },
  { slug: "japan", name: "Japan", flag: "🇯🇵", region: "Asia", tint: "#FCE5CD", blurb: "Quiet shrines, neon nights and perfect little meals." },
  { slug: "egypt", name: "Egypt", flag: "🇪🇬", region: "Africa", tint: "#FCD8B5", blurb: "Pyramids at dawn and bustling bazaars." },
  { slug: "united-states", name: "United States", flag: "🇺🇸", region: "Americas", tint: "#D4F1F4", blurb: "Big road trips and even bigger skies." },
];

export const stories: Story[] = [
  {
    slug: "three-slow-days-in-kyoto",
    title: "Three slow days in Kyoto without an itinerary",
    excerpt: "I deleted my list of must-sees and just walked. Here is what I found between the temples.",
    body: [
      "I usually arrive in a new city with a colour-coded plan. In Kyoto I left it in my bag and followed the river north from Gojo Bridge instead, stopping wherever something smelled good.",
      "Day two was a tiny tofu shop, a shrine with nobody in it, and a rainy afternoon reading in a kissaten while the owner played jazz records. None of it was on a list, and all of it is what I remember.",
      "If you go, stay near the river and give every day one long, empty afternoon. Kyoto rewards wandering.",
    ],
    destinationSlug: "japan",
    author: { name: "Mika Sato", handle: "mika.roams" },
    publishedAt: "2026-09-14",
    readMinutes: 6,
    likes: 248,
  },
  {
    slug: "canals-bikes-and-stroopwafels",
    title: "A weekend of canals, bikes and far too many stroopwafels",
    excerpt: "I borrowed a bike in Amsterdam and pointed it toward Utrecht. The detours were the best part.",
    body: [
      "I borrowed a friend's bike in Amsterdam and pointed it toward Utrecht, mostly following the numbered cycle-route signs and hoping for the best.",
      "The route runs along the Vecht: canal houses, cows, and a coffee stop in every second village. I covered around 45 kilometres, very slowly.",
      "A tip for visitors: a headwind on the way back is inevitable, so plan your stroopwafel stops around it.",
    ],
    destinationSlug: "netherlands",
    author: { name: "Daan Visser", handle: "daan.on.wheels" },
    publishedAt: "2026-09-10",
    readMinutes: 4,
    likes: 176,
  },
  {
    slug: "sunrise-over-cappadocia",
    title: "Sunrise over the balloons in Cappadocia",
    excerpt: "The alarm went off at 4:30 and for once I didn't mind. This is why.",
    body: [
      "The alarm went off at 4:30, and for once I didn't mind. We climbed a small hill above Göreme in the dark and waited.",
      "Then the first balloon lifted, then twenty more, until the whole valley looked like it was breathing. I didn't take a single photo for the first five minutes.",
      "Bring a warm layer, because it is cold before sunrise even in summer. Booking a balloon flight is wonderful, but watching from the ground is free and just as magical.",
    ],
    destinationSlug: "turkey",
    author: { name: "Elif Kaya", handle: "elif.kaya" },
    publishedAt: "2026-09-07",
    readMinutes: 5,
    likes: 312,
  },
  {
    slug: "island-hopping-krabi-budget",
    title: "Island hopping around Krabi on 30 euros a day",
    excerpt: "A fan room, street noodles and shared longtail boats. Krabi is easier on a budget than you think.",
    body: [
      "Krabi is easier on a budget than people think. A fan room, street noodles and a shared longtail boat to Railay came to about 30 euros a day.",
      "My favourite day was a boat trip to four islands with a group of strangers who became friends by lunchtime. We snorkelled, ate grilled fish on the beach and got sunburnt in exactly the same spots.",
      "Go in the shoulder season if you can. Fewer crowds, cheaper rooms, and the occasional rain shower keeps the jungle very green.",
    ],
    destinationSlug: "thailand",
    author: { name: "Noah Bakker", handle: "noah.backpacks" },
    publishedAt: "2026-09-03",
    readMinutes: 7,
    likes: 204,
  },
  {
    slug: "amalfi-coast-by-bus",
    title: "The Amalfi Coast by bus: the honest version",
    excerpt: "Crowded, winding and completely worth it. How I did the coast without a car.",
    body: [
      "Yes, the buses are crowded. Yes, the road has more hairpin bends than seems reasonable. And yes, I would do it again tomorrow.",
      "We based ourselves in Salerno, took the local bus along the coast and got off wherever the view demanded it. Positano at 9 a.m. is a different place from Positano at noon.",
      "Grab a seat on the sea side for the views, and pack a small bag. There are a lot of stairs.",
    ],
    destinationSlug: "italy",
    author: { name: "Chiara Rossi", handle: "chiara.r" },
    publishedAt: "2026-08-28",
    readMinutes: 5,
    likes: 189,
  },
  {
    slug: "tapas-crawl-seville",
    title: "A tapas crawl through Seville, one small plate at a time",
    excerpt: "Never sit down for a big dinner in Seville. Stand at the bar, order one tapa and move on.",
    body: [
      "In Seville the rule is simple: never sit down for a big dinner. Order one tapa and a small drink, stand at the bar, then move on to the next place.",
      "Over one evening I hit six bars in Triana and El Arenal. Highlights were crispy fried aubergine with cane honey, spinach with chickpeas, and a tiny bar where the owner chalked the prices on the counter.",
      "Go late, because Andalusians eat dinner after nine, and learn how to say \"otra, por favor\".",
    ],
    destinationSlug: "spain",
    author: { name: "Lucas Moreno", handle: "lucas.eats" },
    publishedAt: "2026-08-24",
    readMinutes: 4,
    likes: 143,
  },
  {
    slug: "ubud-rice-terraces-scooter",
    title: "Ubud, rice terraces and one very brave scooter",
    excerpt: "I swore I'd never ride a scooter abroad. Three days into Bali I was riding one at sunrise.",
    body: [
      "I told myself I'd never ride a scooter abroad. Three days into Bali I was riding one to the Tegallalang rice terraces at seven in the morning.",
      "Going early was the best decision of the trip: soft light, empty paths and a warung selling sweet, strong coffee at the top.",
      "Please wear a helmet, check that your travel insurance covers scooters and stay off the busiest roads until you feel confident. A driver for the day is a great option too.",
    ],
    destinationSlug: "indonesia",
    author: { name: "Sari Wijaya", handle: "sari.wanders" },
    publishedAt: "2026-08-20",
    readMinutes: 6,
    likes: 221,
  },
  {
    slug: "albanian-riviera-again",
    title: "Why I keep going back to the Albanian Riviera",
    excerpt: "Clear water, pebble beaches and villages that still feel like villages.",
    body: [
      "Clear water, pebble beaches and villages that still feel like villages. Ksamil gets the attention, but the quieter bays near Himara are where I always end up.",
      "Lunch is a plate of grilled fish and a tomato salad that tastes like tomatoes, eaten with your feet almost in the sea. The bill is always a pleasant surprise.",
      "Rent a car if you can, because the coastal road over the Llogara Pass is spectacular, and visit outside August for calmer beaches.",
    ],
    destinationSlug: "albania",
    author: { name: "Arben Hoxha", handle: "arben.h" },
    publishedAt: "2026-08-15",
    readMinutes: 5,
    likes: 167,
  },
  {
    slug: "cairo-in-four-days",
    title: "Cairo in four days: chaos, koshari and the pyramids at dawn",
    excerpt: "Loud, busy and completely unforgettable. My four-day Cairo survival guide.",
    body: [
      "Cairo is loud, busy and completely unforgettable. On day one I got lost in Khan el-Khalili and ended up drinking tea with a shopkeeper who made me promise to come back.",
      "Koshari, a bowl of lentils, rice and pasta topped with crispy onions, became my daily lunch. The pyramids at Giza early in the morning, before the tour buses arrive, felt almost private.",
      "Pack a scarf, comfortable shoes and patience. Agree the price before every taxi ride, and don't be shy about saying no thank you with a smile.",
    ],
    destinationSlug: "egypt",
    author: { name: "Nadia Farouk", handle: "nadia.farouk" },
    publishedAt: "2026-08-09",
    readMinutes: 8,
    likes: 259,
  },
  {
    slug: "highway-1-in-a-corolla",
    title: "Driving Highway 1 in a rented Corolla",
    excerpt: "Everyone says to rent a convertible. I rented the cheapest car and had just as much fun.",
    body: [
      "Everyone says to rent a convertible. I rented the cheapest car available and had just as good a time.",
      "From Monterey to Big Sur the road hugs the cliffs, and every pull-out is a postcard. We stopped at Bixby Bridge, ate fish tacos in Cambria and watched elephant seals lounging on the beach near San Simeon.",
      "Fill up the tank early, download offline maps because the signal drops in Big Sur, check for road closures before you go, and don't try to do the whole thing in a day.",
    ],
    destinationSlug: "united-states",
    author: { name: "Jordan Price", handle: "jordan.p" },
    publishedAt: "2026-08-03",
    readMinutes: 9,
    likes: 198,
  },
  {
    slug: "scottish-highlands-in-the-rain",
    title: "The Scottish Highlands in the rain (and loving every minute)",
    excerpt: "It rained on eight of our nine days. It didn't matter one bit.",
    body: [
      "It rained on eight of our nine days. It didn't matter. Waterfalls appeared out of nowhere and the hills disappeared into cloud like something from an old painting.",
      "We drove a stretch of the North Coast 500, staying in cosy B&Bs where breakfast came with porridge and strong opinions about the weather.",
      "Pack a proper waterproof and midge repellent for the evenings, and leave time to just sit in a warm pub while the weather passes.",
    ],
    destinationSlug: "united-kingdom",
    author: { name: "Fiona MacLeod", handle: "fiona.mac" },
    publishedAt: "2026-07-27",
    readMinutes: 6,
    likes: 154,
  },
  {
    slug: "shanghai-to-chengdu-by-train",
    title: "Shanghai to Chengdu by high-speed train",
    excerpt: "Calm, punctual and surprisingly easy to book. Plus: pandas, hotpot and a very long tea break.",
    body: [
      "Trains in China are calm, punctual and surprisingly easy to book once you know how. I took the high-speed train from Shanghai toward Chengdu, breaking the trip with a night in Wuhan.",
      "In Chengdu I ate hotpot that made my eyes water, visited the giant pandas at the research base early in the morning, and spent a whole afternoon in a teahouse doing nothing at all.",
      "Download a translation app, carry your passport for train tickets and keep some cash as a backup for small vendors.",
    ],
    destinationSlug: "china",
    author: { name: "Wei Lin", handle: "wei.lin" },
    publishedAt: "2026-07-19",
    readMinutes: 7,
    likes: 132,
  },
];

export function getDestination(slug: string) {
  return destinations.find((item) => item.slug === slug);
}

export function getStory(slug: string) {
  return stories.find((item) => item.slug === slug);
}

export function storiesForDestination(slug: string) {
  return stories.filter((item) => item.destinationSlug === slug);
}

export function storyCount(slug: string) {
  return storiesForDestination(slug).length;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const avatarColors = ["#78C8DB", "#5FB58A", "#FCD8B5", "#F4B8A6"];

export function avatarColor(handle: string) {
  const sum = [...handle].reduce((total, char) => total + char.charCodeAt(0), 0);
  return avatarColors[sum % avatarColors.length];
}