// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import {
//   Box,
//   Modal,
//   Typography,
//   TextField,
//   CircularProgress,
//   Button,
//   Divider,
// } from "@mui/material";
// import axios from "axios";
// import { useAuth } from "@/hooks/useAuth";

// interface BuyerInfo {
//   id: number;
//   name: string;
//   email: string;
// }

// interface ProjectData {
//   id: number;
//   title: string;
//   outline: string;
//   requirements: string;
//   budgetRange: string;
//   timeline: string;
//   skillsRequired: string[];
//   attachment?: string | null;
//   status: string;
//   buyerInfo: BuyerInfo;
// }

// interface ProjectBidModalProps {
//   open: boolean;
//   onClose: () => void;
//   projectId: number | null;
// }

// const ProjectBidModal: React.FC<ProjectBidModalProps> = ({
//   open,
//   onClose,
//   projectId,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<ProjectData | null>(null);

//   // Bid submission fields
//   const [proposalText, setProposalText] = useState("");
//   const [bidTimeline, setBidTimeline] = useState("");
//   const [bidAmount, setBidAmount] = useState("");
//   const {accessToken,isAuthenticated} = useAuth()
//   useEffect(() => {
//     if (open && projectId) fetchProjectData();
//   }, [open, projectId]);

//   const fetchProjectData = async () => {
//     try {
//       setLoading(true);
//     //   const token = localStorage.getItem("accessToken");
//       const token = accessToken
//       const res = await axios.get(
//         `http://localhost:3005/projects/${projectId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setData(res.data.Data);
//     } catch (error) {
//       console.error("Error fetching project:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
// const [attachment, setAttachment] = useState<File | null>(null);
// const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);

// const uploadFile = async (file: File): Promise<string | null> => {
//   const formData = new FormData();
//   formData.append('file', file);

//   try {
//     const res = await axios.post('http://localhost:3005/upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return res.data.url; // ✅ file URL from backend
//   } catch (err) {
//     console.error('File upload failed:', err);
//     return null;
//   }
// };


//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) setAttachment(e.target.files[0]);
//   };
// const handleAttachmentChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//   if (file) {
//     const url = await uploadFile(file);
//     if (url) setAttachmentUrl(url);
//   }
// };

// const handleSubmit = async () => {
//   try {
//     const token = localStorage.getItem("accessToken");
//     const payload = {
//       ProjectId: projectId,
//       proposalText,
//       timeline: bidTimeline,
//       bidAmount: bidAmount,
//       attachment: attachmentUrl || null,
//     };

//     await axios.post("http://localhost:3005/bids", payload, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     onClose();
//   } catch (error) {
//     console.error("Error submitting bid:", error);
//   }
// };


// //   const handleSubmit = async () => {
// //     try {
// //       const token = accessToken;
// //       const formData = new FormData();
// //       formData.append("proposalText", proposalText);
// //       formData.append("timeline", bidTimeline);
// //     //   formData.append("status", "Pending Review");
// //       formData.append("bidAmount", bidAmount);
// //       if (attachment) formData.append("attachment", attachment);

// //       await axios.post(
// //         `http://localhost:3005/bids`,
// //         formData,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       onClose();
// //     } catch (error) {
// //       console.error("Error submitting bid:", error);
// //     }
// //   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "650px",
//           height: "85%",
//           bgcolor: "background.paper",
//           borderRadius: 0,
//           boxShadow: 24,
//           p: 4,
//           overflowY: "auto",
//           // ✨ Beautiful custom scroll style
//     "&::-webkit-scrollbar": {
//       width: "8px",
//     },
//     "&::-webkit-scrollbar-track": {
//       backgroundColor: "transparent",
//       borderRadius: "8px",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       backgroundColor: "#bdbdbd",
//       borderRadius: "8px",
//       transition: "background-color 0.3s",
//     },
//     "&::-webkit-scrollbar-thumb:hover": {
//       backgroundColor: "#9e9e9e",
//     },
//     scrollbarWidth: "thin",
//     scrollbarColor: "#bdbdbd transparent",
//         }}
//       >
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//             <CircularProgress />
//           </Box>
//         ) : data ? (
//           <>
//             {/* Header */}
//             <Box textAlign="center" mb={3}>
//               <Typography variant="h5" fontWeight="bold" color="primary">
//                 Submit Your Bid
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Complete the form below to submit your bid. Showcase your
//                 expertise and win this project.
//               </Typography>
//             </Box>

