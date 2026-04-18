"use client";

import { AccountDetails } from "@/components/features/account/AccountDetails";
import { AdminDashboard } from "@/components/features/admin/AdminDashboard";
import { AuthSection } from "@/components/layout/auth-section/AuthSection";
import { isAdmin, isLoggedIn } from "@/lib/Auth";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // ✅ detta räknas som "external sync"
    const update = () => {
      setLoggedIn(isLoggedIn());
      setAdmin(isAdmin());
      setReady(true);
    };

    update(); // 👈 OK här eftersom det är "sync from external source"

    window.addEventListener("auth-change", update);
    return () => window.removeEventListener("auth-change", update);
  }, []);

  if (!ready) return null;

  if (!loggedIn) return (
    <div className="mt-22 mb-4">
      <AuthSection />;
    </div>
  )

  if (admin) return <AdminDashboard />;

  return <AccountDetails />;
}