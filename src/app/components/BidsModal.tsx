// import React, { useContext, useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Box,
//   Typography,
//   Button,
//   Divider,
//   Chip,
//   Card,
// } from "@mui/material";
// import axios from "axios";
// import apiClient from "@/api/apiClient";
// import { AuthContext } from "../contexts/AuthContext";

// interface BidsModalProps {
//   open: boolean;
//   onClose: () => void;
//   projectId: number | null;
// }

// const BidsModal: React.FC<BidsModalProps> = ({ open, onClose, projectId }) => {
//   const [project, setProject] = useState<any>(null);
//   const [bids, setBids] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

// const { accessToken, refreshAccessToken, isAuthenticated } = useContext(AuthContext);

// useEffect(() => {
//   if (!projectId || !open || !isAuthenticated) return;

//   const fetchProject = async () => {
//     setLoading(true);
//     try {
//       const res = await apiClient.get(`/projects/${projectId}`);
//       const data = res.data.Data;
//       setProject(data);
//       setBids(data.bids || []);
//     } catch (err: any) {
//       console.error("Error fetching project:", err);

//       // Optionally handle unauthorized manually (though interceptor should cover it)
//       if (err.response?.status === 401) {
//         const newToken = await refreshAccessToken();
//         if (newToken) {
//           try {
//             const retryRes = await apiClient.get(`/projects/${projectId}`);
//             const data = retryRes.data.Data;
//             setProject(data);
//             setBids(data.bids || []);
//           } catch (retryErr) {
//             console.error("Retry failed:", retryErr);
//           }
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProject();
// }, [projectId, open, isAuthenticated]);

//   const handleAccept = async (bidId: number) => {
//     const alreadyAccepted = bids.some((b) => b.status === "Accepted");
//     if (alreadyAccepted) {
//       alert("A bid is already accepted for this project!");
//       return;
//     }

//     await axios.patch(`https://cto.sa/bids/${bidId}/accept`);
//     const updated = bids.map((b) =>
//       b.id === bidId ? { ...b, status: "Accepted" } : { ...b, status: "Rejected" }
//     );
//     setBids(updated);
//   };

//   const handleReject = async (bidId: number) => {
//     await axios.patch(`https://cto.sa/bids/${bidId}/reject`);
//     const updated = bids.map((b) =>
//       b.id === bidId ? { ...b, status: "Rejected" } : b
//     );
//     setBids(updated);
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
//       <DialogTitle>Project Details & Bids</DialogTitle>
//       <DialogContent>
//         {loading ? (
//           <Typography>Loading...</Typography>
//         ) : (
//           project && (
//             <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
//               {/* Left: Project Details */}
//               <Box
//                 sx={{
//                   flex: 1,
//                   p: 2,
//                   border: "1px solid #ddd",
//                   borderRadius: 2,
//                   backgroundColor: "#fafafa",
//                   minWidth: "45%",
//                 }}
//               >
//                 <Typography variant="h6" gutterBottom>
//                   {project.title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>
//                   <strong>Outline:</strong> {project.outline}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>
//                   <strong>Requirements:</strong> {project.requirements}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>
//                   <strong>Budget:</strong> {project.budgetRange}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>
//                   <strong>Timeline:</strong> {project.timeline}
//                 </Typography>
//                 <Typography variant="body2">
//                   <strong>Skills:</strong> {project.skillsRequired.join(", ")}
//                 </Typography>
//               </Box>

//               {/* Right: Bids Section */}
//               <Box
//                 sx={{
//                   flex: 1.2,
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 2,
//                   maxHeight: "500px",
//                   overflowY: "auto",
//                   p: 1,
//                 }}
//               >
//                 <Typography variant="h6">Bids</Typography>
//                 {bids.length === 0 ? (
//                   <Typography>No bids found.</Typography>
//                 ) : (
//                   bids.map((bid) => (
//                     <Card
//                       key={bid.id}
//                       sx={{
//                         p: 2,
//                         borderRadius: 2,
//                         boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
//                       }}
//                     >
//                       <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                         {bid.sellerName || "Unnamed Seller"}
//                       </Typography>
//                       <Typography variant="body2" sx={{ mb: 1 }}>
//                         <strong>Bid Amount:</strong> ${bid.bidAmount}
//                       </Typography>
//                       <Typography variant="body2" sx={{ mb: 1 }}>
//                         <strong>Timeline:</strong> {bid.timeline}
//                       </Typography>
//                       <Typography variant="body2" sx={{ mb: 1 }}>
//                         {bid.proposalText}
//                       </Typography>
//                       <Chip
//                         label={bid.status}
//                         sx={{
//                           mb: 1,
//                           backgroundColor:
//                             bid.status === "Accepted"
//                               ? "green"
//                               : bid.status === "Rejected"
//                               ? "red"
//                               : "grey",
//                           color: "white",
//                         }}
//                       />
//                       <Box sx={{ display: "flex", gap: 1 }}>
//                         <Button
//                           variant="contained"
//                           color="success"
//                           size="small"
//                           onClick={() => handleAccept(bid.id)}
//                         >
//                           Accept
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           size="small"
//                           onClick={() => handleReject(bid.id)}
//                         >
//                           Reject
//                         </Button>
//                       </Box>
//                     </Card>
//                   ))
//                 )}
//               </Box>
//             </Box>
//           )
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default BidsModal;


