// // components/ProtectedRoute.tsx
// "use client";
// import { useAuth } from "@/hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function ProtectedRoute({ allowedRoles, children }) {
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.push("/login");
//     } else if (!allowedRoles.includes(user.role)) {
//       router.push(`/dashboard/${user.role}`); // redirect back to correct dashboard
//     }
//   }, [user, router]);

//   return children;
// }
