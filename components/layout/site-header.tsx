"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/jobs", label: "Jobs" },
  { href: "/announcements", label: "Announcements" },
  { href: "/clients", label: "For Clients" },
  { href: "/recruiter/login", label: "Recruiter Login" },
  { href: "/contact", label: "Contact" },
];

function AccountMenu({
  label,
  dashboardHref,
  settingsHref,
}: {
  label: string;
  dashboardHref: string;
  settingsHref: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Account menu"
        className="flex items-center gap-2 rounded-full border border-neutral-300 py-1.5 pl-1.5 pr-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-700">
          <User className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="hidden sm:inline">{label}</span>
        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-12 z-20 w-56 rounded-lg border border-neutral-200 bg-white p-1.5 shadow-lg">
            <Link
              href={dashboardHref}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              Dashboard
            </Link>
            <Link
              href={settingsHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
              Account Settings
            </Link>
            <div className="my-1 border-t border-neutral-100" />
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isCandidate = session?.user?.role === "candidate";
  const isRecruiter = session?.user?.role === "recruiter";

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo-full.png"
            alt="MAP Petro Emirates"
            width={1806}
            height={458}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary-50 text-primary-700"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {status === "authenticated" && isCandidate ? (
            <AccountMenu
              label="My Account"
              dashboardHref="/dashboard"
              settingsHref="/dashboard/settings"
            />
          ) : status === "authenticated" && isRecruiter ? (
            <AccountMenu
              label="My Account"
              dashboardHref="/recruiter/dashboard"
              settingsHref="/recruiter/dashboard/settings"
            />
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
