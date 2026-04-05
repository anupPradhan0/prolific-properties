import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
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
  robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Prolific Properties",
    title: "Prolific Properties | Premium Real Estate in Bhubaneswar",
    description:
      "Explore curated sale, rental, and commercial properties with clearer filters, verified paperwork support, and better buying guidance.",
    url: "https://www.prolificproperties.in/",
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
    title: "Prolific Properties | Premium Real Estate in Bhubaneswar",
    description: "Verified premium listings for buyers, renters, and commercial clients across Bhubaneswar.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.prolificproperties.in/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://www.prolificproperties.in/#website",
                  url: "https://www.prolificproperties.in/",
                  name: "Prolific Properties",
                  description: "Premium real estate discovery platform for Bhubaneswar and Odisha.",
                  inLanguage: "en-IN",
                },
                {
                  "@type": "RealEstateAgent",
                  "@id": "https://www.prolificproperties.in/#organization",
                  name: "Prolific Properties",
                  url: "https://www.prolificproperties.in/",
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
