"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  InputBase,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Sidebar from "@/app/components/Sidebar";
import AddAdminDialog, { AddAdminFormValues } from "@/app/components/addadmindiaglog";
import apiClient from "@/api/apiClient";

type Admin = {
  id: string;
  name: string;
  role: string;
  experience: string; // e.g. "8 yrs"
  email: string;
};

const STATIC_ADMINS: Admin[] = [
  {
    id: "AD-001",
    name: "John Admin",
    role: "Super Admin",
    experience: "8 yrs",
    email: "john.admin@example.com",
  },
  {
    id: "AD-002",
    name: "Sara Manager",
    role: "Project Admin",
    experience: "5 yrs",
    email: "sara.manager@example.com",
  },
  {
    id: "AD-003",
    name: "Ali Operations",
    role: "Operations Admin",
    experience: "6 yrs",
    email: "ali.ops@example.com",
  },
];

const ManageAdmins: React.FC = () => {
  const theme = useTheme();
  const [search, setSearch] = useState("");
const [openAddAdmin, setOpenAddAdmin] = useState(false);

  // if you later want to add admins dynamically:
  // const [admins, setAdmins] = useState(STATIC_ADMINS);
 const [admins, setAdmins] = useState<any | null>(null);
// Toggle block/unblock
const toggleBlockUser = async (admin: any) => {
  try {
    // adjust endpoints/methods to your backend
    const url = admin.isBlocked
      ? `/superadmin/unblockUser/${admin.id}`   // UNBLOCK endpoint
      : `/superadmin/blockUser/${admin.id}`;   // BLOCK endpoint

    const response = await apiClient.patch(url); // or .post/.delete as your API expects

    if (response.data.Success) {
      await fetchAdmins(); // refresh list and counts
    } else {
      console.error("Failed to update user", response.data.Message);
    }
  } catch (e) {
    console.error("Failed to update user", e);
  }
};
const fetchAdmins = async () => {
  const res = await apiClient.get("/policies/getAllAdmins");
  console.log("Admins from API:", res.data.Data);
  setAdmins(res.data.Data); // { admins: [...], totalAdmins, ... }
};

useEffect(() => {
  fetchAdmins();
}, []);


const filteredAdmins = useMemo(() => {
  const q = search.trim().toLowerCase();
  const list = admins?.admins ?? []; // array from API

  if (!q) return list;

  return list.filter((a: any) => {
    const fullName = `${a.firstName ?? ""} ${a.lastName ?? ""}`.toLowerCase();
    const email = (a.email ?? "").toLowerCase();

    return (
      String(a.id).toLowerCase().includes(q) ||
      fullName.includes(q) ||
      email.includes(q)
    );
  });
}, [search, admins]);

  const totalAdmins = admins?.totalAdmins || 0;
  const activeAdmins = admins?.activeAdmins || 0; // static example
  const avgExperience = "10 yrs"; // static example
  // const removeUser = async (id: number) => {
  //   const response = await apiClient.delete(`/superadmin/removeUser/${id}`);
  //   if (response.data.Success === true) {
  //     fetchAdmins(); // refresh list after removal
  //   } else {
  //     console.error("Failed to remove user", response.data.Message);
  //     // optionally show snackbar / error handling
  //   }
  // }
  const handleAddAdminSave = async (values: AddAdminFormValues) => {
    try {
      // POST exactly in DTO shape
      await apiClient.post("/auth/register", values);
      await fetchAdmins(); // refresh list
    } catch (err) {
      console.error("Failed to register admin", err);
      // optionally show snackbar / error handling
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        gap: 2,
      }}
    >
      <Sidebar />

      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          mt: 2,
          px: { xs: 2, sm: 3, md: 6 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Title + subtitle */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
              >
                Manage Admins
              </Typography>
              <Typography variant="caption" sx={{ color: "gray" }}>
                Manage admins and create their accounts
              </Typography>
            </Box>

            {/* Add Admin button */}
            <Button
              variant="contained"
              startIcon={<PersonAddAltIcon />}
              sx={{
                borderRadius: "18px",
                textTransform: "none",
                px: 2.5,
                py: 0.75,
                bgcolor: theme.palette.primary.main,
                "&:hover": { bgcolor: theme.palette.primary.dark },
                fontSize: 14,
              }}
              onClick={() => setOpenAddAdmin(true)}
            >
              Add Admin
            </Button>
          </Box>
        </Box>

        {/* Upper Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            mt: 3,
            gap: 2,
          }}
        >
          {/* Total Admins */}
          <Box
            sx={{
              flex: "1 1 260px",
              minWidth: 260,
              display: "flex",
              alignItems: "center",
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              bgcolor: "#FFFFFF",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "#EEF2FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.primary.main,
              }}
            >
              <PeopleAltOutlinedIcon fontSize="small" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary">
                Total Admins
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {totalAdmins}
              </Typography>
            </Box>
          </Box>

          {/* Active Admins */}
          <Box
            sx={{
              flex: "1 1 260px",
              minWidth: 260,
              display: "flex",
              alignItems: "center",
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              bgcolor: "#FFFFFF",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "#ECFDF3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#16A34A",
              }}
            >
              <CheckCircleOutlineIcon fontSize="small" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary">
                Active Admins
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {activeAdmins}
              </Typography>
            </Box>
          </Box>

          {/* Avg Experience */}
          <Box
            sx={{
              flex: "1 1 260px",
              minWidth: 260,
              display: "flex",
              alignItems: "center",
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              bgcolor: "#FFFFFF",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "#EEF2FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.primary.main,
              }}
            >
              <AutoAwesomeMotionOutlinedIcon fontSize="small" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary">
                Avg Experience
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {avgExperience}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Search Box */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            mt: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.25,
              borderRadius: 999,
              bgcolor: "#F3F4F6",
            }}
          >
            <SearchIcon sx={{ color: "gray", fontSize: 20 }} />
            <InputBase
              placeholder="Search by name, email, role, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, fontSize: 14 }}
            />
          </Box>
        </Box>

        {/* Listings / Table */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            mt: 3,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            bgcolor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <Box
            sx={{
              display: "flex",
              bgcolor: "#F9FAFB",
              px: 2,
              py: 1,
              borderBottom: "1px solid #E5E7EB",
              fontSize: 12,
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            <Box sx={{ flex: "0 0 80px" }}>ID</Box>
            <Box sx={{ flex: "1 1 200px" }}>Name</Box>
            <Box sx={{ flex: "1 1 160px" }}>Role</Box>
            <Box sx={{ flex: "1 1 120px" }}>Experience</Box>
            <Box sx={{ flex: "1 1 220px" }}>Email</Box>
            <Box sx={{ flex: "0 0 120px", textAlign: "right" }}>Actions</Box>
          </Box>

          {/* Rows */}
   {filteredAdmins.map((admin: any) => (
  <Box
    key={admin.id}
    sx={{
      display: "flex",
      px: 2,
      py: 1.5,
      borderBottom: "1px solid #F3F4F6",
      fontSize: 13,
      alignItems: "center",
    }}
  >
    <Box sx={{ flex: "0 0 80px" }}>{admin.id}</Box>
    <Box sx={{ flex: "1 1 200px" }}>
      {admin.firstName} {admin.lastName}
    </Box>
    <Box sx={{ flex: "1 1 160px" }}>Admin</Box>
    <Box sx={{ flex: "1 1 120px" }}>N/A</Box>
    <Box sx={{ flex: "1 1 220px" }}>{admin.email}</Box>
    <Box
      sx={{
        flex: "0 0 120px",
        display: "flex",
        justifyContent: "flex-end",
        gap: 1,
      }}
    >
      <Button
        size="small"
        variant="text"
        color={admin.isBlocked ? "primary" : "error"}
        onClick={() => toggleBlockUser(admin)}
      >
        {admin.isBlocked ? "Unblock" : "Block"}
      </Button>
    </Box>
  </Box>
))}

          {filteredAdmins.length === 0 && (
            <Box
              sx={{
                px: 2,
                py: 3,
                textAlign: "center",
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              No admins found for “{search}”.
            </Box>
          )}
        </Box>
      </Box>
       <AddAdminDialog
        open={openAddAdmin}
        onClose={() => setOpenAddAdmin(false)}
        onSave={handleAddAdminSave}
      />
    </Box>
  );
};

export default ManageAdmins;