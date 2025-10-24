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

const SellerDashboard: React.FC = () => {
  const theme = useTheme();
   const { user, isAuthenticated, logout } = useAuth();
    const router = useRouter();
const [recentProjects, setRecentProjects] = useState<any[]>([]);
const [loadingProjects, setLoadingProjects] = useState(true);
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
  
    
      if (!user) return <div>Loading...</div>;
  // Dummy stats (replace later with API data)
  // const stats = [
  //   { label: "Active Bids", value: 0 },
  //   { label: "Projects Won", value: 0 },
  //   { label: "Completed", value: 0 },
  //   { label: "Total Earnings", value: "$0" },
  // ];
   const stats = [
    { label: `${t("Stats_Actives_Bids")}`, value: 0 },
    { label: `${t("Stats_Projects_Won")}`, value: 0 },
    { label: `${t("Stats_Completed")}`, value: 0 },
    { label: `${t("Stats_Total_Earnings")}`, value: "$0" },
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
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        overflowX: "hidden",
      }}
    >
      {/* Navbar (fixed) */}
      <Navbar />

      {/* Page content container (account for fixed navbar with top padding) */}
      <Box
        sx={{
          pt: 12, // adjust if your navbar height differs
          px: { xs: 2, sm: 4, md: 6 },
          pb: 6,
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
                // Responsive widths using calc to preserve gap
                width: {
                  xs: "100%",
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
            flexDirection: "row",
            mb: 4,
            width:"100%",
            justifyContent:"space-between"
          }}
        >
          {/* Post New Project */}
          <Card
            sx={{
              borderRadius: "24px",
              p: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              width: { xs: "100%", md: "calc(33.333% - 12px)" },
              // width:"389.35px",
              height:"311.8px",
              display:"flex",
              flexDirection:"column",
              gap:2
            }}
          >
             <Box display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>
            <Box
              sx={{
                borderRadius: "24px",
                height: "50px",
                width: "50px",
                backgroundColor: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // ml:isArabic?43:0
              }}
            >
                        <SearchIcon sx={{ fontSize: 26, color: "white" }}/>
             </Box>
             </Box>
            <Typography variant="h6" fontWeight={600} gutterBottom display={"flex"} justifyContent={`${isArabic?"flex-end":"flex-start"}`}>
              {t("BrowseProjectHeader")}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2} display={"flex"} justifyContent={`${isArabic?"flex-end":"flex-start"}`}>
              {t("BrowseProjectContent")}
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                color: "#fff",
                fontWeight: 600,
                borderRadius: 3,
              }}
              onClick={() => router.push("/dashboard/seller/browseprojects")}
            >
              {t("BrowseProjectButton")}
            </Button>
          </Card>

          {/* My Projects */}
          <Card
            sx={{
              borderRadius: "24px",
              p: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              width: { xs: "100%", md: "calc(33.333% - 12px)" },
              //  width:"389.35px",
              height:"311.8px",
              display:"flex",
              flexDirection:"column",
              gap:2
            }}
          >
             <Box display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>
            <Box
              sx={{
                borderRadius: "24px",
                height: "50px",
                width: "50px",
                backgroundColor: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // ml:isArabic?43:0
              }}
            >
              <WorkIcon sx={{ fontSize: 26, color: "white" }} />
            </Box>
            </Box>
            <Typography variant="h6" fontWeight={600} gutterBottom display={"flex"} justifyContent={`${isArabic?"flex-end":"flex-start"}`}>
              {t("MyBidsHeader")}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2} display={"flex"} justifyContent={`${isArabic?"flex-end":"flex-start"}`}>
              {t("MyBidsContent")}
            </Typography>
            <Button
              variant="outlined"
              sx={{ fontWeight: 600, borderRadius: 3 }}
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
              //  width:"389.35px",
              height:"311.8px",
              display:"flex",
              flexDirection:"column",
              gap:2
            }}
          >
             <Box display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>
            <Box
              sx={{
                borderRadius: "24px",
                height: "50px",
                width: "50px",
                backgroundColor: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // ml:isArabic?43:0
              }}
            >
                        <PersonIcon sx={{ fontSize: 26, color: "white" }}/>
                       </Box>
</Box>
            <Typography variant="h6" fontWeight={600} gutterBottom display={"flex"} justifyContent={`${isArabic?"flex-end":"flex-start"}`}>
              {t("ProfileSettingHeader")}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2} display={"flex"} justifyContent={`${isArabic?"flex-end":"flex-start"}`}>
              {t("ProfileSettingsContent")}
            </Typography>
            <Box sx={{display:"flex", flexDirection:"row",alignItems:"center",justifyContent:"space-between", gap:1}}>
                        <Button
                          variant="outlined"
                          sx={{ fontWeight: 600, borderRadius: 3, width:"40%" }}
                          onClick={() => router.push("/dashboard/seller/profilemanagement")}
                        >
                          {t("ProfileSettingsButton1")}
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{ fontWeight: 600, borderRadius: 3,width:"50%" }}
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
    sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}
  >
    {t("AvailableProjects")}
  </Typography>
  <Divider sx={{ mb: 3 }} />

  {/* when no project */}
  {recentProjects.length === 0 ? (
    <>
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
          {/* placeholder icon circle */}
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
    </>
  ) : (
    <>
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
            {/* ===== Header ===== */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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

            {/* ===== Budget & Timeline ===== */}
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
                    sx={{
                      fontSize: 18,
                      color: theme.palette.primary.main,
                    }}
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
                    sx={{
                      fontSize: 18,
                      color: theme.palette.primary.main,
                    }}
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

            {/* ===== Proposal Text ===== */}
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
    </>
  )}
</Card>

      </Box>
    </Box>
  );
};

