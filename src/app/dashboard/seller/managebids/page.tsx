// // "use client"
// // import DashBoardLayout from "@/app/layouts/DashboardLayout";
// // import { Box, Button, Card, Container, Divider, Typography,useTheme } from "@mui/material";
// // import { useRouter } from "next/navigation";
// // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
// // import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// // import AccessTimeIcon from '@mui/icons-material/AccessTime';
// // const ManageBids:React.FC = ()=>{
// //     const theme = useTheme();
// //     const router = useRouter();
// //     const recentProjects:any = [
// //     {
// //       Title: "Restaurant Menu and Promotional Materials",
// //       CoverLetter: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis fugiat qui quo saepe? Non sit doloribus tempore aliquam, maxime velit deserunt maiores officia similique iste, enim necessitatibus explicabo, assumenda a!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis fugiat qui quo saepe? Non sit doloribus tempore aliquam, maxime velit deserunt maiores officia similique iste, enim necessitatibus explicabo, assumenda a!",
// //       StatusColor:"orange",
// //       Status: "Pending",
// //       Budget: "$ 100",
// //       Timeline: "3 weeks",
// //       SubmittedOn:"October 8, 2025, 03:51 PM"
// //     },
// //     {
// //       Title: "Project Two",
// //       CoverLetter: "Another brief outline",
// //       StatusColor:"green",
// //       Status: "Accepted",
// //       Budget: "$500",
// //       Timeline: "2 weeks",
// //       SubmittedOn:"October 8, 2025, 03:51 PM"
// //     },
// //     {
// //       Title: "Project Three",
// //       CoverLetter: "Third project outline",
// //       StatusColor:"red",
// //       Status: "Rejected",
// //       Budget: "$200",
// //       Timeline: "1 week",
// //       SubmittedOn:"October 8, 2025, 03:51 PM"
// //     },
// //   ];
// //     return(
// //         <DashBoardLayout>
            
// //             <Box
// //                     sx={{
// //                       minHeight: "100vh",
// //                       display: "flex",
// //                       flexDirection: "column",
// //                       alignItems: "center",
// //                       justifyContent: "flex-start",
// //                       background: "white",
// //                       mt:3,
// //                       py: { xs: 2, sm: 4, md: 6 },
// //                     }}
// //                   >
// //                     {/* Back Button */}
// //                             <Box
// //                               sx={{
// //                                 display: "flex",
// //                                 width: "75%", // Wider alignment for main container
// //                                 justifyContent: "flex-start",
// //                                 mb: 2,
// //                               }}
// //                             >
// //                               <Button
// //                                 startIcon={<ArrowBackIcon />}
// //                                 onClick={() => router.push("/dashboard/buyer")}
// //                                 sx={{
// //                                   textTransform: "none",
// //                                   fontSize: "16px",
// //                                   fontWeight: "600",
// //                                   color: "black",
// //                                 }}
// //                               >
// //                                 Back to Dashboard
// //                               </Button>
// //                             </Box>
// //                             {/* Container */}
// //                                         <Container
// //                                       maxWidth={false}
// //                                       sx={{
// //                                         backgroundColor: theme.palette.background.default,
// //                                         borderRadius: 3,
// //                                         width: "1152px", // Larger width
// //                                         height: "100%", // Fixed container height
// //                                         p: { xs: 3, sm: 4, md: 5 },
// //                                         boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
// //                                         display: "flex",
// //                                         flexDirection: "column",
// //                                         alignItems: "center",
// //                                         justifyContent: "flex-start",
// //                                         transition: "0.3s ease",
// //                                       }}
// //                                     >