//             {/* Project Info Section */}
//             <Box
//               sx={{
//                 border: "1px solid #e0e0e0",
//                 borderRadius: 2,
//                 p: 2,
//                 mb: 3,
//                 backgroundColor: "#fafafa",
//               }}
//             >
//               {/* ID + Title */}
//               <Box display="flex" gap={2} mb={1}>
//                 {/* <Box flex={1}>
//                   <Typography fontWeight="bold">Project ID</Typography>
//                   <Typography># {data.id}</Typography>
//                 </Box> */}
//                 <Box flex={2}>
//                   <Typography fontWeight="bold">Title</Typography>
//                   <Typography>{data.title}</Typography>
//                 </Box>
//               </Box>

//               {/* Outline */}
//               <Box mb={1}>
//                 <Typography fontWeight="bold">Outline</Typography>
//                 <Typography>{data.outline}</Typography>
//               </Box>

//               {/* Requirements */}
//               <Box mb={1}>
//                 <Typography fontWeight="bold">Requirements</Typography>
//                 <Typography>{data.requirements}</Typography>
//               </Box>

//               {/* Skills */}
//               <Box mb={1}>
//                 <Typography fontWeight="bold">Skills Required</Typography>
//                 <Typography>{data.skillsRequired.join(", ")}</Typography>
//               </Box>

//               {/* Budget + Timeline */}
//               <Box display="flex" gap={2} mb={1}>
//                 <Box flex={1}>
//                   <Typography fontWeight="bold">Budget Range</Typography>
//                   <Typography>{data.budgetRange}</Typography>
//                 </Box>
//                 <Box flex={1}>
//                   <Typography fontWeight="bold">Timeline</Typography>
//                   <Typography>{data.timeline}</Typography>
//                 </Box>
//               </Box>

//               {/* Buyer Info */}
//               <Box display="flex" gap={2}>
//                 <Box flex={1}>
//                   <Typography fontWeight="bold">Buyer Name</Typography>
//                   <Typography>{data.buyerInfo?.name}</Typography>
//                 </Box>
//                 <Box flex={1}>
//                   <Typography fontWeight="bold">Buyer Email</Typography>
//                   <Typography>{data.buyerInfo?.email}</Typography>
//                 </Box>
//               </Box>
//             </Box>

//             <Divider sx={{ mb: 2 }} />

//             {/* --- Bid Submission Section --- */}
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//               Submit Your Bid
//             </Typography>

//             <TextField
//               label="Bid Amount ($)"
//               type="number"
//               value={bidAmount}
//               onChange={(e) => setBidAmount(e.target.value)}
//               fullWidth
//               margin="normal"
//               required
//             />

//             <TextField
//               label="Estimated Timeline"
//               placeholder="e.g., 3 weeks, 2 months"
//               value={bidTimeline}
//               onChange={(e) => setBidTimeline(e.target.value)}
//               fullWidth
//               margin="normal"
//               required
//             />

//             <TextField
//               label="Your Proposal"
//               placeholder="Describe your approach, experience, and why you're a perfect fit..."
//               value={proposalText}
//               onChange={(e) => setProposalText(e.target.value)}
//               fullWidth
//               multiline
//               rows={4}
//               margin="normal"
//               required
//             />

//             <Box mt={2}>
//               <Typography fontWeight="bold" mb={1}>
//                 Attachment (Optional)
//               </Typography>
//               <Button
//                 variant="outlined"
//                 component="label"
//                 fullWidth
//                 sx={{ textTransform: "none" }}
//               >
//                 Click to upload file (PDF, DOCX, TXT)
//                 <input
//                   type="file"
//                   hidden
//                   accept=".pdf,.doc,.docx,.txt"
//                   onChange={handleFileChange}
//                 />
//               </Button>
//               {attachment && (
//                 <Typography mt={1} fontSize={14}>
//                   {attachment.name}
//                 </Typography>
//               )}
//             </Box>

//             {/* Buttons */}
//             <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
//               <Button variant="outlined" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button variant="contained" color="primary" onClick={handleSubmit}>
//                 Submit Bid
//               </Button>
//             </Box>
//           </>
//         ) : (
//           <Typography align="center">No project data found.</Typography>
//         )}
//       </Box>
//     </Modal>
//   );
// };

// export default ProjectBidModal;


import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

interface BuyerInfo {
  id: number;
  name: string;
  email: string;
}

interface ProjectData {
  id: number;
  title: string;
  outline: string;
  requirements: string;
  budgetRange: string;
  timeline: string;
  skillsRequired: string[];
  attachment?: string | null;
  status: string;
  buyerInfo: BuyerInfo;
}

interface ProjectBidModalProps {
  open: boolean;
  onClose: () => void;
  projectId: number | null;
}

