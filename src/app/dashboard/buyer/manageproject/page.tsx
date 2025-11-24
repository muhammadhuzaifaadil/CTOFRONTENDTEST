"use client"
import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  Divider,
  Stack,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import DashBoardLayout from "../../../layouts/DashboardLayout"; // adjust import if needed
import apiClient from "@/api/apiClient";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { useTranslations } from "next-intl";
import BidsModal from "@/app/components/BidsModal";
import { useAuth } from "@/hooks/useAuth";
import ProjectModal from "@/app/components/ProjectModal";

const ManageProjects: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const {user} = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
    const { isArabic, locale } = useContext(LanguageContext);
    const t = useTranslations("ManageProject");
  const [selectedStatus, setSelectedStatus] = useState(isArabic?"قيد التنفيذ":"In Progress"); //check and fix why arabic at default not occuring in status
  const [selectedStatusArabic,setSelectedStatusArabic]= useState("")
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1 });
  const [loading, setLoading] = useState(false);

    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openProjectModal , setOpenProjectModal] = useState(false);
  const handleOpenModal = (projectId: number) => {
    setSelectedProjectId(projectId);
    setOpenModal(true);
  };
  const handleOpenProjectModal = (projectId:number) =>{
    setSelectedProjectId(projectId);
    setOpenProjectModal(true);
  }
  // const recentProjects = [
  //   {
  //     Title: "Restaurant Menu and Promotional Materials",
  //     Outline:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis fugiat qui quo saepe? Non sit doloribus tempore aliquam, maxime velit deserunt maiores officia similique iste, enim necessitatibus explicabo, assumenda a!",
  //     StatusColor: "orange",
  //     Status: "In Progress",
  //     Budget: "Not Specified",
  //     Timeline: "3 Weeks",
  //     Skills: "html,css,db",
  //   },
  //   {
  //     Title: "Project Two",
  //     Outline: "Another brief outline",
  //     StatusColor: "green",
  //     Status: "Completed",
  //     Budget: "$500",
  //     Timeline: "2 Weeks",
  //     Skills: "react,typescript,api",
  //   },
  //   {
  //     Title: "Project Three",
  //     Outline: "Third project outline",
  //     StatusColor: "red",
  //     Status: "Draft",
  //     Budget: "$200",
  //     Timeline: "1 Week",
  //     Skills: "nodejs,express,mongodb",
  //   },
  // ];

  // useEffect(() => {
  //   const filtered = recentProjects.filter((p) => p.Status === selectedStatus);
  //   setProjects(filtered);
  // }, [selectedStatus]);

  // const statusFilters = [
  //   { label: `${t("Status1")}`, color: "red" },
  //   { label: `${t("Status2")}`, color: "cyan" },
  //   { label: `${t("Status3")}`, color: "#cb9d33ff" },
  //   { label: `${t("Status4")}`, color: "green" },
  // ];

  //   const statusFilters = [
  //   { label: 'Draft', color: "red" },
  //   { label: 'Published', color: "cyan" },
  //   { label: 'In Progress', color: "#cb9d33ff" },
  //   { label: 'Completed', color: "green" },
  // ];
  const statusFilters = [
  { label: t("Status1"), value: "Draft", color: "red" },
  { label: t("Status2"), value: "Published", color: "cyan" },
  { label: t("Status3"), value: "In Progress", color: "#cb9d33ff" },
  { label: t("Status4"), value: "Completed", color: "green" },
];

  const fetchProjects = async (status: string, page = 1) => {
  try {
    setLoading(true);
    const response = await apiClient.get("/projects/paginated/all", {
      params: {
        filterKey: "status",
        filterBy: status,
        page,
        limit: 12,
      },
    });

    // ✅ Adjust for your actual backend response casing
    const resData = response.data;

    if (resData?.Success && resData?.Data) {
      setProjects(resData.Data.projects || []);
      setPagination({
        page: Number(resData.Data.pagination.page),
        limit: Number(resData.Data.pagination.limit),
        totalPages: Number(resData.Data.pagination.totalPages),
      });
    } else {
      console.warn("⚠️ Unexpected response format:", resData);
    }
  } catch (err) {
    console.error("❌ Failed to fetch projects:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchProjects(selectedStatus);
  }, [selectedStatus]);

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
    mt: {xs:8,md:3},
    py: { xs: 2, sm: 4, md: 6 },
  }}
