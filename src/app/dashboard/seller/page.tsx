"use client"
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Divider,
  useTheme,
  Chip,
  CircularProgress,
} from "@mui/material";
import Navbar from "../../components/NavBar";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAuth } from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import apiClient from "@/api/apiClient";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { useTranslations } from "next-intl";
import DashBoardLayout from "@/app/layouts/DashboardLayout";

const SellerDashboard: React.FC = () => {
  const theme = useTheme();
   const { user, isAuthenticated, logout } = useAuth();
    const router = useRouter();
const [recentProjects, setRecentProjects] = useState<any[]>([]);
const [loadingProjects, setLoadingProjects] = useState(true);
const [bidSummary, setBidSummary] = useState<any>(null);

const {isArabic,locale} = useContext(LanguageContext);
const t = useTranslations("SellerDashboard")
useEffect(() => {
  const blockBackForward = () => {
    window.history.pushState(null, "", window.location.href);
  };

  window.addEventListener("popstate", blockBackForward);
  blockBackForward(); // push initial state

  return () => {
    window.removeEventListener("popstate", blockBackForward);
  };
}, []);


useEffect(() => {
  const fetchBids = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const res = await apiClient.get("http://localhost:3005/bids/paginated/all?page=1&limit=3");
      const bids = res.data?.Data?.bids;
      console.log(res);
      console.log(bids);
      console.log(recentProjects);
      if (res.data?.Success && Array.isArray(bids)) {
        setRecentProjects(bids);
      } else {
        setRecentProjects([]);
      }
    } catch (error) {
      console.error("❌ Failed to fetch bids:", error);
      setRecentProjects([]);
    } finally {
      setLoadingProjects(false);
    }
  };

  fetchBids();
}, [user?.id]);


    useEffect(() => {
      if (!isAuthenticated) router.push("/login");
    }, [isAuthenticated]);
  
    useEffect(() => {
  const fetchSummary = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !user?.id) return;

    try {
      const res = await apiClient.get(`http://localhost:3005/projects/sellersummary/${user.id}`);

      if (res.data?.Success && res.data?.Data) {
        setBidSummary(res.data.Data);
      } else {
        setBidSummary(null);
      }
    } catch (error) {
      console.error("Failed to fetch bid summary:", error);
      setBidSummary(null);
    }
  };

  fetchSummary();
}, [user]);

      // if (!user) return <div>Loading...</div>;
  // Dummy stats (replace later with API data)
  // const stats = [
  //   { label: "Active Bids", value: 0 },
  //   { label: "Projects Won", value: 0 },
  //   { label: "Completed", value: 0 },
  //   { label: "Total Earnings", value: "$0" },
  // ];
  //  const stats = [
  //   { label: `${t("Stats_Actives_Bids")}`, value: 0 },
  //   { label: `${t("Stats_Projects_Won")}`, value: 0 },
  //   { label: `${t("Stats_Completed")}`, value: 0 },
  //   { label: `${t("Stats_Total_Earnings")}`, value: "$0" },
  // ];

  const stats = [
  { label: t("Stats_Actives_Bids"), value: bidSummary?.["Active Bids"] || 0 },
  { label: t("Stats_Projects_Won"), value: bidSummary?.["Projects Won"] || 0 },
  { label: t("Stats_Completed"), value: bidSummary?.["Completed"] || 0 },
  { label: t("Stats_Total_Earnings"), value: `$${bidSummary?.["Total Earnings"] || 0}` },
];
// Recent projects array
  // const recentProjects:any = [
  //   {
  //     Title: "Restaurant Menu and Promotional Materials",
  //     CoverLetter: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis fugiat qui quo saepe? Non sit doloribus tempore aliquam, maxime velit deserunt maiores officia similique iste, enim necessitatibus explicabo, assumenda a!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis fugiat qui quo saepe? Non sit doloribus tempore aliquam, maxime velit deserunt maiores officia similique iste, enim necessitatibus explicabo, assumenda a!",
  //     StatusColor:"orange",
  //     Status: "In Progress",
  //     Budget: "Not Specified",
  //     Timeline: "3 weeks",
  //     SubmittedOn:"October 8, 2025, 03:51 PM"
  //   },
  //   {
  //     Title: "Project Two",
  //     CoverLetter: "Another brief outline",
  //     StatusColor:"green",
  //     Status: "Completed",
  //     Budget: "$500",
  //     Timeline: "2 weeks",
  //     SubmittedOn:"October 8, 2025, 03:51 PM"
  //   },
  //   {
  //     Title: "Project Three",
  //     CoverLetter: "Third project outline",
  //     StatusColor:"red",
  //     Status: "Not Started",
  //     Budget: "$200",
  //     Timeline: "1 week",
  //     SubmittedOn:"October 8, 2025, 03:51 PM"
  //   },
  // ];
  return (
  
<DashBoardLayout>
  {!user?(
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={80} thickness={5} />
      </Box>
    ):( 
    <Box
  sx={{
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
    overflowX: "hidden",
  }}
>
  {/* Navbar */}
  {/* <Navbar /> */}

  {/* Page content */}
  <Box
    sx={{
      pt: 12, // space for fixed navbar
      px: { xs: 2, sm: 4, md: 6 },
      pb: 6,
      mt:{xs:1,sm:2,md:0}
    }}
  >
    {/* ===== Top Stats (4 boxes) ===== */}
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        mb: 4,
      }}
    >
      {stats.map((stat, index) => (
        <Card
          key={index}
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            p: 2,
            width: {
              xs: "calc(50% - 8px)",
              sm: "calc(50% - 8px)",
              md: "calc(25% - 12px)",
            },
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ mb: 1 }}
            display="flex"
            justifyContent={isArabic ? "flex-end" : "flex-start"}
          >
            {stat.label}
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: theme.palette.primary.main }}
            display="flex"
            justifyContent={isArabic ? "flex-end" : "flex-start"}
          >
            {stat.value}
          </Typography>
        </Card>
      ))}
    </Box>

    {/* ===== Middle Actions (3 cards) ===== */}
    <Box
      sx={{
        display: "flex",
        gap: 5,
        flexDirection: { xs: "column", sm: "column", md: "row" },
        mb: 4,
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* Browse Projects */}
      <Card
        sx={{
          borderRadius: "24px",
          p: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          width: { xs: "100%", md: "calc(33.333% - 12px)" },
          height: "311.8px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box display="flex" justifyContent={isArabic ? "flex-end" : "flex-start"}>
          <Box
            sx={{
              borderRadius: "24px",
              height: "50px",
              width: "50px",
              backgroundColor: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon sx={{ fontSize: 26, color: "white" }} />
          </Box>
        </Box>

        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          display="flex"
          justifyContent={isArabic ? "flex-end" : "flex-start"}
        >
          {t("BrowseProjectHeader")}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
          display="flex"
          justifyContent={isArabic ? "flex-end" : "flex-start"}
        >
          {t("BrowseProjectContent")}
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            color: "#fff",
            fontWeight: 600,
            borderRadius: 3,
            width: "100%",
          }}
          onClick={() => router.push("/dashboard/seller/browseprojects")}
        >
          {t("BrowseProjectButton")}
        </Button>
      </Card>

      {/* My Bids */}
      <Card
        sx={{
          borderRadius: "24px",
          p: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          width: { xs: "100%", md: "calc(33.333% - 12px)" },
          height: "311.8px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box display="flex" justifyContent={isArabic ? "flex-end" : "flex-start"}>
          <Box
            sx={{
              borderRadius: "24px",
              height: "50px",
              width: "50px",
              backgroundColor: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WorkIcon sx={{ fontSize: 26, color: "white" }} />
          </Box>
        </Box>

        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          display="flex"
          justifyContent={isArabic ? "flex-end" : "flex-start"}
        >
          {t("MyBidsHeader")}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
          display="flex"
          justifyContent={isArabic ? "flex-end" : "flex-start"}
        >
          {t("MyBidsContent")}
        </Typography>
        <Button
          variant="outlined"
          sx={{ fontWeight: 600, borderRadius: 3, width: "100%" }}
          onClick={() => router.push("/dashboard/seller/managebids")}
        >
          {t("MyBidsButton")}
        </Button>
      </Card>

      {/* Profile Settings */}
      <Card
        sx={{
          borderRadius: "24px",
          p: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          width: { xs: "100%", md: "calc(33.333% - 12px)" },
          height: "311.8px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box display="flex" justifyContent={isArabic ? "flex-end" : "flex-start"}>
          <Box
            sx={{
              borderRadius: "24px",
              height: "50px",
              width: "50px",
              backgroundColor: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon sx={{ fontSize: 26, color: "white" }} />
          </Box>
        </Box>

        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          display="flex"
          justifyContent={isArabic ? "flex-end" : "flex-start"}
        >
          {t("ProfileSettingHeader")}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
          display="flex"
          justifyContent={isArabic ? "flex-end" : "flex-start"}
        >
          {t("ProfileSettingsContent")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              fontWeight: 600,
              borderRadius: 3,
              width: { xs: "100%", md: "40%" },
            }}
            onClick={() => router.push("/dashboard/seller/profilemanagement")}
          >
            {t("ProfileSettingsButton1")}
          </Button>
          <Button
            variant="outlined"
            sx={{
              fontWeight: 600,
              borderRadius: 3,
              width: { xs: "100%", md: "50%" },
            }}
            onClick={() => router.push("/updatepassword")}
          >
            {t("ProfileSettingsButton2")}
          </Button>
        </Box>
      </Card>
    </Box>

    {/* ===== Recent Activity / Available Projects ===== */}
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        p: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}
      >
        {t("AvailableProjects")}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {recentProjects.length === 0 ? (
        <Box
          sx={{
            minHeight: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: theme.palette.background.paper,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 6h18" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Box>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
            No projects yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start by posting your first project
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {recentProjects.map((bid: any, idx: number) => {
            const project = bid.projectInfo || {};
            const coverLetterPreview =
              bid.proposalText?.length > 430
                ? bid.proposalText.slice(0, 430) + "..."
                : bid.proposalText;

            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  p: 2,
                  backgroundColor: "white",
                  transition: "0.3s",
                  "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: 1, sm: 0 },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {project.title || "No title"}
                  </Typography>
                  <Chip
                    label={bid.status || "Unknown"}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      backgroundColor:
                        bid.status === "Withdrawn"
                          ? theme.palette.error.main
                          : theme.palette.success.main,
                    }}
                  />
                </Box>

                <Typography variant="caption" sx={{ color: "gray", mt: 0.5 }}>
                  Budget Range: {project.budgetRange || "N/A"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      backgroundColor: theme.palette.grey[100],
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AttachMoneyIcon
                        sx={{ fontSize: 18, color: theme.palette.primary.main }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Your Bid Amount
                      </Typography>
                    </Box>
                    <Typography sx={{ ml: 3, mt: 0.5 }} variant="body2" fontWeight={600}>
                      {bid.bidAmount || "N/A"}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      backgroundColor: theme.palette.grey[100],
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTimeIcon
                        sx={{ fontSize: 18, color: theme.palette.primary.main }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Timeline
                      </Typography>
                    </Box>
                    <Typography sx={{ ml: 3, mt: 0.5 }} variant="body2" fontWeight={600}>
                      {bid.timeline || "N/A"}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    backgroundColor: theme.palette.grey[100],
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Typography variant="body2" fontWeight={500}>
                    Your Proposal:
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {coverLetterPreview || "No proposal provided."}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Card>
  </Box>
  
</Box>
    )}
</DashBoardLayout>
  );
};

export default SellerDashboard;