// // {/* Logo Headers */}
// //           <Box sx={{display:"flex", flexDirection:'column',alignItems:'center',justifyContent:'center',gap:1}}>

                
// //                  <AccountCircleOutlinedIcon
// //       sx={{
// //         height: 60,
// //         width: 60,
// //         color: "white", // icon color
// //         backgroundColor: theme.palette.primary.main, // fill background with theme color
// //         borderRadius: "60%", // make it circular
// //         border: `2px solid ${theme.palette.primary.main}`, // solid border matching theme
// //         padding: "12px", // centers the svg nicely
// //       }}
// //     /> 
// //         <Typography variant="subtitle2" sx={{color:theme.palette.primary.main}}>
// //             Bid Management
// //           </Typography>
// //           <Typography variant="subtitle1">
// //             MY SUBMITTED BIDS
// //           </Typography>
// //           <Typography variant = "caption">
// //             Track the status of all your bids
// //           </Typography>
                

// //           </Box>

// // {/* 3 Status Cards */}
// // <Box sx={{display:"flex", flexDirection:"row",width:"100%", justifyContent:'space-between'}}>

// //       <Card sx={{display:"flex", flexDirection:"column",justifyContent:"flex-start",width:"336px",height:"103.91px",cursor:"pointer"}}>

// //         <Typography sx={{display:"flex", ml:3,mt:2,color:"orange"}}>
// //             Pending
// //         </Typography>
// //         <Typography sx={{display:"flex", ml:3,mt:2,color:"orange"}}>
// //             1
// //         </Typography>
// //       </Card>

// //       <Card sx={{display:"flex", flexDirection:"column",justifyContent:"flex-start",width:"336px",height:"103.91px",cursor:"pointer"}}>

// //         <Typography sx={{display:"flex", ml:3,mt:2,color:"green"}}>
// //             Accepted
// //         </Typography>
// //         <Typography sx={{display:"flex", ml:3,mt:2,color:"green"}}>
// //             1
// //         </Typography>
// //       </Card>

// //       <Card sx={{display:"flex", flexDirection:"column",justifyContent:"flex-start",width:"336px",height:"103.91px",cursor:"pointer"}}>

// //         <Typography sx={{display:"flex", ml:3,mt:2,color:"red"}}>
// //             Rejected
// //         </Typography>
// //         <Typography sx={{display:"flex", ml:3,mt:2,color:"red"}}>
// //             1
// //         </Typography>
// //       </Card>

// // </Box>


// // <Box sx={{gap:1, display:"flex",flexDirection:"column",mt:2, width:"100%"}}>
// //                  {/* Status Heading */}
// //                  <Box>
// //                <Typography
// //                  variant="h6"
// //                  sx={{
// //                    fontWeight: "bold",
// //                    color: theme.palette.primary.main,
// //                    textAlign: "left",
// //                  }}
// //                >
// //                  Pending (1)
// //                </Typography>
// //                  </Box>
       
// //              {/* Blue Divider */}
// //                 <Box>
// //                <Divider
// //                  sx={{
// //                    mt: 1,
// //                    borderBottomWidth: 3,
// //                    borderColor: theme.palette.primary.main,
// //                    opacity: 0.7,
// //                    width: "100%",
// //                  }}
// //                />
// //                 </Box> 

