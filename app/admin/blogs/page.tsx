"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";

const demoBlogs = [
  { id: 1, title: "A Complete Guide to Buying Your First Home in Bhubaneswar", category: "Buying Guide", date: "March 15, 2026", status: "Published" },
  { id: 2, title: "Top 5 Neighborhoods in Bhubaneswar for Home Buyers", category: "Market Insights", date: "March 8, 2026", status: "Published" },
  { id: 3, title: "Villa or Apartment: Which is Right for You?", category: "Buying Guide", date: "February 28, 2026", status: "Draft" },
  { id: 4, title: "Commercial Real Estate Trends in Bhubaneswar 2026", category: "Market Insights", date: "February 20, 2026", status: "Published" },
  { id: 5, title: "Essential Documents Checklist for Property Purchase", category: "Legal Guide", date: "February 12, 2026", status: "Draft" },
  { id: 6, title: "The Complete Renter's Guide to Bhubaneswar", category: "Renting Guide", date: "February 5, 2026", status: "Published" },
];

export default function AdminBlogs() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    }
    setLoading(false);
  }, [router]);

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

      <main className="pl-64 pt-16">
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
              <p className="mt-1 text-muted-foreground">Manage your blog content</p>
            </div>
            <Button size="lg">+ Add New Post</Button>
          </div>

          <div className="mt-8 overflow-hidden rounded-[24px] border border-border bg-surface shadow-panel">
            <table className="w-full">
              <thead className="bg-surface-strong">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {demoBlogs.map((blog) => (
                  <tr key={blog.id} className="border-t border-border">
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{blog.title}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{blog.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{blog.date}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        blog.status === "Published" 
                          ? "bg-success/10 text-success" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
