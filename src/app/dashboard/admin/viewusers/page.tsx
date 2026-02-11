"use client"
import React from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  IconButton,
  Stack,
  useTheme,
  Avatar
} from "@mui/material";
// Import the icons
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import apiClient from "@/api/apiClient";

const ViewUsers: React.FC = () => {

  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const router = useRouter();
const [users, setUsers] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

const { accessToken } = useContext(AuthContext);


useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await apiClient.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Fetched users:", res.data);

      setUsers(res.data.Data || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  if (accessToken) fetchUsers();
}, [accessToken]);

  // Dummy array
  const payments: any[] = [
    { UserID: "PAY-001", userName: "John Smith", role: "Seller", PhoneNo: "PRJ-1247", CompanyName: "5000", Country: "Pending Review", Email: "johnsmith@example.com" },
    { UserID: "PAY-002", userName: "Sarah Johnson", role: "Quality Expert", PhoneNo: "PRJ-1248", CompanyName: "1500", Country: "Released", Email: "johnsmith@example.com" },
    { UserID: "PAY-003", userName: "Mike Wilson", role: "Seller", PhoneNo: "PRJ-1249", CompanyName: "7200", Country: "Halted", Email: "johnsmith@example.com" },
    { UserID: "PAY-004", userName: "Emily Davis", role: "Buyer", PhoneNo: "PRJ-1250", CompanyName: "3400", Country: "Pending Review", Email: "johnsmith@example.com" },
    { UserID: "PAY-005", userName: "Robert Brown", role: "Seller", PhoneNo: "PRJ-1251", CompanyName: "6100", Country: "Released", Email: "johnsmith@example.com" },
    { UserID: "PAY-006", userName: "Lisa Anderson", role: "Quality Expert", PhoneNo: "PRJ-1252", CompanyName: "2000", Country: "Pending Review", Email: "johnsmith@example.com" },
  ];

  // Filtering logic

  const mappedUsers = users.map((u) => ({
  UserID: `USR-${u.id}`,
  id: u.id,
  userName: `${u.firstName || ""} ${u.lastName || ""}`.trim() || "N/A",
  Email: u.email,
  PhoneNo: u.buyerProfile?.contact?.phoneCode + u.buyerProfile?.contact?.phoneNumber || u.sellerProfile?.contact?.phoneCode + u.sellerProfile?.contact?.phoneNumber || "—",
  CompanyName: u.buyerProfile?.company?.name || u.sellerProfile?.company?.name || "—",
  Country: u.buyerProfile?.contact?.country || u.sellerProfile?.contact?.country || "—",
  role: u.role?.name
    ? u.role.name.charAt(0).toUpperCase() + u.role.name.slice(1)
    : "Unknown",
}));
  const filteredPayments = mappedUsers.filter((p) => {
    const matchesSearch =
      p.UserID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.PhoneNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || p.role === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Action Handlers
  // const handleView = (id: number) => { onClick{( }};
  const handleEdit = (id: string) => { console.log("Edit", id); };
  const handleDelete = (id: string) => { console.log("Delete", id); };

  return (
    <Box sx={{ display: "flex", width: "100%", backgroundColor: "#fafafa", gap: 2, minHeight: '100vh', p: 2 }}>
      <Sidebar />
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", mt: 2 }}>
        {/* Header */}
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
            User Management
          </Typography>
          <Typography variant="caption" sx={{ color: "gray" }}>
            Monitor and control all users
          </Typography>
        </Box>

        {/* Search + Filter */}
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ bgcolor: 'white' }}
          />

          <Select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ width: 180, bgcolor: 'white' }}
          >
            <MenuItem value="All">All Users</MenuItem>
            <MenuItem value="Buyer">Buyers</MenuItem>
            <MenuItem value="Seller">Sellers</MenuItem>
            <MenuItem value="Quality Expert">Quality Expert</MenuItem>
          </Select>
        </Box>

        {/* Table */}

        {loading ? (
  <Typography sx={{ mt: 4 }}>Loading users...</Typography>
) : (
        <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2, boxShadow: '0px 2px 10px rgba(0,0,0,0.05)' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f9fafb' }}>
              <TableRow>
                <TableCell><strong>User ID</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email Address</strong></TableCell>
                <TableCell><strong>Phone Number</strong></TableCell>
                <TableCell><strong>Company Name</strong></TableCell>
                <TableCell><strong>Country</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell align="center"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredPayments.map((p) => (
                <TableRow key={p.UserID} hover>
                  <TableCell sx={{ color: '#6b7280' }}>{p.UserID}</TableCell>
                  
                  {/* Added Avatar for closer resemblance to image, optional */}
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>{p.userName.charAt(0)}</Avatar>
                        <Typography variant="body2">{p.userName}</Typography>
                    </Stack>
                  </TableCell>
                  
                  <TableCell sx={{ color: '#6b7280' }}>{p.Email}</TableCell>
                  <TableCell sx={{ color: '#6b7280' }}>{p.PhoneNo}</TableCell>
                  <TableCell sx={{ color: '#6b7280' }}>{p.CompanyName}</TableCell>
                  <TableCell sx={{ color: '#6b7280' }}>{p.Country}</TableCell>
                  
                  <TableCell>
                    {/* Updated styling to match the purple chip in the image */}
                    <Chip
                      label={p.role}
                      size="small"
                      sx={{
                        backgroundColor: "#eef2ff", // Light purple/blue bg
                        color: "#6366f1", // Purple text
                        fontWeight: 600,
                        borderRadius: 1,
                        fontSize: '0.75rem'
                      }}
                    />
                  </TableCell>

                  {/* --- MODIFIED ACTIONS COLUMN --- */}
                  <TableCell align="center">
                    <Stack direction="row" spacing={0} justifyContent="center">
                      <IconButton 
                        size="small" 
                        onClick={() => router.push(`/dashboard/admin/viewusers/${p.id}`)}
                        sx={{ color: '#6b7280' }} // Grey color
                      >
                        <VisibilityOutlinedIcon fontSize="small" />
                      </IconButton>
                      
                      <IconButton 
                        size="small" 
                        onClick={() => handleEdit(p.UserID)}
                        sx={{ color: '#6b7280' }}
                      >
                        <ModeEditOutlineOutlinedIcon fontSize="small" />
                      </IconButton>
                      
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(p.UserID)}
                        sx={{ color: '#6b7280' }}
                      >
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  {/* ------------------------------- */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
      </Box>
    </Box>
  );
}

export default ViewUsers;























{/* <Box display={"flex"} flexDirection={"column"}>
        <Box display={"flex"} justifyContent={"center"} sx={{gap:2,mt:2}}>
        <Button
          variant={type === "buyer" ? "contained" : "outlined"}
          onClick={() => setType("buyer")}
        >
          View Buyers
        </Button>
        <Button
          variant={type === "seller" ? "contained" : "outlined"}
          onClick={() => setType("seller")}
        >
          View Sellers
        </Button>
      </Box>
    
    <Box display={"flex"} flexDirection={"column"}>
        <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-start"}>
        <Button sx={{color:"0015459FD"}} onClick={()=>router.push("/dashboard/admin")}>Back</Button>
      </Box>
      <UserTable type={type} />
      </Box>
      </Box> */}