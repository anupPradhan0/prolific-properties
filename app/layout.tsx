import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prolific Properties | Premium Real Estate in Bhubaneswar",
    template: "%s | Prolific Properties",
  },
  description:
    "Discover premium villas, apartments, rentals, and commercial spaces in Bhubaneswar with Prolific Properties. Verified listings, transparent pricing, and guided site visits.",
  keywords: [
    "Bhubaneswar real estate",
    "premium properties Odisha",
    "villa for sale Bhubaneswar",
    "apartment rent Bhubaneswar",
    "commercial property Odisha",
  ],
  authors: [{ name: "Prolific Properties" }],
  alternates: {
    canonical: "/",
  },
  robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Prolific Properties",
    title: "Prolific Properties | Premium Real Estate in Bhubaneswar",
    description:
      "Explore curated sale, rental, and commercial properties with clearer filters, verified paperwork support, and better buying guidance.",
    url: "/",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Prolific Properties premium real estate listings in Bhubaneswar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@prolificproperties",
    title: "Prolific Properties | Premium Real Estate in Bhubaneswar",
    description: "Verified premium listings for buyers, renters, and commercial clients across Bhubaneswar.",
    images: ["/og-image.svg"],
  },
  category: "Real Estate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: `${siteUrl}/`,
                  name: "Prolific Properties",
                  description: "Premium real estate discovery platform for Bhubaneswar and Odisha.",
                  inLanguage: "en-IN",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${siteUrl}/buy?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "RealEstateAgent",
                  "@id": `${siteUrl}/#organization`,
                  name: "Prolific Properties",
                  url: `${siteUrl}/`,
                  logo: `${siteUrl}/logo.png`,
                  email: "support@prolificproperties.in",
                  telephone: "+91-99999-99999",
                  areaServed: {
                    "@type": "City",
                    name: "Bhubaneswar",
                  },
                  knowsAbout: [
                    "Residential real estate",
                    "Rental properties",
                    "Commercial properties",
                  ],
                  sameAs: [],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
