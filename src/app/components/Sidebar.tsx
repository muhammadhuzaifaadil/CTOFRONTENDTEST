// "use client";
// import React, { useContext } from "react";
// import {
//   Box,
//   Drawer,
//   Typography,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Button,
// } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PaymentsIcon from "@mui/icons-material/Payments";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { useRouter,usePathname } from "next/navigation";
// import { AuthContext } from "../contexts/AuthContext";
// import {  Group } from "@mui/icons-material";
// import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import SettingsIcon from '@mui/icons-material/Settings';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import BlockIcon from '@mui/icons-material/Block';
// import FolderOffIcon from '@mui/icons-material/FolderOff';
// const Sidebar: React.FC = () => {
//   const { user, logout } = useContext(AuthContext);
//   const router = useRouter();
// const pathname = usePathname();

//   // Only render sidebar if role === superadmin
// //   if (!user || user.role !== "superadmin") {
// //     return null;
// //   }

//   const handleLogout = async () => {
//     try {
//       await logout();
//       router.push("/login");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   const menuItems = [
//     {
//       text: "Dashboard",
//       icon: <DashboardIcon />,
//       path: "/dashboard/admin",
//       // active: true,
//     },
//     {
//       text: "Payments",
//       icon: <PaymentsIcon />,
//       path: "/dashboard/admin/payment",
//     },
//     {
//       text:"View Users",
//       icon: <Group />,
//       path:"/dashboard/admin/viewusers"
//     },
//     {
//       text:"View Projects",
//       icon: <BusinessCenterIcon />,
//       path:"/dashboard/admin/viewprojects"
//     },
//     {
//       text:"Generate Reports",
//       icon: <AssignmentIcon />,
//       path:"/dashboard/admin/viewreports"
//     }
//   ];
//   const superadminmenuItems = [
//     {
//       text: "Dashboard",
//       icon: <DashboardIcon />,
//       path: "/dashboard/admin",
//       // active: true,
//     },
//     {
//       text: "Manage Financials",
//       icon: <AttachMoneyIcon />,
//       path: "/dashboard/admin/payment",
//     },
//     {
//       text:"Manage Policies",
//       icon: <SettingsIcon />,
//       path:"/dashboard/admin/viewusers"
//     },
//     {
//       text:"Admin",
//       icon: <PersonAddIcon />,
//       path:"/dashboard/admin/viewprojects"
//     },
//     {
//       text:"Quality Experts",
//       icon: <PersonAddIcon />,
//       path:"/dashboard/admin/viewprojects"
//     },
//     {
//       text:"Block Accounts",
//       icon: <BlockIcon />,
//       path:"/dashboard/admin/viewreports"
//     },
//     {
//       text:"Block Projects",
//       icon: <FolderOffIcon />,
//       path:"/dashboard/admin/viewreports"
//     },
//     {
//       text:"Reports",
//       icon: <AssignmentIcon />,
//       path:"/dashboard/admin/viewreports"
//     }
//   ];
  
//   const itemsToRender =
//   user?.role === "superadmin" ? superadminmenuItems : menuItems;
//  return (
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
//       <Box sx={{ textAlign: "center", mb: 4 }}>
//         <Box
//           component="img"
//           src="/cto/Logo - Original.png"
//           alt="CTO Logo"
//           sx={{
//             width: 100,
//             height: "auto",
//             mx: "auto",
//             mb: 1,
//           }}
//         />
//         <Typography
//           variant="caption"
//           sx={{ color: "#C2C2C2", display: "block", fontWeight: "bold" }}
//         >
//           Cloud Technology Organized
//         </Typography>
//         <Typography
//           variant="caption"
//           sx={{ color: "#9CA3AF", display: "block" }}
//         >
//           Central Tech Oversight
//         </Typography>
//       </Box>

