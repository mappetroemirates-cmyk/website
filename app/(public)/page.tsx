import Link from "next/link";
import {
  Briefcase,
  Cpu,
  Factory,
  Handshake,
  HardHat,
  HeartPulse,
  Headset,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconCard } from "@/components/ui/icon-card";
import { JobCard } from "@/components/jobs/job-card";
import { AnnouncementCard } from "@/components/announcements/announcement-card";
import { MOCK_ANNOUNCEMENTS } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";

const CATEGORIES = [
  { icon: Factory, label: "Oil & Gas / Engineering" },
  { icon: HardHat, label: "Construction & Infrastructure" },
  { icon: Truck, label: "Logistics & Supply Chain" },
  { icon: Briefcase, label: "Corporate & Administration" },
  { icon: HeartPulse, label: "Healthcare & Safety" },
  { icon: Cpu, label: "IT & Technical Support" },
];

const VALUE_PROPS = [
  {
    icon: Handshake,
    title: "Trusted Network",
    description:
      "Long-standing relationships with leading employers across the region.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Streamlined screening gets qualified candidates in front of employers quickly.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Employers",
    description: "Every listing is checked before it reaches our candidates.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description:
      "Our consultants stay involved with you from application through to offer.",
  },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredJobs = await prisma.job.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
  const latestAnnouncements = MOCK_ANNOUNCEMENTS.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-primary-400/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-accent-300">
            MAP Petro Emirates &middot; HR Recruitment Consultancy
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Connecting great talent with great careers
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-100">
            Search our latest openings, build your candidate profile, and
            apply online in minutes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/jobs" variant="secondary" size="lg">
              Browse Jobs
            </LinkButton>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Career Opportunities"
            heading="Current Openings"
            description="A snapshot of active roles our clients are hiring for right now."
          />
          <LinkButton href="/jobs" variant="outline">
            View All Jobs
          </LinkButton>
        </div>

        {featuredJobs.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-neutral-300 bg-white p-10 text-center text-neutral-500">
            No open positions right now — check back soon.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

      {/* Who We Recruit For */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Industries We Serve"
            heading="Who We Recruit For"
            align="center"
            description="From technical field roles to corporate support functions, we place candidates across a wide range of sectors."
          />

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((category) => (
              <IconCard
                key={category.label}
                icon={category.icon}
                title={category.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why MAP Petro Emirates"
          heading="Why Choose Us"
          align="center"
          description="A recruitment partner candidates and employers trust to get it right."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((item) => (
            <IconCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* Latest Announcements */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Stay Updated"
              heading="Latest Announcements"
              description="News, hiring events, and notices from MAP Petro Emirates."
            />
            <LinkButton href="/announcements" variant="outline">
              View All Announcements
            </LinkButton>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
