"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);

  return null;
}
