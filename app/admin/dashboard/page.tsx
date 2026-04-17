import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/admin/Sidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

type RecentListing = {
  id: number;
  title: string;
  slug: string;
  createdAt: Date;
  status: string;
};

type RecentBlog = {
  id: number;
  title: string;
  slug: string;
  createdAt: Date;
  status: string;
};

type RecentContact = {
  id: number;
  fullName: string;
  interest: string;
  createdAt: Date;
  status: string;
};

type DashboardStats = {
  totalListings: number;
  forSale: number;
  forRent: number;
  blogPosts: number;
  totalContacts: number;
  activeContacts: number;
};

async function getDashboardStats(): Promise<DashboardStats> {
  const db = prisma as any;

  const [totalListings, forSale, forRent, blogPosts] = await Promise.all([
    prisma.listing.count(),
    prisma.listing.count({ where: { priceType: "sale" } }),
    prisma.listing.count({ where: { priceType: "rent" } }),
    prisma.blog.count(),
  ]);

  let totalContactsResult: Array<{ count: bigint | number }> = [];
  let activeContactsResult: Array<{ count: bigint | number }> = [];

  try {
    [totalContactsResult, activeContactsResult] = await Promise.all([
      db.$queryRaw<Array<{ count: bigint | number }>>`SELECT COUNT(*)::bigint as count FROM contacts`,
      db.$queryRaw<Array<{ count: bigint | number }>>`SELECT COUNT(*)::bigint as count FROM contacts WHERE status = 'active'`,
    ]);
  } catch {
    totalContactsResult = [{ count: 0 }];
    activeContactsResult = [{ count: 0 }];
  }

  const totalContacts = Number(totalContactsResult?.[0]?.count ?? 0);
  const activeContacts = Number(activeContactsResult?.[0]?.count ?? 0);

  return {
    totalListings,
    forSale,
    forRent,
    blogPosts,
    totalContacts,
    activeContacts,
  };
}

async function getRecentActivity() {
  const db = prisma as any;

  const [recentListings, recentBlogs] = await Promise.all([
    prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, slug: true, createdAt: true, status: true },
    }),
    prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, slug: true, createdAt: true, status: true },
    }),
  ]);

  let recentContacts: Array<{ id: number; full_name: string; interest: string; created_at: Date; status: string }> = [];

  try {
    recentContacts = await db.$queryRaw<Array<{ id: number; full_name: string; interest: string; created_at: Date; status: string }>>`
      SELECT id, full_name, interest, created_at, status
      FROM contacts
      ORDER BY created_at DESC
      LIMIT 5
    `;
  } catch {
    recentContacts = [];
  }

  const normalizedContacts: RecentContact[] = recentContacts.map((contact: { id: number; full_name: string; interest: string; created_at: Date; status: string }) => ({
    id: contact.id,
    fullName: contact.full_name,
    interest: contact.interest,
    createdAt: new Date(contact.created_at),
    status: contact.status,
  }));

  return {
    recentListings: recentListings as RecentListing[],
    recentBlogs: recentBlogs as RecentBlog[],
    recentContacts: normalizedContacts,
  };
}

function StatsSkeleton() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-3xl border border-border bg-surface p-6 shadow-panel">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="mt-4 h-10 w-16 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

function RecentActivitySkeleton() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-3xl border border-border bg-surface p-6 shadow-panel">
          <div className="h-5 w-36 animate-pulse rounded bg-muted" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((__, j) => (
              <div key={j} className="h-4 w-full animate-pulse rounded bg-muted" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

async function StatsSection() {
  const stats = await getDashboardStats();

  const statCards = [
    { label: "Total Listings", value: stats.totalListings, icon: "🏠" },
    { label: "For Sale", value: stats.forSale, icon: "💰" },
    { label: "For Rent", value: stats.forRent, icon: "🔑" },
    { label: "Blog Posts", value: stats.blogPosts, icon: "📝" },
    { label: "Total Contacts", value: stats.totalContacts, icon: "👥" },
    { label: "Active Contacts", value: stats.activeContacts, icon: "📬" },
  ];

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat) => (
        <div key={stat.label} className="rounded-3xl border border-border bg-surface p-6 shadow-panel">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-xl">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function RecentActivitySection() {
  const { recentListings, recentBlogs, recentContacts } = await getRecentActivity();

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl border border-border bg-surface p-6 shadow-panel">
        <h2 className="text-xl font-bold text-foreground">Recent Listings</h2>
        {recentListings.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No listings yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {recentListings.map((listing: RecentListing) => (
              <li key={listing.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{listing.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(listing.createdAt).toLocaleDateString("en-IN")}</p>
                </div>
                <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground capitalize">{listing.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6 shadow-panel">
        <h2 className="text-xl font-bold text-foreground">Recent Blogs</h2>
        {recentBlogs.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No blog posts yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {recentBlogs.map((blog: RecentBlog) => (
              <li key={blog.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{blog.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(blog.createdAt).toLocaleDateString("en-IN")}</p>
                </div>
                <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground capitalize">{blog.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6 shadow-panel">
        <h2 className="text-xl font-bold text-foreground">Recent Contacts</h2>
        {recentContacts.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No contact enquiries yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {recentContacts.map((contact: RecentContact) => (
              <li key={contact.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{contact.fullName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{contact.interest} • {new Date(contact.createdAt).toLocaleDateString("en-IN")}</p>
                </div>
                <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground capitalize">{contact.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminAuthGuard />
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-surface">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-lg font-bold text-foreground">Prolific Properties</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">View Site</Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      <Sidebar />

      <main className="pt-16 md:pl-64">
        <div className="container py-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Real-time overview from your database</p>
          </div>

          <Suspense fallback={<StatsSkeleton />}>
            <StatsSection />
          </Suspense>

          <Suspense fallback={<RecentActivitySkeleton />}>
            <RecentActivitySection />
          </Suspense>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Link href="/admin/listings" className="rounded-3xl border border-border bg-surface p-6 shadow-panel transition-all hover:-translate-y-1 hover:border-primary/30">
                <span className="text-2xl">➕</span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Add New Listing</h3>
                <p className="mt-2 text-sm text-muted-foreground">Create a new property listing</p>
              </Link>

              <Link href="/admin/listings" className="rounded-3xl border border-border bg-surface p-6 shadow-panel transition-all hover:-translate-y-1 hover:border-primary/30">
                <span className="text-2xl">✏️</span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Manage Listings</h3>
                <p className="mt-2 text-sm text-muted-foreground">Edit or delete property listings</p>
              </Link>

              <Link href="/admin/blogs" className="rounded-3xl border border-border bg-surface p-6 shadow-panel transition-all hover:-translate-y-1 hover:border-primary/30">
                <span className="text-2xl">📝</span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Manage Blog</h3>
                <p className="mt-2 text-sm text-muted-foreground">Create and edit blog posts</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
