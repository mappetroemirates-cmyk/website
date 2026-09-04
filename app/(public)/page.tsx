import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Briefcase,
  ClipboardCheck,
  Cpu,
  Factory,
  Handshake,
  HardHat,
  HeartPulse,
  Headset,
  Search,
  ShieldCheck,
  Truck,
  UserPlus,
  Send,
  Zap,
} from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconCard } from "@/components/ui/icon-card";
import { JobCard } from "@/components/jobs/job-card";
import { AnnouncementsCarousel } from "@/components/announcements/announcements-carousel";
import { getAnnouncements } from "@/lib/announcements";
import { prisma } from "@/lib/prisma";

const CATEGORIES = [
  {
    icon: Factory,
    label: "Oil & Gas / Engineering",
    image: "/images/category-oil-gas.jpg",
  },
  {
    icon: HardHat,
    label: "Construction & Infrastructure",
    image: "/images/category-construction.jpg",
  },
  {
    icon: Truck,
    label: "Logistics & Supply Chain",
    image: "/images/category-logistics.jpg",
  },
  {
    icon: Briefcase,
    label: "Corporate & Administration",
    image: "/images/category-corporate.jpg",
  },
  {
    icon: HeartPulse,
    label: "Healthcare & Safety",
    image: "/images/category-healthcare.jpg",
  },
  {
    icon: Cpu,
    label: "IT & Technical Support",
    image: "/images/category-it.jpg",
  },
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
  {
    icon: Award,
    title: "Proven Track Record",
    description:
      "Years of experience placing candidates successfully across the region.",
  },
];

const HOW_IT_WORKS = [
  {
    icon: UserPlus,
    title: "Register & Build Profile",
    description: "Create your account and add your experience, skills, and resume.",
  },
  {
    icon: Search,
    title: "Browse & Search Jobs",
    description: "Explore active openings and filter by role, type, or location.",
  },
  {
    icon: Send,
    title: "Apply Online",
    description: "Submit your application to any listing in just a couple of clicks.",
  },
  {
    icon: ClipboardCheck,
    title: "Track Your Application",
    description: "Follow your status from applied through to an offer, in one place.",
  },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredJobs = await prisma.job.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
  const latestAnnouncements = await getAnnouncements(3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/hero-office.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/85 to-primary-800/70" />
        </div>

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
          <h1 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
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

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            {CATEGORIES.map((category, i) => (
              <div
                key={category.label}
                className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-sm"
              >
                <Image
                  src={category.image}
                  alt=""
                  fill
                  priority={i < 3}
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <category.icon
                    className="h-5 w-5 text-accent-400 sm:h-6 sm:w-6"
                    aria-hidden="true"
                  />
                  <h3 className="mt-2 text-sm font-bold leading-snug text-white sm:text-base">
                    {category.label}
                  </h3>
                </div>
              </div>
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

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
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

      {/* How It Works */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Your Journey"
            heading="How It Works"
            align="center"
            description="From registration to your next role — a simple, guided process."
          />

          <div className="relative mt-16">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-8 hidden h-0.5 bg-neutral-200 sm:block"
            />
            <div className="relative grid grid-cols-1 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.title} className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-neutral-50 bg-primary-600 text-white shadow-md">
                    <step.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <span className="mt-3 text-xs font-bold uppercase tracking-widest text-accent-600">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-1 font-semibold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[16rem] text-sm leading-6 text-neutral-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Announcements */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-12">
            <div>
              <SectionHeading
                eyebrow="Stay Updated"
                heading="Latest Announcements"
                description="News, hiring events, and notices from MAP Petro Emirates."
              />
              <LinkButton href="/announcements" variant="outline" className="mt-6">
                View All Announcements
              </LinkButton>
            </div>

            <AnnouncementsCarousel announcements={latestAnnouncements} />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-white py-24">
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          aria-hidden="true"
        >
          <div className="absolute left-[9%] top-[14%] h-20 w-20 -rotate-6 overflow-hidden rounded-full shadow-lg ring-4 ring-white">
            <Image src="/images/avatar-1.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="absolute left-[3%] top-[42%] h-32 w-32 rotate-3 overflow-hidden rounded-full shadow-lg ring-4 ring-white">
            <Image src="/images/avatar-2.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="absolute bottom-[10%] left-[15%] h-16 w-16 rotate-6 overflow-hidden rounded-full shadow-lg ring-4 ring-white">
            <Image src="/images/avatar-3.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="absolute right-[8%] top-[10%] h-20 w-20 rotate-6 overflow-hidden rounded-full shadow-lg ring-4 ring-white">
            <Image src="/images/avatar-4.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="absolute right-[2%] top-[40%] h-32 w-32 -rotate-3 overflow-hidden rounded-full shadow-lg ring-4 ring-white">
            <Image src="/images/avatar-5.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="absolute bottom-[12%] right-[13%] h-16 w-16 -rotate-6 overflow-hidden rounded-full shadow-lg ring-4 ring-white">
            <Image src="/images/avatar-6.jpg" alt="" fill className="object-cover" />
          </div>
        </div>

        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Start your next chapter today
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Create your profile in minutes and start applying to verified
            opportunities today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/register" size="lg">
              Register Now
            </LinkButton>
            <LinkButton href="/jobs" variant="outline" size="lg">
              Browse Jobs
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
