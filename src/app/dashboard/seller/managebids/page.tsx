"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  Divider,
  useTheme,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DashBoardLayout from "../../../layouts/DashboardLayout";
import { useRouter } from "next/navigation";
import apiClient from "@/api/apiClient"; // ✅ your axios instance
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";

const ManageBids: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const {isArabic,locale} = useContext(LanguageContext)
  const {user} = useAuth();
  const t = useTranslations("BidManagement")
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<"Pending" | "Accepted" | "Rejected" | "Withdrawn">("Pending");
  const [selectedStatusArabic,setSelectedStatusArabic]= useState("")
  useEffect(() => {
    const fetchBids = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await apiClient.get("http://localhost:3005/bids/paginated/all?page=1&limit=10");
        const bidsData = res.data?.Data?.bids;

        if (res.data?.Success && Array.isArray(bidsData)) {
          // 🔁 Map the API data into your frontend display structure
          const mapped = bidsData.map((b: any) => ({
            Title: b.projectInfo?.title || "No Title",
            CoverLetter: b.proposalText || "No proposal provided",
            Status: b.status || "Unknown",
            Budget: b.bidAmount || "N/A",
            Timeline: b.timeline || "N/A",
            SubmittedOn: new Date(b.createdAt).toLocaleString(),
          }));
          setBids(mapped);
        } else {
          setBids([]);
        }
      } catch (err) {
        console.error("❌ Failed to fetch bids:", err);
        setBids([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);


  const statusLabelMap: Record<string, string> = {
  Pending: isArabic ? t("Status1") : "Pending",
  Accepted: isArabic ? t("Status2") : "Accepted",
  Rejected: isArabic ? t("Status3") : "Rejected",
  Withdrawn: isArabic ? t("Status4") : "Withdrawn",
};

  const filteredProjects = bids.filter(
    (b) => b.Status.toLowerCase() === selectedStatus.toLowerCase()
  );

  const statusCounts = {
    Pending: bids.filter((p) => p.Status.toLowerCase() === "pending").length,
    Accepted: bids.filter((p) => p.Status.toLowerCase() === "accepted").length,
    Rejected: bids.filter((p) => p.Status.toLowerCase() === "rejected").length,
    Withdrawn: bids.filter((p) => p.Status.toLowerCase() === "withdrawn").length,
  };

  const colorMap: Record<string, string> = {
    Pending: "orange",
    Accepted: "green",
    Rejected: "red",
    Withdrawn: theme.palette.error.main,
  };

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "white",
    mt: {xs:6,sm:4,md:3},
    py: { xs: 2, sm: 4, md: 6 },
  }}
>
  {/* Back Button */}
  <Box sx={{ display: "flex", width: { xs: "95%", sm: "90%", md: "75%" }, justifyContent: "flex-start", mb: 2 }}>
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => router.push("/dashboard/seller")}
      sx={{
        textTransform: "none",
        fontSize: { xs: "14px", sm: "16px" },
        fontWeight: "600",
        color: "black",
      }}
    >
      {t("BackDashboard")}
    </Button>
  </Box>

  {/* Main Container */}
  <Container
    maxWidth={false}
    sx={{
      backgroundColor: theme.palette.background.default,
      borderRadius: 3,
      width: { xs: "95%", sm: "90%", md: "1152px" },
      height: "100%",
      p: { xs: 2, sm: 4, md: 5 },
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    {/* Header */}
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: { xs: 0.5, sm: 1 }, mb: 2 }}>
      <DescriptionIcon
        sx={{
          height: { xs: 50, sm: 60 },
          width: { xs: 50, sm: 60 },
          color: "white",
          backgroundColor: theme.palette.primary.main,
          borderRadius: "60%",
          padding: { xs: "10px", sm: "12px" },
        }}
      />
      <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
        {t("Header1")}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontSize: { xs: "0.95rem", sm: "1.1rem" } }}>{t("Header2")}</Typography>
      <Typography variant="caption" sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>{t("Content")}</Typography>
    </Box>

   {/* Status Cards */}
<Box
  sx={{
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    mt: 3,
    mb: 2,
    flexWrap: { xs: "nowrap", sm: "nowrap", md: "nowrap" }, // allow wrapping only on very small screens if needed
    gap: { xs: 1, sm: 2 }, // spacing for smaller screens
  }}
