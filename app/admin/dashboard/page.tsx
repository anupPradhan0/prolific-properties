"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalListings: 0,
    forSale: 0,
    forRent: 0,
    blogPosts: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    } else {
      fetchStats();
    }
    setLoading(false);
  }, [router]);

  const fetchStats = async () => {
    try {
      const [listingsRes, blogsRes] = await Promise.all([
        fetch("/api/listings?limit=1000"),
        fetch("/api/blogs?limit=1000"),
      ]);

      if (listingsRes.ok) {
        const listingsData = await listingsRes.json();
        const totalListings = listingsData.total || 0;
        const forSale = listingsData.listings?.filter((l: any) => l.priceType === "sale").length || 0;
        const forRent = listingsData.listings?.filter((l: any) => l.priceType === "rent").length || 0;

        setStats(prev => ({
          ...prev,
          totalListings,
          forSale,
          forRent,
        }));
      }

      if (blogsRes.ok) {
        const blogsData = await blogsRes.json();
        setStats(prev => ({
          ...prev,
          blogPosts: blogsData.total || 0,
        }));
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-surface">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-bold text-foreground">Prolific Properties</Link>
            <span className="text-sm text-muted-foreground">/ Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">View Site</Link>
            <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
          </div>
        </div>
      </header>

      <Sidebar />

      <main className="pt-16 md:pl-64">
        <div className="container py-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Welcome to Prolific Properties Admin</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[24px] border border-border bg-surface p-6 shadow-panel">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Listings</p>
                  <p className="mt-1 text-3xl font-bold text-foreground">6</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-soft flex items-center justify-center">
                  <span className="text-xl">🏠</span>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-border bg-surface p-6 shadow-panel">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">For Sale</p>
                  <p className="mt-1 text-3xl font-bold text-foreground">{stats.forSale}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-soft flex items-center justify-center">
                  <span className="text-xl">💰</span>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-border bg-surface p-6 shadow-panel">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">For Rent</p>
                  <p className="mt-1 text-3xl font-bold text-foreground">{stats.forRent}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-soft flex items-center justify-center">
                  <span className="text-xl">🔑</span>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-border bg-surface p-6 shadow-panel">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Blog Posts</p>
                  <p className="mt-1 text-3xl font-bold text-foreground">{stats.blogPosts}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-soft flex items-center justify-center">
                  <span className="text-xl">📝</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Link href="/admin/listings" className="rounded-[24px] border border-border bg-surface p-6 text-left shadow-panel transition-all hover:border-primary/30 hover:-translate-y-1">
                <span className="text-2xl">➕</span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Add New Listing</h3>
                <p className="mt-2 text-sm text-muted-foreground">Create a new property listing</p>
              </Link>

              <Link href="/admin/listings" className="rounded-[24px] border border-border bg-surface p-6 text-left shadow-panel transition-all hover:border-primary/30 hover:-translate-y-1">
                <span className="text-2xl">✏️</span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Manage Listings</h3>
                <p className="mt-2 text-sm text-muted-foreground">Edit or delete property listings</p>
              </Link>

              <Link href="/admin/blogs" className="rounded-[24px] border border-border bg-surface p-6 text-left shadow-panel transition-all hover:border-primary/30 hover:-translate-y-1">
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
