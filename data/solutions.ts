/** Icon key for a product. Mapped to a Phosphor glyph + a motion preset in
 *  `components/solutions/ProductIcon.tsx`. */
export type ProductIcon =
  | "images"
  | "clipboard"
  | "broadcast"
  | "disc"
  | "camera"
  | "hospital"
  | "pill"
  | "drop"
  | "file"
  | "flask"
  | "baby"
  | "package"
  | "microscope"
  | "wifi"
  | "chart"
  | "video"
  | "stethoscope"
  | "id-card";

/** Long-form content for a product's own page. Every section is optional; the
 *  page renders only what is present, so a product with no authored copy still
 *  produces a valid page rather than an invented one. */
export type ProductPage = {
  /** Formal title used as the page H1, e.g. "Picture Archiving & Communication System". */
  title: string;
  /** Body paragraphs, in order. */
  intro: string[];
  diagram?: { src: string; alt: string; caption?: string };
  benefits?: { heading: string; items: string[] };
  features?: { heading: string; items: string[] };
};

export type SolutionProduct = {
  name: string;
  /** URL segment under the category, e.g. /solutions/radiology/pacs */
  slug: string;
  /** Optional external product page (existing raster.in pages). */
  href?: string;
  /** Short descriptor that restates the product name — no invented specifications. */
  blurb: string;
  icon: ProductIcon;
  page?: ProductPage;
};

export type SolutionCategory = {
  slug: string;
  name: string;
  shortName: string;
  icon: "scan" | "hospital" | "plugs" | "monitor-play";
  /** Identity accent class, applied wherever this category is represented. */
  accent: "accent-sky" | "accent-teal" | "accent-violet" | "accent-amber";
  tagline: string;
  description: string;
  products: SolutionProduct[];
};

