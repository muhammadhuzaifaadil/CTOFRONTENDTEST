"use client"
import React, { use, useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from "@mui/icons-material/Close";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/api/apiClient";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import DashBoardLayout from "@/app/layouts/DashboardLayout";
import { useTranslations } from "next-intl";
import AcceptBidPopup from "@/app/components/acceptbidmodal";


interface BidData {
  id: number;
  Title: string;
  freelancerName?: string;
  companyName?: string;
  CoverLetter: string;
  Status: "Pending" | "Accepted" | "Rejected";
  Budget: string | number;
  Timeline: string;
  SubmittedOn: string;
  sellerEmail:string;
}
interface ProjectDataInterface{
    Title:string;
}

const ViewAllBids: React.FC<{ projectTitle?: string,params:any }> = ({ params }: { params: Promise<{ id: string }> })  => {

// const projectId= params.id;
const { id: projectId } = use(params);  
// const searchParams = useSearchParams();
// const projectId = searchParams.get("projectId");
  const theme = useTheme();
  const router = useRouter();
  const { isArabic, locale } = useContext(LanguageContext);
  const { user } = useAuth();
  const t = useTranslations("BidManagement");
const [acceptOpen, setAcceptOpen] = useState(false);
const [selectedBid, setSelectedBid] = useState<any>(null);
  const [bids, setBids] = useState<BidData[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkAccept,setCheckAccept]=useState(false);
  const [projectDetails,setProjectDetails] = useState<any>([]);

  // Fetch bids from API
  useEffect(() => {
    const fetchBids = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // const res = await apiClient.get("/bids/paginated/all?page=1&limit=10");
        const res = await apiClient.get(`/bids/project/${projectId}`)
        setProjectDetails(res.data?.Data);
        const bidsData = res.data?.Data?.bids;
        console.log('data:',res.data)
        console.log('bidsData:',res.data.Data?.bids)
        if (res.data?.Success && Array.isArray(bidsData)) {
          const mapped: BidData[] = bidsData.map((b: any) => ({
            id: b.id,
            Title: b.projectInfo?.title || "No Title",
            // sellerEmail: b.sellerInfo?.email || "Unknown",
            sellerEmail: b.sellerEmail || "no email cannot be found",
            CoverLetter: b.proposalText || "No proposal provided",
            Status: b.status,
            Budget: b.bidAmount || "N/A",
            Timeline: b.timeline || "N/A",
            SubmittedOn: new Date(b.SubmittedOn).toLocaleString("en"),
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
        console.log("bids are following",bids)
      }
    };

    fetchBids();
  }, [locale,projectId]);

  // Status label mapping with i18n
  // const statusLabelMap: Record<string, string> = {
  //   Pending: isArabic ? t("Status1") : "Pending",
  //   Accepted: isArabic ? t("Status2") : "Accepted",
  //   Rejected: isArabic ? t("Status3") : "Rejected",
  // };

  // Color mapping for statuses
  const colorMap: Record<string, string> = {
    Pending: "orange",
    Accepted: "green",
    Rejected: "red",
  };
const bidStatusLabels = {
  Accepted: {
    en: "Accepted",
    ar: "مقبول"
  },
  Rejected: {
    en: "Rejected",
    ar: "مرفوض"
  },
  Pending: {
    en: "Pending",
    ar: "قيد المراجعة"
  }
};


  // Filter and count bids
  // const filteredBids = bids.filter(
  //   (b) => b.Status.toLowerCase() === selectedStatus.toLowerCase()
  // );

  // const statusCounts = {
  //   Pending: bids.filter((p) => p.Status.toLowerCase() === "pending").length,
  //   Accepted: bids.filter((p) => p.Status.toLowerCase() === "accepted").length,
  //   Rejected: bids.filter((p) => p.Status.toLowerCase() === "rejected").length,
  // };

  // Handler functions
  const handleBack = () => {
    router.push(`/dashboard/buyer/manageproject/${projectId}`);
  };

  // const handleAccept = async (bidId: number) => {
  //   try {
  //     console.log("bidId in accept:",bidId);
  //     // Call API to accept bid
  //     await apiClient.put(`/bids/accept/${bidId}`);
  //     // Refresh bids
  //     const res = await apiClient.get(`/bids/project/${projectId}`)
  //     const bidsData = res.data?.Data?.bids;
  //     if (res.data?.Success && Array.isArray(bidsData)) {
  //       const mapped: BidData[] = bidsData.map((b: any) => ({
  //         id: b.id,
  //           Title: b.projectInfo?.title || "No Title",
  //           // sellerEmail: b.sellerInfo?.email || "Unknown",
  //           sellerEmail: b.sellerEmail || "no email cannot be found",
  //           CoverLetter: b.proposalText || "No proposal provided",
  //           Status: b.status,
  //           Budget: b.bidAmount || "N/A",
  //           Timeline: b.timeline || "N/A",
  //           SubmittedOn: new Date(b.SubmittedOn).toLocaleString(locale),
  //       }));
  //       setBids(mapped);
  //     }
  //     // window.location.reload();
  //   } catch (err) {
  //     console.error("❌ Failed to accept bid:", err);
  //   }
  // };
 
 const handleAcceptFromModal = async ({
  bidId,
  meetLink,
  description,
}: {
  bidId: number;
  meetLink: string;
  description: string;
}) => {
  try {
    console.log("accepting bid", bidId, meetLink, description);
    await apiClient.put(`/bids/accept/${bidId}`, {
      meetLink,
      description,
    });

    // refresh bids (reuse your logic)
    const res = await apiClient.get(`/bids/project/${projectId}`);
    const bidsData = res.data?.Data?.bids;
    if (res.data?.Success && Array.isArray(bidsData)) {
      const mapped: BidData[] = bidsData.map((b: any) => ({
        id: b.id,
        Title: b.projectInfo?.title || "No Title",
        sellerEmail: b.sellerEmail || "no email cannot be found",
        CoverLetter: b.proposalText || "No proposal provided",
        Status: b.status,
        Budget: b.bidAmount || "N/A",
        Timeline: b.timeline || "N/A",
        SubmittedOn: new Date(b.SubmittedOn).toLocaleDateString(),
      }));
      setBids(mapped);
    }
  } catch (err) {
    console.error("❌ Failed to accept bid:", err);
  } finally {
    setAcceptOpen(false);
    setSelectedBid(null);
  }
};
  const openHandleAccept = (bid: BidData) => {
  setSelectedBid(bid);
  setAcceptOpen(true);
};

  const handleReject = async (bidId: number) => {
    try {
      // Call API to reject bid
      await apiClient.put(`/bids/reject/${bidId}`);
      // Refresh bids
       const res = await apiClient.get(`/bids/project/${projectId}`)
      const bidsData = res.data?.Data?.bids;
      if (res.data?.Success && Array.isArray(bidsData)) {
        const mapped: BidData[] = bidsData.map((b: any) => ({
          id: b.id,
            Title: b.projectInfo?.title || "No Title",
            // sellerEmail: b.sellerInfo?.email || "Unknown",
            sellerEmail: b.sellerEmail || "no email cannot be found",
            CoverLetter: b.proposalText || "No proposal provided",
            Status: b.status,
            Budget: b.bidAmount || "N/A",
            Timeline: b.timeline || "N/A",
            SubmittedOn: new Date(b.SubmittedOn).toLocaleString(locale),
        }));
        setBids(mapped);
      }
    } catch (err) {
      console.error("❌ Failed to reject bid:", err);
    }
  };

  const handleViewDetails = (bidId: number) => {
    router.push(`/dashboard/buyer/manageproject/${projectId}/viewallbids/${bidId}`);
  };
  useEffect(() => {
  const anyAccepted = bids.some(
    (b) => b.Status && b.Status.toLowerCase() === "accepted"
  );
  setCheckAccept(anyAccepted);
}, [bids]);

  if (!user) {
    return (
      <DashBoardLayout>
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
      </DashBoardLayout>
    );
  }
if(loading){
   return(
      <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "white",
        mt: { xs: 8, md: 3 },
        py: { xs: 2, sm: 4, md: 6 },
      }}
    >
{/* Top Back Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          width: { xs: "95%", sm: "75%", md: "75%" },
          mb: 2,
        }}
      >
        <Button
          startIcon={
            <ArrowBackIcon
              sx={{
                transition: "transform 0.2s ease",
              }}
            />
          }
          onClick={()=>{handleBack}}
          sx={{
            textTransform: "none",
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: 600,
            color: "black",
            flexDirection: "row",
            gap: 1,
          }}
        >
       back to view project details

        </Button>
      </Box>
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: 3,
          width: { xs: "100%", sm: "90%", md: "1152px" },
          p: { xs: 2, sm: 3, md: 5 },
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          transition: "0.3s ease",
          overflow: "hidden",
        }}
      >

        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                    <CircularProgress />
                  </Box>
      </Container>


    </Box>
    ) 
}

  return (
    <DashBoardLayout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          background: "white",
          mt: { xs: 6, sm: 4, md: 3 },
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {/* Back Button */}
        <Box
          sx={{
            display: "flex",
            width: { xs: "95%", sm: "90%", md: "75%" },
            justifyContent: isArabic ? "flex-end" : "flex-start",
            mb: 2,
          }}
        >
          <Button
            startIcon={
              <ArrowBackIcon
                sx={{
                  transform: isArabic ? "scaleX(-1)" : "none",
                  transition: "transform 0.2s ease",
                }}
              />
            }
            onClick={handleBack}
            sx={{
              textTransform: "none",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "600",
              display: "flex",
              flexDirection: isArabic ? "row-reverse" : "row",
              gap: isArabic ? "4px" : 0,
              color: "black",
            }}
          >
            {/* {t("BackDashboard")} */}
            {t("BackToProjectDetails")}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              mb: 2,
            }}
          >
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
            <Typography
              variant="subtitle2"
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              {t("Header1")}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: { xs: "0.95rem", sm: "1.1rem" } }}
            >
              {projectDetails?.projectTitle?.toUpperCase()}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
            >
              {t("Content")}
            </Typography>
          </Box>

          {/* Status Cards */}
          {/* <Box  
            sx={{
              display: "flex",
              flexDirection: isArabic ? "row-reverse" : "row",
              width: "100%",
              justifyContent: "space-between",
              mt: 3,
              mb: 2,
              gap: { xs: 1, sm: 2 },
            }}
          >
            {(
              ["Pending", "Accepted", "Rejected"] as const
            ).map((status) => (
              <Card
                key={status}
                onClick={() => setSelectedStatus(status)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: { xs: "22%", sm: "23%", md: "260px" },
                  minWidth: { xs: "80px", sm: "120px" },
                  height: { xs: "80px", sm: "90px", md: "104px" },
                  cursor: "pointer",
                  border:
                    selectedStatus === status
                      ? `2px solid ${colorMap[status]}`
                      : "2px solid transparent",
                  boxShadow:
                    selectedStatus === status
                      ? "0 4px 12px rgba(0,0,0,0.1)"
                      : "0 2px 5px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                }}
              >
                <Typography
                  sx={{
                    color: colorMap[status],
                    fontWeight: 600,
                    fontSize: { xs: "14px", sm: "16px", md: "18px" },
                  }}
                >
                  {statusLabelMap[status]}
                </Typography>
                <Typography
                  sx={{
                    color: colorMap[status],
                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                    fontWeight: 500,
                  }}
                >
                  {statusCounts[status] || 0}
                </Typography>
              </Card>
            ))}
          </Box> */}

          {/* Filtered Data */}
          <Box
            sx={{
              gap: 1,
              display: "flex",
              flexDirection: "column",
              mt: 2,
              width: "100%",
            }}
          >
            {/* <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                textAlign: isArabic ? "right" : "left",
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              {statusLabelMap[selectedStatus]} (
              {statusCounts[selectedStatus] || 0})
            </Typography> */}

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
              <Typography sx={{ mt: 3, color: "gray", textAlign: "center" }}>
                {t("Loading")}
              </Typography>
            ) : bids.length === 0 ? (
              <Typography sx={{ mt: 3, color: "gray", textAlign: "center" }}>
                {t("No")} 
                {/* {statusLabelMap[selectedStatus].toLowerCase()}{" "} */}
                {t("BidsFound")}
              </Typography>
            ) : (
              bids.map((bid) => {
                console.log("bid status"+bid.Status)
                const coverLetterPreview =
                  bid.CoverLetter.length > 430
                    ? bid.CoverLetter.slice(0, 430) + "..."
                    : bid.CoverLetter;

                return (
                  <Box
                    key={bid.id}
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
                      bgcolor: theme.palette.grey[50],
                    }}
                  >
                    {/* Header row */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: {
                          xs: "column",
                          sm: isArabic ? "row-reverse" : "row",
                        },
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        width: "100%",
                        gap: 1,
                      }}
                    >
                      <Box sx={{ width: { xs: "100%", sm: "100%" } }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            textAlign: isArabic ? "right" : "left",
                          }}
                        >
                          {bid.sellerEmail}
                        </Typography>
                        {/* <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                            textAlign: isArabic ? "right" : "left",
                          }}
                        >
                          {bid.sellerEmail}
                        </Typography> */}
                      </Box>

                      <Typography
                        variant="subtitle2"
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: 600,
                          color: "white",
                          backgroundColor:colorMap[bid.Status] || "gray",
                          display: "flex",
                          justifyContent: "center",
                          borderRadius: "6px",
                          px: 1,
                          py: 0.5,
                          width: { xs: "40%", sm: "35%", md: "30%" },
                          textAlign: "center",
                          fontSize: { xs: "0.7rem", sm: "0.8rem" },
                        }}
                      >
                          {isArabic
    ? bidStatusLabels[bid.Status]?.ar
    : bidStatusLabels[bid.Status]?.en}
                        
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: isArabic ? "flex-end" : "flex-start",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "gray",
                          fontSize: { xs: "0.65rem", sm: "0.75rem" },
                          display: "flex",
                          flexDirection: isArabic ? "row-reverse" : "row",
                          gap: 0.5,
                        }}
                      >
                        <strong>{t("SubmittedOn")}</strong> {bid.SubmittedOn}
                      </Typography>
                    </Box>

                    {/* Budget + Timeline */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: isArabic ? "row-reverse" : "row" },
                        justifyContent: "space-between",
                        gap: 2,
                        mt: 2,
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          backgroundColor: "#fff",
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.grey[300]}`,
                          p: { xs: 1.5, sm: 2 },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexDirection: isArabic ? "row-reverse" : "row",
                          }}
                        >
                          <AttachMoneyIcon
                            sx={{
                              fontSize: 16,
                              color: theme.palette.primary.main,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              fontSize: {
                                xs: "0.75rem",
                                sm: "0.875rem",
                              },
                            }}
                          >
                            {t("ProposedBudget")}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            ml: isArabic ? 0 : 3,
                            mr: isArabic ? 3 : 0,
                            mt: 0.5,
                            fontWeight: 600,
                            fontSize: { xs: "0.85rem", sm: "0.95rem" },
                            textAlign: isArabic ? "right" : "left",
                          }}
                        >
                          {bid.Budget}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          backgroundColor: "#fff",
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.grey[300]}`,
                          p: { xs: 1.5, sm: 2 },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexDirection: isArabic ? "row-reverse" : "row",
                          }}
                        >
                          <AccessTimeIcon
                            sx={{
                              fontSize: 16,
                              color: theme.palette.primary.main,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              fontSize: {
                                xs: "0.75rem",
                                sm: "0.875rem",
                              },
                            }}
                          >
                            {t("ProposedTimeline")}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            ml: isArabic ? 0 : 3,
                            mr: isArabic ? 3 : 0,
                            mt: 0.5,
                            fontWeight: 600,
                            fontSize: { xs: "0.85rem", sm: "0.95rem" },
                            textAlign: isArabic ? "right" : "left",
                          }}
                        >
                          {bid.Timeline}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Cover Letter */}
                    <Box
                      sx={{
                        mt: 2,
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.grey[300]}`,
                        p: { xs: 1.5, sm: 2 },
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{
                          fontSize: { xs: "0.8rem", sm: "0.875rem" },
                          textAlign: isArabic ? "right" : "left",
                        }}
                      >
                        {t("CoverLetter")}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 0.5,
                          fontSize: { xs: "0.75rem", sm: "0.825rem" },
                          lineHeight: 1.6,
                          textAlign: isArabic ? "right" : "left",
                        }}
                      >
                        {coverLetterPreview}
                      </Typography>
                    </Box>

                    {/* Actions */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: {
                          xs: "column",
                          sm: isArabic ? "row-reverse" : "row",
                        },
                        alignItems: {
                          xs: "stretch",
                          sm: "center",
                        },
                        justifyContent: "space-between",
                        gap: 1.5,
                        mt: 2,
                        width: "100%",
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => handleViewDetails(bid.id)}
                        sx={{
                          textTransform: "none",
                          borderRadius: 999,
                          borderColor:
                            theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          width:"45%",
                          "&:hover": {
                            borderColor:
                              theme.palette.primary.dark,
                            backgroundColor:
                              "rgba(63,81,181,0.04)",
                          },
                        }}
                      >
                        {/* {t("ViewDetails")} */}
                       <VisibilityIcon /> {t("ViewDetails")}
                      </Button>

                      {bid.Status.toLowerCase() === "pending" ? (
                        <Box
    sx={{
      display: "flex",
      flexDirection: {
        xs: "column",
        sm: isArabic ? "row-reverse" : "row",
      },
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 1.5,
      flexGrow: 1,
    }}
  >
    <Button
      variant="contained"
      color="success"
      disabled={checkAccept}             // <- disable if any bid accepted
      onClick={() => openHandleAccept(bid)}
      sx={{
        flexGrow: 1,
        textTransform: "none",
        borderRadius: 999,
        fontWeight: 600,
        px: 4,
        width:"45%",
        fontSize: {
          xs: "0.75rem",
          sm: "0.875rem",
        },
      }}
    >
      {t("AcceptButton")}
    </Button>

    <IconButton
      color="error"
      onClick={() => handleReject(bid.id)}
      sx={{
        bgcolor: "rgba(244,67,54,0.08)",
        "&:hover": {
          bgcolor: "rgba(244,67,54,0.18)",
        },
      }}
    >
      <CloseIcon />
    </IconButton>
  </Box>
                      ):(
                        <Box>
                          {/* <Button
      variant="contained"
      color="success"
      disabled={checkAccept}             // <- disable if any bid accepted
      onClick={() => openHandleAccept(bid)}
      sx={{
        flexGrow: 1,
        textTransform: "none",
        borderRadius: 999,
        fontWeight: 600,
        px: 4,
        width:"45%",
        fontSize: {
          xs: "0.75rem",
          sm: "0.875rem",
        },
      }}
    >
      Project Awarding
    </Button> */}
                           </Box>
                      )}
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
        {selectedBid && (
  <AcceptBidPopup
    open={acceptOpen}
    bidId={selectedBid.id}
    sellerName={selectedBid.sellerEmail}
    proposedBudget={selectedBid.Budget}
    proposedTimeline={selectedBid.Timeline}
    onClose={() => {
      setAcceptOpen(false);
      setSelectedBid(null);
    }}
    onConfirm={handleAcceptFromModal}
  />
)}
        </Container>
      </Box>
    </DashBoardLayout>
  );
};

export default ViewAllBids;
