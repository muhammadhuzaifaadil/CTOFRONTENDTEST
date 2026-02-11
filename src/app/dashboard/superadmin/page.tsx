"use client";
import Sidebar from "@/app/components/Sidebar";
import {
  Box,
  Card,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GroupIcon from '@mui/icons-material/Group';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
const SuperAdminDashboard: React.FC = () => {
  const theme = useTheme();
  const { user, isAuthenticated, logout,isLoading } = useAuth();
  const router = useRouter();
  const [stats,setStats] = useState<any>();
  const callStats = async() =>{
    const response = await apiClient.get("/superadmin/getStatistics");
    setStats(response.data.Data);
    console.log(response.data.Data);
  }
  useEffect(()=>{
    callStats();
  }
,[])
    useEffect(() => {
      if (!isLoading &&!isAuthenticated) router.push("/login");
    }, [isAuthenticated,isLoading]);
    if(!user)
        return null;
  return (
    <Box sx={{ display: "flex", width: "100%", backgroundColor: "#fafafa" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Page */}
      <Box sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column" }}>
        {/* ---- Header ---- */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
          >
            Dashboard Overview
          </Typography>
          <Typography variant="caption" sx={{ color: "gray" }}>
            Monitor system health and user activity in real-time
          </Typography>
        </Box>

        {/* ---- Statistics Section ---- */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
  {/* ===== User Statistics ===== */}
  <Card
    sx={{
      flex: 1,
      p: 3,
      borderRadius: 4,
      boxShadow: 2,
      minWidth: 360,
    }}
  >
    <Typography variant="subtitle1" fontWeight={600} mb={1}>
      User Statistics
    </Typography>
    <Divider sx={{ mb: 3 }} />

    <Box sx={{ display: "flex", gap: 3 }}>
      {/* Chart + Total */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Card
          sx={{
            p: 2,
            borderRadius: 3,
            border: "1px solid #e0e0e0",
            width: "100%",
            height: 210,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: stats?.users?.buyers || "1245", label: "Buyers" },
                  { id: 1, value: stats?.users?.sellers || "856", label: "Sellers" },
                  { id: 2, value: stats?.users?.qes || "142", label: "Quality Experts" },
                ],
                innerRadius: 50,
              },
            ]}
            width={200}
            height={180}
          />
        </Card>

        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderRadius: 3,
            boxShadow: "none",
            border: "1px solid #e0e0e0",
            width: "100%",
            height: 110,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Registered Users
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {stats?.users?.total || "2,243"}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: "#e3f2fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GroupIcon sx={{ fontSize: 35, color: "#1976d2" }} />
          </Box>
        </Card>
      </Box>

      {/* Right side stats */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderRadius: 3,
            boxShadow: "none",
            border: "1px solid #e0e0e0",
            width: 260,
            height: 110,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Buyers
            </Typography>
            <Typography variant="h5" fontWeight="bold">
             {stats?.users?.buyers || "1,245"}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: "#bbdefb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GroupIcon sx={{ fontSize: 35, color: "#1976d2" }} />
          </Box>
        </Card>

        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderRadius: 3,
            boxShadow: "none",
            border: "1px solid #e0e0e0",
            width: 260,
            height: 110,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Sellers
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {stats?.users?.sellers || "856"}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: "#f3e5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GroupIcon sx={{ fontSize: 35, color: "#ab47bc" }} />
          </Box>
        </Card>

        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderRadius: 3,
            boxShadow: "none",
            border: "1px solid #e0e0e0",
            width: 260,
            height: 110,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Quality Experts
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {stats?.users?.qes || "142"}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WorkspacePremiumIcon sx={{ fontSize: 35, color: "#43a047" }} />
          </Box>
        </Card>
      </Box>
    </Box>
  </Card>

  {/* ===== Project Statistics ===== */}
  <Card
    sx={{
      flex: 1,
      p: 3,
      borderRadius: 4,
      boxShadow: 2,
      minWidth: 360,
    }}
  >
    <Typography variant="subtitle1" fontWeight={600} mb={1}>
      Project Statistics
    </Typography>
    <Divider sx={{ mb: 3 }} />

    <Box sx={{ display: "flex", gap: 3 }}>
      {/* Chart + Total */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Card
          sx={{
            p: 2,
            borderRadius: 3,
            border: "1px solid #e0e0e0",
            width: "100%",
            height: 210,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: stats?.projects?.inProgress || 156, label: "In Progress" },
                  { id: 1, value: stats?.projects?.published || 42, label: "Published" },
                  { id: 2, value: stats?.projects?.completed || 892, label: "Completed" },
                ],
                innerRadius: 50,
              },
            ]}
            width={200}
            height={180}
          />
        </Card>

        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderRadius: 3,
            boxShadow: "none",
            border: "1px solid #e0e0e0",
            width: "100%",
            height: 110,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Projects
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {stats?.projects?.total || "1,090"}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: "#ede7f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WorkIcon sx={{ fontSize: 35, color: "#5e35b1" }} />
          </Box>
        </Card>
      </Box>

      {/* Right side stats */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderRadius: 3,
            boxShadow: "none",
            border: "1px solid #e0e0e0",
            width: 260,
            height: 110,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Projects In Progress
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {stats?.projects?.inProgress || "156"}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: "#e3f2fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WorkIcon sx={{ fontSize: 35, color: "#1976d2" }} />
          </Box>
        </Card>

        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderRadius: 3,
            boxShadow: "none",
            border: "1px solid #e0e0e0",
            width: 260,
            height: 110,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Published Projects
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {stats?.projects?.published || "42"}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: "#fff8e1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AccessTimeIcon sx={{ fontSize: 35, color: "#fbc02d" }} />
          </Box>
        </Card>

        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderRadius: 3,
            boxShadow: "none",
            border: "1px solid #e0e0e0",
            width: 260,
            height: 110,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Completed Projects
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {stats?.projects?.completed || "892"}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: "#e8f5e9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 35, color: "#43a047" }} />
          </Box>
        </Card>
      </Box>
    </Box>
  </Card>
</Box>


        {/* ---- Platform Activity ---- */}
        <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
          <Card sx={{ flex: 1, p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="body2" color="gray">
              Active Listings
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              487
            </Typography>
          </Card>
          <Card sx={{ flex: 1, p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="body2" color="gray">
              Pending Approvals
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              23
            </Typography>
          </Card>
          <Card sx={{ flex: 1, p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="body2" color="gray">
              System Alerts
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              5
            </Typography>
          </Card>
        </Box>

        {/* ---- Recent Alerts ---- */}
        <Card sx={{ mt: 3, p: 2, borderRadius: 3 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Recent Alerts
          </Typography>

          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            {/* Critical */}
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: "#ffe6e6",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <ErrorOutlineIcon color="error" />
              <Box>
                <Typography fontWeight={600} color="error.main">
                  Critical: Payment dispute on Project #1247
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  2 hours ago
                </Typography>
              </Box>
            </Box>

            {/* Warning */}
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: "#fff8e1",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <WarningAmberIcon color="warning" />
              <Box>
                <Typography fontWeight={600} color="warning.main">
                  Warning: Seller account flagged for review
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  5 hours ago
                </Typography>
              </Box>
            </Box>

            {/* Info */}
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: "#e3f2fd",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <InfoOutlinedIcon color="info" />
              <Box>
                <Typography fontWeight={600} color="info.main">
                  Info: 23 listings pending approval
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  6 hours ago
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default SuperAdminDashboard;