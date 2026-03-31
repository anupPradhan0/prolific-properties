import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const upsertMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const title = "Contact Prolific Properties | Property Consultation";
    const description =
      "Contact Prolific Properties for buying, renting, or commercial property support in Bhubaneswar. Share your requirements and our advisors will reach out.";
    const canonicalUrl = `${window.location.origin}/contact`;

    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", "index,follow");
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertCanonical(canonicalUrl);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container max-w-5xl">
        <Link to="/" className="inline-flex rounded-full border border-primary/20 bg-surface px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft">
          Back to Home
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <section>
            <span className="section-label">Contact Support</span>
            <h1 className="text-[clamp(2.2rem,5vw,4rem)] leading-tight text-foreground">Contact Our Property Team</h1>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Share your preferences and our advisors will guide you with suitable listings, budget-fit options, and site visit support across Bhubaneswar.
            </p>

            <div className="mt-8 space-y-4 rounded-[24px] border border-border bg-gradient-panel p-6 shadow-panel">
              <div className="rounded-2xl border border-primary/10 bg-surface px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Call</p>
                <a href="tel:+919999999999" className="mt-1 block text-base font-semibold text-foreground hover:text-primary">
                  +91 99999 99999
                </a>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-surface px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Email</p>
                <a href="mailto:support@prolificproperties.in" className="mt-1 block text-base font-semibold text-foreground hover:text-primary">
                  support@prolificproperties.in
                </a>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-surface px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Office</p>
                <p className="mt-1 text-sm text-muted-foreground">Bhubaneswar, Odisha, India</p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] bg-gradient-brand p-[1px] shadow-soft">
            <div className="rounded-[27px] bg-surface p-6 md:p-8">
              <h2 className="text-3xl leading-tight text-foreground">Tell us what you need</h2>
              <p className="mt-2 text-sm text-muted-foreground">Fields marked with * are required.</p>

              {submitted && (
                <div className="mt-5 rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success">
                  Thanks. We received your request and will contact you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-foreground">
                      Full name *
                    </label>
                    <Input id="fullName" name="fullName" required placeholder="Your full name" className="bg-surface" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-foreground">
                      Phone *
                    </label>
                    <Input id="phone" name="phone" type="tel" required placeholder="Your phone number" className="bg-surface" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
                    Email *
                  </label>
                  <Input id="email" name="email" type="email" required placeholder="you@example.com" className="bg-surface" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="interest" className="mb-2 block text-sm font-semibold text-foreground">
                      Interested in *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      className="flex h-12 w-full appearance-none rounded-2xl border border-input bg-surface px-4 py-3 text-sm text-foreground transition-[border-color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      <option value="buy">Buy</option>
                      <option value="rent">Rent</option>
                      <option value="commercial">Commercial</option>
                      <option value="investment">Investment</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="mb-2 block text-sm font-semibold text-foreground">
                      Budget range
                    </label>
                    <Input id="budget" name="budget" placeholder="e.g. ₹80L - ₹1.2Cr" className="bg-surface" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    className="min-h-[130px] rounded-2xl border-input bg-surface px-4 py-3"
                    placeholder="Share preferred location, property type, and timeline."
                  />
                </div>

                <div className="rounded-2xl border border-border bg-surface-strong px-4 py-3">
                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <label htmlFor="consent" className="text-sm leading-6 text-muted-foreground">
                      I agree to be contacted by Prolific Properties regarding listings and consultation support.
                    </label>
                  </div>
                </div>

                <Button type="submit" size="xl" className="w-full">
                  Submit enquiry
                </Button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Contact;
