"use client";

import DashBoardLayout from "@/app/layouts/DashboardLayout";
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import VideocamIcon from "@mui/icons-material/Videocam";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import theme from "@/app/theme/theme";
import apiClient from "@/api/apiClient";

export default function AcceptedBidPage({
  params,
}: {
  params: Promise<{ projectId: any }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const [projectData,setProjectData]  = useState();
  // console.log("projectId", projectId);
  // useEffect(()=>{
  //   const fetchResult = async()=>{
  //   const result:any = await apiClient.get(`/projects/projectForm/${projectId}`)
  //   console.log('result data:',result.data);
  //   if(result.Success =="false")
  //   {

  //   }
  //   else{
  //     setProjectData(result.data);
  //   }
  //   }

  //   fetchResult()
  // },[])

  return (
    <DashBoardLayout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          background: theme.palette.background.default,
          mt: { xs: 6, sm: 4, md: 3 },
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {/* Back Button */}
        <Box
          sx={{
            display: "flex",
            width: { xs: "95%", sm: "90%", md: "1152px" },
            justifyContent: "flex-start",
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
            onClick={() => router.push("/dashboard/seller")}
            sx={{
              textTransform: "none",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: 600,
              color: "#5A607F",
            }}
          >
            Back
          </Button>
        </Box>

        {/* Main Card Container */}
        <Container
          maxWidth={false}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            width: { xs: "95%", sm: "90%", md: "1152px" },
            p: { xs: 3, sm: 4, md: 5 },
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
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
              mb: 4,
              textAlign: "center",
            }}
          >
            <TaskAltIcon
              sx={{
                height: { xs: 50, sm: 60 },
                width: { xs: 50, sm: 60 },
                color: "white",
                backgroundColor: theme.palette.primary.main,
                borderRadius: "50%",
                padding: { xs: "10px", sm: "12px" },
                mb: 1,
                boxShadow: "0 4px 10px rgba(79, 70, 229, 0.3)",
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                fontWeight: 600,
              }}
            >
              Bid Awarding Stage
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              FINALIZE PROJECT AWARD
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                color: "#64748B",
              }}
            >
              Complete the acceptance process to award the project
            </Typography>
          </Box>

          {/* Main Content */}
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            {/* First Row: Project Details + Seller Info */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                mb: 3,
                width: "100%",
              }}
            >
              {/* Project Details */}
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "#EEF2FF",
                  borderRadius: 3,
                  p: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#312E81",
                    fontSize: "1.05rem",
                    mb: 2.5,
                  }}
                >
                  Project Details
                </Typography>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Typography sx={{ fontSize: "0.9rem", color: "#4338CA" }}>
                    <span
                      style={{
                        fontWeight: 600,
                        color: "#1E1B4B",
                        marginRight: 4,
                      }}
                    >
                      Title:
                    </span>
                    E-Commerce Website Development
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "#4338CA" }}>
                    <span
                      style={{
                        fontWeight: 600,
                        color: "#1E1B4B",
                        marginRight: 4,
                      }}
                    >
                      Budget:
                    </span>
                    $14500
                  </Typography>
                </Box>
              </Box>

              {/* Seller Information */}
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "#EEF2FF",
                  borderRadius: 3,
                  p: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#312E81",
                    fontSize: "1.05rem",
                    mb: 2.5,
                  }}
                >
                  Seller Information
                </Typography>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Typography sx={{ fontSize: "0.9rem", color: "#64748B" }}>
                    <span
                      style={{
                        fontWeight: 600,
                        color: "#1E1B4B",
                        marginRight: 4,
                      }}
                    >
                      Company:
                    </span>
                    Digital Pro Solutions
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "#64748B" }}>
                    <span
                      style={{
                        fontWeight: 600,
                        color: "#1E1B4B",
                        marginRight: 4,
                      }}
                    >
                      Timeline:
                    </span>
                    7 weeks
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Second Box: Conference Call Required (Blue) */}
            <Box
              sx={{
                backgroundColor: "#F0F4FF",
                borderRadius: 3,
                border: "1px solid #E0E7FF",
                p: { xs: 2.5, md: 3 },
                mb: 3,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                width: "100%",
              }}
            >
              {/* Icon */}
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                }}
              >
                <VideocamIcon sx={{ color: "#FFFFFF" }} />
              </Avatar>

              {/* Text + Actions */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#312E81",
                    fontSize: "0.95rem",
                    mb: 0.5,
                  }}
                >
                  Conference Call Done
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "#64748B",
                    mb: 2,
                  }}
                >
                  Both parties have discussed and are willing to work on the milestones of project
                </Typography>

                {/* Orange badge */}
                {/* <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor: "#FFA000",
                    borderRadius: "20px",
                    px: 2,
                    py: 0.6,
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 16, color: "#FFFFFF" }} />
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#FFFFFF",
                      fontWeight: 500,
                    }}
                  >
                    Please schedule and complete this within the given timeframe
                  </Typography>
                </Box> */}

                {/* Action Button */}
                <Box>
                  <Button
                    variant="contained"
                    disabled={loading}
                    startIcon={<CheckCircleOutlineIcon />}
                    sx={{
                      textTransform: "none",
                      borderRadius: "20px",
                      px: 3,
                      py: 1,
                      backgroundColor: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                    onClick={() => {
                      // handle mark as completed
                    }}
                  >
                    Conference Call has been completed through the meet link sent by buyer
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Third Box: Yellow Warning */}
            {/* <Box
              sx={{
                backgroundColor: "#FFF8E1",
                borderRadius: 3,
                border: "1px solid #FFE0B2",
                p: 4,
                mb: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 1,
                width: "100%",
              }}
            >
              <WarningAmberIcon sx={{ fontSize: 40, color: "#FFA000" }} />
              <Typography
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  fontSize: "0.95rem",
                  mt: 1,
                }}
              >
                Conference Call Required
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#64748B",
                }}
              >
                Please complete the conference call before proceeding with the
                acceptance checklist.
              </Typography>
            </Box> */}

            {/* Fourth Box: Reject Button */}
            <Box sx={{ width: "100%" }}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "25px",
                  py: 1.5,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: "lightpurple",
                  },
                }}
                onClick={() => {
                    router.push(`/dashboard/seller/acceptedbids/form/${projectId}`)
                }}
              >
                View Form
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </DashBoardLayout>
  );
}


