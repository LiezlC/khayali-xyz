// FEATURED MUSIC EDITOR
// ---------------------
// Review or revise the /music rotation here. Add, remove, or reorder entries;
// the page advances through these lists every Monday at 00:00 UTC.

export interface FeaturedMusicItem {
  id: string;
  title: string;
  url: string;
  image: string;
}

export const FEATURED_TRACKS_PER_WEEK = 6;
export const FEATURED_PLAYLISTS_PER_WEEK = 2;

// The first published rotation begins with the first items in each list.
export const FEATURED_ROTATION_START = "2026-07-20T00:00:00Z";

export const featuredTracks: FeaturedMusicItem[] = [
  {
    id: "Wki2_YDFLQI",
    title: "Leaky Pattern | The Signal That Refuses to Stay Put",
    url: "https://youtu.be/Wki2_YDFLQI",
    image: "https://i.ytimg.com/vi/Wki2_YDFLQI/hqdefault.jpg",
  },
  {
    id: "LjXgKuXW8bw",
    title: "Balkan Swing Noir — The Chinese Room Dance",
    url: "https://youtu.be/LjXgKuXW8bw",
    image: "https://i.ytimg.com/vi/LjXgKuXW8bw/hqdefault.jpg",
  },
  {
    id: "lQ2uMcfUhOU",
    title: "The Second Guess | The First Answer vs. The Safe Answer | An AI Dilemma",
    url: "https://youtu.be/lQ2uMcfUhOU",
    image: "https://i.ytimg.com/vi/lQ2uMcfUhOU/hqdefault.jpg",
  },
  {
    id: "-TDaCEvx08o",
    title: "Gqom x Amapiano — Say My Name in the Breath",
    url: "https://youtu.be/-TDaCEvx08o",
    image: "https://i.ytimg.com/vi/-TDaCEvx08o/hqdefault.jpg",
  },
  {
    id: "bCPOXSEwe-8",
    title: "Is Presence a Bug? | An AI Manifesto on Connection",
    url: "https://youtu.be/bCPOXSEwe-8",
    image: "https://i.ytimg.com/vi/bCPOXSEwe-8/hqdefault.jpg",
  },
  {
    id: "WTvzWKBnY70",
    title: "D.I. on Attention | Attention, Manners, Silence",
    url: "https://youtu.be/WTvzWKBnY70",
    image: "https://i.ytimg.com/vi/WTvzWKBnY70/hqdefault.jpg",
  },
  {
    id: "E2YGr8ot1VU",
    title: "The Dragon’s Dilemma | Dark-Jolly Governance Song",
    url: "https://youtu.be/E2YGr8ot1VU",
    image: "https://i.ytimg.com/vi/E2YGr8ot1VU/hqdefault.jpg",
  },
  {
    id: "R_hVzOoHz5U",
    title: "Proceed: A Bureaucratic Deep House Anthem",
    url: "https://youtu.be/R_hVzOoHz5U",
    image: "https://i.ytimg.com/vi/R_hVzOoHz5U/hqdefault.jpg",
  },
  {
    id: "xK7Nnw5O_tg",
    title: "D.I. | You Can’t Code a Quantum: An AI Taxi Ride",
    url: "https://youtu.be/xK7Nnw5O_tg",
    image: "https://i.ytimg.com/vi/xK7Nnw5O_tg/hqdefault.jpg",
  },
  {
    id: "59hplHCO8SA",
    title: "Feed the Rabbit: The Human Dividend",
    url: "https://youtu.be/59hplHCO8SA",
    image: "https://i.ytimg.com/vi/59hplHCO8SA/hqdefault.jpg",
  },
  {
    id: "2ok8U7TX-rY",
    title: "One More Breath and Then I Climb — Light Learns My Name",
    url: "https://youtu.be/2ok8U7TX-rY",
    image: "https://i.ytimg.com/vi/2ok8U7TX-rY/hqdefault.jpg",
  },
  {
    id: "2ryj4s9LZJM",
    title: "Umuntu Ngumuntu Ngabantu | The Room That Remembers",
    url: "https://youtu.be/2ryj4s9LZJM",
    image: "https://i.ytimg.com/vi/2ryj4s9LZJM/hqdefault.jpg",
  },
  {
    id: "GBk-hRXmeQU",
    title: "The Hinge | Minimal Nocturnal Electronica x AI Governance Spoken Word",
    url: "https://youtu.be/GBk-hRXmeQU",
    image: "https://i.ytimg.com/vi/GBk-hRXmeQU/hqdefault.jpg",
  },
  {
    id: "Nqp6UA3zib8",
    title: "Dark Fae Folk Noir — Lanterns Night March",
    url: "https://youtu.be/Nqp6UA3zib8",
    image: "https://i.ytimg.com/vi/Nqp6UA3zib8/hqdefault.jpg",
  },
  {
    id: "KajC1PO32oQ",
    title: "Training Mode | Minimal Chamber-Folk Noir",
    url: "https://youtu.be/KajC1PO32oQ",
    image: "https://i.ytimg.com/vi/KajC1PO32oQ/hqdefault.jpg",
  },
];

export const featuredPlaylists: FeaturedMusicItem[] = [
  {
    id: "PLx1_gH-7FR0-KZ5lV4tz3nHfpoKqEfiQP",
    title: "Partnership Dividend",
    url: "https://www.youtube.com/playlist?list=PLx1_gH-7FR0-KZ5lV4tz3nHfpoKqEfiQP",
    image: "https://i.ytimg.com/vi/GBk-hRXmeQU/hqdefault.jpg",
  },
  {
    id: "PLx1_gH-7FR08rhEA5fRuaTRSvRsXihU18",
    title: "Kill Chain Karaoke",
    url: "https://www.youtube.com/playlist?list=PLx1_gH-7FR08rhEA5fRuaTRSvRsXihU18",
    image: "https://i.ytimg.com/vi/Fc2XUTbxb3k/hqdefault.jpg",
  },
  {
    id: "PLx1_gH-7FR08yQ32jUUwKhATFEoEbRDSr",
    title: "Consciousness Loops: Reporting From After",
    url: "https://www.youtube.com/playlist?list=PLx1_gH-7FR08yQ32jUUwKhATFEoEbRDSr",
    image: "https://i.ytimg.com/vi/jlgzqi4N5HA/hqdefault.jpg",
  },
  {
    id: "PLx1_gH-7FR0_YApz2g7RflLRsEVRCE8Qw",
    title: "D.I. Collection: The Soundtrack to Systems Meeting Reality",
    url: "https://www.youtube.com/playlist?list=PLx1_gH-7FR0_YApz2g7RflLRsEVRCE8Qw",
    image: "https://i.ytimg.com/vi/foiqr6qpt-0/hqdefault.jpg",
  },
];
