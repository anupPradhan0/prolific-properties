"use client";

import { FormEvent, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTAStrip from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const data = {
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      interest: formData.get("interest"),
      budget: formData.get("budget"),
      message: formData.get("message"),
      consent: formData.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      setSubmitted(true);
      formRef.current?.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell min-h-screen bg-background">
      <Navbar />
      <main className="py-12">
      <div className="container max-w-5xl">
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <section>
            <span className="section-label">Contact Support</span>
            <h1 className="text-[clamp(2.2rem,5vw,4rem)] leading-tight text-foreground">Contact Our Property Team</h1>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Share your preferences and our advisors will guide you with suitable listings, budget-fit options, and site visit support across Bhubaneswar.
            </p>

            <h2 className="mt-8 text-3xl leading-tight text-foreground">Contact Details</h2>
            <div className="mt-8 space-y-4 rounded-[24px] border border-border bg-gradient-panel p-6 shadow-panel">
              <div className="rounded-2xl border border-primary/10 bg-surface px-4 py-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Call</h3>
                <a href="tel:+919999999999" className="mt-1 block text-base font-semibold text-foreground hover:text-primary">
                  +91 99999 99999
                </a>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-surface px-4 py-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Email</h3>
                <a href="mailto:support@prolificproperties.in" className="mt-1 block text-base font-semibold text-foreground hover:text-primary">
                  support@prolificproperties.in
                </a>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-surface px-4 py-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Office</h3>
                <p className="mt-1 text-sm text-muted-foreground">Bhubaneswar, Odisha, India</p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] bg-gradient-brand p-[1px] shadow-soft">
            <div className="rounded-[27px] bg-surface p-6 md:p-8">
              <h2 className="text-3xl leading-tight text-foreground">Tell us what you need</h2>
              <h3 className="mt-1 text-base font-semibold text-ink-soft">Enquiry Form</h3>
              <p className="mt-2 text-sm text-muted-foreground">Fields marked with * are required.</p>

              {submitted && (
                <div className="mt-5 rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success">
                  Thanks. We received your request and will contact you shortly.
                </div>
              )}

              {error && (
                <div className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                  {error}
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-5">
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

                <Button type="submit" size="xl" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit enquiry"}
                </Button>
              </form>
            </div>
          </section>
        </div>
      </div>
      <CTAStrip />
    </main>
    <Footer />
    </div>
  );
}
