"use client";

import { useEffect, useState } from "react";
import { isLoggedIn } from "@/lib/Auth";

import { AuthSection } from "@/components/layout/auth-section/AuthSection";
import { AccountDetails } from "@/components/features/account/AccountDetails";

export default function AccountPage() {
const [loggedIn, setLoggedIn] = useState(() => isLoggedIn());

useEffect(() => {
  const update = () => setLoggedIn(isLoggedIn());

  window.addEventListener("auth-change", update);
  return () => window.removeEventListener("auth-change", update);
}, []);

  // undvik flicker
  if (loggedIn === null) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {loggedIn ? <AccountDetails /> : <AuthSection />}
    </div>
  );
}