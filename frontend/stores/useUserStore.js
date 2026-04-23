import { create } from "zustand";
import { toast } from "sonner";

/* =======================
    Store
======================= */

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  setUser: (user) => set({ user }),

  updateUser: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),

  signup: async ({ name, email, phone, password, confirmPassword, token }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, token }),
      });

      const data = await res.json();
      if (data.success) {
        set({ user: data, loading: false });
        toast.success(data.message || "Signup successful! Redirecting...");
        return {
          redirectTo: '/login'
        };
      }
      toast.error(data.message || "Signup error at the moment. Please try again sometime.");
    } catch (error) {
      set({ loading: false });
      toast.error(error.message || "An error occurred");
    }
  },

  login: async (email, password, token) => {
    set({ loading: true });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, token }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message);

      set({ user: data, loading: false });
      const redirectTo = new URLSearchParams(window.location.search).get("next") || process.env.NEXT_PUBLIC_ROOT_URL;
      window.location.href = redirectTo || "/";
    } catch (error) {
      set({ loading: false });
      toast.error(error.message || "An error occurred");
    }
  },

  logout: async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      set({ user: null });
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.message || "An error occurred during logout");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/profile`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error();

      set({ user: data.user, checkingAuth: false });
    } catch {
      set({ user: null, checkingAuth: false });
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error();

      set({ checkingAuth: false });
      return data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },

  addBillingAddress: async (form) => {
    set({ loading: true });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/billing-address`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message);

      set((state) => ({
        user: state.user ? { ...state.user, address: form } : null,
        loading: false,
      }));

      toast.success("Address updated successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.message || "Some unexpected error occurred. Try again later!"
      );
    }
  },
}));

/* =======================
    Fetch Interceptor (401 Refresh)
======================= */

/*
// Uncomment and use if you need automatic token refreshing on 401 errors

let refreshPromise = null;
const originalFetch = window.fetch;

window.fetch = async (input, init) => {
  const response = await originalFetch(input, {
    credentials: "include",
    ...init,
  });

  if (response.status !== 401) {
    return response;
  }

  try {
    if (!refreshPromise) {
      refreshPromise = useUserStore.getState().refreshToken();
      await refreshPromise;
      refreshPromise = null;
    } else {
      await refreshPromise;
    }

    return originalFetch(input, {
      credentials: "include",
      ...init,
    });
  } catch (error) {
    await useUserStore.getState().logout();
    throw error;
  }
};
*/