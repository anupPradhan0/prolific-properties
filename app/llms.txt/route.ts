import { NextResponse } from "next/server";

const content = `# Prolific Properties

Prolific Properties is a real estate discovery and advisory platform focused on Bhubaneswar, Odisha.

## Primary Pages
- / : Homepage with featured listings and discovery filters
- /buy : Property listing discovery page
- /blogs : Real estate guides and market insights
- /about-us : Company and trust information
- /contact-us : Contact and enquiry form

## Structured Data Available
- Organization/RealEstateAgent schema on site layout
- Article schema on blog detail pages
- RealEstateListing schema on listing detail pages

## Crawl Guidance
- Public pages should be indexed
- /admin and /api routes are not for indexing

## Contact
- support@prolificproperties.in
`;

export function GET() {
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
