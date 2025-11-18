"use client";
import React, { useContext } from "react";
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentsIcon from "@mui/icons-material/Payments";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter,usePathname } from "next/navigation";
import { AuthContext } from "../contexts/AuthContext";
import { Group } from "@mui/icons-material";

const Sidebar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
const pathname = usePathname();
  // Only render sidebar if role === superadmin
//   if (!user || user.role !== "superadmin") {
//     return null;
//   }

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard/admin",
      // active: true,
    },
    {
      text: "Payments",
      icon: <PaymentsIcon />,
      path: "/dashboard/admin/payment",
    },
    {
      text:"View Users",
      icon: <Group />,
      path:"/dashboard/admin/viewusers"
    }
  ];
 return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 180,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 180,
          backgroundColor: "#232323",
          color: "white",
          borderRight: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 2,
        },
      }}
    >
      {/* --- Logo --- */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          component="img"
          src="/cto/Logo - Original.png"
          alt="CTO Logo"
          sx={{
            width: 100,
            height: "auto",
            mx: "auto",
            mb: 1,
          }}
        />
        <Typography
          variant="caption"
          sx={{ color: "#C2C2C2", display: "block", fontWeight: "bold" }}
        >
          Cloud Technology Organized
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#9CA3AF", display: "block" }}
        >
          Central Tech Oversight
        </Typography>
      </Box>

      {/* --- Menu Items --- */}
      <List sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path; // 👈 dynamic active check

          return (
            <ListItem
              key={index}
              disablePadding
              sx={{ justifyContent: "center", gap: 2 }}
            >
              <ListItemButton
                onClick={() => router.push(item.path)}
                sx={{
                  mx: 2,
                  borderRadius: 1.5,
                  color: "white",
                  gap: 2,
                  backgroundColor: isActive ? "#6A6BFF" : "transparent",
                  "&:hover": { backgroundColor: "#6A6BFF" },
                  transition: "background-color 0.2s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: "36px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider
        sx={{
          backgroundColor: "#3A3A3A",
          width: "80%",
          mt: 2,
          mb: 2,
        }}
      />

      {/* --- Logout --- */}
      <Box sx={{ width: "100%", mt: "auto", mb: 3, px: 2 }}>
        <Button
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          variant="outlined"
          fullWidth
          sx={{
            color: "red",
            borderColor: "red",
            textTransform: "none",
            borderRadius: 1.5,
            "&:hover": {
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.1)",
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
//   return (
//     <Drawer
//       variant="permanent"
//       anchor="left"
//       sx={{
//         width: 180,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: 180,
//           backgroundColor: "#232323",
//           color: "white",
//           borderRight: "none",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           paddingTop: 2,
//         },
//       }}
//     >
//       {/* --- Logo --- */}
//      <Box sx={{ textAlign: "center", mb: 4 }}>
//   <Box
//     component="img"
//     src="/cto/Logo - Original.png" // 👈 replace with your logo path
//     alt="CTO Logo"
//     sx={{
//       width: 100,
//       height: "auto",
//       mx: "auto",
//       mb: 1,
//     }}
//   />
//   <Typography
//     variant="caption"
//     sx={{ color: "#C2C2C2", display: "block",fontWeight:"bold" }}
//   >
//     Cloud Technology Organized
//   </Typography>
//   <Typography
//     variant="caption"
//     sx={{ color: "#9CA3AF", display: "block" }}
//   >
//     Central Tech Oversight
//   </Typography>
// </Box>


//       {/* --- Menu Items --- */}
//       <List sx={{ width: "100%", gap:3 }}>
//         {menuItems.map((item, index) => (
//           <ListItem key={index} disablePadding sx={{ justifyContent: "center",gap:2 }}>
//             <ListItemButton
//               onClick={() => router.push(item.path)}
//               sx={{
//                 mx: 2,
//                 borderRadius: 1.5,
//                 color: "white",
//                 gap:2,
//                 backgroundColor: item.active ? "#6A6BFF" : "transparent",
//                 "&:hover": { backgroundColor: "#6A6BFF" },
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   color: "white",
//                   minWidth: "36px",
//                   gap:2
//                 }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText
//                 primary={item.text}
//                 primaryTypographyProps={{
//                   fontSize: "0.875rem",
//                   fontWeight: 500,
//                 }}
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>

//       <Divider
//         sx={{
//           backgroundColor: "#3A3A3A",
//           width: "80%",
//           mt: 2,
//           mb: 2,
//         }}
//       />

//       {/* --- Logout --- */}
//       <Box sx={{ width: "100%", mt: "auto", mb: 3, px: 2 }}>
//         <Button
//           onClick={handleLogout}
//           startIcon={<LogoutIcon />}
//           variant="outlined"
//           fullWidth
//           sx={{
//             color: "red",
//             borderColor: "red",
//             textTransform: "none",
//             borderRadius: 1.5,
//             "&:hover": {
//               borderColor: "red",
//               backgroundColor: "rgba(255,0,0,0.1)",
//             },
//           }}
//         >
//           Logout
//         </Button>
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;
