/**
 * Content that must never be fabricated lives here as typed, empty
 * collections. Drop real entries in and the pages render them
 * automatically; until then the pages show elegant empty states.
 */

export type NewsItem = {
  id: string;
  title: string;
  kind: "News" | "Event";
  date: string; // ISO date
  location?: string;
  description: string;
  image?: string;
  href?: string;
};

export const NEWS_ITEMS: NewsItem[] = [];

export type JobOpening = {
  id: string;
  title: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  description: string;
  applyHref?: string;
};

export const OPEN_POSITIONS: JobOpening[] = [];

export type TeamMember = {
  id: string;
  name: string;
  position: string;
  photo?: string;
  bio?: string;
  linkedin?: string;
};

export const TEAM_MEMBERS: TeamMember[] = [];

export type ClientLogo = {
  id: string;
  name: string;
  logo: string; // path under /public
  href?: string;
};

export const CLIENT_LOGOS: ClientLogo[] = [];

export type DownloadItem = {
  id: string;
  title: string;
  file: string; // path under /public
  size?: string;
};

export type DownloadCategory = {
  id: string;
  name: string;
  description: string;
  icon: "brochure" | "software" | "hardware" | "company";
  items: DownloadItem[];
};

export const DOWNLOAD_CATEGORIES: DownloadCategory[] = [
  {
    id: "brochures",
    name: "Product Brochures",
    description: "Printable overviews of our healthcare software and hardware.",
    icon: "brochure",
    items: [],
  },
  {
    id: "software-docs",
    name: "Software Documentation",
    description: "Guides and documentation for our software solutions.",
    icon: "software",
    items: [],
  },
  {
    id: "hardware-docs",
    name: "Hardware Documentation",
    description: "Reference material for supported hardware products.",
    icon: "hardware",
    items: [],
  },
  {
    id: "company",
    name: "Company Information",
    description: "Company profile and general information.",
    icon: "company",
    items: [],
  },
];
