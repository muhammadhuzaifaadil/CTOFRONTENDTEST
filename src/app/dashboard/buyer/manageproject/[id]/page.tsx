"use client"
import apiClient from "@/api/apiClient";
import { Box, CircularProgress, Container, Typography, TextField, Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";

// const ProjectPage: React.FC = (id) => {
//   const router = useRouter();
// //   const { id } = router.query;

//   const [project, setProject] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState<any>({});

//   // Fetch when page loads
//   useEffect(() => {
//     if (id) {
//       fetchProject();
//     }
//   }, [id]);

//   const fetchProject = async () => {
//     try {
//       setLoading(true);
//       const res = await apiClient.get(`/projects/${id}`);
//       if (res.data?.Success) {
//         setProject(res.data.Data);
//         setForm(res.data.Data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch project:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await apiClient.delete(`/projects/${id}`);
//       router.push("/manage-projects"); // go back list
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };

//   const handleEdit = async () => {
//     try {
//       await apiClient.put(`/projects/${id}`, form);
//       setEditMode(false);
//       fetchProject();
//     } catch (err) {
//       console.error("Edit failed:", err);
//     }
//   };

//   const PublishProject = async () => {
//     try {
//       await apiClient.put(`/projects/updatepublish/${id}`);
//       fetchProject();
//     } catch (error) {
//       console.error("Publish failed:", error);
//     }
//   };

//   if (loading || !project) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         bgcolor: "background.paper",
//         p: 4,
//         mt: 4,
//         boxShadow: 5,
//         borderRadius: 2,
//       }}
//     >
//       <Typography variant="h5" fontWeight={600} gutterBottom>
//         {editMode ? "Edit Project" : "Project Details"}
//       </Typography>

//       {/* --- fields (same as modal) --- */}
//       <TextField
//         label="Title"
//         value={form.title || ""}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//         fullWidth
//         sx={{ mb: 2 }}
//         InputProps={{ readOnly: !editMode }}
//       />

//       <TextField
//         label="Outline"
//         value={form.outline || ""}
//         onChange={(e) => setForm({ ...form, outline: e.target.value })}
//         fullWidth
//         multiline
//         minRows={2}
//         sx={{ mb: 2 }}
//         InputProps={{ readOnly: !editMode }}
//       />

//       <TextField
//         label="Requirements"
//         value={form.requirements || ""}
//         onChange={(e) => setForm({ ...form, requirements: e.target.value })}
//         fullWidth
//         multiline
//         minRows={3}
//         sx={{ mb: 2 }}
//         InputProps={{ readOnly: !editMode }}
//       />

//       <TextField
//         label="Budget Range"
//         value={form.budgetRange || ""}
//         onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
//         fullWidth
//         sx={{ mb: 2 }}
//         InputProps={{ readOnly: !editMode }}
//       />

//       <TextField
//         label="Timeline"
//         value={form.timeline || ""}
//         onChange={(e) => setForm({ ...form, timeline: e.target.value })}
//         fullWidth
//         sx={{ mb: 2 }}
//         InputProps={{ readOnly: !editMode }}
//       />

//       <TextField
//         label="Skills Required"
//         value={form.skillsRequired?.join(", ") || ""}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             skillsRequired: e.target.value.split(",").map((s) => s.trim()),
//           })
//         }
//         fullWidth
//         sx={{ mb: 2 }}
//         InputProps={{ readOnly: !editMode }}
//       />

//       {form.attachment && (
//         <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//           <img
//             src={form.attachment}
//             alt="Project Attachment"
//             style={{
//               maxWidth: "100%",
//               borderRadius: 8,
//             }}
//           />
//         </Box>
//       )}

//       <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//         <Button variant="contained" onClick={PublishProject}>
//           Publish
//         </Button>

//         <Box sx={{ display: "flex", gap: 2 }}>
//           {editMode ? (
//             <Button variant="contained" onClick={handleEdit}>
//               Save Changes
//             </Button>
//           ) : (
//             <Button variant="contained" onClick={() => setEditMode(true)}>
//               Edit
//             </Button>
//           )}

//           <Button variant="outlined" color="error" onClick={handleDelete}>
//             Delete
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };
// interface ProjectPageProps {
//   params: { id: string };
// }

const ProjectPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: projectId } = use(params);  
  console.log("Project ID:", projectId);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<any>({});
    const theme = useTheme();
  
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

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/projects/${projectId}`);
      window.location.reload();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = async () => {
    try {
      await apiClient.put(`/projects/${projectId}`, form);
      setEditMode(false);
      await fetchProject();
      window.location.reload();
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const PublishProject = async () =>{
    try {
      await apiClient.put(`/projects/updatepublish/${projectId}`)
      window.location.reload();
    } catch (error) {
      console.error("Edit failed:", error);
    }
  }
//   const isPdf = (url: string) => {
//     url.toLowerCase().endsWith(".pdf");}
// useEffect(()=>{
// isPdf(project?.attachment);
// },[project])

  if (!project && !loading) return null;

//   return (
//       <Container
//         maxWidth="sm"
//         sx={{
//           bgcolor: "background.paper",
//           p: 4,
//           mt: 2,
//           // borderRadius: 2,
//           boxShadow: 5,
//           position: "relative",
//           height:"100vh",
//           overflowY:"scroll"
//         }}
//       >
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Box>
//             <Typography variant="h5" fontWeight={600} gutterBottom>
//               {editMode ? "Edit Project" : "Project Details"}
//             </Typography>

//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
//               <TextField
//                 label="Title"
//                 value={form.title || ""}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 fullWidth
//                 InputProps={{ readOnly: !editMode }}
//               />

//               <TextField
//                 label="Outline"
//                 value={form.outline || ""}
//                 onChange={(e) => setForm({ ...form, outline: e.target.value })}
//                 fullWidth
//                 multiline
//                 minRows={2}
//                 InputProps={{ readOnly: !editMode }}
//               />

//               <TextField
//                 label="Requirements"
//                 value={form.requirements || ""}
//                 onChange={(e) => setForm({ ...form, requirements: e.target.value })}
//                 fullWidth
//                 multiline
//                 minRows={3}
//                 InputProps={{ readOnly: !editMode }}
//               />

//               <TextField
//                 label="Budget Range"
//                 value={form.budgetRange || ""}
//                 onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
//                 fullWidth
//                 InputProps={{ readOnly: !editMode }}
//               />

//               <TextField
//                 label="Timeline"
//                 value={form.timeline || ""}
//                 onChange={(e) => setForm({ ...form, timeline: e.target.value })}
//                 fullWidth
//                 InputProps={{ readOnly: !editMode }}
//               />

//               <TextField
//                 label="Skills Required"
//                 value={form.skillsRequired?.join(", ") || ""}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     skillsRequired: e.target.value.split(",").map((s) => s.trim()),
//                   })
//                 }
//                 fullWidth
//                 InputProps={{ readOnly: !editMode }}
//               />

//               {form.attachment && (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     // mt: 2,
//                   }}
//                 >
//                   <img
//                     src={form.attachment}
//                     alt="Project Attachment"
//                     style={{
//                       maxWidth: "100%",
//                       height: "auto",
//                       borderRadius: "8px",
//                     }}
//                   />
//                   {/* <InputFileUpload 
//                       isArabic={false}
//                       sx={{ display: "flex", width: "100%", textAlign: "center" }}
//                       text="Logo"
//                        onFileSelect={function (file: File | null): void {
//                         throw new Error("Function not implemented.");
//                       } }    
//                       isPdf={true}
//                       initialUrl={}
//                       /> */}
//                 </Box>
//               )}
//             </Box>
//               <Box sx={{display:"flex", justifyContent:"space-between"}}>

//               <Box sx={{display:"flex",justifyContent:"flex-start",mt:1}}>
//                 <Button variant="contained" sx={{backgroundColor:"#5459FD"}} onClick={()=>{PublishProject()}}>Publish</Button>
//               </Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 gap: 2,
//                  mt: 1,
//               }}
//             >


//               {editMode ? (
//                 <Button variant="contained" color="primary" onClick={handleEdit}>
//                   Save Changes
//                 </Button>
//               ) : (
//                 <Button variant="contained" color="secondary" onClick={() => setEditMode(true)}>
//                   Edit
//                 </Button>
//               )}

//               <Button variant="outlined" color="error" onClick={handleDelete}>
//                 Delete
//               </Button>
//             </Box>
//             </Box>
//           </Box>
//         )}
//       </Container>
//   );




  return (
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
  }}>
    {/* Back Button */}
    <Box
      sx={{
        display: "flex",
        // flexDirection: isArabic ? "row-reverse" : "row", // 👈 flips layout
        // justifyContent: isArabic ? "flex-start" : "flex-start", // 👈 Arabic aligns left, English stays left
        flexDirection:"row",
        justifyContent:"flex-start",
        width: { xs: "95%", sm: "75%", md: "75%" },
        mb: 2,
      }}
    >
      <Button
        startIcon={
          <ArrowBackIcon
            sx={{
            //   transform: isArabic ? "scaleX(-1)" : "none", // 👈 flips arrow direction
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
        //   flexDirection: isArabic ? "row-reverse" : "row", // 👈 ensures icon on right, text on left in Arabic
        flexDirection:"row",
          gap: 1,
        }}
      >
         {/* {t("BackButton")} */}
         Back Button
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

            <Box sx={{display:'flex', flexDirection:"column",width:"100%",height:"100%",gap:3}}>

            {/* Title + Status */}
            <Box sx={{display:"flex",flexDirection:'row',justifyContent:"space-between"}}>
                <Box>
                    Project Title
                </Box>
                <Box>
                    Project Status
                </Box>
            </Box>


            {/* Project Description */}
            <Box sx={{display:'flex',flexDirection:'column'}}>
                {/* Project Description Title */}
                <Box sx={{display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
                    project description
                </Box>
                {/* Blue Divider */}
                              <Box>
                                <Divider
                                  sx={{
                                    mt: 1,
                                    borderBottomWidth: 3,
                                    borderColor: theme.palette.primary.main,
                                    opacity: 0.7,
                                    width: "100%",
                                  }}
                                />
                              </Box>  
                 {/*Project Outline + Requirements  */}
                 <Box sx={{display:"flex",flexDirection:'column'}}>
                    <Box>
                        Project Outline
                    </Box>
                    <Box>
                        Project Requirements
                    </Box>
                 </Box>

                 {/* Project Timeline & Budget */}

                 <Box sx={{display:'flex',flexDirection:"column",backgroundColor:"lightgray"}}>
                    
                    {/* Title */}
                    <Box sx={{display:"flex",justifyContent:"flex-start"}}>
                        Timeline & Budget
                    </Box>
                    {/* Duration */}
                    <Box sx={{display:"flex",justifyContent:"space-between"}}>
                        <Box>
                            Duration
                        </Box>
                        <Box>
                            jo bhi hai
                        </Box>
                    </Box>
                    {/* Budget */}
                    <Box sx={{display:"flex",justifyContent:"space-between"}}>
                        <Box>
                            Duration
                        </Box>
                        <Box>
                            jo bhi hai
                        </Box>
                    </Box>
                    {/* Last Updated */}
                    <Box sx={{display:"flex",justifyContent:"space-between"}}>
                        <Box>
                            Duration
                        </Box>
                        <Box>
                            jo bhi hai
                        </Box>
                    </Box>
                    

                 </Box>

                 {/* Bids Received */}
                 <Box sx={{display:"flex",flexDirection:"column",backgroundColor:theme.palette.primary.main}}>
                    
                    {/* Title */}
                    <Box>
                        Bids Recieved
                    </Box>
                    {/* Dynamic bid submitted number + icon */}
                    <Box sx={{display:"flex",justifyContent:"space-between"}}>
                        <Box>
                            3 bids submitted
                        </Box>
                        <Box>
                            Icon user group
                        </Box>  

                    </Box>
                    {/* View all bids button */}
                    <Box sx={{display:"flex",flexDirection:"row"}}>

                        <Button sx={{display:"flex",justifyContent:"center",width:"100%"}}>
                            View All Bids
                            </Button>        
                        

                    </Box>
                 </Box>

               

            </Box>

            </Box>


          </Container>

    </Box>
  );
};

export default ProjectPage;
