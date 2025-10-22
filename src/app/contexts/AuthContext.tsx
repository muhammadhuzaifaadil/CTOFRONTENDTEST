
"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/api/apiClient";

interface User {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  companyName: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  refreshAccessToken: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
  refreshAccessToken: async () => null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // HARDCODED USER FOR TESTING ON CERTAIN PAGES
  // const [user, setUser] = useState<User | null>({
  //   id: 1,
  //   email: "johndoe@example.com",
  //   role: "buyer",
  //   firstName: "John",
  //   lastName: "Doe",
  // });
  // Load saved auth from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccess = localStorage.getItem("accessToken");
    const storedRefresh = localStorage.getItem("refreshToken");

    if (storedUser && storedAccess && storedRefresh) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedAccess);
      setRefreshToken(storedRefresh);
    }
  }, []);

  // Login method
  const login = async (email: string, password: string) => {
    console.log("trying to login in login method");
    const res = await apiClient.post("/auth/login", { email, password });
    const { accessToken, refreshToken, user } = res.data;
        console.log("trying to login after login method",user);

    setUser(user);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // Redirect by role
    if (user.role === "buyer") router.push("/dashboard/buyer");
    else if (user.role === "seller") router.push("/dashboard/seller");
    else router.push("/dashboard/admin");
  };

  // Logout method
  const logout = async () => {
    try {
      await apiClient.post(
        "/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    } catch (err) {
      console.warn("Logout API failed", err);
    }

    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    router.push("/login");
  };

  // Refresh access token
  // const refreshAccessToken = async () => {
  //   if (!refreshToken||!user?.id) return null;

  //   try {
     
  //     const res = await apiClient.post("/auth/refresh", { user?.id,refreshToken });
  //     const { accessToken: newAccess } = res.data;

  //     setAccessToken(newAccess);
  //     localStorage.setItem("accessToken", newAccess);
  //     return newAccess;
  //   } catch (err) {
  //     console.error("Refresh token failed", err);
  //     logout(); // Clear session if refresh fails
  //     return null;
  //   }
  // };
const refreshAccessToken = async () => {
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const storedRefreshToken = localStorage.getItem("refreshToken");

  if (!parsedUser?.id || !storedRefreshToken) return null;

  try {
    const res = await apiClient.post("/auth/refresh", {
      userId: parsedUser.id,
      refreshToken: storedRefreshToken,
    });

    const { accessToken: newAccess } = res.data;

    setAccessToken(newAccess);
    localStorage.setItem("accessToken", newAccess);

    return newAccess;
  } catch (err) {
    console.error("Refresh token failed", err);
    logout(); // Clear session if refresh fails
    return null;
  }
};

  const isAuthenticated = !!user && !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        isAuthenticated,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
