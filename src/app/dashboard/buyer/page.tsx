"use client"
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import Navbar from "../../components/NavBar";
import { useAuth } from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import AddIcon from '@mui/icons-material/Add';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PersonIcon from '@mui/icons-material/Person';
import DashBoardLayout from "@/app/layouts/DashboardLayout";
// import ProtectedRoute from "@/app/components/ProtectedRoute";
import apiClient from "@/api/apiClient";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { useTranslations } from "next-intl";
const BuyerDashboard: React.FC = () => {
  const theme = useTheme();
  const { user, isAuthenticated, logout,isLoading } = useAuth();
  const router = useRouter();
 const { isArabic, locale } = useContext(LanguageContext);
  const t = useTranslations("BuyerDashboard");
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
const [projectSummary, setProjectSummary] = useState<any>(null);
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
    if (!isLoading &&!isAuthenticated) router.push("/login");
  }, [isAuthenticated,isLoading]);

  // ✅ Fetch latest 3 projects of buyer
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     if (!user?.id) return;
  //     try {
  //       const res = await apiClient.get(`/projects?userId=${user.id}`);
  //       setRecentProjects(res.data.data || []); // depends on your ResultDto structure
  //     } catch (err) {
  //       console.error("Error fetching projects:", err);
  //     } finally {
  //       setLoadingProjects(false);
  //     }
  //   };

  //   fetchProjects();
  // }, [user?.id]);

  useEffect(() => {
  const fetchProjects = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return; // ⛔ Skip if logged out
    try {
      const res = await apiClient.get("/projects");
      if (res.data?.Success && Array.isArray(res.data.Data)) {
        setRecentProjects(res.data.Data);
      } else {
        setRecentProjects([]);
      }
    } catch (error) {
      console.error("Failed to fetch recent projects:", error);
      setRecentProjects([]);
    } finally {
      setLoadingProjects(false);
    }
  };

  fetchProjects();
}, [user?.id]);

useEffect(() => {
  const fetchSummary = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !user?.id) return;

    try {
      const res = await apiClient.get(`/projects/buyersummary/${user.id}`);

      if (res.data?.Success && res.data?.Data) {
        setProjectSummary(res.data.Data);
      } else {
        setProjectSummary(null);
      }
    } catch (error) {
      console.error("Failed to fetch project summary:", error);
      setProjectSummary(null);
    }
  };

  fetchSummary();
}, [user]);

    // if (!user) return <div>Loading...</div>;

  // Dummy stats (replace later with API data)
  // const stats = [
  //   { label: `${t("Stats_Actives_Projects")}`, value: 0 },
  //   { label: `${t("Stats_Pending_Bids")}`, value: 0 },
  //   { label: `${t("Stats_Completed")}`, value: 0 },
  //   { label: `${t("Stats_Total_Spent")}`, value: "$0" },
  // ];
  const stats = [
  { label: t("Stats_Actives_Projects"), value: projectSummary?.activeProjects || 0 },
  { label: t("Stats_Pending_Bids"), value: projectSummary?.pendingBids || 0 },
  { label: t("Stats_Completed"), value: projectSummary?.completed || 0 },
  { label: t("Stats_Total_Spent"), value: `$${projectSummary?.totalSpent || 0}` },
];
const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm")); 
  // Recent projects array
  // const recentProjects:any = [
  //   {
  //     Title: "Restaurant Menu and Promotional Materials",
  //     Outline: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis fugiat qui quo saepe? Non sit doloribus tempore aliquam, maxime velit deserunt maiores officia similique iste, enim necessitatibus explicabo, assumenda a!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis fugiat qui quo saepe? Non sit doloribus tempore aliquam, maxime velit deserunt maiores officia similique iste, enim necessitatibus explicabo, assumenda a!",
  //     StatusColor:"orange",
  //     Status: "In Progress",
  //     Budget: "Not Specified",
  //     Timeline: "3 weeks",
  //     Skills: "html,css,db",
  //   },
  //   {
  //     Title: "Project Two",
  //     Outline: "Another brief outline",
  //      StatusColor:"green",
  //     Status: "Completed",
  //     Budget: "$500",
  //     Timeline: "2 weeks",
  //     Skills: "react,typescript,api",
  //   },
  //   {
  //     Title: "Project Three",
  //     Outline: "Third project outline",
  //     StatusColor:"red",
  //     Status: "Not Started",
  //     Budget: "$200",
  //     Timeline: "1 week",
  //     Skills: "nodejs,express,mongodb",
  //   },
  // ];
 
  console.log(user);
  return (
    // <ProtectedRoute allowedRoles={["buyer"]}>    
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
        mt:0
      }}
    >
      {/* Navbar (fixed) */}
      {/* <Navbar /> */}

      {/* Page content container (account for fixed navbar with top padding) */}
      <Box
        sx={{
          pt: 12, // adjust if your navbar height differs
          px: { xs: 2, sm: 4, md: 6 },
          pb: 6,
        }}
      >
        {/* <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 3,
          }}
        >
          Welcome back,{" "}
          <Box component="span" sx={{ color: theme.palette.primary.main }}>
            {user.firstName} {user.lastName}
          </Box>
        </Typography> */}

        {/* ===== Top Stats (4 boxes) ===== */}
        <Box
          sx={{
            display: "flex",
            // flex:1,
            gap: 2,
            flexWrap: "wrap",
            flexDirection:isArabic?"row-reverse":"row",
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
                // Responsive widths using calc to preserve gap
                width: {
                  xs: "calc(50% - 8px)",
                  sm: "calc(50% - 8px)", // two columns on small screens
                  md: "calc(25% - 12px)", // four columns on md+
                },
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1 }} display={"flex"} justifyContent={`${isArabic?"flex-end":"flex-start"}`}>
                {stat.label}
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                display={"flex"} justifyContent={`${isArabic?"flex-end":"flex-start"}`}
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
    flexDirection: { xs: "column", sm: "column", md: isArabic?"row-reverse":"row" }, // 👈 only changes on small screens
    mb: 4,
    width: "100%",
    justifyContent: "space-between",
  }}
