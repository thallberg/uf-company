"use client";

import { AccountDetails } from "@/components/features/account/AccountDetails";
import { AdminDashboard } from "@/app/admin/components/AdminDashboard";
import { AuthSection } from "@/components/layout/auth-section/AuthSection";
import { isAdmin, isLoggedIn } from "@/lib/Auth";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => {
      setLoggedIn(isLoggedIn());
      setAdmin(isAdmin());
      setReady(true);
    };

    update(); 

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