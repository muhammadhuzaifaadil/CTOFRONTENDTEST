"use client";

import React, { useState, useContext } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Divider,
  Chip,
  IconButton,
  LinearProgress,
  useTheme,
  CircularProgress,
} from "@mui/material";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useRouter } from "next/navigation";
import DashBoardLayout from "@/app/layouts/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { LanguageContext } from "@/app/contexts/LanguageContext";

const QualityExpert: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const { isArabic } = useContext(LanguageContext);

  const [loadingProjects] = useState(false); // wire up to API later

  // TOP 3 STATS
  const topStats = [
    {
      key: "pending",
      label: "Pending Reviews",
      value: 2,
      subtitle: "Awaiting your review",
      icon: <RateReviewOutlinedIcon />,
      iconBg: "#ECEBFF",
      iconColor: theme.palette.primary.main,
    },
    {
      key: "approved",
      label: "Approved",
      value: 0,
      subtitle: "Projects approved",
      icon: <CheckCircleOutlineIcon />,
      iconBg: "#E6FFF4",
      iconColor: "#12B981",
    },
    {
      key: "revision",
      label: "Needs Revision",
      value: 0,
      subtitle: "Revisions requested",
      icon: <ErrorOutlineIcon />,
      iconBg: "#FFF4E5",
      iconColor: "#F97316",
    },
  ];

  // DUMMY ASSIGNED PROJECTS (replace with API data)
  const assignedProjects = [
    {
      title: "E‑Commerce Website Development",
      buyer: "Sarah Johnson",
      seller: "Omar Alsaeed",
      deliverables: 2,
      assignedOn: "1/20/2026",
      status: "Pending Review",
    },
    {
      title: "Brand Identity and Logo Design",
      buyer: "Sarah Johnson",
      seller: "Nora Alqahtani",
      deliverables: 1,
      assignedOn: "1/22/2026",
      status: "Pending Review",
    },
  ];

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
            mt: 0,
          }}
        >
          {/* PAGE CONTENT (under navbar) */}
          <Box
            sx={{
              pt: 12, // same as BuyerDashboard
              px: { xs: 2, sm: 4, md: 6 },
              pb: 6,
            }}
          >
            {/* ===== TOP STATS (3 BOXES) – same style as BuyerDashboard stats ===== */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                flexDirection: isArabic ? "row-reverse" : "row",
                mb: 4,
              }}
            >
              {topStats.map((stat) => (
                <Card
                  key={stat.key}
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    p: 2,
                    width: {
                      xs: "calc(50% - 8px)",
                      sm: "calc(50% - 8px)",
                      md: "calc(33.333% - 12px)", // three columns on md+
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: isArabic ? "flex-end" : "flex-start",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 0.5, color: "#7779A2", fontWeight: 600 }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        mb: 0.5,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#9CA3AF" }}
                    >
                      {stat.subtitle}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "24px",
                      backgroundColor: stat.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: stat.iconColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>

            {/* ===== MIDDLE ACTIONS (3 CARDS) – SAME SHAPE / SIZE AS BuyerDashboard ===== */}
            <Box
              sx={{
                display: "flex",
                gap: 5,
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: isArabic ? "row-reverse" : "row",
                },
                mb: 4,
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              {/* MY PROGRESS */}
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    flexDirection: isArabic ? "row-reverse" : "row",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      flexDirection: isArabic ? "row-reverse" : "row",
                    }}
                  >
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
                      <AutorenewRoundedIcon
                        sx={{ fontSize: 26, color: "white" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        textAlign: isArabic ? "right" : "left",
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{
                          letterSpacing: 2,
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                        }}
                      >
                        MY PROGRESS
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        View the progress of your projects
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton size="small">
                    <MoreHorizIcon />
                  </IconButton>
                </Box>

                {/* inner progress box */}
                <Box
                  sx={{
                    mt: "auto",
                    borderRadius: 3,
                    backgroundColor: "#F7F7FF",
                    p: 2.5,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: "#20224C", mb: 0.5 }}
                  >
                    E‑Commerce Website Development
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#6B7280", mb: 1 }}
                  >
                    2/6 Milestones Completed
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={28}
                      sx={{
                        flex: 1,
                        height: 8,
                        borderRadius: 999,
                        backgroundColor: "#E5E7EB",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 999,
                          backgroundColor: theme.palette.primary.main,
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color: "#6B7280",
                        minWidth: 32,
                      }}
                    >
                      28%
                    </Typography>
                  </Box>
                </Box>
              </Card>

              {/* MY PROJECTS */}
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexDirection: isArabic ? "row-reverse" : "row",
                    mb: 2,
                  }}
                >
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
                    <WorkOutlineOutlinedIcon
                      sx={{ fontSize: 26, color: "white" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      textAlign: isArabic ? "right" : "left",
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        letterSpacing: 2,
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                      }}
                    >
                      MY PROJECTS
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track all your submitted bids and their current status
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: "auto" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      background: theme.palette.primary.main,
                      color: "#fff",
                      fontWeight: 600,
                      borderRadius: 3,
                      textTransform: "none",
                      py: 1.1,
                    }}
                    onClick={() =>
                      router.push("/dashboard/qualityexpert/viewprojects")
                    }
                  >
                    View Projects
                  </Button>
                </Box>
              </Card>

              {/* PROFILE SETTINGS */}
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexDirection: isArabic ? "row-reverse" : "row",
                    mb: 2,
                  }}
                >
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
                    <PersonOutlineOutlinedIcon
                      sx={{ fontSize: 26, color: "white" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      textAlign: isArabic ? "right" : "left",
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        letterSpacing: 2,
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                      }}
                    >
                      PROFILE SETTINGS
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Update your account information and preferences
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: "auto",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.5,
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      borderRadius: 3,
                      width: { xs: "100%", md: "max-content" },
                      textTransform: "none",
                    }}
                    onClick={() =>
                      router.push("/dashboard/buyer/profilemanagement")
                    }
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      borderRadius: 3,
                      width: { xs: "100%", md: "max-content" },
                      textTransform: "none",
                    }}
                    onClick={() => router.push("/updatepassword")}
                  >
                    Change Password
                  </Button>
                </Box>
              </Card>
            </Box>

            {/* ===== ASSIGNED PROJECTS – MATCHES BuyerDashboard "Recent Activity" CARD STYLE ===== */}
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                p: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 1,
                  flexDirection: isArabic ? "row-reverse" : "row",
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "12px",
                    backgroundColor: theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  <AssignmentOutlinedIcon fontSize="small" />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    textAlign: isArabic ? "right" : "left",
                  }}
                >
                  Assigned Projects
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {loadingProjects ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", my: 4 }}
                >
                  Loading assigned projects...
                </Typography>
              ) : (
                <Box
                  sx={{
                    minHeight: 220,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {assignedProjects.map((project, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        p: 2,
                        mb: 1.5,
                        borderRadius: 2,
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      }}
                    >
                      <Box sx={{ maxWidth: { sm: "70%" } }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: "#20224C",
                            mb: 0.5,
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#6B7280", mb: 0.3 }}
                        >
                          Buyer: {project.buyer} &nbsp;•&nbsp; Seller:{" "}
                          {project.seller}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#6B7280" }}
                        >
                          {project.deliverables} deliverable
                          {project.deliverables !== 1 ? "s" : ""} &nbsp;•&nbsp;
                          Assigned {project.assignedOn}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mt: { xs: 2, sm: 0 },
                          alignSelf: { xs: "stretch", sm: "auto" },
                          justifyContent: {
                            xs: "space-between",
                            sm: "flex-end",
                          },
                        }}
                      >
                        <Chip
                          label={project.status}
                          sx={{
                            borderRadius: 999,
                            fontWeight: 600,
                            px: 1.5,
                            backgroundColor: "#FFF7C2",
                            color: "#B45309",
                          }}
                        />
                        {/* <Button
                          variant="contained"
                          sx={{
                            borderRadius: 3,
                            textTransform: "none",
                            px: 3,
                            py: 0.8,
                            fontWeight: 600,
                            backgroundColor: theme.palette.primary.main,
                          }}
                          onClick={() =>
                            router.push("/dashboard/quality-expert/project/1")
                          }
                        >
                          Review Details
                        </Button> */}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Card>
          </Box>
        </Box>
      )}
    </DashBoardLayout>
  );
};

export default QualityExpert;