"use client"
import React, { useState, useMemo, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Chip,
  Container,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DashBoardLayout from "../../../layouts/DashboardLayout";
import apiClient from "@/api/apiClient";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { useTranslations } from "next-intl";
import ProjectBidModal from "@/app/components/ProjectBidModal";
import { useAuth } from "@/hooks/useAuth";

const BrowseProjects: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {user} = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<number[]>([0, 100000]);
const [openModal, setOpenModal] = useState(false);
const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

const handleOpen = (id: number) => {
  setSelectedProjectId(id);
  setOpenModal(true);
};

  // Mock data (replace with API data later)
  // const recentProjects: any[] = [
  //   {
  //     Title: "Brand Identity and Logo Design",
  //     Outline:
  //       "Our startup needs a complete brand identity package including logo design, color palette, typography, and brand guidelines.",
  //     Skills: ["Graphic Design", "Brand Identity", "Adobe Illustrator", "Typography"],
  //     Budget: "$3500",
  //     Timeline: "3 Weeks",
  //     Bids: 1,
  //   },
  //   {
  //     Title: "Restaurant Menu and Promotional Materials",
  //     Outline:
  //       "We're opening a new upscale restaurant and need comprehensive design work including menus and flyers.",
  //     Skills: ["UI/UX", "Branding", "Adobe Photoshop"],
  //     Budget: "Not Specified",
  //     Timeline: "3 Weeks",
  //     Bids: 3,
  //   },
  //   {
  //     Title: "E-commerce Website Design",
  //     Outline:
  //       "We need a full-stack developer to design and build a responsive e-commerce platform.",
  //     Skills: ["React", "Node.js", "MongoDB"],
  //     Budget: "$5000",
  //     Timeline: "4 Weeks",
  //     Bids: 5,
  //   },
  //   {
  //     Title: "Mobile App Development",
  //     Outline:
  //       "Looking for a React Native developer to create a cross-platform app for fitness tracking.",
  //     Skills: ["React Native", "API Integration", "UI/UX Design"],
  //     Budget: "$7000",
  //     Timeline: "6 Weeks",
  //     Bids: 2,
  //   },
  //   {
  //     Title: "Social Media Campaign Design",
  //     Outline:
  //       "We need a designer for social media post templates and ad creatives for a 1-month campaign.",
  //     Skills: ["Social Media", "Content Design", "Typography"],
  //     Budget: "$1000",
  //     Timeline: "2 Weeks",
  //     Bids: 4,
  //   },
  // ];

   // 🧠 Fetch paginated projects from API
// useEffect(() => {
//   const fetchProjects = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("accessToken");
//       if (!token) return;

//       let url = `https://cto.sa/projects/paginated/all?page=${page}&limit=5`;

//       // ✅ Add filter if user has typed something
//       if (searchTerm.trim()) {
//         // Try searching title first by default
//         url += `&filterKey=title&filterBy=${encodeURIComponent(searchTerm.trim())}`;
//       }

//       const res = await apiClient.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data?.Success) {
//         const { projects, pagination } = res.data.Data;
//         setProjects(projects);
//         setTotalPages(Number(pagination.totalPages) || 1);
//       } else {
//         setProjects([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch projects:", err);
//       setProjects([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProjects();
// }, [page, searchTerm]); // 👈 trigger fetch when page or searchTerm changes

useEffect(() => {
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      let url = `https://cto.sa/projects/paginated/all?page=${page}&limit=5`;

      // ✅ Use backend search (multi-field) when user types
      if (searchTerm.trim()) {
        url += `&filterKey=search&filterBy=${encodeURIComponent(searchTerm.trim())}`;
      }

      const res = await apiClient.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.Success) {
        const { projects, pagination } = res.data.Data;
        setProjects(projects);
        setTotalPages(Number(pagination.totalPages) || 1);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error("❌ Failed to fetch projects:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };
    // 🕒 Add small debounce to avoid excessive API calls
  const delayDebounce = setTimeout(fetchProjects, 500);

  return () => clearTimeout(delayDebounce);
}, [page, searchTerm]);

  const allSkills = [
    "Coding",
    "IT",
    "SQA",
    "AI",
    "ERP",
    "Mobile Apps",
    "Content Writing",
    "Brand Identity",
    "Content Design",
  ];

 const {isArabic,locale} = useContext(LanguageContext);
 const t = useTranslations("BrowseProjects")
//   const filteredProjects = useMemo(() => {
//   return projects.filter((project) => {
//     // ---- SEARCH ----
//    const matchesSearch =
//   (project?.Title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
//   (project?.Outline?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
//   (Array.isArray(project?.Skills) &&
//     project.Skills.some((s: string) =>
//       (s || "").toLowerCase().includes(searchTerm.toLowerCase())
//     ));


//     // ---- SKILLS ----
//     const matchesSkills =
//       selectedSkills.length === 0 ||
//       selectedSkills.every((skill) =>
//         project.Skills.map((s: string) => s.toLowerCase()).includes(
//           skill.toLowerCase()
//         )
//       );

//     // ---- BUDGET ----
//     // Extract numeric value (e.g. "$3500" → 3500)
// const budgetValue = Number((project?.Budget || "").replace(/[^0-9]/g, "")) || 0;

//     // Include project if budget is not specified OR within range
//     const matchesBudget =
//   (project?.Budget && project.Budget.toLowerCase().includes("not specified")) ||
//   (budgetValue >= budgetRange[0] && budgetValue <= budgetRange[1]);


//     return matchesSearch && matchesSkills && matchesBudget;
//   });
// }, [projects, searchTerm, selectedSkills, budgetRange]);

  // 🏷️ Skill Click Handler
  
  const filteredProjects = useMemo(() => {
  return projects.filter((project) => {
    // Normalize skill array from backend
    const projectSkills = Array.isArray(project.skillsRequired)
      ? project.skillsRequired
      : [];

    // ---- SEARCH ----
    const matchesSearch =
      (project?.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (project?.outline?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      projectSkills.some((s: string) =>
        (s || "").toLowerCase().includes(searchTerm.toLowerCase())
      );

    // ---- SKILLS ----
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.every((skill) =>
        projectSkills.map((s: string) => s.toLowerCase()).includes(skill.toLowerCase())
      );

    // ---- BUDGET ----
    const rawBudget = project?.budgetRange || "";
    const budgetValue = Number(String(rawBudget).replace(/[^0-9]/g, "")) || 0;

    const matchesBudget =
      String(rawBudget).toLowerCase().includes("not specified") ||
      (budgetValue >= budgetRange[0] && budgetValue <= budgetRange[1]);

    return matchesSearch && matchesSkills && matchesBudget;
  });
}, [projects, searchTerm, selectedSkills, budgetRange]);

  
  const handleSkillClick = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };



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
    background: "white",
    mt: {xs:8,sm:4,md:3},
    py: { xs: 2, sm: 4, md: 6 },
  }}
>
  {/* Back Button
  <Box
    sx={{
      display: "flex",
      width: { xs: "95%", sm: "90%", md: "75%" },
      justifyContent: isArabic?"flex-end":"flex-start",
      flexDirection:isArabic?"row-reverse":"row",
      mb: 2,
    }}
  >
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => router.push("/dashboard/seller")}
      sx={{
        textTransform: "none",
        fontSize: { xs: "14px", sm: "16px" },
        fontWeight: "600",
        color: "black",
      }}
    >
      {t("BackDashboard")}
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
      onClick={() => router.push("/dashboard/seller")}
      sx={{
        textTransform: "none",
        fontSize: { xs: "14px", sm: "16px" },
        fontWeight: 600,
        color: "black",
        flexDirection: isArabic ? "row-reverse" : "row", // 👈 ensures icon on right, text on left in Arabic
        gap: 1,
      }}
    >
       {t("BackDashboard")}
    </Button>
  </Box>

  {/* Main Container */}
  <Container
    maxWidth={false}
    sx={{
      backgroundColor: theme.palette.background.default,
      borderRadius: 3,
      width: { xs: "95%", sm: "90%", md: "75%" },
      p: { xs: 2, sm: 3, md: 5 },
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    {/* Header */}
    <Box sx={{ textAlign: "center", mb: 2 }}>
      <SearchIcon
        sx={{
          height: { xs: 50, sm: 60 },
          width: { xs: 50, sm: 60 },
          color: "white",
          backgroundColor: theme.palette.primary.main,
          borderRadius: "60%",
          border: `2px solid ${theme.palette.primary.main}`,
          padding: { xs: "10px", sm: "12px" },
        }}
      />
      <Typography variant="subtitle2" color="primary">
        {t("Header")}
      </Typography>
      <Typography variant="subtitle1">{t("Header2")}</Typography>
      <Typography>
        {loading
          ? "Loading projects..."
          : `${filteredProjects.length} ${t("Content")}`}
      </Typography>
    </Box>

    {/* Search */}
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search by title, description, or category..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ mb: 3 }}
    />

    {/* Skills Filter */}
    <Box sx={{ width: "100%", mb: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" mb={1}>
        Filter by Skills:
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {allSkills.map((skill, i) => (
          <Chip
            key={i}
            label={skill}
            variant={selectedSkills.includes(skill) ? "filled" : "outlined"}
            color={selectedSkills.includes(skill) ? "primary" : "default"}
            onClick={() => handleSkillClick(skill)}
            sx={{ cursor: "pointer" }}
          />
        ))}
      </Box>
    </Box>

    {/* Budget Range */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        width: "100%",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <TextField
        placeholder="0"
        fullWidth
        value={budgetRange[0]}
        onChange={(e) =>
          setBudgetRange([Number(e.target.value), budgetRange[1]])
        }
      />
      <TextField
        placeholder="100000"
        fullWidth
        value={budgetRange[1]}
        onChange={(e) =>
          setBudgetRange([budgetRange[0], Number(e.target.value)])
        }
      />
    </Box>

    {/* Project List */}
    <Box display="flex" flexDirection="column" width="100%" sx={{ mt: 2 }} gap={3}>
      {filteredProjects.map((project: any, index: number) => (
        <Box
          key={index}
          sx={{
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            p: { xs: 2, sm: 3 },
            backgroundColor: "white",
          }}
        >
          <Typography variant="h6" fontSize={{ xs: "1rem", sm: "1.25rem" }}>
            {project.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
            fontSize={{ xs: "0.75rem", sm: "0.875rem" }}
          >
            {project.outline}
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
            {project.skillsRequired.map((skill: string, i: number) => (
              <Chip
                key={i}
                label={skill}
                sx={{ backgroundColor: "#f4f4f4", fontSize: "0.75rem" }}
              />
            ))}
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            mt={2}
            gap={2}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <MonetizationOnIcon sx={{ color: theme.palette.primary.main }} />
              <Typography variant="body2">
                <strong>Budget:</strong> {project.budgetRange}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <AccessTimeIcon sx={{ color: theme.palette.primary.main }} />
              <Typography variant="body2">
                <strong>Timeline:</strong> {project.timeline}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <PeopleAltIcon sx={{ color: theme.palette.primary.main }} />
              <Typography variant="body2">
                <strong>Bids:</strong> {project.bidCount}
              </Typography>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: "12px",
              textTransform: "none",
              py: 1.2,
            }}
            onClick={() => handleOpen(project.id)}
          >
            View Project & Submit Bid
          </Button>
        </Box>
      ))}

      {!loading && filteredProjects.length === 0 && (
        <Typography color="text.secondary" textAlign="center" mt={3}>
          {t("NotFound")}
        </Typography>
      )}
    </Box>

    {/* Pagination */}
    {totalPages > 1 && (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    )}
  </Container>
</Box>
    )}

      <ProjectBidModal
      open={openModal}
      onClose={() => setOpenModal(false)}
      projectId={selectedProjectId}
/>
    </DashBoardLayout>
  );

  
};

