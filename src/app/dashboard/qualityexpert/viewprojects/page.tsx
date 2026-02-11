"use client";

import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRouter } from "next/navigation";
import DashBoardLayout from "@/app/layouts/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import apiClient from "@/api/apiClient";

type AssignedProject = {
  id: any;
  user: any;
  title: string;
  buyer: string;
  seller: string;
  deliverables: number;
  assignedOn: string;
  status:
    | "Pending Review"
    | "In Progress"
    | "Completed"
    | "Pending Approval"
    | "On Hold";
};

const QualityExpertAssignedProjects: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const { isArabic } = useContext(LanguageContext);

  const [searchTerm, setSearchTerm] = useState("");
const [assignedProjects, setAssignedProjects] = useState<AssignedProject[]>([]);

const fetchAssignedProjects = async () => {
  try {
    const result = await apiClient.get("/buyerhire/QEProjects");
    console.log(result.data.Data)
    setAssignedProjects(result.data.Data ?? []);
  } catch (error) {
    console.error("Failed to fetch projects", error);
    setAssignedProjects([]);
  }
};


  useEffect(()=>{
    fetchAssignedProjects()
  },[])
  // Dummy data – replace with API data
const projects = assignedProjects;

  // const projects: AssignedProject[] = [
  //   {
  //     title: "E‑Commerce Website Development",
  //     buyer: "Sarah Johnson",
  //     seller: "Omar Alsaeed",
  //     deliverables: 2,
  //     assignedOn: "1/20/2026",
  //     status: "Pending Review",
  //   },
  //   {
  //     title: "Brand Identity and Logo Design",
  //     buyer: "Sarah Johnson",
  //     seller: "Nora Alqahtani",
  //     deliverables: 1,
  //     assignedOn: "1/22/2026",
  //     status: "Pending Review",
  //   },
  //   {
  //     title: "Website Development",
  //     buyer: "Mark Thompson",
  //     seller: "Emily Chen",
  //     deliverables: 3,
  //     assignedOn: "2/5/2026",
  //     status: "In Progress",
  //   },
  //   {
  //     title: "Social Media Strategy",
  //     buyer: "Jessica Lee",
  //     seller: "Alex Kim",
  //     deliverables: 4,
  //     assignedOn: "3/10/2026",
  //     status: "Completed",
  //   },
  //   {
  //     title: "Mobile App Design",
  //     buyer: "David Martinez",
  //     seller: "Olivia Brown",
  //     deliverables: 4,
  //     assignedOn: "4/10/2026",
  //     status: "Pending Approval",
  //   },
  //   {
  //     title: "E‑commerce Setup",
  //     buyer: "Angela White",
  //     seller: "Chris Green",
  //     deliverables: 5,
  //     assignedOn: "5/20/2026",
  //     status: "On Hold",
  //   },
  // ];

const filteredProjects = assignedProjects.filter((p) => {
  if (!searchTerm.trim()) return true;

  const q = searchTerm.toLowerCase();

  return (
    (p.title ?? "").toLowerCase().includes(q) ||
    (p.buyer ?? "").toLowerCase().includes(q) ||
    (p.seller ?? "").toLowerCase().includes(q) ||
    (p.status ?? "").toLowerCase().includes(q)
  );
});


  const getStatusStyles = (status: AssignedProject["status"]) => {
    switch (status) {
      case "Pending Review":
        return { bg: "#FFF7C2", color: "#B45309" };
      case "Pending Approval":
        return { bg: "#FFE4E6", color: "#BE123C" };
      case "In Progress":
        return { bg: "#DBEAFE", color: "#1D4ED8" };
      case "Completed":
        return { bg: "#DCFCE7", color: "#15803D" };
      case "On Hold":
      default:
        return { bg: "#F3E8FF", color: "#7E22CE" };
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
              pt: 12, // same as other dashboards
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
                onClick={() => router.push("/dashboard/qualityexpert")}
                sx={{
                  textTransform: "none",
                  color: "#6B7280",
                  fontWeight: 500,
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                Back to Dashboard
              </Button>
            </Box>

            {/* Main container card */}
            <Card
              sx={{
                borderRadius: "24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                p: { xs: 2.5, sm: 4 },
              }}
            >
              {/* Center icon + titles */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  mb: 4,
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    color: "#fff",
                  }}
                >
                  <SearchRoundedIcon sx={{ fontSize: 36 }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: theme.palette.primary.main }}
                >
                  Assigned Projects
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#6B7280", mt: 0.5 }}
                >
                  ALL PROJECTS ASSIGNED TO YOU
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#9CA3AF", mt: 0.5 }}
                >
                  {filteredProjects.length} projects available
                </Typography>
              </Box>

              {/* Search bar */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, description, or category..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#9CA3AF" }} />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 999,
                      backgroundColor: "#F3F4FF",
                      "& fieldset": { border: "none" },
                      px: 1,
                    },
                  }}
                  inputProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              {/* Project list */}
              <Box>
                {filteredProjects.map((project, idx) => {
                  const { bg, color } = getStatusStyles(project.status);
                  return (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        py: 2.2,
                        px: { xs: 0, sm: 1 },
                        borderBottom:
                          idx !== filteredProjects.length - 1
                            ? "1px solid rgba(156,163,175,0.15)"
                            : "none",
                      }}
                    >
                      {/* Left section: info */}
                      <Box
                        sx={{
                          maxWidth: { sm: "65%" },
                          textAlign: isArabic ? "right" : "left",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: "#20224C",
                            mb: 0.5,
                          }}
                        >
                          Project Name: {project.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#6B7280", mb: 0.3 }}
                        >
                          
                          Buyer: {project?.user?.firstName}  {project?.user?.lastName}         
                           {/* &nbspnbsp;•&; */}
                           {/* Seller:{" "} {project.seller} */}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#6B7280" }}
                        >
                          {/* {project.deliverables} deliverable
                          {project.deliverables !== 1 ? "s" : ""} &nbsp;•&nbsp; */}
                          Assigned: {project.assignedOn}
                        </Typography>
                      </Box>

                      {/* Right section: status + button */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mt: { xs: 1.5, sm: 0 },
                          alignSelf: { xs: "stretch", sm: "auto" },
                          justifyContent: {
                            xs: "space-between",
                            sm: "flex-end",
                          },
                          flexDirection: isArabic ? "row-reverse" : "row",
                        }}
                      >
                        <Chip
                          label={project.status}
                          sx={{
                            borderRadius: 999,
                            fontWeight: 600,
                            px: 1.5,
                            backgroundColor: bg,
                            color,
                          }}
                        />
                        <Button
                          variant="contained"
                          sx={{
                            borderRadius: 999,
                            textTransform: "none",
                            px: 3,
                            py: 0.9,
                            fontWeight: 600,
                            backgroundColor: theme.palette.primary.main,
                          }}
                          onClick={() =>
                            router.push(
                              `/dashboard/qualityexpert/viewprojects/${project?.id}`
                            )
                          }
                        >
                          Review Details
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Card>
          </Box>
        </Box>
      )}
    </DashBoardLayout>
  );
};

export default QualityExpertAssignedProjects;