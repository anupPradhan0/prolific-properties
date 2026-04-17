"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    router.push("/admin/login");
  };

  return (
    <Button onClick={handleLogout} variant="outline" size="sm">
      Logout
    </Button>
  );
}
