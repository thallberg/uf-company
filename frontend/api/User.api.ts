import { ApiFetch } from "./Client.api";

export type User = {
  id: number;
  fullName: string;
  email: string;
  role: string; 
  address?: string;
  postalCode?: string;
};

export async function getMe(): Promise<User> {
  return ApiFetch<User>("/api/user/me");
}