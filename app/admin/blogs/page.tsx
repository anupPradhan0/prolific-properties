"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  status: string;
  author: string;
  readTime: string;
  featuredImage: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export default function AdminBlogs() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "General",
    status: "draft",
    author: "Prolific Properties",
    readTime: "5 min read",
    featuredImage: "",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchBlogs();
  }, [router]);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/blogs?status=", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    router.push("/admin/login");
  };

  const openAddModal = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "General",
      status: "draft",
      author: "Prolific Properties",
      readTime: "5 min read",
      featuredImage: "",
      metaTitle: "",
      metaDescription: "",
    });
    setShowModal(true);
  };

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "General",
      status: blog.status || "draft",
      author: blog.author || "Prolific Properties",
      readTime: blog.readTime || "5 min read",
      featuredImage: blog.featuredImage || "",
      metaTitle: (blog as any).metaTitle || "",
      metaDescription: (blog as any).metaDescription || "",
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
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      status: formData.status,
      author: formData.author,
      readTime: formData.readTime,
      featuredImage: formData.featuredImage || null,
      metaTitle: formData.metaTitle || null,
      metaDescription: formData.metaDescription || null,
    };

    try {
      const url = editingBlog 
        ? `/api/blogs/${editingBlog.slug}` 
        : "/api/blogs";
      const method = editingBlog ? "PUT" : "POST";
      const requestPromise = fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      toast.promise(requestPromise, {
        loading: editingBlog ? "Updating blog..." : "Creating blog...",
        success: editingBlog ? "Blog updated successfully" : "Blog created successfully",
        error: "Failed to save blog",
      });

      const res = await requestPromise;

      if (res.ok) {
        setShowModal(false);
        fetchBlogs();
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Failed to save blog");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog");
    }
  };

  const deleteBlog = async (slug: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      const requestPromise = fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.promise(requestPromise, {
        loading: "Deleting blog...",
        success: "Blog deleted successfully",
        error: "Failed to delete blog",
      });

      const res = await requestPromise;

      if (res.ok) {
        fetchBlogs();
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  const handleDelete = (slug: string) => {
    toast.warning("Delete this blog post?", {
      action: {
        label: "Delete",
        onClick: () => deleteBlog(slug),
      },
    });
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
              <p className="mt-1 text-muted-foreground">Manage your blog content</p>
            </div>
            <Button size="lg" onClick={openAddModal}>+ Add New Post</Button>
          </div>

          <div className="mt-8 overflow-hidden rounded-[24px] border border-border bg-surface shadow-panel">
            <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead className="bg-surface-strong">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Read Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-t border-border">
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{blog.title}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{blog.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{blog.readTime}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        blog.status === "published" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEditModal(blog)}>Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(blog.slug)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal */}
          <div className="relative ml-auto w-full max-w-3xl bg-surface shadow-2xl h-full overflow-y-auto">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {editingBlog ? "Edit Blog Post" : "Add New Blog Post"}
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowModal(false)}
                  className="h-8 w-8 p-0"
                >
                  ✕
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold">Title *</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => {
                          setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) });
                        }}
                        placeholder="Blog post title"
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
                    <label className="mb-2 block text-sm font-semibold">Excerpt</label>
                    <Textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief description for listing page..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">Content (HTML)</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Full blog content (HTML allowed)..."
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="flex h-10 w-full rounded-2xl border border-input bg-surface px-4 text-sm"
                      >
                        <option value="General">General</option>
                        <option value="Buying Guide">Buying Guide</option>
                        <option value="Market Insights">Market Insights</option>
                        <option value="Legal Guide">Legal Guide</option>
                        <option value="Renting Guide">Renting Guide</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="flex h-10 w-full rounded-2xl border border-input bg-surface px-4 text-sm"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold">Read Time</label>
                      <Input
                        value={formData.readTime}
                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                        placeholder="e.g. 5 min read"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">Author</label>
                    <Input
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Author name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">Featured Image URL</label>
                    <Input
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">Meta Title</label>
                    <Input
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      placeholder="SEO title for search engines"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Leave blank to auto-generate from title</p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">Meta Description</label>
                    <Textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      placeholder="SEO description for search engines..."
                      rows={2}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Leave blank to auto-generate from excerpt</p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      {editingBlog ? "Update" : "Create"} Post
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
