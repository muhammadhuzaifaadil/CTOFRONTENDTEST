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
import { useEffect } from "react";
const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const { user, isAuthenticated, logout,isLoading } = useAuth();
  const router = useRouter();

    useEffect(() => {
      if (!isLoading &&!isAuthenticated) router.push("/login");
    }, [isAuthenticated,isLoading]);
    
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
                  { id: 0, value: 1245, label: "Buyers" },
                  { id: 1, value: 856, label: "Sellers" },
                  { id: 2, value: 142, label: "Quality Experts" },
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
              2,243
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
              1,245
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
              856
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
              142
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
                  { id: 0, value: 156, label: "In Progress" },
                  { id: 1, value: 42, label: "Pending" },
                  { id: 2, value: 892, label: "Completed" },
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
              1,090
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
              156
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
              Pending Projects
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              42
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
              892
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

export default AdminDashboard;


{/* <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}> */}
          {/* User Statistics */}
          {/* <Card sx={{ flex: 1, p: 2, borderRadius: 3, boxShadow: 1, minWidth: 350 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              User Statistics
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {/* user */}
{/* <Box sx={{display:"flex", flexDirection:"row", width:"100%", gap:2}}>
            <Box sx={{ display: "flex", justifyContent:"flex-start",alignItems: "center", flexDirection:"column",gap: 3 }}>
              <Box sx={{display:"flex",width:"259.98px", height:"205.14px",border:"1px solid gray",borderRadius:3}}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 1245, label: "Buyers" },
                      { id: 1, value: 856, label: "Sellers" },
                      { id: 2, value: 142, label: "Experts" },
                    ],
                    innerRadius: 50,
                  },
                ]}
                width={180}
                height={180}
                sx={{}}
              />
            </Box>
              <Box sx={{border:"1px solid gray",borderRadius:2, width:"255.7px",height:"115.3px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <Box sx={{display:"flex",flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
                <Box sx={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
                <Typography variant="body2" color="gray">
                  Total Registered Users
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
                >
                  2243
                </Typography>
                </Box>
                 <Box sx={{display:"flex",height:"45px", width:"45px"}}>
                <WorkspacePremiumIcon sx={{fontSize:"45px", backgroundColor:'#5dfb52ff',}}/>
                </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection:"column", gap: 1.5, mt: 2 }}>
              
              <Card sx={{ flex: "1 1 55%", p: 1.5, borderRadius: 2,border:"1px solid gray", boxShadow: 0,width:"255.67px",height:"115.3px",flexDirection:"row" }}>
                <Box sx={{display:"flex",flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
                <Box sx={{display:"flex",flexDirection:"column"}}>
                <Typography variant="body2">Total Buyers</Typography>
                <Typography fontWeight={600}>1,245</Typography>
                </Box>
                <Box sx={{display:"flex"}}>
                <GroupIcon sx={{fontSize:"45px", backgroundColor:'lightblue',}}/>
                </Box>
                </Box>
              </Card>
             
              <Card sx={{  flex: "1 1 55%", p: 1.5, borderRadius: 2,border:"1px solid gray", boxShadow: 0,width:"255.67px",height:"115.3px",flexDirection:"row" }}>
                <Box sx={{display:"flex",flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
                <Box sx={{display:"flex",flexDirection:"column"}}>
                <Typography variant="body2">Total Sellers</Typography>
                <Typography fontWeight={600}>856</Typography>
                </Box>
                <Box sx={{display:"flex"}}>
                <GroupIcon sx={{fontSize:"45px", backgroundColor:'#ec43ff',}}/>
                </Box>
                </Box>
              </Card>
              <Card sx={{  flex: "1 1 55%", p: 1.5, borderRadius: 2,border:"1px solid gray", boxShadow: 0,width:"255.67px",height:"115.3px",flexDirection:"row" }}>
                <Box sx={{display:"flex",flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
                <Box sx={{display:"flex",flexDirection:"column"}}>
                <Typography variant="body2">Quality Experts</Typography>
                <Typography fontWeight={600}>142</Typography>
                </Box>
                <Box sx={{display:"flex",height:"45px", width:"45px"}}>
                <WorkspacePremiumIcon sx={{fontSize:"45px", backgroundColor:'#5dfb52ff',}}/>
                </Box>
                </Box>
              </Card>
            </Box>
</Box>
          </Card> */} 

          {/* Project Statistics */}
          {/* <Card sx={{ flex: 1, p: 2, borderRadius: 3, boxShadow: 1, minWidth: 350 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 1, color: "#333" }}
            >
              Project Statistics
            </Typography>
            <Divider sx={{ mb: 2 }} />
<Box sx={{display:"flex", flexDirection:"row", width:"100%", gap:2}}>
            <Box sx={{ display: "flex", justifyContent:"flex-start",alignItems: "center", flexDirection:"column",gap: 3 }}>
             <Box sx={{display:"flex",width:"100%", height:"205.14px",border:"1px solid gray",borderRadius:3}}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 156, label: "In Progress" },
                      { id: 1, value: 42, label: "Pending" },
                      { id: 2, value: 892, label: "Completed" },
                    ],
                    innerRadius: 50,
                  },
                ]}
                width={180}
                height={180}
              />
              </Box>
              <Box sx={{border:"1px solid gray",borderRadius:2, width:"255.7px",height:"115.3px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <Box sx={{display:"flex",flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
                <Box sx={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
                <Typography variant="body2" color="gray">
                  Total Projects
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
                >
                  1090
                </Typography>
                </Box>
                 <Box sx={{display:"flex",height:"45px", width:"45px"}}>
                <WorkIcon sx={{fontSize:"45px", backgroundColor:'#5dfb52ff',}}/>
                </Box>
                </Box>
              </Box>
      </Box>


            <Box sx={{ display: "flex", flexDirection:"column", gap: 1.5, mt: 2 }}>
              <Card sx={{ flex: "1 1 45%", p: 1.5, borderRadius: 2, boxShadow: 0 }}>
                <Typography variant="body2">Projects In Progress</Typography>
                <Typography fontWeight={600}>156</Typography>
              </Card>
              <Card sx={{ flex: "1 1 45%", p: 1.5, borderRadius: 2, boxShadow: 0 }}>
                <Typography variant="body2">Pending Projects</Typography>
                <Typography fontWeight={600}>42</Typography>
              </Card>
              <Card sx={{ flex: "1 1 45%", p: 1.5, borderRadius: 2, boxShadow: 0 }}>
                <Typography variant="body2">Completed Projects</Typography>
                <Typography fontWeight={600}>892</Typography>
              </Card>
            </Box>
</Box>
          </Card>
        </Box> */}