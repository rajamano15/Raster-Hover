import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";
import { SOLUTION_CATEGORIES, categoryEntryHref } from "@/data/solutions";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Clients", href: "/clients" },
  { label: "Careers", href: "/careers" },
  { label: "Our Team", href: "/team" },
];

const resourceLinks = [
  { label: "News & Events", href: "/news-events" },
  { label: "Downloads", href: "/downloads" },
  { label: "Contact", href: "/contact" },
];

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-[0.72rem] font-semibold tracking-[0.2em] text-faint uppercase">
        {title}
      </h3>
      {children}
    </div>
  );
}

const linkCls =
  "text-[0.875rem] text-mist transition-colors duration-300 hover:text-brand-soft";

export default function Footer() {
  return (
    <footer className="relative mt-8 border-t border-line bg-[rgba(5,9,8,0.65)]">
      <div className="container-site relative">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 sm:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1.1fr_1fr_1.3fr] lg:py-20">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" aria-label="Raster Images — home" className="inline-block">
              <Image
                src="/logo.webp"
                alt="Raster Images"
                width={196}
                height={30}
                className="h-6 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-[0.875rem] leading-relaxed text-mist">
              {SITE.tagline}. Healthcare software and hardware solutions for
              modern clinical environments.
            </p>
          </div>

          <FooterColumn title="Company">
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Solutions">
            <ul className="space-y-2.5">
              {SOLUTION_CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={categoryEntryHref(c)} className={linkCls}>
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/hardware" className={linkCls}>
                  Hardware Products
                </Link>
              </li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Resources">
            <ul className="space-y-2.5">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/request-demo" className={linkCls}>
                  Request a Demo
                </Link>
              </li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact">
            <ul className="space-y-2.5 text-[0.875rem] text-mist">
              <li>Salem, Tamil Nadu, India</li>
              <li>Noida, Delhi, India</li>
              <li>Puchong Selangor, Malaysia</li>
              <li>
                <a href={SITE.phoneHref} className={linkCls}>
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={SITE.emailHref} className={linkCls}>
                  {SITE.email}
                </a>
              </li>
            </ul>
          </FooterColumn>
        </div>

        <div className="hairline" />
        <div className="flex flex-col items-center justify-between gap-3 py-7 sm:flex-row">
          <p className="text-[0.78rem] text-faint">
            © {new Date().getFullYear()} Raster Images. All rights reserved.
          </p>
          <p className="text-[0.78rem] tracking-[0.18em] text-faint uppercase">
            {SITE.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
