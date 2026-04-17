import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Properties in Bhubaneswar",
  description:
    "Browse verified villas, apartments, plots, and commercial properties for sale in Bhubaneswar with transparent pricing and guided support.",
  alternates: {
    canonical: "/buy",
  },
  openGraph: {
    title: "Buy Properties in Bhubaneswar | Prolific Properties",
    description:
      "Explore active property listings with verified details, better filters, and expert buying guidance.",
    url: "/buy",
    type: "website",
  },
};

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