>
  {/* Post New Project */}
  <Card
    sx={{
      borderRadius: "24px",
      p: 3,
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      width: { xs: "100%", md: "calc(33.333% - 12px)" },
      height: "311.8px",
      // height:"min-content",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      
    }}
  >
    <Box display={"flex"} justifyContent={isArabic ? "flex-end" : "flex-start"}>
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
        <AddIcon sx={{ fontSize: 26, color: "white" }} />
      </Box>
    </Box>

    <Typography
      variant="h6"
      fontWeight={600}
      gutterBottom
      display={"flex"}
      justifyContent={isArabic ? "flex-end" : "flex-start"}
    >
      {t("PostProjectHeader")}
    </Typography>
<Box
    sx={{
      height: "80px",          // 👈 fixed height for content
      overflow: "hidden",      // hides extra text (or use auto to scroll)
    }}
  >
    <Typography
      variant="body2"
      color="text.secondary"
      fontSize={{xs:16,sm:18}}
      // fontWeight={"bold"}
      mb={2}
      display={"flex"}

      justifyContent={isArabic ? "flex-end" : "flex-start"}
    >
      {t("PostProjectContent")}
    </Typography>
   </Box>
    <Button
      variant="contained"
      sx={{
        background: theme.palette.primary.main,
        color: "#fff",
        fontWeight: 600,
        borderRadius: 3,
        width: "100%",
      }}
      onClick={() => router.push("/dashboard/buyer/createproject")}
    >
      {t("PostProjectButton")}
    </Button>
  </Card>

  {/* My Projects */}
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
    <Box display={"flex"} justifyContent={isArabic ? "flex-end" : "flex-start"}>
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
        <FolderOpenIcon sx={{ fontSize: 26, color: "white" }} />
      </Box>
    </Box>

    <Typography
      variant="h6"
      fontWeight={600}
      gutterBottom
      display={"flex"}
      justifyContent={isArabic ? "flex-end" : "flex-start"}
    >
      {t("MyProjectHeader")}
    </Typography>
<Box
    sx={{
      height: "80px",          // 👈 fixed height for content
      overflow: "hidden",      // hides extra text (or use auto to scroll)
    }}
  >
    <Typography
      variant="body2"
      color="text.secondary"
      mb={2}
      fontSize={{xs:16,sm:18}}
      display={"flex"}
      justifyContent={isArabic ? "flex-end" : "flex-start"}
    >
      {t("MyProjectContent")}
    </Typography>
</Box>
    <Button
      variant="outlined"
      sx={{ fontWeight: 600, borderRadius: 3 }}
      onClick={() => router.push("/dashboard/buyer/manageproject")}
    >
      {t("MyProjectButton")}
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
    <Box display={"flex"} justifyContent={isArabic ? "flex-end" : "flex-start"}>
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
      display={"flex"}
      justifyContent={isArabic ? "flex-end" : "flex-start"}
    >
      {t("ProfileSettingHeader")}
    </Typography>