>
  {/* Back Button
  <Box
    sx={{
      display: "flex",
      flexDirection:isArabic?"row-reverse":"row",
      width: { xs: "95%", sm: "75%", md: "75%" },
      justifyContent: isArabic?"flex-end":"flex-start",
      mb: 2,
    }}
  >
    <Button
      startIcon={<ArrowBackIcon sx={{
      transform: isArabic ? "scaleX(-1)" : "none", // 👈 flips the arrow to point right
      transition: "transform 0.2s ease",
    }} />}
      onClick={() => router.push("/dashboard/buyer")}
      sx={{
        textTransform: "none",
        fontSize: { xs: "14px", sm: "16px" },
        fontWeight: 600,
        color: "black",
      }}
    >
      {t("BackButton")}
    </Button>
  </Box> */}
{/* Back Button */}
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
    onClick={() => router.push("/dashboard/buyer")}
    sx={{
      textTransform: "none",
      fontSize: { xs: "14px", sm: "16px" },
      fontWeight: 600,
      color: "black",
      flexDirection: isArabic ? "row-reverse" : "row", // 👈 ensures icon on right, text on left in Arabic
      gap: 1,
    }}
  >
     {t("BackButton")}
  </Button>
</Box>

  <Container
    maxWidth={false}
    sx={{
      backgroundColor: theme.palette.background.default,
      borderRadius: 3,
      width: { xs: "100%", sm: "90%", md: "1152px" },
      height: { xs: "auto", sm: "auto", md: "886px" },
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
    {/* Filter Chips */}
    <Stack direction={isArabic?"row-reverse":"row"} spacing={1} sx={{ width: "100%", overflowX: { xs: "auto", sm: "auto", md: "visible" } }} mb={3}>
      {statusFilters.map((status) => (
        <Chip
          key={status.value}
          label={status.label}
          onClick={() => {
            setSelectedStatus(status.value);
            setSelectedStatusArabic(status.label);
          }}
          sx={{
            backgroundColor: theme.palette.grey[200],
            fontWeight: selectedStatus === status.label ? 600 : 400,
            color:
              selectedStatus === status.value
                ? status.color
                : theme.palette.text.secondary,
            cursor: "pointer",
            border: `2px solid ${status.color}`,
            px: 1.5,
            py: 1,
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "0.9rem" },
            borderRadius: 2,
            flexShrink: 0,
          }}
        />
      ))}
    </Stack>

    {/* Header */}
    <Box sx={{ textAlign: "center", mb: 3 }}>
      <FolderOpenIcon
        sx={{
          borderRadius: "24px",
          height: { xs: 40, sm: 45, md: 50 },
          width: { xs: 40, sm: 45, md: 50 },
          backgroundColor: theme.palette.primary.main,
          color: "white",
          p: 1,
        }}
      />
      <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }}>
        {t("Header1")}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {t("Header2")}
      </Typography>
      <Typography variant="body1" sx={{ color: "#6c757d" }}>
        {t("Content")}
      </Typography>
    </Box>

    {/* Status Header */}
    <Typography
      variant="subtitle1"
      sx={{
        width: "100%",
        fontWeight: "bold",
        borderBottom: `2px solid #f5b400`,
        display:"flex",
        justifyContent:isArabic?"flex-end":"flex-start",
        mb: 2,
      }}
    >
      {isArabic ? selectedStatusArabic : selectedStatus} ({projects.length})
    </Typography>

    {/* Projects */}
    <Box
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        overflowY: "auto",
        maxHeight: { xs: "400px", sm: "500px", md: "550px" },
        paddingRight: 1,
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-thumb": { backgroundColor: "#ccc", borderRadius: "8px" },
        "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#aaa" },
      }}
    >
      {loading ? (
        <Typography>Loading projects...</Typography>
      ) : projects.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            color: "#9e9e9e",
            fontWeight: 500,
            textAlign: "center",
            mt: 4,
          }}
        >
          {t("NotFound")}
        </Typography>
      ) : (
        projects.map((project, index) => (
          <Card
            key={index}
            // onClick={() => router.push(`manageproject/${project.id}`)}
            sx={{
              display: "flex",
              p: 2,
              borderRadius: 3,
              width: { xs: "100%", sm: "95%", md: "1000px" },
              height: { xs: "auto", sm: "auto", md: "250px" },
              flexShrink: 0,
              boxShadow: "0px 3px 10px rgba(0,0,0,0.05)",
              backgroundColor: "white",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              
              
            }}
          >
            <CardContent sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
              {/* Project Header */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, flexWrap: "wrap",flexDirection:isArabic?"row-reverse":"row" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#333" }}>
                  {project.title}
                </Typography>
                <Chip
                  label={project.status}
                  sx={{
                    backgroundColor:
                      statusFilters.find((s) => s.value === project.status)?.color ||
                      "grey",
                    color: "white",
                    fontWeight: 600,
                  }}
                  size="small"
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display:"flex",justifyContent:isArabic?"flex-end":"flex-start" }}>
                {project.outline
                  ? project.outline.split(" ").slice(0, 50).join(" ") +
                    (project.outline.split(" ").length > 50 ? "..." : "")
                  : "No outline available."}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2,flexDirection:isArabic?"row-reverse":"row" }}>
                <Typography variant="body2" display={"flex"} flexDirection={isArabic?"row-reverse":"row"}>
                  <strong>{t("Budget")}</strong> {project.budgetRange || "Not Specified"}
                </Typography>
                <Typography variant="body2" display={"flex"} flexDirection={isArabic?"row-reverse":"row"}>
                  <strong>{t("Timeline")}</strong>{" "}
                  <span style={{ color: theme.palette.primary.main }}>{project.timeline}</span>
                </Typography>
                <Typography variant="body2" display={"flex"} flexDirection={isArabic?"row-reverse":"row"}>
                  <strong>{t("Skills")}</strong>{" "}
                  <span style={{ color: theme.palette.primary.main }}>
                    {(project.skillsRequired || []).join(", ") || "0 required"}
                  </span>
                </Typography>
              </Box>
                {/* Buttons for viewing */}
               <Box display={"flex"} justifyContent={"space-between"} sx={{ mt: 1 }}>
                {/* <Button
                  
                  variant="contained"
                  sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                    width:"100%",
                    py: 1.2,
                  }}
                  onClick={() => handleOpenProjectModal(project.id)}
                >
                  View Project
                </Button> */}
                <Button
                  
                  variant="contained"
                  sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                    width:"100%",
                    py: 1.2,
                  }}
                  onClick={() => handleOpenModal(project.id)}
                >
                  {t("ViewBids")}
                </Button>
              </Box>
              
            </CardContent>
          </Card>
        ))
      )}
    </Box>

    {/* Pagination */}
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 1 }}>
      <Button
        variant="outlined"
        disabled={pagination.page <= 1}
        onClick={() => fetchProjects(selectedStatus, pagination.page - 1)}
      >
        Prev
      </Button>
      <Typography>
        Page {pagination.page} of {pagination.totalPages}
      </Typography>
      <Button
        variant="outlined"
        disabled={pagination.page >= pagination.totalPages}
        onClick={() => fetchProjects(selectedStatus, pagination.page + 1)}
      >
        Next
      </Button>
    </Box>

    <BidsModal open={openModal} onClose={() => setOpenModal(false)} projectId={selectedProjectId} />

    <ProjectModal open={openProjectModal} onClose={()=>setOpenProjectModal(false)} projectId={selectedProjectId}/>
  </Container>
</Box>
          )}
    </DashBoardLayout>
  
  );
};

export default ManageProjects;