>
  {(["Pending", "Accepted", "Rejected", "Withdrawn"] as const).map((status) => (
    <Card
      key={status}
      onClick={() => setSelectedStatus(status)}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "22%", sm: "23%", md: "260px" }, // smaller widths for xs and sm
        minWidth: { xs: "80px", sm: "120px" }, // ensure cards don’t shrink too much
        height: { xs: "80px", sm: "90px", md: "104px" }, // responsive heights
        cursor: "pointer",
        border: selectedStatus === status ? `2px solid ${colorMap[status]}` : "2px solid transparent",
        boxShadow: selectedStatus === status ? "0 4px 12px rgba(0,0,0,0.1)" : "0 2px 5px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
      }}
    >
      <Typography sx={{ color: colorMap[status], fontWeight: 600, fontSize: { xs: "14px", sm: "16px", md: "18px" } }}>
        {statusLabelMap[status]}
      </Typography>
      <Typography sx={{ color: colorMap[status], fontSize: { xs: "12px", sm: "14px", md: "16px" }, fontWeight: 500 }}>
        {statusCounts[status] || 0}
      </Typography>
    </Card>
  ))}
</Box>

    {/* Filtered Data */}
    <Box sx={{ gap: 1, display: "flex", flexDirection: "column", mt: 2, width: "100%" }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary.main,
          textAlign: "left",
          fontSize: { xs: "1rem", sm: "1.25rem" },
        }}
      >
        {statusLabelMap[selectedStatus]} ({statusCounts[selectedStatus] || 0})
      </Typography>

      <Divider
        sx={{
          mt: 1,
          borderBottomWidth: 3,
          borderColor: theme.palette.primary.main,
          opacity: 0.7,
          width: "100%",
        }}
      />

      {loading ? (
        <Typography sx={{ mt: 3, color: "gray", textAlign: "center" }}>Loading...</Typography>
      ) : filteredProjects.length === 0 ? (
        <Typography sx={{ mt: 3, color: "gray", textAlign: "center" }}>
          {t("No")} {statusLabelMap[selectedStatus].toLowerCase()} {t("BidsFound")}
        </Typography>
      ) : (
        filteredProjects.map((project, idx) => {
          const coverLetterPreview =
            project.CoverLetter.length > 430 ? project.CoverLetter.slice(0, 430) + "..." : project.CoverLetter;

          return (
            <Box
              key={idx}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                width: "100%",
                mb: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                p: { xs: 1.5, sm: 2 },
                borderRadius: 2,
              }}
            >
              {/* Header row */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, width: { xs: "100%", sm: "40%" }, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                  {project.Title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 600,
                    color: "white",
                    backgroundColor: colorMap[project.Status] || "gray",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "6px",
                    px: 1,
                    width: { xs: "40%", sm: "35%", md:"30%" },
                    textAlign: "center",
                    fontSize: { xs: "0.7rem", sm: "0.8rem" },
                  }}
                >
                  {statusLabelMap[project.Status]}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                <Typography variant="caption" sx={{ color: "gray", fontSize: { xs: "0.65rem", sm: "0.75rem" } }}>
                  Submitted On {project.SubmittedOn}
                </Typography>
              </Box>

              {/* Budget + Timeline */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  gap: 2,
                  mt: 2,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    backgroundColor: theme.palette.grey[100],
                    borderRadius: 2,
                    p: { xs: 1.5, sm: 2 },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AttachMoneyIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                      Your Proposed Budget
                    </Typography>
                  </Box>
                  <Typography sx={{ ml: 3, mt: 0.5, fontWeight: 600, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
                    {project.Budget}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    backgroundColor: theme.palette.grey[100],
                    borderRadius: 2,
                    p: { xs: 1.5, sm: 2 },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTimeIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                      Your Proposed Timeline
                    </Typography>
                  </Box>
                  <Typography sx={{ ml: 3, mt: 0.5, fontWeight: 600, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
                    {project.Timeline}
                  </Typography>
                </Box>
              </Box>

              {/* Cover Letter */}
              <Box
                sx={{
                  mt: 2,
                  backgroundColor: theme.palette.grey[100],
                  borderRadius: 2,
                  p: { xs: 1.5, sm: 2 },
                  width: "100%",
                }}
              >
                <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                  Your Cover Letter:
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: { xs: "0.75rem", sm: "0.825rem" } }}>
                  {coverLetterPreview}
                </Typography>
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  </Container>
</Box>
    )}
    </DashBoardLayout>
  );
};

export default ManageBids;
