"use client"

import Sidebar from "@/app/components/Sidebar"
import {
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material"
import { use, useEffect, useState } from "react"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined"
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined"
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import apiClient from "@/api/apiClient"

const ViewProjects = ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = use(params)
  const [userProject,setUserProject] = useState<any>(null);
  const theme = useTheme()
  useEffect(() => {
    apiClient.get(`/projects/${id}`)
    .then((res) => {
      if (res.data.Success) {
        console.log("Project Details:", res.data.Data);
        setUserProject(res.data.Data); 
      }
    })
    .catch((err) => console.error(err));
  }, [])
  // ---------- static data (easy to replace with API later) ----------
  const project = {
    title: `${userProject?.title}` || "E-commerce Website Development",
    category: `${userProject?.template?.name}` || "Website Development",
    status: `${userProject?.status}` || "Completed",
    createdAt: `${userProject?.createdAt}` || "October 1, 2025 at 05:00 AM",
    owner: `${userProject?.user?.firstName} ${userProject?.user?.lastName}`  || "Omar Zayd",
    assignedTo: `${userProject?.assignedTo}` || "XYZ Tech Limited",
    bidsReceived: 3,
    timeline: `${userProject?.timeline}` || "8 Weeks",
    budget: `${userProject?.budgetRange}` || "$15,000",
    lastUpdated: `${userProject?.updatedAt}` || "Jan 1, 2026 at 10:00 AM",
    outline: `${userProject?.outline}` || `We are looking to develop a comprehensive e-commerce website that offers a seamless shopping experience for our customers. The website should include features such as product listings, shopping cart, secure payment gateway integration, user account management, and order tracking. Additionally, we require an admin panel for managing products, orders, and customer inquiries. The design should be modern, responsive, and user-friendly, ensuring compatibility across various devices and browsers. We also expect the development team to provide post-launch support and maintenance services.`,
    attachment: `${userProject?.attachment}` || "ecommerce_requirements.pdf",
  }

  const descriptionLines = [
    `${project?.outline}`
  ]

  // const skillsRequired = [
  //  project.skills?.map((skill: any) => skill.name) || ["React", "Node.js", "UI/UX Design", "API Integration"],
  // ]

  const attachments = [
    { name: `${userProject?.attachment}`}
  ]
  // -------------------------------------------------------------------

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: "#fafafa",
        gap: 2,
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Sidebar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          bgcolor: "#fafafa",
          p: 3,
          borderRadius: 2,
          minHeight: "100vh",
        }}
      >
        {/* MAIN CARD */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "#ffffff",
            borderRadius: 3,
            boxShadow: "0px 1px 4px rgba(15,23,42,0.08)",
            border: "1px solid #e5e7eb",
            p: 3,
          }}
        >
          {/* ---------- TOP SECTION ---------- */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              mb: 3,
            }}
          >
            {/* LEFT: project meta */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "65%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              >
                {project.title}
              </Typography>

              {/* Chips: category + status */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  alignItems: "center",
                  mt: 1.5,
                }}
              >
                {/* <Chip
                  label={project.category}
                  color="primary"
                  size="small"
                  sx={{
                    color: "white",
                    fontWeight: 500,
                    borderRadius: 1.5,
                  }}
                /> */}
                <Chip
                  label={project.status}
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.success.main,
                    color: "white",
                    fontWeight: 500,
                    borderRadius: 1.5,
                  }}
                />
              </Box>

              {/* Created row */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  mt: 2,
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280", fontWeight: 500 }}
                >
                  Created:
                </Typography>
                <Typography variant="body2" sx={{ color: "#111827" }}>
                  {project.createdAt}
                </Typography>
              </Box>

              {/* Owner row */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  mt: 1.5,
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280", fontWeight: 500 }}
                >
                  Project Owner:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      bgcolor: "#e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PersonOutlineOutlinedIcon
                      sx={{ fontSize: 18, color: "#6b7280" }}
                    />
                  </Box>
                  <Typography variant="body2">{project.owner}</Typography>
                </Box>
              </Box>

              {/* Assigned to row */}
              {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  mt: 1.5,
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280", fontWeight: 500 }}
                >
                  Assigned to:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      bgcolor: "#e0f2fe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BusinessCenterOutlinedIcon
                      sx={{ fontSize: 18, color: theme.palette.primary.main }}
                    />
                  </Box>
                  <Typography variant="body2">{project.assignedTo}</Typography>
                </Box>
              </Box> */}
            </Box>

            {/* RIGHT: Bids card */}
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                bgcolor: theme.palette.primary.main,
                color: "white",
                borderRadius: 3,
                p: 2.5,
                width: 270,
                alignSelf: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GroupsOutlinedIcon sx={{ fontSize: 18 }} />
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Bids Received
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                {project.bidsReceived} bids submitted for this project
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  bgcolor: "#ffffff",
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#f9fafb",
                    boxShadow: "none",
                  },
                }}
              >
                View All Bids
              </Button>
            </Box> */}
          </Box>

          {/* ---------- PROJECT DETAILS CARD BODY ---------- */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 1,
              borderRadius: 3,
              border: `1px solid ${theme.palette.primary.main}`,
              p: 3,
            }}
          >
            {/* Project Description */}
            <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                Project Description
              </Typography>
              <Box
                sx={{
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  mb: 2,
                }}
              />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {descriptionLines.map((line, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{ color: "#4b5563", whiteSpace: "pre-line" }}
                  >
                    {line}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Skills Required
            <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                Skills Required
              </Typography>
              <Box
                sx={{
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  mb: 2,
                }}
              />
              {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {skillsRequired.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      borderRadius: 999,
                      fontSize: "0.75rem",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box> 
            </Box> */}

            {/* Attachments */}
            {userProject?.attachment &&
            <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                Attachments
              </Typography>
              <Box
                sx={{
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  mb: 2,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                {attachments.map((file) => (
                  <Box
                    key={file.name}
                    sx={{
                      flex: 1,
                      minWidth: 220,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      border: "1px solid #e5e7eb",
                      bgcolor: "#fafafa",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#111827" }}>
                      {file.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 0.5,
                        alignItems: "center",
                      }}
                    >
                      <IconButton size="small" sx={{ color: "#6b7280" }}>
                        <VisibilityOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#6b7280" }}>
                        <CloudDownloadOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

}
            {/* Project Timeline & Budget bar */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 1,
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: theme.palette.primary.main,
                color: "white",
              }}
            >
              {/* Timeline label */}
              <Box
                sx={{
                  flex: 2,
                  display: "flex",
                  alignItems: "center",
                  px: 3,
                  py: 2,
                  borderRight: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Project Timeline:
                </Typography>
              </Box>

              {/* Timeline value */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 3,
                  py: 2,
                  borderRight: "1px solid rgba(255,255,255,0.2)",
                  bgcolor: "rgba(255,255,255,0.06)",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {project.timeline}
                </Typography>
              </Box>

              {/* Budget */}
              <Box
                sx={{
                  flex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 3,
                  py: 2,
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Project Budget:
                </Typography>
                <Box
                  sx={{
                    borderRadius: 999,
                    bgcolor: "#ffffff",
                    color: theme.palette.primary.main,
                    px: 3,
                    py: 0.75,
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  {project.budget}
                </Box>
              </Box>
            </Box>

            {/* Last updated */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 2,
                justifyContent: "flex-start",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#6b7280" }}
              >{`Last Updated: ${project.lastUpdated}`}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ViewProjects