export default BrowseProjects;


 // 🔍 Filter Logic // working search and skill
  // const filteredProjects = useMemo(() => {
  //   return recentProjects.filter((project) => {
  //     const matchesSearch =
  //       project.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       project.Outline.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       project.Skills.some((s: string) =>
  //         s.toLowerCase().includes(searchTerm.toLowerCase())
  //       );

  //     const matchesSkills =
  //       selectedSkills.length === 0 ||
  //       selectedSkills.every((skill) =>
  //         project.Skills.map((s: string) => s.toLowerCase()).includes(
  //           skill.toLowerCase()
  //         )
  //       );

  //     return matchesSearch && matchesSkills;
  //   });
  // }, [recentProjects, searchTerm, selectedSkills]);



    // return (
  //   <DashBoardLayout>
  //     <Box
  //       sx={{
  //         minHeight: "100vh",
  //         display: "flex",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         justifyContent: "flex-start",
  //         background: "white",
  //         mt: 3,
  //         py: { xs: 2, sm: 4, md: 6 },
  //       }}
  //     >
  //       {/* Back Button */}
  //       <Box
  //         sx={{
  //           display: "flex",
  //           width: "75%",
  //           justifyContent: "flex-start",
  //           mb: 2,
  //         }}
  //       >
  //         <Button
  //           startIcon={<ArrowBackIcon />}
  //           onClick={() => router.push("/dashboard/seller")}
  //           sx={{
  //             textTransform: "none",
  //             fontSize: "16px",
  //             fontWeight: "600",
  //             color: "black",
  //           }}
  //         >
  //           Back to Dashboard
  //         </Button>
  //       </Box>

  //       {/* Main Container */}
  //       <Container
  //         maxWidth={false}
  //         sx={{
  //           backgroundColor: theme.palette.background.default,
  //           borderRadius: 3,
  //           width: "1152px",
  //           p: { xs: 3, sm: 4, md: 5 },
  //           boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItems: "center",
  //           justifyContent: "flex-start",
  //           transition: "0.3s ease",
  //         }}
  //       >
  //         {/* Header */}
  //         <Box
  //           sx={{
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //             justifyContent: "center",
  //             gap: 1,
  //           }}
  //         >
  //           <SearchIcon
  //             sx={{
  //               height: 60,
  //               width: 60,
  //               color: "white",
  //               backgroundColor: theme.palette.primary.main,
  //               borderRadius: "60%",
  //               border: `2px solid ${theme.palette.primary.main}`,
  //               padding: "12px",
  //             }}
  //           />
  //           <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }}>
  //             Find Opportunities
  //           </Typography>
  //           <Typography variant="subtitle1">BROWSE PROJECTS</Typography>
  //            <Typography>
  //             {loading
  //               ? "Loading projects..."
  //               : `${filteredProjects.length} projects available`}
  //           </Typography>
  //         </Box>

  //         {/* Search */}
  //         <Box sx={{ display: "flex", width: "100%" }}>
  //           <TextField
  //             fullWidth
  //             variant="outlined"
  //             placeholder="Search by title, description, or category..."
  //             value={searchTerm}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //             sx={{ mb: 3 }}
  //           />
  //         </Box>

  //         {/* Skills Filter */}
  //         <Box sx={{ display: "flex", width: "100%" }}>
  //           <Box mb={2}>
  //             <Typography variant="subtitle2" color="text.secondary" mb={1}>
  //               Filter by Skills:
  //             </Typography>
  //             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
  //               {allSkills.map((skill, i) => (
  //                 <Chip
  //                   key={i}
  //                   label={skill}
  //                   variant={
  //                     selectedSkills.includes(skill) ? "filled" : "outlined"
  //                   }
  //                   color={
  //                     selectedSkills.includes(skill)
  //                       ? "primary"
  //                       : "default"
  //                   }
  //                   onClick={() => handleSkillClick(skill)}
  //                   sx={{ cursor: "pointer" }}
  //                 />
  //               ))}
  //             </Box>
  //           </Box>
  //         </Box>

  //         {/* Budget Range */}
  //         <Box
  //           sx={{
  //             display: "flex",
  //             flexDirection: "row",
  //             width: "100%",
  //             justifyContent: "space-between",
  //             gap: 1,
  //           }}
  //         >
  //           <TextField
  //             placeholder="0"
  //             fullWidth
  //             sx={{ borderRadius: 3 }}
  //             value={budgetRange[0]}
  //             onChange={(e) =>
  //               setBudgetRange([Number(e.target.value), budgetRange[1]])
  //             }
  //           />
  //           <TextField
  //             placeholder="1000000"
  //             fullWidth
  //             sx={{ borderRadius: 3 }}
  //             value={budgetRange[1]}
  //             onChange={(e) =>
  //               setBudgetRange([budgetRange[0], Number(e.target.value)])
  //             }
  //           />
  //         </Box>

  //         {/* Project List */}
  //         <Box display="flex" flexDirection="column" width="100%" sx={{ mt: 2 }} gap={3}>
  //           {filteredProjects.map((project: any, index: number) => (
  //             <Box
  //               key={index}
  //               sx={{
  //                 borderRadius: "16px",
  //                 boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  //                 p: 3,
  //                 backgroundColor: "white",
  //               }}
  //             >
  //               <Typography variant="h6">{project.Title}</Typography>
  //               <Typography variant="body2" color="text.secondary" mt={1}>
  //                 {project.Outline}
  //               </Typography>

  //               <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
  //                 {project.Skills.map((skill: string, i: number) => (
  //                   <Chip
  //                     key={i}
  //                     label={skill}
  //                     sx={{
  //                       backgroundColor: "#f4f4f4",
  //                       fontSize: "0.75rem",
  //                     }}
  //                   />
  //                 ))}
  //               </Box>

  //               <Box
  //                 display="flex"
  //                 justifyContent="space-between"
  //                 alignItems="center"
  //                 mt={2}
  //                 flexWrap="wrap"
  //                 gap={2}
  //               >
  //                 <Box display="flex" alignItems="center" gap={1}>
  //                   <MonetizationOnIcon sx={{ color: theme.palette.primary.main }} />
  //                   <Typography variant="body2">
  //                     <strong>Budget:</strong> {project.Budget}
  //                   </Typography>
  //                 </Box>

  //                 <Box display="flex" alignItems="center" gap={1}>
  //                   <AccessTimeIcon sx={{ color: theme.palette.primary.main }} />
  //                   <Typography variant="body2">
  //                     <strong>Timeline:</strong> {project.Timeline}
  //                   </Typography>
  //                 </Box>

  //                 <Box display="flex" alignItems="center" gap={1}>
  //                   <PeopleAltIcon sx={{ color: theme.palette.primary.main }} />
  //                   <Typography variant="body2">
  //                     <strong>Bids:</strong> {project.Bids}
  //                   </Typography>
  //                 </Box>
  //               </Box>

  //               <Button
  //                 fullWidth
  //                 variant="contained"
  //                 sx={{
  //                   mt: 2,
  //                   borderRadius: "12px",
  //                   textTransform: "none",
  //                   py: 1.2,
  //                 }}
  //               >
  //                 View Project & Submit Bid
  //               </Button>
  //             </Box>
  //           ))}

  //           {filteredProjects.length === 0 && (
  //             <Typography color="text.secondary" textAlign="center" mt={3}>
  //               No projects match your search or selected skills.
  //             </Typography>
  //           )}
  //         </Box>
  //       </Container>
  //     </Box>
  //   </DashBoardLayout>
  // );