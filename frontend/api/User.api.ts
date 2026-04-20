import { ApiFetch } from "./Client.api";

export type User = {
  fullName: string;
  email: string;
  role: string;
  address?: string;
  city?: string;
  postalCode?: string;
  phoneNumber?: string;
};

export type UpdateUserProfile = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
};

export async function getMe(): Promise<User> {
  return ApiFetch<User>("/api/user/me");
}

export async function updateMe(data: UpdateUserProfile): Promise<void> {
  await ApiFetch<void>("/api/user/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
