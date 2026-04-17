"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Contact {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  interest: string;
  budget: string | null;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminContacts() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchContacts();
  }, [router, filter]);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/contacts?status=${filter}&limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.contacts) {
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
    setLoading(false);
  };

  const handleStatusChange = async (contactId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/contacts", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: contactId, status: newStatus }),
      });

      if (res.ok) {
        fetchContacts(); // Refresh the list
        toast.success("Contact status updated");
      } else {
        toast.error("Failed to update contact status");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Failed to update contact status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    router.push("/admin/login");
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: "bg-blue-100 text-blue-800",
      inprocess: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
    };
    return statusConfig[status as keyof typeof statusConfig] || "bg-gray-100 text-gray-800";
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
              <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
              <p className="mt-1 text-muted-foreground">Manage contact form submissions</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchContacts}>
                🔄 Refresh
              </Button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 flex gap-2">
            {[
              { value: "all", label: "All Contacts" },
              { value: "active", label: "Active" },
              { value: "inprocess", label: "In Process" },
              { value: "completed", label: "Completed" },
            ].map((tab) => (
              <Button
                key={tab.value}
                variant={filter === tab.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(tab.value)}
              >
                {tab.label} ({contacts.filter(c => tab.value === "all" || c.status === tab.value).length})
              </Button>
            ))}
          </div>

          {/* Contacts Table */}
          <div className="mt-8 overflow-hidden rounded-[24px] border border-border bg-surface shadow-panel">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-strong">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Interest</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Budget</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Message</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-t border-border">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-foreground">{contact.fullName}</div>
                          <div className="text-sm text-muted-foreground">{contact.email}</div>
                          <div className="text-sm text-muted-foreground">{contact.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground capitalize">
                        {contact.interest}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {contact.budget || "Not specified"}
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {contact.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(contact.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={contact.status}
                          onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold border-0 ${getStatusBadge(contact.status)}`}
                        >
                          <option value="active">Active</option>
                          <option value="inprocess">In Process</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewContact(contact)}
                          >
                            View
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {contacts.length === 0 && (
            <div className="mt-8 text-center py-12">
              <p className="text-muted-foreground">No contacts found.</p>
            </div>
          )}
        </div>
      </main>

      {/* Contact Details Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={closeModal}
          />
          
          {/* Modal */}
          <div className="relative ml-auto w-full max-w-md bg-surface shadow-2xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-6">
                <h2 className="text-xl font-bold text-foreground">Contact Details</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={closeModal}
                  className="h-8 w-8 p-0"
                >
                  ✕
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                      <p className="text-foreground">{selectedContact.fullName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-foreground">
                        <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">
                          {selectedContact.email}
                        </a>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-foreground">
                        <a href={`tel:${selectedContact.phone}`} className="text-primary hover:underline">
                          {selectedContact.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Property Interest */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Property Interest</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Interest Type</label>
                      <p className="text-foreground capitalize">{selectedContact.interest}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Budget Range</label>
                      <p className="text-foreground">{selectedContact.budget || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Message</h3>
                  <div className="rounded-lg border border-border bg-surface-strong p-4">
                    <p className="text-foreground whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Status</h3>
                  <select
                    value={selectedContact.status}
                    onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold border-0 ${getStatusBadge(selectedContact.status)}`}
                  >
                    <option value="active">Active</option>
                    <option value="inprocess">In Process</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Timestamps */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Timeline</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                      <p className="text-foreground">
                        {new Date(selectedContact.createdAt).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                      <p className="text-foreground">
                        {new Date(selectedContact.updatedAt).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-border p-6">
                <div className="flex gap-3">
                  <Button variant="outline" onClick={closeModal} className="flex-1">
                    Close
                  </Button>
                  <Button 
                    onClick={() => {
                      window.location.href = `mailto:${selectedContact.email}?subject=Regarding your property inquiry&body=Dear ${selectedContact.fullName},%0D%0A%0D%0AThank you for your interest in our properties.`;
                    }}
                    className="flex-1"
                  >
                    Email Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
