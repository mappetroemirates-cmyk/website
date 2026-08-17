import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/ui/social-icons";

const SOCIAL_LINKS = [
  { href: "#", label: "Facebook", icon: FacebookIcon },
  { href: "#", label: "Instagram", icon: InstagramIcon },
  { href: "#", label: "LinkedIn", icon: LinkedinIcon },
  { href: "#", label: "Twitter", icon: TwitterIcon },
];

const OFFICES = [
  {
    city: "Dubai (Head Office)",
    address: "Office 1204, Business Bay Tower, Dubai, UAE",
  },
  {
    city: "Abu Dhabi",
    address: "Office 305, Al Salam Street, Abu Dhabi, UAE",
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-800 bg-neutral-900 text-neutral-300">
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
              Our Offices
            </h3>
            <ul className="mt-4 space-y-4 text-sm">
              {OFFICES.map((office) => (
                <li key={office.city} className="flex gap-2">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-400"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block font-medium text-neutral-200">
                      {office.city}
                    </span>
                    {office.address}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent-400" aria-hidden="true" />
                <a href="tel:+97140000000" className="hover:text-white">
                  +971 4 000 0000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent-400" aria-hidden="true" />
                <a
                  href="mailto:info@mappetroemirates.com"
                  className="hover:text-white"
                >
                  info@mappetroemirates.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6 text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} MAP Petro Emirates. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
