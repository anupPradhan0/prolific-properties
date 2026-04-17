import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Prolific Properties for property buying, renting, and investment help in Bhubaneswar. Get quick responses from our advisory team.",
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact Prolific Properties",
    description:
      "Share your requirements and get matched with verified listings and personalized guidance.",
    url: "/contact-us",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
