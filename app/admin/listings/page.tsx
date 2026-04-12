"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";

const demoListings = [
  { id: 1, title: "Skyline Villa", type: "Villa", price: "₹1.25 Cr", status: "Active", location: "Patia, Bhubaneswar" },
  { id: 2, title: "Park View Residency", type: "Apartment", price: "₹85 L", status: "Active", location: "Kharavela Nagar" },
  { id: 3, title: "Golden Heights", type: "Apartment", price: "₹35,000/mo", status: "Active", location: "Nayapalli" },
  { id: 4, title: "Green Valley Plots", type: "Plot", price: "₹45 L", status: "Active", location: "Jharpada" },
  { id: 5, title: "Emerald Heights Business", type: "Commercial", price: "₹2.10 Cr", status: "Active", location: "CSPUR" },
  { id: 6, title: "Tech Hub Office Space", type: "Commercial", price: "₹1.5 L/mo", status: "Active", location: "Infopark" },
];

export default function AdminListings() {
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
              <h1 className="text-3xl font-bold text-foreground">Listings</h1>
              <p className="mt-1 text-muted-foreground">Manage your property listings</p>
            </div>
            <Button size="lg">+ Add New Listing</Button>
          </div>

          <div className="mt-8 overflow-hidden rounded-[24px] border border-border bg-surface shadow-panel">
            <table className="w-full">
              <thead className="bg-surface-strong">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Property</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {demoListings.map((listing) => (
                  <tr key={listing.id} className="border-t border-border">
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{listing.title}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{listing.type}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{listing.price}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{listing.location}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">{listing.status}</span>
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
