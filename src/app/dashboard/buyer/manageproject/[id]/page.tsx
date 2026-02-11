"use client"
import apiClient from "@/api/apiClient";
import { Box, CircularProgress, Container, Typography, TextField, Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect, use, useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UpdateIcon from "@mui/icons-material/Update";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GroupIcon from "@mui/icons-material/Group";import { useTheme } from "@mui/material/styles";
import DashBoardLayout from "@/app/layouts/DashboardLayout";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { useTranslations } from "next-intl";
import StarsIcon from '@mui/icons-material/Stars';
type TemplateQuestionForm = {
  id?: number | string;
  questionText: string;
  questionValue: string;
};

type ProjectForm = {
  title: string;
  outline: string;
  requirements: string;
  timeline: string;
  budgetRange: string;
  templateQuestions: TemplateQuestionForm[];
};



const ProjectPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: projectId } = use(params);  
  console.log("Project ID:", projectId);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const {isArabic,toggleLanguage,locale} = useContext(LanguageContext)
  const t = useTranslations("ManageProjectById");
  const [color,setColor] = useState("");
  const theme = useTheme();
  

const [editable, setEditable] = useState(false);
const [form, setForm] = useState<ProjectForm | null>(null);
  
    const router = useRouter();
  // Fetch project details when modal opens
  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, []);

  const fetchProject = async () => {
    try {
      setLoading(true);
       console.log(params)
      console.log(projectId)
      const res = await apiClient.get(`/projects/${projectId}`);
      if (res.data?.Success) {
        setProject(res.data.Data);
        setForm(res.data.Data);
        console.log(res.data.Data);
      }
    } catch (err) {
      console.error("Failed to fetch project:", err);
    } finally {
      setLoading(false);
    }
  };
  const statusLabels:any = {
  Published: {
    en: "Published",
    ar: "منشور"
  },
  Draft: {
    en: "Draft",
    ar: "مسودة"
  }
};


  const handleDelete = async () => {
    try {
      await apiClient.delete(`/projects/${projectId}`);
      window.location.reload();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // const handleEdit = async () => {
  //   try {
  //     await apiClient.put(`/projects/${projectId}`, form);
  //     setEditMode(false);
  //     await fetchProject();
  //     window.location.reload();
  //   } catch (err) {
  //     console.error("Edit failed:", err);
  //   }
  // };
  const handleEdit = () => {
  // toggle into edit mode; you can add save logic elsewhere
  setEditable((prev) => !prev);
};
  const handlePublish = async ()=>{
    const res = await apiClient.put(`/projects/updatepublish/${projectId}`)
    if(res?.data?.Success===true)
    {
      router.push("/dashboard/buyer/manageproject")
    }
  }

  const PublishProject = async () =>{
    try {
      await apiClient.put(`/projects/updatepublish/${projectId}`)
      window.location.reload();
    } catch (error) {
      console.error("Edit failed:", error);
    }
  }

// const editable = project?.status?.toLowerCase() === "draft";
useEffect(() => {
  if (!project) return;

  setForm({
    title: project.title ?? "",
    outline: project.outline ?? "",
    requirements: project.requirements ?? "",
    timeline: project.timeline ?? "",
    budgetRange: project.budgetRange ?? "",
    templateQuestions:
      project.templateQuestions?.map((q: any) => ({
        id: q.id,
        questionText: q.questionText,
        questionValue: q.questionValue ?? "",
      })) ?? [],
  });
}, [project]);
  if (!project && loading) 
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
          onClick={()=>{router.push("/dashboard/buyer/manageproject")}}
          sx={{
            textTransform: "none",
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: 600,
            color: "black",
            flexDirection: "row",
            gap: 1,
          }}
        >
          Back to Projects
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
        mt: { xs: 8, md: 3 },
        py: { xs: 2, sm: 4, md: 6 },
      }}
    >
      {/* Top Back Button */}
      <Box
        sx={{
          display: "flex",
       flexDirection: isArabic ? "row-reverse" : "row", // 👈 flips layout
    justifyContent: isArabic ? "flex-start" : "flex-start", // 👈 Arabic aligns left, English stays left
          width: { xs: "95%", sm: "75%", md: "75%" },
          mb: 2,
        }}
      >
        <Button
          startIcon={
            <ArrowBackIcon
              sx={{
               transform: isArabic ? "scaleX(-1)" : "none", // 👈 flips arrow direction
                transition: "transform 0.2s ease",
              }}
            />
          }
          onClick={()=>{router.push("/dashboard/buyer/manageproject")}}
          sx={{
            textTransform: "none",
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: 600,
            color: "black",
      flexDirection: isArabic ? "row-reverse" : "row", // 👈 ensures icon on right, text on left in Arabic
            gap: 1,
          }}
        >
          {t("Back2Project")}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: { xs: 3, md: 5 },
          }}
        >
          {/* Title + Status */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: isArabic?"row-reverse":"row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 1.5,
            }}
          >
       {editable ? (
  <TextField
    sx={{ width: "auto" }}
    value={form?.title ?? ""}
    onChange={(e) =>
      setForm((prev) =>
        prev ? { ...prev, title: e.target.value } : prev
      )
    }
  />
) : (
  <Typography variant="h5" fontWeight={600}>
    {project?.title || "E-Commerce Website Development"}
  </Typography>
)}
            <Box
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: 999,
                bgcolor:project?.statusColor,
                color:
                  "black",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {isArabic
    ? statusLabels[project?.status || "Published"]?.ar
    : statusLabels[project?.status || "Published"]?.en}
            </Box>
          </Box>

          {/* Created / Updated Row */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 4 },
              color: "text.secondary",
              fontSize: 14,
              justifyContent:"space-between"
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1,flexDirection:isArabic?"row-reverse":"row" }}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">
                {t("Created")} {(new Date(project?.createdAt).toLocaleDateString()) || "October 1, 2025 at 05:00 AM"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1,flexDirection:isArabic?"row-reverse":"row" }}>
              <UpdateIcon fontSize="small" />
              <Typography variant="body2">
                {t("Updated")} {(new Date(project?.updatedAt).toLocaleDateString()) || "October 1, 2025 at 05:00 AM"}
              </Typography>
            </Box>
          </Box>

          {/* Project Description */}
          <Box >

            <Typography variant="h6" fontWeight={600} display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>
              {t("ProjectOutline")}
            </Typography>
            <Divider
              sx={{
                mt: 1,
                mb: 2,
                borderBottomWidth: 3,
                borderColor: theme.palette.primary.main,
                opacity: 0.7,
                width: "100%",
              }}
            />

          {editable ? (
  <TextField
    fullWidth
    multiline
    minRows={4}
    value={form?.outline ?? ""}
    onChange={(e) =>
      setForm((prev) =>
        prev ? { ...prev, outline: e.target.value } : prev
      )
    }
  />
) : (
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{ whiteSpace: "pre-line", lineHeight: 1.7,display:"flex",justifyContent:isArabic?"flex-end":"flex-start" }}
  >
    {project?.outline ||"no outline"}
  </Typography>
)}
          </Box>

            <Box>
            <Typography variant="h6" fontWeight={600} sx={{display:"flex",justifyContent:isArabic?"flex-end":"flex-start" }}>
             {t("ProjectRequirements")}
            </Typography>
            <Divider
              sx={{
                mt: 1,
                mb: 2,
                borderBottomWidth: 3,
                borderColor: theme.palette.primary.main,
                opacity: 0.7,
                width: "100%",
              }}
            />
         {editable ? (
  <TextField
    fullWidth
    multiline
    minRows={4}
    value={form?.requirements ?? ""}
    onChange={(e) =>
      setForm((prev) =>
        prev ? { ...prev, requirements: e.target.value } : prev
      )
    }
  />
) : (
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{ whiteSpace: "pre-line", lineHeight: 1.7,display:"flex",justifyContent:isArabic?"flex-end":"flex-start" }}
  >
    {project?.requirements ||"no requirement"}
  </Typography>
)}
       </Box>

          {/* Template Questions (replaces "Skills Required") */}
         <Box>
  <Typography variant="h6" fontWeight={600} sx={{display:"flex",justifyContent:isArabic?"flex-end":"flex-start"}}>
    {t("ProjectBrief")}
  </Typography>
  <Divider
    sx={{
      mt: 1,
      mb: 2,
      borderBottomWidth: 3,
      borderColor: theme.palette.primary.main,
      opacity: 0.7,
      width: "100%",
    }}
  />

  <Box
    sx={{
      bgcolor: theme.palette.grey[100],
      borderRadius: 2,
      p: { xs: 2, md: 3 },
      display: "flex",
      flexDirection: "column",
      gap: 2.5,
    }}
  >
    {/* When editable, only value is a TextField; question text stays label */}
    {editable ? (
      <>
        {form?.templateQuestions?.length ? (
          form.templateQuestions.map((qa, idx) => (
            <Box key={qa.id ?? idx}>
              <Typography variant="subtitle2" fontWeight={600} display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>
                {qa.questionText}
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={2}
                value={qa.questionValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm((prev) =>
                    prev
                      ? {
                          ...prev,
                          templateQuestions: prev.templateQuestions.map(
                            (item, i) =>
                              i === idx
                                ? { ...item, questionValue: value }
                                : item
                          ),
                        }
                      : prev
                  );
                }}
                sx={{ mt: 1 }}
              />
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No questions defined.
          </Typography>
        )}
      </>
    ) : (
      <>
        {project?.templateQuestions ? (
          project.templateQuestions.map((qa: any, idx: number) => (
            <Box key={qa.id ?? idx}>
              <Typography variant="subtitle2" fontWeight={600} display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>
                {qa.questionText}
              </Typography>
              <Typography variant="body2" color="text.secondary" display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>
                {qa.questionValue}
              </Typography>
            </Box>
          ))
        ) : (
          <>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Question 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Answer for question 1 goes here.
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Question 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Answer for question 2 goes here.
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Question 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Answer for question 3 goes here.
              </Typography>
            </Box>
          </>
        )}
      </>
    )}
  </Box>
</Box>

          {/* Bottom: Project Timeline (card) + Bids Received (card) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "column" },
              gap: 3,
            }}
          >
            {/* Project Timeline Card */}
            <Box
              sx={{
                flex: 1,
                bgcolor: theme.palette.grey[100],
                borderRadius: 2,
                p: { xs: 2, md: 3 },
              }}
            >
        
              <Typography variant="subtitle1" fontWeight={600} gutterBottom display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>
                {t("ProjectTimeline")}
              </Typography>


              <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    flexDirection:isArabic?"row-reverse":"row",
    mb: 1.5,
  }}
