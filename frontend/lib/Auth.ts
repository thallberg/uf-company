export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}

export function getUserRole(): string | null {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  if (!user) return null;

  return JSON.parse(user).role;
}

export function getUser() {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAdmin(): boolean {
  const user = getUser();
  return user?.role === "Admin";
}