const ProjectBidModal: React.FC<ProjectBidModalProps> = ({
  open,
  onClose,
  projectId,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProjectData | null>(null);

  const [proposalText, setProposalText] = useState("");
  const [bidTimeline, setBidTimeline] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const { accessToken } = useAuth();

  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);

  // ✅ new: success and error states
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (open && projectId) fetchProjectData();
  }, [open, projectId]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const token = accessToken;
      const res = await axios.get(`http://localhost:3005/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data.Data);
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://localhost:3005/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.url;
    } catch (err) {
      console.error("File upload failed:", err);
      return null;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setAttachment(e.target.files[0]);
  };

  const handleAttachmentChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadFile(file);
      if (url) setAttachmentUrl(url);
    }
  };

  const handleSubmit = async () => {
    try {
      setErrorMsg(null);
      const token = localStorage.getItem("accessToken");
      const payload = {
        ProjectId: projectId,
        proposalText,
        timeline: bidTimeline,
        bidAmount: bidAmount,
        attachment: attachmentUrl || null,
      };

      await axios.post("http://localhost:3005/bids", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // ✅ show success toast
      setShowSuccess(true);

      // ✅ close and refresh after 2 sec
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error submitting bid:", error);
      setErrorMsg("Something went wrong while submitting your bid. Please try again.");
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "650px",
            height: "85%",
            bgcolor: "background.paper",
            borderRadius: 0,
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#bdbdbd",
              borderRadius: "8px",
              transition: "background-color 0.3s",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#9e9e9e",
            },
            scrollbarWidth: "thin",
            scrollbarColor: "#bdbdbd transparent",
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : data ? (
            <>
              <Box textAlign="center" mb={3}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  Submit Your Bid
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Complete the form below to submit your bid. Showcase your expertise and
                  win this project.
                </Typography>
              </Box>

              {/* ✅ Error message */}
              {errorMsg && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorMsg}
                </Alert>
              )}

              {/* Project Info */}
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 2,
                  mb: 3,
                  backgroundColor: "#fafafa",
                }}
              >
                <Box display="flex" gap={2} mb={1}>
                  <Box flex={2}>
                    <Typography fontWeight="bold">Title</Typography>
                    <Typography>{data.title}</Typography>
                  </Box>
                </Box>

                <Box mb={1}>
                  <Typography fontWeight="bold">Outline</Typography>
                  <Typography>{data.outline}</Typography>
                </Box>

                <Box mb={1}>
                  <Typography fontWeight="bold">Requirements</Typography>
                  <Typography>{data.requirements}</Typography>
                </Box>

                <Box mb={1}>
                  <Typography fontWeight="bold">Skills Required</Typography>
                  <Typography>{data.skillsRequired.join(", ")}</Typography>
                </Box>

                <Box display="flex" gap={2} mb={1}>
                  <Box flex={1}>
                    <Typography fontWeight="bold">Budget Range</Typography>
                    <Typography>{data.budgetRange}</Typography>
                  </Box>
                  <Box flex={1}>
                    <Typography fontWeight="bold">Timeline</Typography>
                    <Typography>{data.timeline}</Typography>
                  </Box>
                </Box>

                <Box display="flex" gap={2}>
                  <Box flex={1}>
                    <Typography fontWeight="bold">Buyer Name</Typography>
                    <Typography>{data.buyerInfo?.name}</Typography>
                  </Box>
                  <Box flex={1}>
                    <Typography fontWeight="bold">Buyer Email</Typography>
                    <Typography>{data.buyerInfo?.email}</Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="h6" fontWeight="bold" mb={2}>
                Submit Your Bid
              </Typography>

              <TextField
                label="Bid Amount ($)"
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                label="Estimated Timeline"
                placeholder="e.g., 3 weeks, 2 months"
                value={bidTimeline}
                onChange={(e) => setBidTimeline(e.target.value)}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                label="Your Proposal"
                placeholder="Describe your approach, experience, and why you're a perfect fit..."
                value={proposalText}
                onChange={(e) => setProposalText(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                required
              />

              <Box mt={2}>
                <Typography fontWeight="bold" mb={1}>
                  Attachment (Optional)
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ textTransform: "none" }}
                >
                  Click to upload file (PDF, DOCX, TXT)
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                  />
                </Button>
                {attachment && (
                  <Typography mt={1} fontSize={14}>
                    {attachment.name}
                  </Typography>
                )}
              </Box>

              <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Submit Bid
                </Button>
              </Box>
            </>
          ) : (
            <Typography align="center">No project data found.</Typography>
          )}
        </Box>
      </Modal>

      {/* ✅ Success Snackbar */}
      <Snackbar
        open={showSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Bid submitted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProjectBidModal;