// //                   <Box
// //                       sx={{
// //                         minHeight: 220,
// //                         display: "flex",
// //                         alignItems: "center",
// //                         justifyContent: "center",
// //                         flexDirection: "column",
// //                         gap: 1,
// //                       }}
// //                     >
// //                       {/* recent projects last 3 */}
// //                       {recentProjects.map((project:any, idx:any) => {
// //                         const coverLetterPreview = project.CoverLetter.length > 430 ? project.CoverLetter.slice(0, 430) + "..." : project.CoverLetter;
// //                         return (
// //                           <Box key={idx} sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:1, width:"100%", mb:2,boxShadow: "0 2px 10px rgba(0,0,0,0.05)", p:2, borderRadius:2}}>
// //                             {/* first inside row title status */}
// //                             <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%"}}>
// //                               <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-start", width:"100%"}}>
// //                               <Typography variant="subtitle1" sx={{fontWeight:600,width:"40%"}}>{project.Title}</Typography>
// //                               <Typography variant="subtitle2" sx={{textTransform:"capitalize", fontWeight:600, color:"black",backgroundColor:`${project.StatusColor}`,display:"flex",width:"8%",justifyContent:"center",borderRadius:"6px"}}>{project.Status}</Typography>
// //                                </Box>
// //                                <Box sx={{display:"flex", justifyContent:"flex-start", width:"100%"}}> 
// //                                <Typography variant="caption" sx={{color:"gray"}}>Submitted On {project.SubmittedOn}</Typography>
// //                             </Box>
// //                             </Box>
// //                             {/* 2nd row */}
// //                             <Box sx={{display:'flex', flexDirection:"row", justifyContent:"space-between", width:"100%", gap:2}}>
// //                               <Box sx={{display:"flex", flexDirection:"column", backgroundColor:theme.palette.grey[100], width:"100%",gap:1,borderRadius:1, height:"76px"}}>
// //                                 <Box sx={{display:"flex", flexDirection:'row', ml:2}}>
// //                                 <AttachMoneyIcon sx={{fontSize:"18px",mt:"3px"}}/>
// //                                 <Typography sx={{}}>Your Proposed Budget</Typography>

// //                                 </Box>
// //                                 <Box sx={{display:"flex", ml:2}}>
// //                                 <Typography sx={{}}>{project.Budget}</Typography>

// //                                 </Box>
// //                               </Box>
// //                               <Box sx={{display:"flex", flexDirection:"column", backgroundColor:theme.palette.grey[100], width:"100%",gap:1,borderRadius:1, height:"76px"}}>
// //                                 <Box sx={{display:"flex", flexDirection:'row', ml:2}}>
// //                                 <AccessTimeIcon sx={{fontSize:"18px",mt:"3px"}}/>
// //                                 <Typography sx={{}}>Your Proposed Timeline</Typography>
// //                                 </Box>
// //                                 <Box sx={{display:"flex", ml:2}}>
// //                                 <Typography sx={{}}>{project.Timeline}</Typography>
// //                                 </Box>
// //                               </Box>
// //                             </Box>
// //                             {/* third row project cover letter */}
// //                             <Box sx={{display:"flex",flexDirection:"column", width:"100%", backgroundColor:theme.palette.grey[100],borderRadius:1, height:"85px",ml:"10px"}}>
// //                               <Typography sx={{ml:2}}>Your Cover Letter:</Typography>
// //                               <Typography sx={{ml:1}} variant="body2" color="gray">{coverLetterPreview}</Typography>
// //                             </Box>
                           
// //                           </Box>
// //                         );
// //                       })}
// //                     </Box>

// //                 </Box>


// //                                     </Container>




                
// //             </Box>
        
        
// //         </DashBoardLayout>


// //     )
// // }

// // export default ManageBids;


// "use client";
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   Container,
//   Divider,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import DescriptionIcon from '@mui/icons-material/Description';
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import { useRouter } from "next/navigation";
// import DashBoardLayout from "../../../layouts/DashboardLayout";

// const ManageBids: React.FC = () => {
//   const theme = useTheme();
//   const router = useRouter();

//   const recentProjects = [
//     {
//       Title: "Restaurant Menu and Promotional Materials",
//       CoverLetter:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis fugiat qui quo saepe? Non sit doloribus tempore aliquam, maxime velit deserunt maiores officia similique iste, enim necessitatibus explicabo, assumenda a!",
//       StatusColor: "orange",
//       Status: "Pending",
//       Budget: "$100",
//       Timeline: "3 weeks",
//       SubmittedOn: "October 8, 2025, 03:51 PM",
//     },
//     {
//       Title: "Project Two",
//       CoverLetter: "Another brief outline",
//       StatusColor: "green",
//       Status: "Accepted",
//       Budget: "$500",
//       Timeline: "2 weeks",
//       SubmittedOn: "October 8, 2025, 03:51 PM",
//     },
//     {
//       Title: "Project Three",
//       CoverLetter: "Third project outline",
//       StatusColor: "red",
//       Status: "Rejected",
//       Budget: "$200",
//       Timeline: "1 week",
//       SubmittedOn: "October 8, 2025, 03:51 PM",
//     },
//     {
//       Title: "Project Four",
//       CoverLetter: "Another pending project example",
//       StatusColor: "orange",
//       Status: "Pending",
//       Budget: "$150",
//       Timeline: "2 weeks",
//       SubmittedOn: "October 10, 2025, 02:15 PM",
//     },
//   ];