export default SellerDashboard;
{/* <Card
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
            Available Projects
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {/* when no project */}
                    // {recentProjects.length === 0 ? (
                     
                    //  <>
                    //  <Box
                    //   sx={{
                    //     minHeight: 220,
                    //     display: "flex",
                    //     alignItems: "center",
                    //     justifyContent: "center",
                    //     flexDirection: "column",
                    //     gap: 1,
                    //   }}
                    // >
                    //   <Box
                    //     sx={{
                    //       width: 56,
                    //       height: 56,
                    //       borderRadius: "50%",
                    //       backgroundColor: theme.palette.background.paper,
                    //       display: "flex",
                    //       alignItems: "center",
                    //       justifyContent: "center",
                    //       boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    //     }}
                    //   >
                    //     {/* placeholder icon circle */}
                    //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    //       <path d="M3 12h18" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                    //       <path d="M3 6h18" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                    //     </svg>
                    //   </Box>
                    //   <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                    //     No projects yet
                    //   </Typography>
                    //   <Typography variant="body2" color="text.secondary">
                    //     Start by posting your first project
                    //   </Typography>
                    // </Box>
                    //   </>
                    // ):(
                    // <Box
                    //   sx={{
                    //     minHeight: 220,
                    //     display: "flex",
                    //     alignItems: "center",
                    //     justifyContent: "center",
                    //     flexDirection: "column",
                    //     gap: 1,
                    //   }}
                    // >
                    //   {/* recent projects last 3 */}
                    //   {recentProjects.map((project:any, idx:any) => {
                    //     const coverLetterPreview = project.CoverLetter.length > 430 ? project.CoverLetter.slice(0, 430) + "..." : project.CoverLetter;
                    //     return (
                    //       <Box key={idx} sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:1, width:"100%", mb:2,boxShadow: "0 2px 10px rgba(0,0,0,0.05)", p:2, borderRadius:2}}>
                    //         {/* first inside row title status */}
                    //         <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%"}}>
                    //           <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-start", width:"100%"}}>
                    //           <Typography variant="subtitle1" sx={{fontWeight:600,width:"40%"}}>{project.Title}</Typography>
                    //           <Typography variant="subtitle2" sx={{textTransform:"capitalize", fontWeight:600, color:"black",backgroundColor:`${project.StatusColor}`,display:"flex",width:"8%",justifyContent:"center",borderRadius:"6px"}}>{project.Status}</Typography>
                    //            </Box>
                    //            <Box sx={{display:"flex", justifyContent:"flex-start", width:"100%"}}> 
                    //            <Typography variant="caption" sx={{color:"gray"}}>Submitted On {project.SubmittedOn}</Typography>
                    //         </Box>
                    //         </Box>
                    //         {/* 2nd row */}
                    //         <Box sx={{display:'flex', flexDirection:"row", justifyContent:"space-between", width:"100%", gap:2}}>
                    //           <Box sx={{display:"flex", flexDirection:"column", backgroundColor:"lightgray", width:"100%",gap:1,borderRadius:1, height:"76px"}}>
                    //             <Box sx={{display:"flex", flexDirection:'row', ml:2}}>
                    //             <AttachMoneyIcon sx={{fontSize:"18px",mt:"3px"}}/>
                    //             <Typography sx={{}}>Your Proposed Budget</Typography>

                    //             </Box>
                    //             <Box sx={{display:"flex", ml:2}}>
                    //             <Typography sx={{}}>{project.Budget}</Typography>

                    //             </Box>
                    //           </Box>
                    //           <Box sx={{display:"flex", flexDirection:"column", backgroundColor:"lightgray", width:"100%",gap:1,borderRadius:1, height:"76px"}}>
                    //             <Box sx={{display:"flex", flexDirection:'row', ml:2}}>
                    //             <AccessTimeIcon sx={{fontSize:"18px",mt:"3px"}}/>
                    //             <Typography sx={{}}>Your Proposed Timeline</Typography>
                    //             </Box>
                    //             <Box sx={{display:"flex", ml:2}}>
                    //             <Typography sx={{}}>{project.Timeline}</Typography>
                    //             </Box>
                    //           </Box>
                    //         </Box>
                    //         {/* third row project cover letter */}
                    //         <Box sx={{display:"flex",flexDirection:"column", width:"100%", backgroundColor:"lightgray",borderRadius:1, height:"85px",ml:"10px"}}>
                    //           <Typography sx={{ml:2}}>Your Cover Letter:</Typography>
                    //           <Typography sx={{ml:1}} variant="body2" color="gray">{coverLetterPreview}</Typography>
                    //         </Box>
                           
                    //       </Box>
                    //     );
                    //   })}
                    // </Box>
                    // )}
       // </Card> */}