<Box
    sx={{
      height: "80px",          // 👈 fixed height for content
      overflow: "hidden",      // hides extra text (or use auto to scroll)
    }}
  >
    <Typography
      variant="body2"
      color="text.secondary"
      fontSize={{xs:16,sm:18}}
      mb={2}

      display={"flex"}
      justifyContent={isArabic ? "flex-end" : "flex-start"}
    >
      {t("ProfileSettingsContent")}
    </Typography>
</Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap:1.5
      }}
    >
      <Button
        variant="outlined"
        sx={{
          fontWeight: 600,
          borderRadius: 3,
          width: { xs: "100%", md: "max-content" },
          
        }}
        onClick={() => router.push("/dashboard/buyer/profilemanagement")}
      >
        {t("ProfileSettingsButton1")}
      </Button>
      <Button
        variant="outlined"
        sx={{
          fontWeight: 600,
          borderRadius: 3,
          width: { xs: "100%",  md: "max-content"  },
        }}
        onClick={() => router.push("/updatepassword")}
      >
        {t("ProfileSettingsButton2")}
      </Button>
    </Box>
  </Card>
</Box>

        {/* ===== Recent Activity (large full-width card) ===== */}
       <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        p: 3,
      }}
    >
      <Typography
        variant="h6"
        display={"flex"}
        justifyContent={isArabic?"flex-end":"flex-start"}
        sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}
      >
        {t("RecentActivity")}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Loading state */}
      {loadingProjects ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", my: 4 }}
        >
          Loading recent projects...
        </Typography>
      ) : recentProjects.length === 0 ? (
        // ===== Static fallback when there are no projects =====
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
              <path
                d="M3 12h18"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M3 6h18"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
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
        // ===== Render recent projects =====
        <Box
          sx={{
            minHeight: 220,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {recentProjects.map((project: any, idx: number) => {
            const outlinePreview =
              project.outline?.length > 430
                ? project.outline.slice(0, 430) + "..."
                : project.outline;

            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "100%",
                  mb: 2,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  p: 2,
                  borderRadius: 2,
                }}
              >
                {/* Title + Status */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: isMobile ? "flex-start" : "center",
                    width: "100%",
                    flexDirection: isMobile ? "column" :(isArabic?"row-reverse":"row"),
                    gap: isMobile ? 1 : 0,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      width: isMobile ? "100%" : "40%",
                      display:"flex",
                      flexDirection:isArabic?"row":"row-reverse",
                      justifyContent:"flex-end"
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: 600,
                      color: "black",
                      backgroundColor: `${project.statusColor}`,
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "6px",
                      // width: isMobile ? "fit-content" : "8%",
                      width: {xs:"fit-content", sm:"15%", md:"12%",},
                      px: isMobile ? 1 : 0,
                    }}
                  >
                    {project.status}
                  </Typography>
                </Box>

                {/* Outline */}
                <Typography variant="body2" color="gray" sx={{display:"flex", justifyContent:isArabic?"flex-end":"flex-start"}}>
                  {outlinePreview}
                </Typography>

                {/* Budget, Timeline, Skills */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    mt: 1,
                    flexDirection: isMobile ? "column" : (isArabic?"row-reverse":"row"),
                  }}
                >
                  <Box sx={{ width: isMobile ? "100%" : "25%" }}>
                    <Typography
                      variant="caption"
                      color="gray"
                      sx={{ fontWeight: 600 }}
                    >
                      {t("Budget")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.budgetRange || "N/A"}
                    </Typography>
                  </Box>

                  <Box sx={{ width: isMobile ? "100%" : "25%" }}>
                    <Typography
                      variant="caption"
                      color="gray"
                      sx={{ fontWeight: 600 }}
                    >
                       {t("Timeline")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.timeline || "N/A"}
                    </Typography>
                  </Box>

                  <Box sx={{ width: isMobile ? "100%" : "25%" }}>
                    <Typography
                      variant="caption"
                      color="gray"
                      sx={{ fontWeight: 600 }}
                    >
                       {t("Skills")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.skillsRequired?.join(", ") || "N/A"}
                    </Typography>
                  </Box>
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
    // </ProtectedRoute>

  );
};

export default BuyerDashboard;


