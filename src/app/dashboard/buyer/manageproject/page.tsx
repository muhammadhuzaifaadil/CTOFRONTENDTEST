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
} from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import DashBoardLayout from "../../../layouts/DashboardLayout"; // adjust import if needed
import apiClient from "@/api/apiClient";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { useTranslations } from "next-intl";

const ManageProjects: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const [projects, setProjects] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("In Progress");
  const [selectedStatusArabic,setSelectedStatusArabic]= useState("")
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const { isArabic, locale } = useContext(LanguageContext);
    const t = useTranslations("ManageProject");
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
        limit: 2,
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
    // <DashBoardLayout>
    //   <Box
    //     sx={{
    //       minHeight: "100vh",
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       justifyContent: "flex-start",
    //       background: "white",
    //       mt:3,
    //       py: { xs: 2, sm: 4, md: 6 },
    //     }}
    //   >
    //     {/* Back Button */}
    //     <Box
    //       sx={{
    //         display: "flex",
    //         width: "75%", // Wider alignment for main container
    //         justifyContent: "flex-start",
    //         mb: 2,
    //       }}
    //     >
    //       <Button
    //         startIcon={<ArrowBackIcon />}
    //         onClick={() => router.push("/dashboard/buyer")}
    //         sx={{
    //           textTransform: "none",
    //           fontSize: "16px",
    //           fontWeight: "600",
    //           color: "black",
    //         }}
    //       >
    //         Back to Dashboard
    //       </Button>
    //     </Box>

    //     {/* Main Content Container */}
    //     <Container
    //       maxWidth={false}
    //       sx={{
    //         backgroundColor: theme.palette.background.default,
    //         borderRadius: 3,
    //         width: "1152px", // Larger width
    //         height: "886px", // Fixed container height
    //         p: { xs: 3, sm: 4, md: 5 },
    //         boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         justifyContent: "flex-start",
    //         transition: "0.3s ease",
    //       }}
    //     >
    //       {/* Filter Section */}
    //       <Stack direction="row" spacing={2} sx={{display:"flex" ,width:"100%" ,justifyContent:"flex-start"}} mb={3}>
    //         {statusFilters.map((status) => (
    //           <Chip
    //             key={status.label}
    //             label={status.label}
    //             onClick={() => setSelectedStatus(status.label)}
    //             sx={{
    //               backgroundColor: theme.palette.grey[200],
    //                 //  selectedStatus === status.label ? status.color : "#f3f3f3",
    //               fontWeight: selectedStatus === status.label ? 600 : 400,
    //               color:
    //                 selectedStatus === status.label
    //                   ? status.color
    //                   : theme.palette.text.secondary,
    //               cursor: "pointer",
    //               border:`3 px solid ${status.color}`,
    //               outline:`3 px solid ${status.color}`,
    //               px: 1.5,
    //               py: 1,
    //               fontSize: "0.9rem",
    //               borderRadius: 2,
                  
    //             }}
    //           />
    //         ))}
    //       </Stack>

    //       {/* Header */}
    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //           gap: 1,
    //           mb: 3,
    //         }}
    //       >
    //         <FolderOpenIcon
    //           sx={{
    //             borderRadius: "24px",
    //             height: "50px",
    //             width: "50px",
    //             backgroundColor: theme.palette.primary.main,
    //             color: "white",
    //             p: 1,
    //           }}
    //         />
    //         <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }}>
    //           Project Management
    //         </Typography>
    //         <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
    //           My Projects
    //         </Typography>
    //         <Typography
    //           variant="body1"
    //           sx={{ color: "#6c757d", textAlign: "center" }}
    //         >
    //           View, Edit, and Manage all your Projects
    //         </Typography>
    //       </Box>

    //       {/* Projects Section */}
    //       <Box
    //         sx={{
    //           width: "100%",
    //           flex: 1,
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //           justifyContent:"flex-start" ,
    //           gap: 2,
    //           overflowY: "auto",
    //           maxHeight: "500px", // Keeps layout height stable
    //           scrollbarWidth: "none",
    //           "&::-webkit-scrollbar": { display: "none" },
    //         }}
    //       >
    //         {/* Title */}
    //         <Typography
    //           variant="subtitle1"
    //           sx={{
    //             display:"flex",
    //             justifyContent:"flex-start",
    //             alignItems:"start",
    //             width:"100%",
    //             fontWeight: "bold",
    //             mb: 1,
    //             borderBottom: `2px solid #f5b400`,
    //             pb: 0.5,
    //           }}
    //         >
    //           {selectedStatus} ({projects.length})
    //         </Typography>

    //         {/* Conditional rendering */}
    //         {projects.length === 0 ? (
    //           <Typography
    //             variant="body1"
    //             sx={{
    //               color: "#9e9e9e",
    //               fontWeight: 500,
    //               textAlign: "center",
    //               mt: 4,
    //             }}
    //           >
    //             No projects found for this status.
    //           </Typography>
    //         ) : (
    //           projects.map((project, index) => (
    //             <Card
    //               key={index}
    //               sx={{
    //                 p: 2,
    //                 borderRadius: 3,
    //                 width: "100%",
    //                 boxShadow: "0px 3px 10px rgba(0,0,0,0.05)",
    //                 backgroundColor: "white",
    //               }}
    //             >
    //               <CardContent>
    //                 <Box
    //                   sx={{
    //                     display: "flex",
    //                     justifyContent: "space-between",
    //                     alignItems: "center",
    //                     mb: 1,
    //                   }}
    //                 >
    //                   <Typography
    //                     variant="subtitle1"
    //                     sx={{ fontWeight: "bold", color: "#333" }}
    //                   >
    //                     {project.Title}
    //                   </Typography>
    //                   <Chip
    //                     label={project.Status}
    //                     sx={{
    //                       backgroundColor: project.StatusColor,
    //                       color: "white",
    //                       fontWeight: 600,
    //                     }}
    //                     size="small"
    //                   />
    //                 </Box>

    //                 <Typography
    //                   variant="body2"
    //                   color="text.secondary"
    //                   sx={{ mb: 2 }}
    //                 >
    //                   {project.Outline}
    //                 </Typography>

    //                 <Divider sx={{ my: 1 }} />

    //                 <Box
    //                   sx={{
    //                     display: "flex",
    //                     justifyContent: "space-between",
    //                     flexWrap: "wrap",
    //                     gap: 2,
    //                   }}
    //                 >
    //                   <Typography variant="body2">
    //                     <strong>Budget:</strong> {project.Budget}
    //                   </Typography>
    //                   <Typography variant="body2">
    //                     <strong>Timeline:</strong>{" "}
    //                     <span style={{ color: theme.palette.primary.main }}>
    //                       {project.Timeline}
    //                     </span>
    //                   </Typography>
    //                   <Typography variant="body2">
    //                     <strong>Skills:</strong>{" "}
    //                     <span style={{ color: theme.palette.primary.main }}>
    //                       {project.Skills || "0 required"}
    //                     </span>
    //                   </Typography>
    //                 </Box>
    //               </CardContent>
    //             </Card>
    //           ))
    //         )}
    //       </Box>
    //     </Container>
    //   </Box>
    // </DashBoardLayout>
   <DashBoardLayout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          background: "white",
          mt: 3,
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {/* Back Button */}
        <Box
          sx={{
            display: "flex",
            width: "75%",
            justifyContent: "flex-start",
            mb: 2,
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/dashboard/buyer")}
            sx={{
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "600",
              color: "black",
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
            width: "1152px",
            height: "886px",
            p: { xs: 3, sm: 4, md: 5 },
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            transition: "0.3s ease",
          }}
        >
          {/* Filter Chips */}
          <Stack direction="row" spacing={2} sx={{ width: "100%" }} mb={3}>
            {statusFilters.map((status) => (
              <Chip
                key={status.value}
                label={status.label}
                onClick={() => {
                  setSelectedStatus(status.value);
                  setSelectedStatusArabic(status.label)
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
                  fontSize: "0.9rem",
                  borderRadius: 2,
                }}
              />
            ))}
          </Stack>

          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <FolderOpenIcon
              sx={{
                borderRadius: "24px",
                height: "50px",
                width: "50px",
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
              maxHeight: "500px",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                width: "100%",
                fontWeight: "bold",
                mb: 1,
                borderBottom: `2px solid #f5b400`,
                pb: 0.5,
              }}
            >
              {isArabic?selectedStatusArabic: selectedStatus} ({projects.length})
            </Typography>

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
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    width: "100%",
                    boxShadow: "0px 3px 10px rgba(0,0,0,0.05)",
                    backgroundColor: "white",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
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

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {project.outline}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 2,
                      }}
                    >
                      <Typography variant="body2">
                        <strong>Budget:</strong> {project.budgetRange || "Not Specified"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Timeline:</strong>{" "}
                        <span style={{ color: theme.palette.primary.main }}>
                          {project.timeline}
                        </span>
                      </Typography>
                      <Typography variant="body2">
                        <strong>Skills:</strong>{" "}
                        <span style={{ color: theme.palette.primary.main }}>
                          {(project.skillsRequired || []).join(", ") || "0 required"}
                        </span>
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              gap: 1,
            }}
          >
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
        </Container>
      </Box>
    </DashBoardLayout>
  
  );
};

export default ManageProjects;