import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Button,
  Divider,
  Chip,
  Card,
} from "@mui/material";
import apiClient from "@/api/apiClient";
import { AuthContext } from "../contexts/AuthContext";

interface BidsModalProps {
  open: boolean;
  onClose: () => void;
  projectId: number | null;
}

const BidsModal: React.FC<BidsModalProps> = ({ open, onClose, projectId }) => {
  const [project, setProject] = useState<any>(null);
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, refreshAccessToken } = useContext(AuthContext);

  // ✅ Fetch project bids
  useEffect(() => {
    if (!projectId || !open || !isAuthenticated) return;

    const fetchBids = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`/bids/project/${projectId}`);
        const data = res.data.Data;
        setProject(data);
        setBids(data.bids || []);
      } catch (err: any) {
        console.error("Error fetching bids:", err);

        if (err.response?.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            try {
              const retryRes = await apiClient.get(`/bids/project/${projectId}`);
              const data = retryRes.data.Data;
              setProject(data);
              setBids(data.bids || []);
            } catch (retryErr) {
              console.error("Retry failed:", retryErr);
            }
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [projectId, open, isAuthenticated]);

  // ✅ Handle Accept
  const handleAccept = async (bidId: number) => {
    const alreadyAccepted = bids.some((b) => b.status === "Accepted");
    if (alreadyAccepted) {
      alert("A bid is already accepted for this project!");
      return;
    }

    try {
      await apiClient.patch(`/bids/${bidId}/accept`);
      const updated = bids.map((b) =>
        b.id === bidId ? { ...b, status: "Accepted" } : { ...b, status: "Rejected" }
      );
      setBids(updated);
    } catch (err) {
      console.error("Error accepting bid:", err);
    }
  };

  // ✅ Handle Reject
  const handleReject = async (bidId: number) => {
    try {
      await apiClient.patch(`/bids/${bidId}/reject`);
      const updated = bids.map((b) =>
        b.id === bidId ? { ...b, status: "Rejected" } : b
      );
      setBids(updated);
    } catch (err) {
      console.error("Error rejecting bid:", err);
    }
  };

  return (
    // <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
    //   <DialogTitle sx={{ fontWeight: 600 }}>Project Details & Bids</DialogTitle>
    //   <DialogContent>
    //     {loading ? (
    //       <Typography>Loading...</Typography>
    //     ) : (
    //       project && (
    //         <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
    //           {/* Left: Project Details */}
    //           <Box
    //             sx={{
    //               flex: 1,
    //               p: 2,
    //               border: "1px solid #ddd",
    //               borderRadius: 2,
    //               backgroundColor: "#fafafa",
    //               minWidth: "45%",
    //             }}
    //           >
    //             <Typography variant="h6" gutterBottom>
    //               {project.projectTitle}
    //             </Typography>
    //             <Typography variant="body2" sx={{ mb: 1 }}>
    //               <strong>Outline:</strong> {project.outline}
    //             </Typography>
    //             <Typography variant="body2" sx={{ mb: 1 }}>
    //               <strong>Requirements:</strong> {project.requirements}
    //             </Typography>
    //             <Typography variant="body2" sx={{ mb: 1 }}>
    //               <strong>Budget:</strong> {project.budgetRange}
    //             </Typography>
    //             <Typography variant="body2" sx={{ mb: 1 }}>
    //               <strong>Timeline:</strong> {project.timeline}
    //             </Typography>
    //             <Typography variant="body2">
    //               <strong>Skills:</strong> {project.skillsRequired?.join(", ")}
    //             </Typography>
    //           </Box>

    //           {/* Right: Bids Section */}
    //           <Box
    //             sx={{
    //               flex: 1.2,
    //               display: "flex",
    //               flexDirection: "column",
    //               gap: 2,
    //               maxHeight: "500px",
    //               overflowY: "auto",
    //               p: 1,
    //             }}
    //           >
    //             <Typography variant="h6">Bids</Typography>
    //             {bids.length === 0 ? (
    //               <Typography>No bids found.</Typography>
    //             ) : (
    //               bids.map((bid) => (
    //                 <Card
    //                   key={bid.id}
    //                   sx={{
    //                     p: 2,
    //                     borderRadius: 2,
    //                     boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
    //                     backgroundColor:
    //                       bid.status === "Accepted"
    //                         ? "#e7f9ee"
    //                         : bid.status === "Rejected"
    //                         ? "#fdeaea"
    //                         : "white",
    //                   }}
    //                 >
    //                   <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
    //                     <strong>Name:</strong>{bid.sellerName || "Unnamed Seller"}
    //                   </Typography>
    //                   <Typography variant="body2" sx={{ mb: 0.5 }}>
    //                     <strong>Bid Amount:</strong> ${bid.bidAmount}
    //                   </Typography>
    //                   <Typography variant="body2" sx={{ mb: 0.5 }}>
    //                     <strong>Timeline:</strong> {bid.timeline}
    //                   </Typography>
    //                   <Typography variant="body2" sx={{ mb: 1 }}>
    //                     {bid.proposalText}
    //                   </Typography>
    //                   <Chip
    //                     label={bid.status}
    //                     sx={{
    //                       mb: 1,
    //                       backgroundColor:
    //                         bid.status === "Accepted"
    //                           ? "green"
    //                           : bid.status === "Rejected"
    //                           ? "red"
    //                           : "grey",
    //                       color: "white",
    //                     }}
    //                   />
    //                   <Box sx={{ display: "flex", gap: 1 }}>
    //                     <Button
    //                       variant="contained"
    //                       color="success"
    //                       size="small"
    //                       onClick={() => handleAccept(bid.id)}
    //                       disabled={bid.status === "Accepted"}
    //                     >
    //                       Accept
    //                     </Button>
    //                     <Button
    //                       variant="contained"
    //                       color="error"
    //                       size="small"
    //                       onClick={() => handleReject(bid.id)}
    //                       disabled={bid.status === "Rejected"}
    //                     >
    //                       Reject
    //                     </Button>
    //                   </Box>
    //                 </Card>
    //               ))
    //             )}
    //           </Box>
    //         </Box>
    //       )
    //     )}
    //   </DialogContent>
    // </Dialog>

    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
  <DialogTitle sx={{ fontWeight: 600, fontSize: { xs: "1.1rem", md: "1.3rem" } }}>
    Project Details & Bids
  </DialogTitle>

  <DialogContent
    sx={{
      maxHeight: { xs: "80vh", md: "85vh" },
      overflowY: "auto",
      px: { xs: 1, sm: 2 },
    }}
  >
    {loading ? (
      <Typography>Loading...</Typography>
    ) : (
      project && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column",sm:"column", md: "row" },
            gap: { xs: 2,sm:2, md: 3 },
            flexWrap: "wrap",
          }}
        >
          {/* Left: Project Details */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 1.5, md: 2 },
              border: "1px solid #ddd",
              borderRadius: 2,
              backgroundColor: "#fafafa",
              minWidth: { xs: "100%", md: "45%" },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
            >
              {project.projectTitle}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Outline:</strong> {project.outline}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Requirements:</strong> {project.requirements}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Budget:</strong> {project.budgetRange}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Timeline:</strong> {project.timeline}
            </Typography>
            <Typography variant="body2">
              <strong>Skills:</strong> {project.skillsRequired?.join(", ")}
            </Typography>
          </Box>

          {/* Right: Bids Section */}
          <Box
            sx={{
              flex: 1.2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: { xs: 1, md: 1.5 },
              maxHeight: { xs: "auto",sm:"auto", md: "500px" },
              overflowY: { xs: "visible",sm:"visible", md: "auto" },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
            >
              Bids
            </Typography>

            {bids.length === 0 ? (
              <Typography>No bids found.</Typography>
            ) : (
              bids.map((bid) => (
                <Card
                  key={bid.id}
                  sx={{
                    p: { xs: 1.5,sm:1.5, md: 2 },
                    borderRadius: 2,
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
                    backgroundColor:
                      bid.status === "Accepted"
                        ? "#e7f9ee"
                        : bid.status === "Rejected"
                        ? "#fdeaea"
                        : "white",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.9rem", md: "1rem" },
                    }}
                  >
                    <strong>Name:</strong> {bid.sellerName || "Unnamed Seller"}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Bid Amount:</strong> ${bid.bidAmount}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Timeline:</strong> {bid.timeline}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {bid.proposalText}
                  </Typography>

                  <Chip
                    label={bid.status}
                    sx={{
                      mb: 0,
                      backgroundColor:
                        bid.status === "Accepted"
                          ? "green"
                          : bid.status === "Rejected"
                          ? "red"
                          : "grey",
                      color: "white",
                      fontSize: { xs: "0.7rem",sm:"0.7rem", md: "0.8rem" },
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                      justifyContent: { xs: "center",sm:"center", md: "center" },
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleAccept(bid.id)}
                      disabled={bid.status === "Accepted"}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleReject(bid.id)}
                      disabled={bid.status === "Rejected"}
                    >
                      Reject
                    </Button>
                  </Box>
                </Card>
              ))
            )}
          </Box>
        </Box>
      )
    )}
  </DialogContent>
</Dialog>

  );
};

export default BidsModal;

