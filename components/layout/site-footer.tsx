import Link from "next/link";
import Image from "next/image";
import { Headset, Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/ui/social-icons";
import { getSiteContent } from "@/lib/site-content";

const SOCIAL_LINKS = [
  { href: "#", label: "Facebook", icon: FacebookIcon },
  { href: "#", label: "Instagram", icon: InstagramIcon },
  { href: "#", label: "LinkedIn", icon: LinkedinIcon },
  { href: "#", label: "Twitter", icon: TwitterIcon },
];

export async function SiteFooter() {
  const content = await getSiteContent();
  const phone = content.contact_phone ?? "+971 4 000 0000";
  const email = content.contact_email ?? "info@mappetroemirates.com";
  const address = content.contact_address ?? "Dubai, United Arab Emirates";

  return (
    <footer className="mt-auto">
      {/* CTA band */}
      <div className="relative overflow-hidden bg-accent-500">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 left-1/4 h-64 w-64 rounded-full bg-white/10"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-md">
            <Image
              src="/logo-icon.png"
              alt=""
              width={540}
              height={458}
              className="h-full w-full object-contain"
            />
          </span>
          <h2 className="mt-5 font-display text-2xl font-semibold italic tracking-tight text-white sm:text-3xl">
            Whether you&rsquo;re hiring or hired, we can help
          </h2>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-accent-700 shadow-sm transition-colors hover:bg-neutral-100"
            >
              I&rsquo;m Looking for a Job
            </Link>
            <Link
              href="/clients"
              className="inline-flex items-center justify-center rounded-md border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              I&rsquo;m Looking to Hire
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800 bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white p-1">
                <Image
                  src="/logo-icon.png"
                  alt="MAP Petro Emirates"
                  width={540}
                  height={458}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-lg font-bold text-white">
                MAP Petro Emirates
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-neutral-400">
              HR recruitment consultancy connecting skilled talent with
              leading employers across the region.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 transition-colors hover:bg-accent-500 hover:text-neutral-900"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-white">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="hover:text-white">
                  Announcements
                </Link>
              </li>
              <li>
                <Link href="/clients" className="hover:text-white">
                  For Clients
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Our Office
            </h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-2">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent-400"
                  aria-hidden="true"
                />
                <span>{address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Get in Touch
            </h3>
            <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-800/60 p-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-700 text-accent-400">
                  <Headset className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold text-white">
                  Need help? Reach out anytime.
                </p>
              </div>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-accent-400" aria-hidden="true" />
                  <a
                    href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                    className="hover:text-white"
                  >
                    {phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-accent-400" aria-hidden="true" />
                  <a href={`mailto:${email}`} className="hover:text-white">
                    {email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8 text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} MAP Petro Emirates. All rights
          reserved.
        </div>
      </div>
      </div>
    </footer>
  );
}
