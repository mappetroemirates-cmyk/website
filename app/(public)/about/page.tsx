import { getSiteContent } from "@/lib/site-content";

export const metadata = {
  title: "About Us | MAP Petro Emirates",
};
export const dynamic = "force-dynamic";

const DEFAULT_ABOUT_TEXT =
  "MAP Petro Emirates is an HR recruitment consultancy dedicated to connecting skilled professionals with leading employers. We partner with organizations across a range of industries to source, screen, and place candidates who are the right fit — both technically and culturally.";

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900">About Us</h1>
      <p className="mt-4 text-slate-600">
        {content.about_us_text ?? DEFAULT_ABOUT_TEXT}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">Our Mission</h2>
          <p className="mt-2 text-sm text-slate-600">
            To simplify hiring for employers and job searching for candidates
            through a transparent, efficient process.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">Our Approach</h2>
          <p className="mt-2 text-sm text-slate-600">
            Every candidate is reviewed individually, matching experience and
            skills against real employer requirements.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">Our Reach</h2>
          <p className="mt-2 text-sm text-slate-600">
            We work with employers across multiple sectors and locations
            throughout the region.
          </p>
        </div>
      </div>
    </div>
  );
}