//   // 👇 track which status is currently selected
//   const [selectedStatus, setSelectedStatus] = useState<"Pending" | "Accepted" | "Rejected">("Pending");

//   // 👇 filter data according to selected status
//   const filteredProjects = recentProjects.filter(
//     (project) => project.Status === selectedStatus
//   );

//   // 👇 count each type of status
//   const statusCounts = {
//     Pending: recentProjects.filter((p) => p.Status === "Pending").length,
//     Accepted: recentProjects.filter((p) => p.Status === "Accepted").length,
//     Rejected: recentProjects.filter((p) => p.Status === "Rejected").length,
//   };

//   // 👇 color map for status
//   const colorMap: Record<string, string> = {
//     Pending: "orange",
//     Accepted: "green",
//     Rejected: "red",
//   };

//   return (
//     <DashBoardLayout>
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           background: "white",
//           mt: 3,
//           py: { xs: 2, sm: 4, md: 6 },
//         }}
//       >
//         {/* Back Button */}
//         <Box
//           sx={{
//             display: "flex",
//             width: "75%",
//             justifyContent: "flex-start",
//             mb: 2,
//           }}
//         >
//           <Button
//             startIcon={<ArrowBackIcon />}
//             onClick={() => router.push("/dashboard/seller")}
//             sx={{
//               textTransform: "none",
//               fontSize: "16px",
//               fontWeight: "600",
//               color: "black",
//             }}
//           >
//             Back to Dashboard
//           </Button>
//         </Box>

//         {/* Main Container */}
//         <Container
//           maxWidth={false}
//           sx={{
//             backgroundColor: theme.palette.background.default,
//             borderRadius: 3,
//             width: "1152px",
//             height: "100%",
//             p: { xs: 3, sm: 4, md: 5 },
//             boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           {/* Header */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 1,
//             }}
//           >
//             <DescriptionIcon
//               sx={{
//                 height: 60,
//                 width: 60,
//                 color: "white",
//                 backgroundColor: theme.palette.primary.main,
//                 borderRadius: "60%",
//                 border: `2px solid ${theme.palette.primary.main}`,
//                 padding: "12px",
//               }}
//             />
//             <Typography
//               variant="subtitle2"
//               sx={{ color: theme.palette.primary.main }}
//             >
//               Bid Management
//             </Typography>
//             <Typography variant="subtitle1">MY SUBMITTED BIDS</Typography>
//             <Typography variant="caption">
//               Track the status of all your bids
//             </Typography>
//           </Box>

//           {/* Status Cards */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               width: "100%",
//               justifyContent: "space-between",
//               mt: 3,
//               mb: 2,
//             }}
//           >
//             {(["Pending", "Accepted", "Rejected"] as const).map((status) => (
//               <Card
//                 key={status}
//                 onClick={() => setSelectedStatus(status)}
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   width: "336px",
//                   height: "103.91px",
//                   cursor: "pointer",
//                   border:
//                     selectedStatus === status
//                       ? `2px solid ${colorMap[status]}`
//                       : "2px solid transparent",
//                   boxShadow:
//                     selectedStatus === status
//                       ? "0 4px 12px rgba(0,0,0,0.1)"
//                       : "0 2px 5px rgba(0,0,0,0.05)",
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     color: colorMap[status],
//                     fontWeight: 600,
//                     fontSize: "18px",
//                   }}
//                 >
//                   {status}
//                 </Typography>
//                 <Typography
//                   sx={{
//                     color: colorMap[status],
//                     fontSize: "16px",
//                     fontWeight: 500,
//                   }}
//                 >
//                   {statusCounts[status]}
//                 </Typography>
//               </Card>
//             ))}
//           </Box>

