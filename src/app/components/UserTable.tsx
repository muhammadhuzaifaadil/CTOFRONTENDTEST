// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography,
//   Box,
// } from "@mui/material";
// import axios from "axios";
// import apiClient from "@/api/apiClient";

// interface UserTableProps {
//   type: "buyer" | "seller"; // determines which endpoint to call
// }

// interface BuyerSellerData {
//   id: number;
//   user: {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     createdAt: string;
//   };
//   contact?: {
//     phoneCode?: string;
//     phoneNumber?: string;
//     city?: string;
//     country?: string;
//   };
//   company?: {
//     name?: string;
//     logoUrl?: string;
//   };
//   acceptedTerms: boolean;
// }

// export default function UserTable({ type }: UserTableProps) {
//   const [data, setData] = useState<BuyerSellerData[]>([]);
//   const [loading, setLoading] = useState(true);

//   const endpoint = type === "buyer" ? "/auth/getallbuyers" : type=== "seller" ?  "/auth/getallsellers" :"";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await apiClient.get(endpoint);
//         setData(res.data);
//         console.log(res);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [endpoint]);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!data.length) {
//     return (
//       <Typography align="center" sx={{ mt: 2 }}>
//         No {type === "buyer" ? "buyers" : "sellers"} found.
//       </Typography>
//     );
//   }

//   return (
//     <TableContainer
//       component={Paper}
//       sx={{
//         mt: 3,
//         borderRadius: 3,
//         boxShadow: 3,
//         overflow: "hidden",
//       }}
//     >
//       <Table>
//         <TableHead>
//           <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//             <TableCell><b>ID</b></TableCell>
//             <TableCell><b>Full Name</b></TableCell>
//             <TableCell><b>Email</b></TableCell>
//             <TableCell><b>Company</b></TableCell>
//             <TableCell><b>Contact</b></TableCell>
//             <TableCell><b>City</b></TableCell>
//             <TableCell><b>Country</b></TableCell>
//             <TableCell><b>Joined On</b></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((item) => (
//             <TableRow key={item.id} hover>
//               <TableCell>{item.id}</TableCell>
//               <TableCell>
//                 {item.user?.firstName} {item.user?.lastName}
//               </TableCell>
//               <TableCell>{item.user?.email}</TableCell>
//               <TableCell>
//                 {item.company?.logoUrl ? (
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <img
//                       src={item.company.logoUrl}
//                       alt={item.company.name}
//                       width={30}
//                       height={30}
//                       style={{ borderRadius: "50%" }}
//                     />
//                     {item.company.name || "-"}
//                   </Box>
//                 ) : (
//                   item.company?.name || "-"
//                 )}
//               </TableCell>
//               <TableCell>
//                 {item.contact?.phoneCode || ""} {item.contact?.phoneNumber || "-"}
//               </TableCell>
//               <TableCell>{item.contact?.city || "-"}</TableCell>
//               <TableCell>{item.contact?.country || "-"}</TableCell>
//               <TableCell>
//                 {new Date(item.user?.createdAt).toLocaleDateString()}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }






import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import apiClient from "@/api/apiClient"; // adjust path as per your project

interface BuyerSellerData {
  id: number;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    createdAt?: string;
  };
  company?: {
    name?: string;
    logoUrl?: string;
  };
  contact?: {
    phoneCode?: string;
    phoneNumber?: string;
    city?: string;
    country?: string;
  };
}

interface UserTableProps {
  type?: "buyer" | "seller" | ""; // optional type
}

export default function UserTable({ type = "" }: UserTableProps) {
  const [data, setData] = useState<BuyerSellerData[]>([]);
  const [loading, setLoading] = useState(false);

  const endpoint =
    type === "buyer"
      ? "/auth/getallbuyers"
      : type === "seller"
      ? "/auth/getallsellers"
      : "";

  useEffect(() => {
    if (!endpoint) return; // 🧠 don't fetch if no type is selected

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(endpoint);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  // 🟢 No type selected yet
  if (!type) {
    return (
      <Typography align="center" sx={{ mt: 4, fontWeight: 500 }}>
        Please select a user type (Buyer or Seller) to view data.
      </Typography>
    );
  }

  // 🟡 Loading state
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 🔴 Empty data state
  if (!data.length) {
    return (
      <Typography align="center" sx={{ mt: 2 }}>
        No {type === "buyer" ? "buyers" : "sellers"} found.
      </Typography>
    );
  }

  // 🧾 Table display
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Full Name</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Company</b></TableCell>
            <TableCell><b>Contact</b></TableCell>
            <TableCell><b>City</b></TableCell>
            <TableCell><b>Country</b></TableCell>
            <TableCell><b>Joined On</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                {item.user?.firstName} {item.user?.lastName}
              </TableCell>
              <TableCell>{item.user?.email}</TableCell>
              <TableCell>
                {item.company?.logoUrl ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img
                      src={item.company.logoUrl}
                      alt={item.company.name}
                      width={30}
                      height={30}
                      style={{ borderRadius: "50%" }}
                    />
                    {item.company.name || "-"}
                  </Box>
                ) : (
                  item.company?.name || "-"
                )}
              </TableCell>
              <TableCell>
                {item.contact?.phoneCode || ""} {item.contact?.phoneNumber || "-"}
              </TableCell>
              <TableCell>{item.contact?.city || "-"}</TableCell>
              <TableCell>{item.contact?.country || "-"}</TableCell>
              <TableCell>
                {new Date(item.user?.createdAt || "").toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
