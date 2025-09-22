export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: "GENERATIVE AI" | "WEB3" | "IMMERSIVE EXPERIENCES" | "FILM" | "OTHER";
  image: string;
};

export const projects: Project[] = [
  {
    slug: "axemix-campaign",
    title: "AXEMIX CAMPAIGN",
    summary:
      "Ideated a campaign that became the most visited platform in Persian web history.",
    category: "OTHER",
    image: "https://placehold.co/600x400/EAEAEA/000000?text=.",
  },
  {
    slug: "immersive-retail-experience",
    title: "IMMERSIVE RETAIL EXPERIENCE",
    summary:
      "Architected an IoT installation that boosted customer dwell time by 25%.",
    category: "IMMERSIVE EXPERIENCES",
    image: "https://placehold.co/600x400/EAEAEA/000000?text=.",
  },
  {
    slug: "generative-ai-workflow",
    title: "GENERATIVE AI WORKFLOW",
    summary:
      "Engineered an AI pipeline that reduced project delivery times by 40%.",
    category: "GENERATIVE AI",
    image: "https://placehold.co/600x400/EAEAEA/000000?text=.",
  },
  {
    slug: "howling-animated-film",
    title: '"Howling" Animated Film',
    summary:
      "Directed and produced an award-winning animated short securing 24 international awards.",
    category: "FILM",
    image: "https://placehold.co/600x400/EAEAEA/000000?text=.",
  },
  {
    slug: "nft-smart-contracts",
    title: "NFT Smart Contracts",
    summary:
      "Authored and audited secure Solidity smart contracts for over 80,000 NFTs.",
    category: "WEB3",
    image: "https://placehold.co/600x400/EAEAEA/000000?text=.",
  },
  {
    slug: "hackers-and-painters-platform",
    title: "Hackers and Painters Platform",
    summary:
      "Leading development of a platform to simplify generative art creation for artists.",
    category: "GENERATIVE AI",
    image: "https://placehold.co/600x400/EAEAEA/000000?text=.",
  },
];

export const filters = [
  "ALL",
  "GENERATIVE AI",
  "WEB3",
  "IMMERSIVE EXPERIENCES",
  "FILM",
] as const;