//           {/* Filtered Data Section */}
//           <Box
//             sx={{
//               gap: 1,
//               display: "flex",
//               flexDirection: "column",
//               mt: 2,
//               width: "100%",
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: "bold",
//                 color: theme.palette.primary.main,
//                 textAlign: "left",
//               }}
//             >
//               {selectedStatus} ({statusCounts[selectedStatus]})
//             </Typography>

//             <Divider
//               sx={{
//                 mt: 1,
//                 borderBottomWidth: 3,
//                 borderColor: theme.palette.primary.main,
//                 opacity: 0.7,
//                 width: "100%",
//               }}
//             />

//             {/* Filtered Projects */}
//             {filteredProjects.length === 0 ? (
//               <Typography
//                 sx={{ mt: 3, color: "gray", textAlign: "center" }}
//               >
//                 No {selectedStatus.toLowerCase()} bids found.
//               </Typography>
//             ) : (
//               filteredProjects.map((project, idx) => {
//                 const coverLetterPreview =
//                   project.CoverLetter.length > 430
//                     ? project.CoverLetter.slice(0, 430) + "..."
//                     : project.CoverLetter;
//                 return (
//                   <Box
//                     key={idx}
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       gap: 1,
//                       width: "100%",
//                       mb: 2,
//                       boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//                       p: 2,
//                       borderRadius: 2,
//                     }}
//                   >
//                     {/* Header row */}
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: "row",
//                         alignItems: "center",
//                         justifyContent: "flex-start",
//                         width: "100%",
//                       }}
//                     >
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ fontWeight: 600, width: "40%" }}
//                       >
//                         {project.Title}
//                       </Typography>
//                       <Typography
//                         variant="subtitle2"
//                         sx={{
//                           textTransform: "capitalize",
//                           fontWeight: 600,
//                           color: "black",
//                           backgroundColor: project.StatusColor,
//                           display: "flex",
//                           justifyContent: "center",
//                           borderRadius: "6px",
//                           px: 1,
//                           width: "8%",
//                         }}
//                       >
//                         {project.Status}
//                       </Typography>
//                     </Box>
//                     <Box sx={{display:"flex", justifyContent:"flex-start", width:"100%"}}> 
                        
//                     <Typography variant="caption" sx={{ color: "gray" }}>
//                       Submitted On {project.SubmittedOn}
//                     </Typography>
//                     </Box>

//                     {/* Budget + Timeline */}
//                    <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 justifyContent: "space-between",
//                 gap: 2,
//                 mt: 2,
//                 width:"100%"
//               }}
//             >
//               <Box
//                 sx={{
//                   flex: 1,
//                   backgroundColor: theme.palette.grey[100],
//                   borderRadius: 2,
//                   p: 2,
//                 }}
//               >
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <AttachMoneyIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
//                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                     Your Proposed Budget
//                   </Typography>
//                 </Box>
//                 <Typography sx={{ ml: 3, mt: 0.5 }} variant="body2" fontWeight={600}>
//                   {project.Budget}
//                 </Typography>
//               </Box>

//               <Box
//                 sx={{
//                   flex: 1,
//                   backgroundColor: theme.palette.grey[100],
//                   borderRadius: 2,
//                   p: 2,
//                 }}
//               >
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <AccessTimeIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
//                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                     Your Proposed Timeline
//                   </Typography>
//                 </Box>
//                 <Typography sx={{ ml: 3, mt: 0.5 }} variant="body2" fontWeight={600}>
//                   {project.Timeline}
//                 </Typography>
//               </Box>
//             </Box>

