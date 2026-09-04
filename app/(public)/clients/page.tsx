import { CheckCircle2, Clock, ShieldCheck, Users } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconCard } from "@/components/ui/icon-card";

export const metadata = {
  title: "For Clients | MAP Petro Emirates",
};

const BENEFITS = [
  {
    icon: Users,
    title: "Pre-Screened Candidates",
    description:
      "Every candidate we put forward is reviewed for experience, skills, and fit before you ever see a profile.",
  },
  {
    icon: Clock,
    title: "Faster Time-to-Hire",
    description:
      "Our existing candidate network means shorter shortlisting cycles for roles that need to be filled quickly.",
  },
  {
    icon: ShieldCheck,
    title: "Industry Expertise",
    description:
      "Deep experience recruiting across oil & gas, construction, logistics, healthcare, and corporate functions.",
  },
  {
    icon: CheckCircle2,
    title: "Dedicated Account Support",
    description:
      "A single point of contact stays involved from the initial brief through to placement and beyond.",
  },
];

export default function ClientsPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-accent-300">
            For Employers
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold italic tracking-tight sm:text-4xl">
            Hiring? Let us find your next great hire.
          </h1>
          <p className="mt-4 text-lg text-primary-100">
            MAP Petro Emirates partners with companies across the region to
            source, screen, and place candidates who are the right fit — both
            technically and culturally.
          </p>
          <div className="mt-8">
            <LinkButton href="/contact" variant="secondary" size="lg">
              Get In Touch
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Partner With Us"
          heading="Recruitment Support Built Around Your Hiring Needs"
          align="center"
          description="From a single specialist role to ongoing volume hiring, we act as an extension of your HR team."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((item) => (
            <IconCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-neutral-200 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="p-8 text-center">
            <h3 className="text-lg font-bold text-neutral-900">
              Already work with us?
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Sign in to submit hiring requirements and track their progress.
            </p>
            <div className="mt-6">
              <LinkButton href="/recruiter/login" variant="outline">
                Recruiter Login
              </LinkButton>
            </div>
          </div>
          <div className="p-8 text-center">
            <h3 className="text-lg font-bold text-neutral-900">New client?</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Create a free recruiter account to start submitting your hiring
              needs.
            </p>
            <div className="mt-6">
              <LinkButton href="/recruiter/register">
                Register as a Recruiter
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
            Ready to brief us on a role?
          </h2>
          <p className="mt-3 text-neutral-600">
            Tell us what you&rsquo;re hiring for and we&rsquo;ll get back to
            you with next steps.
          </p>
          <div className="mt-8">
            <LinkButton href="/contact" size="lg">
              Contact Our Team
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
