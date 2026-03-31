import { useEffect } from "react";
import { Link } from "react-router-dom";

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

const PrivacyPolicy = () => {
  useEffect(() => {
    const title = "Privacy Policy | Prolific Properties";
    const description =
      "Read how Prolific Properties collects, uses, and protects your information when you browse listings or contact our team.";
    const canonicalUrl = `${window.location.origin}/privacy-policy`;

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

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        <Link to="/" className="text-sm font-semibold text-primary transition-colors hover:text-primary/80">
          Back to Home
        </Link>

        <h1 className="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-tight text-foreground">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Effective date: April 1, 2026</p>

        <div className="mt-8 space-y-8 rounded-[28px] border border-border bg-surface p-6 shadow-panel md:p-8">
          <section className="space-y-3">
            <h2 className="text-3xl leading-tight text-foreground">1. Information We Collect</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              We may collect contact information such as your name, phone number, email address, preferred location, budget range, and property type when you submit forms or contact our team.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl leading-tight text-foreground">2. How We Use Your Information</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              We use your information to recommend relevant listings, schedule site visits, respond to inquiries, and improve your browsing experience across our website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl leading-tight text-foreground">3. Sharing and Disclosure</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              We do not sell your personal data. We may share information with trusted service providers only when needed to support website operations or property coordination.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl leading-tight text-foreground">4. Data Security</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              We apply reasonable technical and organizational safeguards to protect your information from unauthorized access, misuse, or disclosure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl leading-tight text-foreground">5. Cookies and Analytics</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Our site may use cookies and analytics tools to understand traffic and improve content quality. You can manage cookie preferences in your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl leading-tight text-foreground">6. Your Rights</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              You can request updates or deletion of your personal information by contacting us. We will address valid requests within a reasonable timeframe.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl leading-tight text-foreground">7. Contact Us</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              If you have privacy-related questions, contact Prolific Properties at support@prolificproperties.in.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