//                     {/* Cover Letter */}
//                     <Box
//                                  sx={{
//                                    mt: 2,
//                                    backgroundColor: theme.palette.grey[100],
//                                    borderRadius: 2,
//                                    p: 2,
//                                    width:"100%"
//                                  }}
//                                >
//                                  <Typography variant="body2" fontWeight={500}>
//                                    Your Cover Letter:
//                                  </Typography>
//                                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                                    {coverLetterPreview}
//                                  </Typography>
//                                </Box>
//                   </Box>
//                 );
//               })
//             )}
//           </Box>
//         </Container>
//       </Box>
//     </DashBoardLayout>
//   );
// };

// export default ManageBids;



"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  Divider,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DashBoardLayout from "../../../layouts/DashboardLayout";
import { useRouter } from "next/navigation";
import apiClient from "@/api/apiClient"; // ✅ your axios instance
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { useTranslations } from "next-intl";

const ManageBids: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const {isArabic,locale} = useContext(LanguageContext)
  const t = useTranslations("BidManagement")
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<"Pending" | "Accepted" | "Rejected" | "Withdrawn">("Pending");
  const [selectedStatusArabic,setSelectedStatusArabic]= useState("")
  useEffect(() => {
    const fetchBids = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await apiClient.get("https://cto-backend-test.onrender.com/bids/paginated/all?page=1&limit=10");
        const bidsData = res.data?.Data?.bids;

        if (res.data?.Success && Array.isArray(bidsData)) {
          // 🔁 Map the API data into your frontend display structure
          const mapped = bidsData.map((b: any) => ({
            Title: b.projectInfo?.title || "No Title",
            CoverLetter: b.proposalText || "No proposal provided",
            Status: b.status || "Unknown",
            Budget: b.bidAmount || "N/A",
            Timeline: b.timeline || "N/A",
            SubmittedOn: new Date().toLocaleString(),
          }));
          setBids(mapped);
        } else {
          setBids([]);
        }
      } catch (err) {
        console.error("❌ Failed to fetch bids:", err);
        setBids([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);


  const statusLabelMap: Record<string, string> = {
  Pending: isArabic ? t("Status1") : "Pending",
  Accepted: isArabic ? t("Status2") : "Accepted",
  Rejected: isArabic ? t("Status3") : "Rejected",
  Withdrawn: isArabic ? t("Status4") : "Withdrawn",
};

  const filteredProjects = bids.filter(
    (b) => b.Status.toLowerCase() === selectedStatus.toLowerCase()
  );

  const statusCounts = {
    Pending: bids.filter((p) => p.Status.toLowerCase() === "pending").length,
    Accepted: bids.filter((p) => p.Status.toLowerCase() === "accepted").length,
    Rejected: bids.filter((p) => p.Status.toLowerCase() === "rejected").length,
    Withdrawn: bids.filter((p) => p.Status.toLowerCase() === "withdrawn").length,
  };

  const colorMap: Record<string, string> = {
    Pending: "orange",
    Accepted: "green",
    Rejected: "red",
    Withdrawn: theme.palette.error.main,
  };

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
          mt: 3,
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {/* Back Button */}
        <Box sx={{ display: "flex", width: "75%", justifyContent: "flex-start", mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/dashboard/seller")}
            sx={{
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "600",
              color: "black",
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
            width: "1152px",
            height: "100%",
            p: { xs: 3, sm: 4, md: 5 },
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <DescriptionIcon
              sx={{
                height: 60,
                width: 60,
                color: "white",
                backgroundColor: theme.palette.primary.main,
                borderRadius: "60%",
                padding: "12px",
              }}
            />
            <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }}>
              {t("Header1")}
            </Typography>
            <Typography variant="subtitle1">{t("Header2")}</Typography>
            <Typography variant="caption">{t("Content")}</Typography>
          </Box>

          {/* Status Cards */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              mt: 3,
              mb: 2,
            }}
          >
            {(["Pending", "Accepted", "Rejected", "Withdrawn"] as const).map((status) => (
              <Card
                key={status}
                onClick={() => setSelectedStatus(status)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "260px",
                  height: "103.91px",
                  cursor: "pointer",
                  border:
                    selectedStatus === status
                      ? `2px solid ${colorMap[status]}`
                      : "2px solid transparent",
                  boxShadow:
                    selectedStatus === status
                      ? "0 4px 12px rgba(0,0,0,0.1)"
                      : "0 2px 5px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                }}
              >
                <Typography sx={{ color: colorMap[status], fontWeight: 600, fontSize: "18px" }}>
                  {/* {status} */}
                  {statusLabelMap[status]}
                </Typography>
                <Typography sx={{ color: colorMap[status], fontSize: "16px", fontWeight: 500 }}>
                  {statusCounts[status] || 0}
                </Typography>
              </Card>
            ))}
          </Box>

          {/* Filtered Data */}
          <Box sx={{ gap: 1, display: "flex", flexDirection: "column", mt: 2, width: "100%" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                textAlign: "left",
              }}
            >
              {statusLabelMap[selectedStatus]} ({statusCounts[selectedStatus] || 0})
            </Typography>

            <Divider
              sx={{
                mt: 1,
                borderBottomWidth: 3,
                borderColor: theme.palette.primary.main,
                opacity: 0.7,
                width: "100%",
              }}
            />

            {loading ? (
              <Typography sx={{ mt: 3, color: "gray", textAlign: "center" }}>Loading...</Typography>
            ) : filteredProjects.length === 0 ? (
              <Typography sx={{ mt: 3, color: "gray", textAlign: "center" }}>
                {t("No")} {statusLabelMap[selectedStatus].toLowerCase()} {t("BidsFound")}
              </Typography>
            ) : (
              filteredProjects.map((project, idx) => {
                const coverLetterPreview =
                  project.CoverLetter.length > 430
                    ? project.CoverLetter.slice(0, 430) + "..."
                    : project.CoverLetter;

                return (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      width: "100%",
                      mb: 2,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    {/* Header row */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, width: "40%" }}>
                        {project.Title}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: 600,
                          color: "white",
                          backgroundColor: colorMap[project.Status] || "gray",
                          display: "flex",
                          justifyContent: "center",
                          borderRadius: "6px",
                          px: 1,
                          width: "8%",
                        }}
                      >
                        {/* {project.Status} */}
                        {statusLabelMap[project.Status]}

                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                      <Typography variant="caption" sx={{ color: "gray" }}>
                        Submitted On {project.SubmittedOn}
                      </Typography>
                    </Box>

                    {/* Budget + Timeline */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        gap: 2,
                        mt: 2,
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          backgroundColor: theme.palette.grey[100],
                          borderRadius: 2,
                          p: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <AttachMoneyIcon
                            sx={{ fontSize: 18, color: theme.palette.primary.main }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Your Proposed Budget
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ ml: 3, mt: 0.5 }}
                          variant="body2"
                          fontWeight={600}
                        >
                          {project.Budget}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          backgroundColor: theme.palette.grey[100],
                          borderRadius: 2,
                          p: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <AccessTimeIcon
                            sx={{ fontSize: 18, color: theme.palette.primary.main }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Your Proposed Timeline
                          </Typography>
                        </Box>
                        <Typography
                          sx={{ ml: 3, mt: 0.5 }}
                          variant="body2"
                          fontWeight={600}
                        >
                          {project.Timeline}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Cover Letter */}
                    <Box
                      sx={{
                        mt: 2,
                        backgroundColor: theme.palette.grey[100],
                        borderRadius: 2,
                        p: 2,
                        width: "100%",
                      }}
                    >
                      <Typography variant="body2" fontWeight={500}>
                        Your Cover Letter:
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {coverLetterPreview}
                      </Typography>
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
        </Container>
      </Box>
    </DashBoardLayout>
  );
};

export default ManageBids;
