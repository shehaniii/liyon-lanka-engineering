export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

// Public & Shared Types
export type WebsiteService = {
  id: number;
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  displayOrder?: number;
  active?: boolean;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  location?: string;
  client?: string;
  completionDate?: string;
  coverImageUrl?: string;
  galleryImages?: string[];
  featured: boolean;
  active?: boolean;
};

export type Machinery = {
  id: number;
  name: string;
  brand?: string;
  model?: string;
  capacity?: string;
  description?: string;
  imageUrl?: string;
  active?: boolean;
};

export type Career = {
  id: number;
  title: string;
  department?: string;
  location?: string;
  employmentType?: string;
  description: string;
  requirements?: string;
  closingDate?: string;
  active?: boolean;
};

export type JobApplication = {
  id: number;
  career?: Career;
  fullName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  cvUrl?: string;
  status: "NEW" | "REVIEWING" | "ACCEPTED" | "REJECTED" | string;
  appliedAt?: string;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt?: string;
};

export type DashboardStats = {
  services: number;
  projects: number;
  machinery: number;
  careers: number;
  contactMessages: number;
  jobApplications: number;
};

export type AdminUser = {
  id?: number;
  fullName: string;
  email: string;
  role?: string;
};

// ==================== AUTH HELPERS ====================
export const AUTH_TOKEN_KEY = "liyon_admin_token";
export const AUTH_USER_KEY = "liyon_admin_user";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAdminAuth(token: string, user: AdminUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearAdminAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

export function getStoredAdminUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem(AUTH_USER_KEY);
  return user ? JSON.parse(user) : null;
}

// ==================== HTTP CLIENT ====================
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token && path.includes("/api/admin")) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (response.status === 401 && typeof window !== "undefined" && path.includes("/api/admin")) {
    clearAdminAuth();
    window.location.href = "/admin/login";
    throw new Error("Unauthorized session. Redirecting to login...");
  }

  if (!response.ok) {
    let errorMsg = `Request failed (${response.status})`;
    try {
      const errJson = await response.json();
      errorMsg = errJson.message || errorMsg;
    } catch {
      try {
        errorMsg = await response.text() || errorMsg;
      } catch {
        // use default
      }
    }
    throw new Error(errorMsg);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

// ==================== PUBLIC API CALLS ====================
export const getServices = () => request<WebsiteService[]>("/api/services");
export const getProjects = () => request<Project[]>("/api/projects");
export const getMachinery = () => request<Machinery[]>("/api/machinery");
export const getCareers = () => request<Career[]>("/api/careers");

export async function uploadCv(file: File): Promise<{ url: string; originalFileName: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/uploads/cv`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Could not upload CV.");
  return response.json();
}

export async function submitJobApplication(data: {
  careerId: number;
  fullName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  cvUrl?: string;
}) {
  return request<JobApplication>("/api/job-applications", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  return request<ContactMessage>("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ==================== ADMIN API CALLS ====================
export async function adminLogin(email: string, password: string): Promise<{ token: string; message: string }> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid admin email or password.");
  }
  return response.json();
}

export const getAdminProfile = () => request<AdminUser>("/api/admin/profile");

export async function requestAdminPasswordVerification() {
  return request<{ message: string }>("/api/admin/profile/password/verification", {
    method: "POST",
  });
}

export async function changeAdminPassword(token: string, newPassword: string) {
  return request<{ message: string }>("/api/admin/profile/password", {
    method: "PUT",
    body: JSON.stringify({ token, newPassword }),
  });
}

export const getAdminDashboard = () => request<DashboardStats>("/api/admin/dashboard");

// Admin Projects CRUD
export const getAdminProjects = () => request<Project[]>("/api/admin/projects");
export const createAdminProject = (data: Partial<Project>) =>
  request<Project>("/api/admin/projects", { method: "POST", body: JSON.stringify(data) });
export const updateAdminProject = (id: number, data: Partial<Project>) =>
  request<Project>(`/api/admin/projects/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteAdminProject = (id: number) =>
  request<void>(`/api/admin/projects/${id}`, { method: "DELETE" });

// Admin Services CRUD
export const getAdminServices = () => request<WebsiteService[]>("/api/admin/services");
export const createAdminService = (data: Partial<WebsiteService>) =>
  request<WebsiteService>("/api/admin/services", { method: "POST", body: JSON.stringify(data) });
export const updateAdminService = (id: number, data: Partial<WebsiteService>) =>
  request<WebsiteService>(`/api/admin/services/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteAdminService = (id: number) =>
  request<void>(`/api/admin/services/${id}`, { method: "DELETE" });

// Admin Machinery CRUD
export const getAdminMachinery = () => request<Machinery[]>("/api/admin/machinery");
export const createAdminMachinery = (data: Partial<Machinery>) =>
  request<Machinery>("/api/admin/machinery", { method: "POST", body: JSON.stringify(data) });
export const updateAdminMachinery = (id: number, data: Partial<Machinery>) =>
  request<Machinery>(`/api/admin/machinery/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteAdminMachinery = (id: number) =>
  request<void>(`/api/admin/machinery/${id}`, { method: "DELETE" });

// Admin Careers CRUD
export const getAdminCareers = () => request<Career[]>("/api/admin/careers");
export const createAdminCareer = (data: Partial<Career>) =>
  request<Career>("/api/admin/careers", { method: "POST", body: JSON.stringify(data) });
export const updateAdminCareer = (id: number, data: Partial<Career>) =>
  request<Career>(`/api/admin/careers/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteAdminCareer = (id: number) =>
  request<void>(`/api/admin/careers/${id}`, { method: "DELETE" });

// Admin Applications
export const getAdminApplications = () => request<JobApplication[]>("/api/admin/job-applications");
export const updateAdminApplicationStatus = (id: number, status: string) =>
  request<JobApplication>(`/api/admin/job-applications/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
export const deleteAdminApplication = (id: number) =>
  request<void>(`/api/admin/job-applications/${id}`, { method: "DELETE" });

// Admin Contact Messages
export const getAdminMessages = () => request<ContactMessage[]>("/api/admin/messages");
export const deleteAdminMessage = (id: number) =>
  request<void>(`/api/admin/messages/${id}`, { method: "DELETE" });

// Admin Image Upload
export async function uploadAdminImage(file: File): Promise<{ url: string; originalFileName: string }> {
  const token = getAdminToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/uploads/admin/image`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!response.ok) throw new Error("Could not upload image.");
  return response.json();
}

export function imageUrl(url?: string) {
  if (!url) return undefined;
  return url.startsWith("/") ? `${API_URL}${url}` : url;
}
