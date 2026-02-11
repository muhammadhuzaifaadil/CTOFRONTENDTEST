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
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import theme from "@/app/theme/theme";
import apiClient from "@/api/apiClient";
import MilestoneProposalPage from "../../../milestones/[projectId]/page";

const checklistItems = [
  {
    id: "requirements",
    title: "Understood project requirements",
    description:
      "I have thoroughly reviewed and understood all project requirements",
  },
  {
    id: "scope",
    title: "Scope is clear",
    description: "The project scope and deliverables are clearly defined",
  },
  {
    id: "timeline",
    title: "Timeline is defined",
    description: "Project timeline and milestones are agreed upon",
  },
  {
    id: "requirementsConfirmed",
    title: "Requirements are confirmed",
    description:
      "All technical and functional requirements have been confirmed",
  },
  {
    id: "thirdParty",
    title: "Third-party integrations clarified",
    description:
      "Any third-party integrations and dependencies are clear",
  },
  {
    id: "budget",
    title: "Budget is satisfactory",
    description: "The project budget and payment terms are acceptable",
  },
];

export default function AcceptanceChecklistPage({
  params,
}: {
  params: Promise<{ projectId: number }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formstate,setFormState] = useState();

    const [projectData,setProjectData]  = useState();
  console.log("projectId", projectId);
  useEffect(()=>{
    const fetchResult = async()=>{
    const result:any = await apiClient.get(`/projects/projectForm/${projectId}`)
    console.log('result data:',result.data);
    setFormState(result.data.Success);
    }

    fetchResult()
  },[projectId])

  useEffect(() => {
  if (formstate === true) {
    router.push(`/dashboard/seller/milestones/${projectId}`);
  }
}, [formstate, projectId, router]);

  return (
    <>
      {formstate==false&&(
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

          {/* Content */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Section heading & line */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "#1F2937",
                  mb: 1,
                }}
              >
                Buyer - Seller Communication
              </Typography>

              <Box
                sx={{
                  height: 2,
                  width: "100%",
                  backgroundColor: "#E0E7FF",
                  mb: 1.5,
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "#64748B",
                }}
              >
                Please review and confirm all items below. All checkboxes must be
                checked to proceed.
              </Typography>
            </Box>

            {/* Checklist items */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {checklistItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    backgroundColor: "#F5F5FF",
                    borderRadius: 3,
                    p: { xs: 1.5, sm: 2 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      mt: 0.5,
                      bgcolor: theme.palette.primary.main,
                      boxShadow:
                        "0 3px 8px rgba(79, 70, 229, 0.4)",
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 16, color: "#FFFFFF" }} />
                  </Avatar>

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: "#1F2937",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: "#64748B",
                        mt: 0.3,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Important note */}
            <Box
              sx={{
                mt: 3,
                mb: 3,
                backgroundColor: "#F0F4FF",
                borderRadius: 3,
                border: "1px solid #E0E7FF",
                p: { xs: 2, sm: 2.5 },
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  color: theme.palette.primary.main,
                  mr: { sm: 0.5 },
                }}
              >
                Important:
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "#64748B",
                }}
              >
                Once you submit this form, it becomes read‑only and will be
                shared with the buyer for final review before the project is
                awarded.
              </Typography>
            </Box>

            {/* Submit Button */}
            <Box sx={{ width: "100%" }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<CheckCircleOutlineIcon />}
                disabled={submitting}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "25px",
                  py: 1.5,
                  backgroundImage:
                    "linear-gradient(to right, #4F46E5, #6366F1)",
                  boxShadow: "0 10px 20px rgba(79, 70, 229, 0.35)",
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(to right, #4338CA, #4F46E5)",
                  },
                }}
                onClick={() => {
                  // handle submit
                }}
              >
                Submit Acceptance Form
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      </DashBoardLayout>
      )}
    </>
  );
}