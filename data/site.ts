export const SITE = {
  name: "Raster Images",
  tagline: "Revolutionizing Digital Healthcare",
  url: "https://www.raster.in",
  phone: "+91 427 4033100",
  phoneHref: "tel:+914274033100",
  email: "Info@raster.in",
  emailHref: "mailto:Info@raster.in",
  description:
    "Raster Images provides healthcare software and hardware solutions — PACS, RIS, teleradiology, hospital management, EMR, lab information systems, IoMT interfacing and professional hardware for modern healthcare environments.",
} as const;

export type NavLink = { label: string; href: string };

export type MainNavItem = {
  label: string;
  /** Absent on items that open a menu instead of navigating. */
  href?: string;
  /** Renders the Healthcare Solutions mega menu rather than a link. */
  mega?: boolean;
};

export const UTILITY_NAV: NavLink[] = [
  { label: "News & Events", href: "/news-events" },
  { label: "Clients", href: "/clients" },
  { label: "Careers", href: "/careers" },
  { label: "Our Team", href: "/team" },
  { label: "Downloads", href: "/downloads" },
];

export const MAIN_NAV: MainNavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Healthcare Solutions", mega: true },
  { label: "Hardware Products", href: "/hardware" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export type Office = {
  id: string;
  label: string;
  lines: string[];
  country: "India" | "Malaysia";
};

export const OFFICES: Office[] = [
  {
    id: "head",
    label: "Head Office — Salem",
    lines: [
      "2nd & 3rd Floor, AKM Complex",
      "No. 29, Brindavan Road",
      "4th Cross, Kailash Nagar, Fairlands",
      "Salem - 636016, Tamil Nadu, India",
    ],
    country: "India",
  },
  {
    id: "registered",
    label: "Registered Office — Salem",
    lines: ["54, Brindavan Road", "Alagapuram", "Salem - 636004, Tamil Nadu, India"],
    country: "India",
  },
  {
    id: "noida",
    label: "Branch Office — Noida",
    lines: ["F-21, Second Floor", "Sector 12", "Noida - 201 301, Delhi, India"],
    country: "India",
  },
  {
    id: "malaysia",
    label: "Branch Office — Malaysia",
    lines: [
      "No: 37 Jalan BP 7/12",
      "Bandar Bukit",
      "47120 Puchong Selangor, Malaysia",
    ],
    country: "Malaysia",
  },
];

export const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15629.331768890508!2d78.1439058!3d11.6707999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4538c72dfcdace14!2sRaster%20Images%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1585544446967!5m2!1sen!2sin";
