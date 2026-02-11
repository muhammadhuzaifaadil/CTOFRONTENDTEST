"use client"
import Sidebar from "@/app/components/Sidebar"
import theme from "@/app/theme/theme"
import { PieChart } from '@mui/x-charts/PieChart';
import {
  Box,
  Button,
  Typography,
  TextField,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"
import Image from "next/image"
import { use, useContext, useEffect, useState } from "react"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined"
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined"
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined"
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined"
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined"
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined"
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined"
import { AuthContext } from "@/app/contexts/AuthContext";
import apiClient from "@/api/apiClient";

type TabKey = "profile" | "projects"
const ViewUser = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)
  console.log("Params in view user page:", id)
  // Static mock data for now – replace with API data later
  const userName = "Ali Mansour Al-Mahdi"
  const userEmail = "alimansour@gmail.com"
  const userRole = "Buyer"
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any>();

  const { accessToken } = useContext(AuthContext);
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await apiClient.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Fetched user:", res.data);

      setUsers(res.data.Data || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  if (accessToken) fetchUsers();
}, [accessToken]);
  const [activeTab, setActiveTab] = useState<TabKey>("profile")

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab)
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: "#fafafa",
        gap: 2,
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Sidebar />

      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", mt: 2 }}>
        {/* Header */}
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
          >
            {users?.firstName||""} {users?.lastName||""}
          </Typography>
          <Typography variant="caption" sx={{ color: "gray" }}>
            Manage Users &gt; {users?.firstName||""} {users?.lastName||""}
          </Typography>
        </Box>

        {/* User Details Section – CARD */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            mt: 3,
            p: 3,
            bgcolor: "#ffffff",
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            boxShadow: "0px 1px 3px rgba(15,23,42,0.08)",
          }}
        >
          {/* top box – avatar + basic info + actions */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            {/* Avatar + name/email/role */}
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
                 {users?.profile?.company?.logoUrl ? (
  <Image
    src={users.profile.company.logoUrl}
    alt="Company Logo"
    width={260}
    height={180}
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
) : (
  <Box
    sx={{
      width: "100%",
      height: 180,
      bgcolor: "#f3f4f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#9ca3af",
      fontSize: 14,
    }}
  >
    No logo available
  </Box>
)}

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {users?.firstName||""} {users?.lastName||""}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  {users?.email||"N/A"}
                </Typography>
                <Chip
                  label={users?.role?.name.charAt(0).toUpperCase() + users?.role?.name.slice(1) || "N/A"}
                  size="small"
                  sx={{
                    alignSelf: "flex-start",
                    mt: 0.5,
                    backgroundColor: "#eef2ff",
                    color: "#6366f1",
                    fontWeight: 600,
                    borderRadius: 1,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
            </Box>

            {/* Actions */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                marginLeft: "55%",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="small"
                sx={{
                  bgcolor: "#fef2f2",
                  color: "#f97373",
                  borderRadius: "50%",
                  "&:hover": { bgcolor: "#fee2e2" },
                }}
              >
                <BlockOutlinedIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                sx={{
                  bgcolor: "#fff7ed",
                  color: "#f97316",
                  borderRadius: "50%",
                  "&:hover": { bgcolor: "#ffedd5" },
                }}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </IconButton>

              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  px: 2.5,
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none" },
                }}
              >
                Edit Profile
              </Button>
            </Box>

            {/* keep this Box to respect your outline (unused spacer) */}
            <Box />
          </Box>

          {/* bottom box – tabs + content (Profile / Projects) */}
          <Box sx={{ display: "flex", flexDirection: "column", mt: 2, gap: 3 }}>
            {/* Tabs: Profile / Projects */}
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              <Button
                variant={activeTab === "profile" ? "contained" : "outlined"}
                size="small"
                onClick={() => handleTabChange("profile")}
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  px: 3,
                  fontWeight: 500,
                  backgroundColor:
                    activeTab === "profile" ? theme.palette.primary.main : "#ffffff",
                  color: activeTab === "profile" ? "#ffffff" : "#4b5563",
                  borderColor: activeTab === "profile" ? "transparent" : "#e5e7eb",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor:
                      activeTab === "profile"
                        ? theme.palette.primary.dark
                        : "#f9fafb",
                    boxShadow: "none",
                  },
                }}
              >
                Profile
              </Button>

              <Button
                variant={activeTab === "projects" ? "contained" : "outlined"}
                size="small"
                onClick={() => handleTabChange("projects")}
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  px: 3,
                  fontWeight: 500,
                  backgroundColor:
                    activeTab === "projects" ? theme.palette.primary.main : "#ffffff",
                  color: activeTab === "projects" ? "#ffffff" : "#4b5563",
                  borderColor: activeTab === "projects" ? "transparent" : "#e5e7eb",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor:
                      activeTab === "projects"
                        ? theme.palette.primary.dark
                        : "#f9fafb",
                    boxShadow: "none",
                  },
                }}
              >
                Projects
              </Button>
            </Box>

            {activeTab === "profile" ? (
              <ProfileSection users={users} />
            ) : (
              <ProjectsSection users={users}/>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

/* ---------------- PROFILE SECTION (existing design) ---------------- */

const ProfileSection: React.FC<{ users: any }> = ({ users }) => (
  <>
    {/* Personal Information header with underline */}
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          pb: 0.75,
          mr: 2,
        }}
      >
        <PersonOutlineOutlinedIcon
          sx={{ color: theme.palette.primary.main, fontSize: 20 }}
        />
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
        >
          Personal Information
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, borderBottom: "1px solid #e5e7eb" }} />
    </Box>

    {/* Form fields (3 columns on desktop, stacked on mobile) */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        mt: 1,
      }}
    >
      {/* Column 1 */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "#6b7280", mb: 0.5, display: "block" }}
          >
            First Name
          </Typography>
          <TextField
            variant="standard"
            defaultValue={`${users?.firstName||""}`}
            fullWidth
            InputProps={{ disableUnderline: false }}
            
          />
            {/* {users}
          </TextField> */}
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{ color: "#6b7280", mb: 0.5, display: "block" }}
          >
            Phone Number
          </Typography>
          <TextField
            variant="standard"
            defaultValue={users?.profile?.contact?.phoneCode + users?.profile?.contact?.phoneNumber || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{ color: "#6b7280", mb: 0.5, display: "block" }}
          >
            Country
          </Typography>
          <TextField
            variant="standard"
            defaultValue={users?.profile?.contact?.country||""}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Box>

        {/* Business Licence card */}
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "#6b7280", mb: 0.5, display: "block" }}
          >
            Business Licence
          </Typography>

          <Box
            sx={{
              mt: 1,
              borderRadius: 2,
              border: "1px solid #e5e7eb",
              bgcolor: "#fafafa",
              p: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1.5,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Ali Mansour Licence.pdf
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <IconButton size="small" sx={{ color: "#6b7280" }}>
                  <CloudDownloadOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: "#6b7280" }}>
                  <AutorenewOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

         

          </Box>
        </Box>
      </Box>

      {/* Column 2 */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "#6b7280", mb: 0.5, display: "block" }}
          >
            Last Name
          </Typography>
          <TextField
            variant="standard"
            defaultValue={users?.lastName||""}
            fullWidth
            InputProps={{ disableUnderline: false }}
          />
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{ color: "#6b7280", mb: 0.5, display: "block" }}
          >
            Address
          </Typography>
          <TextField
            variant="standard"
            defaultValue={users?.profile?.contact?.address||""}
            fullWidth
            InputProps={{ disableUnderline: false }}
          />
        </Box>
      </Box>

      {/* Column 3 */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "#6b7280", mb: 0.5, display: "block" }}
          >
            Email Address
          </Typography>
          <TextField
            variant="standard"
            defaultValue={users?.email||""}
            fullWidth
            InputProps={{ disableUnderline: false }}
          />
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{ color: "#6b7280", mb: 0.5, display: "block" }}
          >
            City
          </Typography>
          <TextField
            variant="standard"
            defaultValue={users?.profile?.contact?.city||""}
            fullWidth
            InputProps={{ disableUnderline: false }}
          />
        </Box>
      </Box>
    </Box>

    {/* Bottom buttons */}
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 2,
        mt: 3,
      }}
    >
      <Button
        variant="outlined"
        sx={{
          textTransform: "none",
          borderRadius: 999,
          px: 3,
          borderColor: "#e5e7eb",
          color: "#4b5563",
          bgcolor: "#ffffff",
          "&:hover": {
            borderColor: "#d1d5db",
            bgcolor: "#f9fafb",
          },
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          borderRadius: 999,
          px: 3,
          backgroundColor: theme.palette.primary.main,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: "none",
          },
        }}
      >
        Save Changes
      </Button>
    </Box>
  </>
)

