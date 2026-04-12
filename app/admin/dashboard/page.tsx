"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!loggedIn) {
      router.push("/admin/login");
    } else {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
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
      <main className="container py-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Manage your property listings and content</p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="lg">
            Logout
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                <p className="mt-1 text-3xl font-bold text-foreground">3</p>
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
                <p className="mt-1 text-3xl font-bold text-foreground">2</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary-soft flex items-center justify-center">
                <span className="text-xl">🔑</span>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-border bg-surface p-6 shadow-panel">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Commercial</p>
                <p className="mt-1 text-3xl font-bold text-foreground">1</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary-soft flex items-center justify-center">
                <span className="text-xl">🏢</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <button className="rounded-[24px] border border-border bg-surface p-6 text-left shadow-panel transition-all hover:border-primary/30 hover:-translate-y-1">
              <span className="text-2xl">➕</span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Add New Listing</h3>
              <p className="mt-2 text-sm text-muted-foreground">Create a new property listing</p>
            </button>

            <button className="rounded-[24px] border border-border bg-surface p-6 text-left shadow-panel transition-all hover:border-primary/30 hover:-translate-y-1">
              <span className="text-2xl">✏️</span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Edit Listings</h3>
              <p className="mt-2 text-sm text-muted-foreground">Modify existing property listings</p>
            </button>

            <button className="rounded-[24px] border border-border bg-surface p-6 text-left shadow-panel transition-all hover:border-primary/30 hover:-translate-y-1">
              <span className="text-2xl">📝</span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Manage Blog</h3>
              <p className="mt-2 text-sm text-muted-foreground">Create and edit blog posts</p>
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground">Recent Listings</h2>
          <div className="mt-6 overflow-hidden rounded-[24px] border border-border bg-surface shadow-panel">
            <table className="w-full">
              <thead className="bg-surface-strong">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Property</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-6 py-4 text-sm text-foreground">Skyline Villa</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Villa</td>
                  <td className="px-6 py-4 text-sm text-foreground">₹1.25 Cr</td>
                  <td className="px-6 py-4"><span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Active</span></td>
                  <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-6 py-4 text-sm text-foreground">Park View Residency</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Apartment</td>
                  <td className="px-6 py-4 text-sm text-foreground">₹85 L</td>
                  <td className="px-6 py-4"><span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Active</span></td>
                  <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-6 py-4 text-sm text-foreground">Golden Heights</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Apartment</td>
                  <td className="px-6 py-4 text-sm text-foreground">₹35K/mo</td>
                  <td className="px-6 py-4"><span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Active</span></td>
                  <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