>
  <Typography variant="body2" color="text.secondary"
  //  display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}
   >
    {t("Duration")}
  </Typography>
  {editable ? (
    <TextField
      size="small"
      value={form?.timeline ?? ""}
      onChange={(e) =>
        setForm((prev) =>
          prev ? { ...prev, timeline: e.target.value } : prev
        )
      }
      sx={{ maxWidth: 160 }}
    />
  ) : (
    <Typography variant="body2" fontWeight={500} 
    // display={"flex"} justifyContent={isArabic?"flex-start":"flex-end"}
    >
      {project?.timeline || "8 Weeks"}
    </Typography>
  )}
</Box>

<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    flexDirection:isArabic?"row-reverse":"row",
    mb: 1.5,
  }}
>
  <Typography variant="body2" color="text.secondary">
    {t("Budget")}
  </Typography>
  {editable ? (
    <TextField
      size="small"
      value={form?.budgetRange ?? ""}
      onChange={(e) =>
        setForm((prev) =>
          prev ? { ...prev, budgetRange: e.target.value } : prev
        )
      }
      sx={{ maxWidth: 160 }}
    />
  ) : (
    <Typography variant="body2" fontWeight={500}>
      {project?.budgetRange || "Published"}
    </Typography>
  )}
</Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection:isArabic?"row-reverse":"row"
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {t("LastUpdated")}
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {new Date(project?.updatedAt).toLocaleDateString() || "Oct 1, 2025"}
                </Typography>
              </Box>
            </Box>

            {/* Bids Received Card */}
            <Box
              sx={{
                flex: 1,
                borderRadius: 2,
                bgcolor: theme.palette.primary.main,
                color: "#fff",
                p: { xs: 2, md: 3 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>
                {t("BidsReceived")}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection:isArabic?"row-reverse":"row",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">
                  {t("SeeBids")}
                </Typography>
                <GroupIcon />
              </Box>

              <Button
                fullWidth
                onClick={()=>{router.push(`/dashboard/buyer/manageproject/${projectId}/viewallbids`)}}
                variant="contained"
                sx={{
                  mt: 1,
                  bgcolor: "#fff",
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                {t("ViewAllBids")}
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                borderRadius: 2,
                bgcolor: theme.palette.primary.main,
                color: "#fff",
                p: { xs: 2, md: 3 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>
                Quality Assurance
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection:isArabic?"row-reverse":"row",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">
                  Hire a Quality Expert to review project deliverables
                </Typography>
                <StarsIcon />
              </Box>

              <Button
                fullWidth
                onClick={()=>{router.push(`/dashboard/buyer/manageproject/${projectId}/hireexpert`)}}
                variant="contained"
                sx={{
                  mt: 1,
                  bgcolor: "#fff",
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                Hire Quality Expert
              </Button>
            </Box>
           {project?.status?.toLowerCase() === "draft" && (
            <Box sx={{display:"flex",flexDirection:'column',justifyContent:"center",width:"100%"}}>
  <Button
    fullWidth
    onClick={handleEdit}
    variant="contained"
    sx={{
      mt: 1,
      bgcolor: "#fff",
      color: theme.palette.primary.main,
      fontWeight: 600,
      textTransform: "none",
      "&:hover": {
        bgcolor: "rgba(255, 255, 255, 0.9)",
      },
    }}
  >
    {editable ? "Close Edit" : "Edit"}
  </Button>
  <Button
  fullWidth
    onClick={handlePublish}
    variant="contained"
    sx={{
      mt: 1,
      bgcolor: "#564bd6ff",
      color: "white",
      fontWeight: 600,
      textTransform: "none",
      "&:hover": {
        bgcolor: "rgba(112, 97, 230, 0.9)",
      },
    }}>
    Publish Project
  </Button>
  </Box>
)}

            
          </Box>
        </Box>
      </Container>
    </Box>
    </DashBoardLayout>
  );
};

export default ProjectPage;
