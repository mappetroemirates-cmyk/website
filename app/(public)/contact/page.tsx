export const metadata = {
  title: "Contact Us | MAP Petro Emirates",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900">Contact Us</h1>
      <p className="mt-2 text-slate-600">
        Have a question about a role or your application? Get in touch.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              rows={4}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="How can we help?"
            />
          </div>
          <button
            type="button"
            className="w-full rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            Send Message
          </button>
          <p className="text-xs text-slate-400">
            This form is a placeholder and is not yet wired to send messages.
          </p>
        </form>

        <div className="space-y-4 text-sm text-slate-600">
          <div>
            <h2 className="font-semibold text-slate-900">Office</h2>
            <p>Dubai, United Arab Emirates</p>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Email</h2>
            <p>info@mappetroemirates.com</p>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Phone</h2>
            <p>+971 4 000 0000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
