import Image from "next/image";
import { getSiteContent } from "@/lib/site-content";

export const metadata = {
  title: "About Us | MAP Petro Emirates",
};
export const dynamic = "force-dynamic";

const DEFAULT_ABOUT_TEXT =
  "MAP Petro Emirates is an HR recruitment consultancy dedicated to connecting skilled professionals with leading employers. We partner with organizations across a range of industries to source, screen, and place candidates who are the right fit — both technically and culturally.";

const PILLARS = [
  {
    title: "Our Mission",
    description:
      "To simplify hiring for employers and job searching for candidates through a transparent, efficient process — one where every application gets a real review, not a black hole.",
  },
  {
    title: "Our Approach",
    description:
      "Every candidate is reviewed individually, matching experience and skills against real employer requirements rather than keyword-matching a resume against a job title.",
  },
  {
    title: "Our Reach",
    description:
      "We work with employers across multiple sectors and locations throughout the region, from technical field roles to corporate support functions.",
  },
];

// Placeholder figures — replace with the client's confirmed numbers before launch.
const STATS = [
  { value: "10+", label: "Years in Business" },
  { value: "500+", label: "Candidates Placed" },
  { value: "50+", label: "Client Companies" },
  { value: "6", label: "Industries Served" },
];

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <div>
      <header className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-widest text-accent-600">
          About MAP Petro Emirates
        </p>
        <blockquote className="mt-6 border-l-4 border-accent-500 pl-6 sm:pl-8">
          <p className="font-display text-2xl font-medium italic leading-snug tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
            {content.about_us_text ?? DEFAULT_ABOUT_TEXT}
          </p>
        </blockquote>
      </header>

      <div className="relative mt-16 h-[280px] w-full overflow-hidden sm:h-[380px] lg:h-[460px]">
        <Image
          src="/images/about-team.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-12 sm:space-y-14">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.title}
              className="grid grid-cols-1 gap-3 sm:grid-cols-[6rem_1fr] sm:gap-8"
            >
              <span
                className="font-display text-5xl font-semibold text-neutral-200 sm:text-6xl"
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <div className="border-l-2 border-accent-500 pl-5 sm:pl-8">
                <h2 className="font-display text-xl font-semibold text-neutral-900 sm:text-2xl">
                  {pillar.title}
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-7 text-neutral-600">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-primary-900 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-4 py-16 sm:grid-cols-4 sm:gap-y-0 sm:px-6 lg:px-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${i > 0 ? "sm:border-l sm:border-white/10" : ""}`}
            >
              <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary-200 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
