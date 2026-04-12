"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Listing {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  price_type: string;
  property_type: string;
  location: string;
  area: string;
  bedrooms: number | null;
  bathrooms: number | null;
  status: string;
  featured: boolean;
  image_url: string;
}

export default function AdminListings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    price_type: "sale",
    property_type: "apartment",
    location: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    status: "active",
    featured: false,
    image_url: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchListings();
  }, [router]);

  const fetchListings = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/listings?status=&limit=100", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setListings(data.listings);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    router.push("/admin/login");
  };

  const openAddModal = () => {
    setEditingListing(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      price: "",
      price_type: "sale",
      property_type: "apartment",
      location: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      status: "active",
      featured: false,
      image_url: "",
    });
    setShowModal(true);
  };

  const openEditModal = (listing: Listing) => {
    setEditingListing(listing);
    setFormData({
      title: listing.title,
      slug: listing.slug,
      description: listing.description || "",
      price: listing.price || "",
      price_type: listing.price_type || "sale",
      property_type: listing.property_type || "apartment",
      location: listing.location || "",
      area: listing.area || "",
      bedrooms: listing.bedrooms?.toString() || "",
      bathrooms: listing.bathrooms?.toString() || "",
      status: listing.status || "active",
      featured: listing.featured || false,
      image_url: listing.image_url || "",
    });
    setShowModal(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    
    const payload = {
      ...formData,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
      slug: formData.slug || generateSlug(formData.title),
    };

    try {
      const url = editingListing 
        ? `/api/listings/${editingListing.slug}` 
        : "/api/listings";
      const method = editingListing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        fetchListings();
      } else {
        alert("Failed to save listing");
      }
    } catch (error) {
      console.error("Error saving listing:", error);
      alert("Failed to save listing");
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/listings/${slug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchListings();
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
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
            <Button size="lg" onClick={openAddModal}>+ Add New Listing</Button>
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Featured</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing.id} className="border-t border-border">
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{listing.title}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground capitalize">{listing.property_type}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{listing.price}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{listing.location}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        listing.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                      }`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {listing.featured ? "⭐" : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEditModal(listing)}>Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(listing.slug)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-surface p-8 shadow-panel">
            <h2 className="text-2xl font-bold text-foreground">
              {editingListing ? "Edit Listing" : "Add New Listing"}
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) });
                    }}
                    placeholder="e.g. Skyline Villa"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated-from-title"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Property description..."
                  rows={3}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Image URL</label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="mt-1 text-xs text-muted-foreground">Enter the URL of the property image</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Price *</label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. ₹85 L"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Price Type</label>
                  <select
                    value={formData.price_type}
                    onChange={(e) => setFormData({ ...formData, price_type: e.target.value })}
                    className="flex h-10 w-full rounded-2xl border border-input bg-surface px-4 text-sm"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Property Type</label>
                  <select
                    value={formData.property_type}
                    onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                    className="flex h-10 w-full rounded-2xl border border-input bg-surface px-4 text-sm"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="plot">Plot</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Patia, Bhubaneswar"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Area</label>
                  <Input
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g. 1,800 sqft"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Bedrooms</label>
                  <Input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    placeholder="e.g. 3"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Bathrooms</label>
                  <Input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    placeholder="e.g. 2"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="flex h-10 w-full rounded-2xl border border-input bg-surface px-4 text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-4 w-4 rounded"
                />
                <label htmlFor="featured" className="text-sm font-semibold">Featured Listing</label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingListing ? "Update" : "Create"} Listing
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
