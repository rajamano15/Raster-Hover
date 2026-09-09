export type HardwareGroup =
  | "Acquisition"
  | "Production"
  | "Post & Finishing"
  | "Signal & Conversion"
  | "Monitoring & Test"
  | "Storage & Delivery"
  | "Infrastructure";

export type HardwareCategory = {
  slug: string;
  name: string;
  group: HardwareGroup;
  icon: string;
  /** Short descriptor restating the category — no invented specifications. */
  blurb: string;
  /** Real product imagery can be dropped in later; cards fall back to an icon visual. */
  image?: string;
};

/** Identity accent per hardware group — used by the cards and the filter
 *  chips so a group keeps the same colour wherever it appears. */
export const GROUP_ACCENTS: Record<HardwareGroup, string> = {
  Acquisition: "accent-cyan",
  Production: "accent-rose",
  "Post & Finishing": "accent-violet",
  "Signal & Conversion": "accent-sky",
  "Monitoring & Test": "accent-amber",
  "Storage & Delivery": "accent-indigo",
  Infrastructure: "accent-teal",
};

export const HARDWARE_GROUPS: HardwareGroup[] = [
  "Acquisition",
  "Production",
  "Post & Finishing",
  "Signal & Conversion",
  "Monitoring & Test",
  "Storage & Delivery",
  "Infrastructure",
];

export const HARDWARE_CATEGORIES: HardwareCategory[] = [
  {
    slug: "professional-cameras",
    name: "Professional Cameras",
    group: "Acquisition",
    icon: "VideoCamera",
    blurb: "Professional camera systems for clinical and studio environments.",
  },
  {
    slug: "davinci-resolve-fusion",
    name: "DaVinci Resolve & Fusion Software",
    group: "Post & Finishing",
    icon: "FilmSlate",
    blurb: "Editing, colour, VFX and audio post-production software.",
  },
  {
    slug: "atem-switchers",
    name: "ATEM Live Production Switchers",
    group: "Production",
    icon: "SquaresFour",
    blurb: "Live production switching for multi-camera workflows.",
  },
  {
    slug: "ultimatte",
    name: "Ultimatte",
    group: "Production",
    icon: "Selection",
    blurb: "Real-time compositing and keying processors.",
  },
  {
    slug: "duplication",
    name: "Duplication",
    group: "Storage & Delivery",
    icon: "Copy",
    blurb: "Media duplication systems for distribution workflows.",
  },
  {
    slug: "disk-recorders-storage",
    name: "Disk Recorders & Storage",
    group: "Storage & Delivery",
    icon: "HardDrives",
    blurb: "Recording and storage systems for demanding media workflows.",
  },
  {
    slug: "capture-playback",
    name: "Capture & Playback",
    group: "Signal & Conversion",
    icon: "MonitorArrowUp",
    blurb: "Capture and playback devices for video workstations.",
  },
  {
    slug: "cintel-scanner",
    name: "Cintel Scanner",
    group: "Post & Finishing",
    icon: "FilmStrip",
    blurb: "Real-time film scanning for archive and restoration.",
  },
  {
    slug: "standards-conversion",
    name: "Standards Conversion",
    group: "Signal & Conversion",
    icon: "ArrowsLeftRight",
    blurb: "Conversion between broadcast video standards.",
  },
  {
    slug: "broadcast-converters",
    name: "Broadcast Converters",
    group: "Signal & Conversion",
    icon: "Swap",
    blurb: "Signal conversion for broadcast infrastructure.",
  },
  {
    slug: "video-audio-monitoring",
    name: "Video & Audio Monitoring",
    group: "Monitoring & Test",
    icon: "Monitor",
    blurb: "Confidence monitoring for video and audio signals.",
  },
  {
    slug: "test-equipment",
    name: "Test Equipment",
    group: "Monitoring & Test",
    icon: "Gauge",
    blurb: "Signal generation and measurement equipment.",
  },
  {
    slug: "multiview",
    name: "MultiView",
    group: "Monitoring & Test",
    icon: "GridFour",
    blurb: "Multi-source monitoring on a single display.",
  },
  {
    slug: "routing-distribution",
    name: "Routing & Distribution",
    group: "Infrastructure",
    icon: "TreeStructure",
    blurb: "Signal routing and distribution across facilities.",
  },
  {
    slug: "streaming-encoding",
    name: "Streaming & Encoding",
    group: "Storage & Delivery",
    icon: "Broadcast",
    blurb: "Encoding and streaming systems for live delivery.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    group: "Infrastructure",
    icon: "Wrench",
    blurb: "Accessories that support production and clinical AV setups.",
  },
  {
    slug: "cables-adapters",
    name: "Cables & Adapters",
    group: "Infrastructure",
    icon: "Plugs",
    blurb: "Cabling and adapters for reliable interconnection.",
  },
  {
    slug: "servers",
    name: "Servers",
    group: "Infrastructure",
    icon: "HardDrive",
    blurb: "Server hardware for healthcare and imaging workloads.",
  },
];