export const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    slug: "radiology",
    accent: "accent-sky",
    name: "Radiology",
    shortName: "Radiology",
    icon: "scan",
    tagline: "Imaging, archiving and reporting for radiology departments.",
    description:
      "Software built around the radiology workflow — from image acquisition and archiving to reporting and remote reading.",
    products: [
      {
        name: "PACS",
        slug: "pacs",
        icon: "images",
        href: "https://www.raster.in/pacs.php",
        blurb:
          "Picture archiving and communication system for medical imaging.",
        page: {
          title: "Picture Archiving & Communication System",
          intro: [
            'If a hospital is to thrive in the health-care marketplace of the future, they have to put a premium on IT investment. Image archives/data storage is increasingly going to be a "must-have." While putting fully operational electronic health records and PACS Enterprise Archives in place remains the top priority for the hospital, adopting a corresponding strategy for management of these systems is an issue to be addressed. Images make up a critical part of the diagnosis process. A comprehensive image exchange reduces administrative workload and enables faster treatment.',
            "The data storage system is the heart of the PACS system. A reliable data storage system with a large capacity, which provides immediate access to the entire imaging archive with minimal operator intervention forms the foundation of PACS installation.",
            "With Raster iPACS, radiologists complete procedures faster, saving time with image access and high-performance loading. Delivering rapid loading of images, Raster iPACS helps to enhance your workflow. Raster iPACS features a variety of applications to master a broad range of clinical challenges and can be tailored to suit your personal preferences.",
            "Easy to service through low implementation efforts and high remote serviceability. The modular, scalable design of Raster iPACS opens up new possibilities for integration and future growth. With Raster iPACS, protect your investment and save cost through reusing your infrastructure. By deploying Raster iPACS in conjunction with other Raster products and any imaging hardware, you benefit from a single-vendor solution of the highest quality.",
          ],
          benefits: {
            heading: "Benefits For Radiologist",
            items: [
              "Complete procedures faster, saving time",
              "Fast image access with high loading performance",
              "Quick and easy access to image mark-ups",
              "Robust and intuitive user interface",
              "Personalised tools and display layouts to match individual preferences",
              "Full reading capability through complete feature set, including advanced applications",
              "Low-bandwidth caching and work-list features for off-site comfort with \u201Con-site\u201D performance",
              "Comprehensive work-list filtering including RIS",
            ],
          },
          features: {
            heading: "Salient Features",
            items: [
              "DICOM Standards",
              "Vendor Neutral Archive",
              "Interoperable",
              "HL7 Integration",
              "Scalability",
              "Single vendor RIS/PACS Solution",
              "Linux based server",
              "Cross platform solution: works on Linux / Windows / Mac OS",
              "Zero footprint viewer",
              "Support for DAS / SAN / NAS Storage",
              "Non-Proprietary lossless compression",
              "Audit Log",
              "Multi-monitor support",
              "Non-DICOM to DICOM Conversion",
              "MPPS",
              "Report template designer",
              "Voice recording & Transcription",
              "MIS reports",
              "3rd Party system integration",
              "Mobile Access",
              "Teleradiology",
              "ECG Waveforms",
              "Support for Ophthalmology",
              "And much more",
            ],
          },
        },
      },
      {
        name: "RIS",
        slug: "ris",
        icon: "clipboard",
        href: "https://www.raster.in/ris.php",
        blurb: "Radiology information system for scheduling and reporting.",
      },
      {
        name: "Teleradiology",
        slug: "teleradiology",
        icon: "broadcast",
        blurb: "Remote reading and reporting of radiology studies.",
      },
      {
        name: "DICOM Burner",
        slug: "dicom-burner",
        icon: "disc",
        blurb: "Patient CD/DVD publishing for DICOM studies.",
      },
      {
        name: "DICOM Camera",
        slug: "dicom-camera",
        icon: "camera",
        blurb: "Capture of clinical images into DICOM workflows.",
      },
    ],
  },
  {
    slug: "hospital-management",
    accent: "accent-teal",
    name: "Hospital Management",
    shortName: "Hospital Mgmt",
    icon: "hospital",
    tagline: "Information systems for hospital-wide operations.",
    description:
      "Applications that manage clinical and operational information across departments — from the pharmacy and blood bank to the laboratory and patient records.",
    products: [
      {
        name: "IHMS",
        slug: "ihms",
        icon: "hospital",
        blurb: "Integrated hospital management system.",
      },
      {
        name: "Pharmacy Management",
        slug: "pharmacy-management",
        icon: "pill",
        blurb: "Management of hospital pharmacy operations.",
      },
      {
        name: "Blood Bank Management",
        slug: "blood-bank-management",
        icon: "drop",
        blurb: "Management of blood bank operations and records.",
      },
      {
        name: "EMR",
        slug: "emr",
        icon: "file",
        blurb: "Electronic medical records.",
      },
      {
        name: "Lab Information System",
        slug: "lab-information-system",
        icon: "flask",
        blurb: "Information management for diagnostic laboratories.",
      },
      {
        name: "Neopead EMR & Charting",
        slug: "neopead-emr-charting",
        icon: "baby",
        blurb: "EMR and charting application.",
      },
      {
        name: "Asset Management",
        slug: "asset-management",
        icon: "package",
        blurb: "Tracking and management of hospital assets.",
      },
    ],
  },
  {
    slug: "interfacing-applications",
    accent: "accent-violet",
    name: "Interfacing Applications",
    shortName: "Interfacing",
    icon: "plugs",
    tagline: "Connecting medical devices, equipment and clinical systems.",
    description:
      "Interfacing software that connects lab equipment, medical devices and clinical applications so data flows where it is needed.",
    products: [
      {
        name: "Lab Equipment Interfacing",
        slug: "lab-equipment-interfacing",
        icon: "microscope",
        blurb: "Connecting laboratory analysers with information systems.",
      },
      {
        name: "IoMT & Interfacing",
        slug: "iomt-interfacing",
        icon: "wifi",
        blurb: "Internet of Medical Things device connectivity.",
      },
      {
        name: "Electronic Charting",
        slug: "electronic-charting",
        icon: "chart",
        blurb: "Electronic capture of clinical charting data.",
      },
    ],
  },
  {
    slug: "other-applications",
    accent: "accent-amber",
    name: "Other Healthcare Applications",
    shortName: "Other Applications",
    icon: "monitor-play",
    tagline: "Specialised applications for clinical environments.",
    description:
      "Purpose-built applications that extend digital workflows into the operating theatre, remote consultation and patient identification.",
    products: [
      {
        name: "OT - Video Broadcasting",
        slug: "ot-video-broadcasting",
        icon: "video",
        blurb: "Video broadcasting for operating theatres.",
      },
      {
        name: "Telemedicine",
        slug: "telemedicine",
        icon: "stethoscope",
        blurb: "Remote consultation between patients and clinicians.",
      },
      {
        name: "Patient ID Wristbands",
        slug: "patient-id-wristbands",
        icon: "id-card",
        blurb: "Patient identification wristband solutions.",
      },
    ],
  },
];

export const getSolutionBySlug = (slug: string) =>
  SOLUTION_CATEGORIES.find((c) => c.slug === slug);

/** Every product, paired with the category it belongs to. */
export const ALL_PRODUCTS = SOLUTION_CATEGORIES.flatMap((category) =>
  category.products.map((product) => ({ category, product })),
);

/**
 * Landing product for a category. The category index pages were removed, so
 * anywhere a category still needs a destination (footer, cross-links) it leads
 * to its first product rather than a dead URL.
 */
export const categoryEntryHref = (category: SolutionCategory) =>
  `/solutions/${category.slug}/${category.products[0].slug}`;

export const getProduct = (categorySlug: string, productSlug: string) =>
  ALL_PRODUCTS.find(
    ({ category, product }) =>
      category.slug === categorySlug && product.slug === productSlug,
  );