/* ---------------- PROJECTS SECTION (new, matches screenshot) ---------------- */

const ProjectsSection: React.FC<{ users: any }> = ({ users }) => {

  const [summary, setSummary] = useState<{
    totalBudget: number
    totalBudgetFormatted: string
    totalProjects: number
    completedProjects: number
    totalInProgress: number
    totalPublished: number
    completionRate: string
    averageDurationDays: number
    averageDurationFormatted: string
    AcceptedProjects?: number
    pendingBids?: number
    totalRejected?: number
  } | null>(null)
  const [project, setProjects] = useState<any[]>([])
  useEffect(() => {
    // fetch summary data
    if(users?.role?.name==="seller")
    {
      apiClient.get(`/admin/SellerUserProjectSummary/${users?.id}`)
    .then((res) =>{
      if (res.data.Success) {
      console.log("user Project Data",res.data.Data);
          setSummary(res.data.Data)
      }
    })
    .catch((err) => console.error(err))
  }else{
    apiClient
      .get(`/admin/userProjectSummary/${users?.id}`)
      .then((res) => {
        if (res.data.Success) {
          console.log("Project summary data:", res.data.Data)
          setSummary(res.data.Data)
        }
      })
      .catch((err) => console.error(err))
  }}, [])
  useEffect(() => {
    if(users?.role?.name==="seller")
    {
      apiClient.get(`/admin/SellerUserProjects/${users?.id}`)
    .then((res) =>{
      if (res.data.Success) {
      console.log("user Project Data",res.data.Data);
      setProjects(res.data.Data);
      }
    })
    .catch((err) => console.error(err))
  }
  else{
    apiClient.get(`/admin/userProjects/${users?.id}`)
    .then((res) =>{
      if (res.data.Success) {
      console.log("user Project Data",res.data.Data);
      setProjects(res.data.Data);
      }
    })
    .catch((err) => console.error(err))
  }}, [])

  const overviewCards = [
    {
      title: "Total Projects",
      value: summary?.totalProjects.toString() || "0",
      // change: "N/A",
      // changeType: "up" as const,
      icon: <FolderOpenOutlinedIcon sx={{ color: "#f97316" }} />,
      iconBg: "#fffbeb",
    },
    {
      title: "Completion Rate",
      value: summary?.completionRate || "0%",
      // change: "N/A",
      // changeType: "up" as const,
      icon: <BarChartOutlinedIcon sx={{ color: "#6366f1" }} />,
      iconBg: "#eef2ff",
    },
    {
      title: "Total Budget",
      value: summary?.totalBudgetFormatted || "$0",
      // change: "N/A",
      // changeType: "up" as const,
      icon: <PaidOutlinedIcon sx={{ color: "#22c55e" }} />,
      iconBg: "#ecfdf3",
    },
    {
      title: "Avg Project Duration",
      value: summary?.averageDurationFormatted || "0 Days",
      // change: "N/A",
      // changeType: "up" as const,
      icon: <AccessTimeOutlinedIcon sx={{ color: "#f59e0b" }} />,
      iconBg: "#fef3c7",
    },
  ]

  const progressLegend = [
    { label: `${users?.role?.name === "seller" ? "Accepted" : "Completed"}`, value: `${users?.role?.name === "seller" ? summary?.AcceptedProjects : summary?.completedProjects}`,  color: "#22c55e" },
    { label: `${users?.role?.name === "seller" ? "Pending" : "In Progress"}`, value: `${users?.role?.name === "seller" ? summary?.pendingBids : summary?.totalInProgress}`,  color: "#f97316" },
    { label: `${users?.role?.name === "seller" ? "Rejected" : "Published"}`, value: `${users?.role?.name === "seller" ? summary?.totalRejected : summary?.totalPublished}`,  color: `${users?.role?.name === "seller" ? "red" : "cyan"}` },
  ]

  const budgetData = [
    { label: "Total Budget", amount: parseInt(`${summary?.totalBudget}`), color: "#3b82f6" },
    { label: "Completed", amount: parseInt(`${users?.role?.name === "seller" ? summary?.AcceptedProjects : summary?.completedProjects}`), color: "#22c55e" },
    { label: "In Progress", amount: parseInt(`${users?.role?.name === "seller" ? summary?.pendingBids : summary?.totalInProgress}`), color: "#f97316" },
    { label: "Published", amount: parseInt(`${users?.role?.name === "seller" ? summary?.totalRejected : summary?.totalPublished}`), color: `${users?.role?.name === "seller" ? "red" : "cyan"}` },
  ]
  const maxAmount = Math.max(...budgetData.map((b) => b.amount))
 
  const projectRows = project.map((proj: any) => ({
  sr: `${proj.id}`,
  name: proj.title,
  start: new Date(proj.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }),
  budget: `$${proj.budgetRange}`,
  status: (users?.role?.name === "seller" ? proj.sellerBidStatus : proj.status),
  statusColor: proj.statusColor,
}))

  const getStatusChipStyles = (status: string) => {
    if (status === "Completed") {
      return { bg: "#dcfce7", color: "#16a34a" }
    }
    if (status === "In Process") {
      return { bg: "#ffedd5", color: "#ea580c" }
    }
    return { bg: "#fee2e2", color: "#ef4444" } // Rejected
  }

  return (
    <>
      {/* Overview header + filter */}
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Overview</Typography>
      </Box>

      {/* Top stat cards */}
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mt: 2 }}>
        {overviewCards.map((card) => (
          <Box
            key={card.title}
            sx={{
              flex: 1,
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              bgcolor: "#ffffff",
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: card.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {card.icon}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="caption" sx={{ textTransform: "uppercase", color: "#6b7280" }}>{card.title}</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{card.value}</Typography>
              {/* <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
                {card.changeType === "up" ? (
                  <TrendingUpOutlinedIcon fontSize="small" sx={{ color: "#16a34a" }} />
                ) : (
                  <TrendingDownOutlinedIcon fontSize="small" sx={{ color: "#ef4444" }} />
                )}
                <Typography variant="caption" sx={{ color: card.changeType === "up" ? "#16a34a" : "#ef4444" }}>{card.change}</Typography>
              </Box> */}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Charts row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 2,
          mt: 3,
        }}
      >
        {/* Overall Progress */}
        <Box
          sx={{
            flex: 1,
            p: 2.5,
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            bgcolor: "#ffffff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Overall Progress
            </Typography>
            {/* <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: "none",
                borderRadius: 999,
                px: 1.5,
                borderColor: "#e5e7eb",
                color: "#4b5563",
                bgcolor: "#ffffff",
                "&:hover": {
                  borderColor: "#d1d5db",
                  bgcolor: "#f9fafb",
                },
              }}
            >
              All
              <KeyboardArrowDownIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Button> */}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              alignItems: "center",
            }}
          >
            {/* Donut chart (CSS-based) */}
            <Box
              sx={{
                width: 190,
                height: 190,
                borderRadius: "50%",
                background:
                  "conic-gradient(#22c55e 0 50%, #f97316 50% 90%, #ef4444 90% 100%)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  bgcolor: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {summary?.totalProjects}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#6b7280", mt: 0.5 }}
                >
                  Total
                </Typography>
              </Box>
            </Box>

            {/* Legend */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                width: "100%",
              }}
            >
              {progressLegend.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: item.color,
                      }}
                    />
                    <Typography variant="body2">{item.label}</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280" }}
                  >{`${item.value}`}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Total Budget Breakdown */}
        <Box
          sx={{
            flex: 1,
            p: 2.5,
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            bgcolor: "#ffffff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Total Budget Breakdown
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              mt: 1,
            }}
          >
            {/* Bars */}
            <Box sx={{ flex: 1 }}>
              {budgetData.map((item) => (
                <Box key={item.label} sx={{ mb: 1.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#6b7280" }}
                    >{`$${item.amount.toLocaleString()}`}</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: 14,
                      borderRadius: 999,
                      bgcolor: "#f3f4f6",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${(item.amount / maxAmount) * 100}%`,
                        height: "100%",
                        borderRadius: 999,
                        bgcolor: item.color,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Legend */}
            <Box
              sx={{
                width: { xs: "100%", md: 160 },
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {budgetData.map((item) => (
                <Box
                  key={item.label}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: item.color,
                    }}
                  />
                  <Typography variant="body2">{item.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Project Summary table */}
      <Box
        sx={{
          mt: 3,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          bgcolor: "#ffffff",
          p: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Project Summary
          </Typography>

          {/* <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: 999,
              px: 2,
              borderColor: "#e5e7eb",
              color: "#4b5563",
              bgcolor: "#ffffff",
              "&:hover": {
                borderColor: "#d1d5db",
                bgcolor: "#f9fafb",
              },
            }}
          >
            All
            <KeyboardArrowDownIcon fontSize="small" sx={{ ml: 0.5 }} />
          </Button> */}
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Sr. No.</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Project Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
                {/* <TableCell sx={{ fontWeight: 600 }}>Finish Date</TableCell> */}
                <TableCell sx={{ fontWeight: 600 }}>Budget</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {projectRows.map((row: any) => {
    const { bg, color } = getStatusChipStyles(row.status)

    return (
      <TableRow key={row.sr} hover>
        <TableCell>{row.sr}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.start}</TableCell>
        <TableCell>{row.budget}</TableCell>
        <TableCell>
          <Chip
            label={row.status}
            size="small"
            sx={{
              backgroundColor: `${row.statusColor}`,
              color:"black",
              fontWeight: 500,
              borderRadius: 1,
            }}
          />
        </TableCell>
      </TableRow>
    )
  })}
</TableBody>

          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default ViewUser
