"use client";

import React, { use, useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Chip,
  TextField,
  MenuItem,
  useTheme,
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useRouter } from "next/navigation";
import DashBoardLayout from "@/app/layouts/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import apiClient from "@/api/apiClient";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type MilestoneStatus = "Completed" | "Pending";

type Milestone = {
  id: number;
  title: string;
  filesCount: number;
  amount: string;
  status: MilestoneStatus;
};

type Deliverable = {
  id: number;
  name: string;
  size: string;
  uploadedOn: string;
  description: string;
  type: "pdf" | "zip" | "doc";
};

const QualityExpertReviewDeliverables: React.FC<{params:any }> = ({ params }: { params: Promise<{ id:number }> })=> {
    const {id:id } = use(params);  
    console.log("index:",id);
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const { isArabic } = useContext(LanguageContext);

  const [selectedMilestoneId, setSelectedMilestoneId] = useState<number>(1);
  const [approvalStatus, setApprovalStatus] = useState<string>("");
  const [reviewNotes, setReviewNotes] = useState<string>("");
  const [milestones,setMilestones] = useState<any>([])
  const [projectTitle,setProjectTitle] =useState()
  const maxChars = 1000;

  const fetchMileStoneSummary  = async()=>{

    const res = await apiClient.get(`/milestone/milestonesummary/${id}`)
    setMilestones(res.data.Data.response)
    setProjectTitle(res.data.Data?.project?.title)
  }
  useEffect(()=>{
    fetchMileStoneSummary()
  },[])
  // Dummy data for UI
  // const projectTitle = "E‑Commerce Website Development";

  // const milestones: Milestone[] = [
  //   {
  //     id: 1,
  //     title: "Initial Design & Architecture",
  //     filesCount: 3,
  //     amount: "$ 3500",
  //     status: "Completed",
  //   },
  //   {
  //     id: 2,
  //     title: "Implementation & Testing",
  //     filesCount: 4,
  //     amount: "$ 3300",
  //     status: "Pending",
  //   },
  // ];



  const activeMilestone = milestones.find(
    (m:any) => m.id === selectedMilestoneId
  ) || milestones[0];

  const handleSubmit = async() => {
    // TODO: integrate with API

    const res = await apiClient.post("/milestone/postreview",{
      ApprovalStatus:approvalStatus,
      ReviewNotes:reviewNotes,
      milestoneId: activeMilestone.id,
    })
    console.log(res);
    router.push("/dashboard/qualityexpert/viewprojects")
  };
 const deliverables: Deliverable[] = (activeMilestone?.files || []).map((f:any, idx:any) => ({
  id: f.id,
  name: f.attachmentName || f.attachment?.split("/").pop() || `file-${idx}`,
  size: "unknown", // optionally you can fetch size if saved in DB
  uploadedOn: new Date(f.createdAt).toLocaleDateString(),
  description: f.attachmentDetail || "",
  type: f.attachmentName?.split(".").pop()?.toLowerCase() === "pdf" ? "pdf" : "zip", // simple type logic
}));
  const getMilestoneColors = (status: MilestoneStatus) => {
    if (status === "Completed") {
      return {
        border: "#22C55E",
        bg: "#ECFDF3",
        chipBg: "#22C55E",
      };
    }
    return {
      border: "#F97316",
      bg: "#FFFBEB",
      chipBg: "#F97316",
    };
  };

  const getFileIcon = (type: Deliverable["type"]) => {
    switch (type) {
      case "pdf":
        return (
          <DescriptionOutlinedIcon
            sx={{ color: "#EF4444", fontSize: 24 }}
          />
        );
      case "zip":
        return (
          <InsertDriveFileOutlinedIcon
            sx={{ color: theme.palette.primary.main, fontSize: 24 }}
          />
        );
      default:
        return (
          <InsertDriveFileOutlinedIcon
            sx={{ color: "#9CA3AF", fontSize: 24 }}
          />
        );
    }
  };

  return (
    <DashBoardLayout>
      {!user ? (
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
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: theme.palette.background.default,
            overflowX: "hidden",
          }}
        >
   
          <Box
            sx={{
              pt: 12,
              px: { xs: 2, sm: 4, md: 6 },
              pb: 6,
            }}
          >
                   {/* Back link */}
                      <Box
                        sx={{
                          mb: 2,
                          display: "flex",
                          justifyContent: isArabic ? "flex-end" : "flex-start",
                        }}
                      >
                        <Button
                          startIcon={!isArabic && <ArrowBackIcon fontSize="small" />}
                          endIcon={isArabic && <ArrowBackIcon fontSize="small" />}
                          onClick={() => router.push("/dashboard/qualityexpert/viewprojects")}
                          sx={{
                            textTransform: "none",
                            color: "#6B7280",
                            fontWeight: 500,
                            "&:hover": { backgroundColor: "transparent" },
                          }}
                        >
                          Back
                        </Button>
                      </Box>
            {/* Page title */}
            <Box
              sx={{
                mb: 3,
                textAlign: isArabic ? "right" : "left",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#111827" }}
              >
                Review Project Deliverables
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", mt: 0.5 }}
              >
                {projectTitle}
              </Typography>
            </Box>

            {/* Main layout: left milestones, right detail column */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
              }}
            >
              {/* LEFT – Milestones */}
              <Card
                sx={{
                  width: { xs: "100%", md: 320 },
                  borderRadius: "24px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  p: 3,
                  alignSelf: "flex-start",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: "#111827",
                    mb: 2,
                    textAlign: isArabic ? "right" : "left",
                  }}
                >
                  Milestones
                </Typography>

                {milestones.map((m:any) => {
                  const { border, bg, chipBg } = getMilestoneColors(m.status);
                  const isActive = m.id === activeMilestone.id;

                  return (
                    <Box
                      key={m.id}
                      onClick={() => setSelectedMilestoneId(m.id)}
                      sx={{
                        borderRadius: 2,
                        border: `1px solid ${border}`,
                        backgroundColor: bg,
                        p: 2,
                        mb: 2,
                        cursor: "pointer",
                        boxShadow: isActive
                          ? "0 0 0 2px rgba(79,70,229,0.20)"
                          : "none",
                        transition: "box-shadow 0.15s ease, transform 0.15s",
                        "&:hover": {
                          transform: "translateY(-1px)",
                          boxShadow:
                            "0 6px 18px rgba(0,0,0,0.08)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 1,
                          flexDirection: isArabic ? "row-reverse" : "row",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {m.title}
                        </Typography>
                        <Chip
                          label={m.status}
                          size="small"
                          sx={{
                            borderRadius: 999,
                            fontSize: 11,
                            backgroundColor: chipBg,
                            color: "#FFFFFF",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "#6B7280", mb: 0.3 }}
                      >
                        {m.filesCount} file
                        {m.filesCount !== 1 ? "s" : ""}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#6B7280" }}
                      >
                        {m.amount}
                      </Typography>
                    </Box>
                  );
                })}
              </Card>

              {/* RIGHT – details + deliverables + review */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {/* Milestone details */}
                <Card
                  sx={{
                    borderRadius: "24px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        sm: isArabic ? "row-reverse" : "row",
                      },
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", sm: "center" },
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      {activeMilestone?.title}
                    </Typography>

                    {/* <Button
                      variant="outlined"
                      color="error"
                      sx={{
                        borderRadius: 999,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 2.5,
                        py: 0.7,
                        borderWidth: 1.5,
                      }}
                    >
                      Report Issue
                    </Button> */}
                  </Box>

                  {/* Dates row */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        sm: isArabic ? "row-reverse" : "row",
                      },
                      gap: { xs: 2, sm: 6 },
                      mb: 3,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: "#6B7280" }}
                      >
                        Start Date
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <EventIcon
                          sx={{ fontSize: 18, color: "#6B7280" }}
                        />
                        <Typography variant="body2" sx={{ color: "#111827" }}>
                          {activeMilestone?.startDate}
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: "#6B7280" }}
                      >
                        Due Date
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <EventIcon
                          sx={{ fontSize: 18, color: "#6B7280" }}
                        />
                        <Typography variant="body2" sx={{ color: "#111827" }}>
                          {activeMilestone?.endDate}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Goal */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "#6B7280" }}
                    >
                      Goal
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#111827", mt: 0.5 }}
                    >
                      {activeMilestone?.description}
                    </Typography>
                  </Box>

                  {/* Payment */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "#6B7280" }}
                    >
                      Payment Amount
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#111827", mt: 0.5 }}
                    >
                      {activeMilestone?.paymentAmount}
                    </Typography>
                  </Box>
                </Card>

                {/* Deliverables */}
                <Card
                  sx={{
                    borderRadius: "24px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    p: 3,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: "#111827",
                      mb: 2,
                    }}
                  >
                    Deliverables
                  </Typography>

                  {deliverables.map((d, idx) => (
                    <Box
                      key={d.id}
                      sx={{
                        borderRadius: 2,
                        backgroundColor: "#F3F4FF",
                        p: 2,
                        mb:
                          idx === deliverables.length - 1
                            ? 0
                            : 1.5,
                        display: "flex",
                        flexDirection: {
                          xs: "column",
                          sm: isArabic ? "row-reverse" : "row",
                        },
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: isArabic ? "row-reverse" : "row",
                          gap: 2,
                          alignItems: "flex-start",
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            backgroundColor: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                          }}
                        >
                          {getFileIcon(d.type)}
                        </Box>

                        <Box
                          sx={{
                            textAlign: isArabic ? "right" : "left",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 600,
                              color: "#111827",
                              mb: 0.3,
                            }}
                          >
                            {d.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "#6B7280", display: "block" }}
                          >
                            {d.size} • Uploaded {d.uploadedOn}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#6B7280", mt: 0.4 }}
                          >
                            {d.description}
                          </Typography>
                        </Box>
                      </Box>

                      <IconButton
                        sx={{
                          alignSelf: { xs: "flex-end", sm: "center" },
                        }}
                      >
                        <DownloadOutlinedIcon
                          sx={{ color: theme.palette.primary.main }}
                        />
                      </IconButton>
                    </Box>
                  ))}
                </Card>

                {/* Quality Review */}
                <Card
                  sx={{
                    borderRadius: "24px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    p: 3,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: "#111827",
                      mb: 2,
                    }}
                  >
                    Quality Review
                  </Typography>

                  {/* Approval Status */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "#6B7280", mb: 0.5, display: "block" }}
                    >
                      Approval Status *
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      value={approvalStatus}
                      onChange={(e) => setApprovalStatus(e.target.value)}
                      placeholder="Select approval status"
                      size="small"
                      sx={{
                        "& fieldset": {
                          borderRadius: 2,
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Select approval status</em>
                      </MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Needs Revision">
                        Needs Revision
                      </MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                      <MenuItem value="On Hold">On Hold</MenuItem>
                    </TextField>
                  </Box>

                  {/* Review Notes */}
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "#6B7280" }}
                      >
                        Review Notes{" "}
                        <Box component="span" sx={{ color: "#9CA3AF" }}>
                          (Max {maxChars} characters)
                        </Box>
                      </Typography>
                    </Box>

                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      value={reviewNotes}
                      onChange={(e) =>
                        e.target.value.length <= maxChars &&
                        setReviewNotes(e.target.value)
                      }
                      placeholder="Provide detailed feedback about the deliverables..."
                      sx={{
                        "& fieldset": {
                          borderRadius: 2,
                        },
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 0.5,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "#9CA3AF" }}
                      >
                        {reviewNotes.length}/{maxChars} characters
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 1,
                      borderRadius: 999,
                      textTransform: "none",
                      fontWeight: 600,
                      py: 1.1,
                      backgroundColor: theme.palette.primary.main,
                    }}
                    onClick={handleSubmit}
                  >
                    Submit Review
                  </Button>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </DashBoardLayout>
  );
};

export default QualityExpertReviewDeliverables;