//       {/* --- Menu Items --- */}
//       <List sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
//   {itemsToRender.map((item, index) => {
//     // const isActive = pathname === item.path;
//     const isActive = pathname.startsWith(item.path);

//     return (
//       <ListItem
//         key={index}
//         disablePadding
//         sx={{ justifyContent: "center", gap: 2 }}
//       >
//         <ListItemButton
//           onClick={() => router.push(item.path)}
//           sx={{
//             mx: 2,
//             borderRadius: 1.5,
//             color: "white",
//             gap: 2,
//             backgroundColor: isActive ? "#6A6BFF" : "transparent",
//             "&:hover": { backgroundColor: "#6A6BFF" },
//             transition: "background-color 0.2s ease",
//           }}
//         >
//           <ListItemIcon
//             sx={{
//               color: "white",
//               minWidth: "36px",
//             }}
//           >
//             {item.icon}
//           </ListItemIcon>

//           <ListItemText
//             primary={item.text}
//             primaryTypographyProps={{
//               fontSize: "0.875rem",
//               fontWeight: 500,
//             }}
//           />
//         </ListItemButton>
//       </ListItem>
//     );
//   })}
// </List>


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



"use client";

import React, { useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Drawer,
  Box,
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
import Group from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BlockIcon from "@mui/icons-material/Block";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../contexts/AuthContext";

// Your auth context

const Sidebar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  // Prevent flicker: if there's no user, don't show the sidebar at all
  if (!user) return null;

  // Base dashboard path depends on role
  const baseDashboardPath =
    user.role === "superadmin" ? "/dashboard/superadmin" : "/dashboard/admin";

  const adminMenuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: baseDashboardPath,
    },
    {
      text: "Payments",
      icon: <PaymentsIcon />,
      path: `${baseDashboardPath}/payment`,
    },
    {
      text: "View Users",
      icon: <Group />,
      path: `${baseDashboardPath}/viewusers`,
    },
    {
      text: "View Projects",
      icon: <BusinessCenterIcon />,
      path: `${baseDashboardPath}/viewprojects`,
    },
    {
      text: "Generate Reports",
      icon: <AssignmentIcon />,
      path: `${baseDashboardPath}/viewreports`,
    },
  ];

  const superadminMenuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: baseDashboardPath,
    },
    {
      text: "Manage Financials",
      icon: <AttachMoneyIcon />,
      path: `${baseDashboardPath}/managefinancials`,
    },
    {
      text: "Manage Policies",
      icon: <SettingsIcon />,
      path: `${baseDashboardPath}/managepolicies`,
    },
    {
      text: "Admin",
      icon: <PersonAddIcon />,
      path: `${baseDashboardPath}/addadmin`,
    },
    {
      text: "Quality Experts",
      icon: <PersonAddIcon />,
      path: `${baseDashboardPath}/addqualityexperts`,
    },
    {
      text: "Block Accounts",
      icon: <BlockIcon />,
      path: `${baseDashboardPath}/blockaccounts`,
    },
    {
      text: "Block Projects",
      icon: <FolderOffIcon />,
      path: `${baseDashboardPath}/blockprojects`,
    },
    {
      text: "Reports",
      icon: <AssignmentIcon />,
      path: `${baseDashboardPath}/viewreports`,
    },
  ];

  const itemsToRender =
    user.role === "superadmin" ? superadminMenuItems : adminMenuItems;

  // Active item logic:
  // - Dashboard: active only on exact dashboard route
  // - Others: active on any nested route (startsWith)
  const isItemActive = (itemPath: string) => {
    if (itemPath === baseDashboardPath) {
      return pathname === itemPath;
    }
    return pathname.startsWith(itemPath);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
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
      {/* Logo */}
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

      {/* Menu Items */}
      <List
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
      >
        {itemsToRender.map((item, index) => {
          const active = isItemActive(item.path);

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
                  backgroundColor: active ? "#6A6BFF" : "transparent",
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

      {/* Logout */}
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