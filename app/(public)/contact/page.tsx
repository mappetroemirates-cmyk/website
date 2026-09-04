import { getSiteContent } from "@/lib/site-content";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata = {
  title: "Contact Us | MAP Petro Emirates",
};
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const content = await getSiteContent();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-slate-900">Contact Us</h1>
      <p className="mt-2 text-slate-600">
        Have a question about a role or your application? Get in touch.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <ContactForm />

        <div className="space-y-4 text-sm text-slate-600">
          <div>
            <h2 className="font-semibold text-slate-900">Office</h2>
            <p>{content.contact_address ?? "Dubai, United Arab Emirates"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Email</h2>
            <p>{content.contact_email ?? "info@mappetroemirates.com"}</p>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Phone</h2>
            <p>{content.contact_phone ?? "+971 4 000 0000"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
