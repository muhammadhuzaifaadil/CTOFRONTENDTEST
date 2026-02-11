"use client"
import Sidebar from "@/app/components/Sidebar";
import { Box, Button, Input, Typography,CircularProgress,Backdrop, useTheme } from "@mui/material";
import PercentIcon from '@mui/icons-material/Percent';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupIcon from '@mui/icons-material/Group';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { useEffect,useState } from "react";
import apiClient from "@/api/apiClient";


// const ManagePolicies: React.FC = () => {

//   const theme = useTheme();
//   const [policies, setPolicies] = useState<any>(null);
//   const [commissionRate, setCommissionRate] = useState("");
//   const [bidLimit, setBidLimit] = useState("");
//   const [expertFee, setExpertFee] = useState("");
  
//   const postPolicy = async () => {
//     apiClient.post("/policies/createPolicies",{
//       commissionRate: commissionRate,
//       freeBidsLimit: bidLimit,
//       qualityExpertFee: expertFee
//     })
//     }
//   const fetchPolicies = async () => {
//     // API call to fetch current policies and populate state
//     const response =  await apiClient.get("/policies/getActivePolicy")
//     console.log("Current policies:", response.data.Data);
//     setPolicies(response.data.Data);
//   }
//   useEffect(()=>{
// fetchPolicies()
//   },[])
//   useEffect(() => {
//   if (policies?.commissionRate !== undefined) {
//     setCommissionRate(policies.commissionRate);
//   }
//   if (policies?.freeBidsLimit !== undefined) {
//     setBidLimit(policies.freeBidsLimit);
//   }
//   if(policies?.qualityExpertFee !== undefined){
//     setExpertFee(policies.qualityExpertFee);
//   }
// }, [policies]);
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         width: "100%",
//         minHeight: "100vh",
//         backgroundColor: "#fafafa",
//         gap: 2,
//       }}
//     >
//       <Sidebar />

//       {/* Main content */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           flex: 1,
//           mt: 2,
//           px: { xs: 2, sm: 3, md: 6 }, // responsive side padding
//         }}
//       >
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             width: "100%",
//             maxWidth: 1200,
//             mx: "auto",
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
//           >
//             Manage Policies
//           </Typography>
//           <Typography variant="caption" sx={{ color: "gray" }}>
//             Update platform policies and commission rates. All users will recieve
//             notifications about policy changes.
//           </Typography>
//         </Box>

//         {/* All policy cards */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             width: "100%",
//             maxWidth: 1200,
//             mx: "auto",
//             mt: 3,
//             gap: 3, // space between cards
//           }}
//         >
//           {/* 1. Platform Commission */}
//           <Box
//             display="flex"
//             flexDirection="column"
//             p={3}
//             borderRadius={3}
//             border="1px solid #E5E7EB"
//             bgcolor="#FFFFFF"
//             sx={{ width: "100%" }}   // <– full available width
//           >
//             {/* Top section */}
//             <Box display="flex" flexDirection="row" alignItems="center" mb={3}>
//               <Box
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//                 width={40}
//                 height={40}
//                 borderRadius={2}
//                 bgcolor="#EEF2FF"
//                 color="#4F46E5"
//                 mr={2}
//               >
//                 <PercentIcon />
//               </Box>

//               <Box display="flex" flexDirection="column">
//                 <Typography fontWeight={600}>Platform Commission</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Set the commission percentage applied to every financial
//                   transaction on the platform
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Bottom section */}
//             <Box display="flex" flexDirection="column" gap={1.5}>
//               <Typography variant="subtitle2" fontWeight={600}>
//                 Commission Rate (%)
//               </Typography>

//               <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
//                 <Input
//                   disableUnderline
//                    value={commissionRate}
//     onChange={e => setCommissionRate(e.target.value)}
//                   sx={{
//                     width: 80,
//                     px: 1.5,
//                     py: 1,
//                     borderRadius: 1.5,
//                     bgcolor: "#F3F4F6",
//                     fontWeight: 600,
//                   }}
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   Current: {commissionRate}% commission on all transactions
//                 </Typography>
//               </Box>

//               <Typography variant="caption" color="text.secondary">
//                 Example: For a 10,000 SAR transaction, the platform will charge
//                 500 SAR
//               </Typography>
//             </Box>
//           </Box>

//           {/* 2. (same structure, just keep width:"100%" instead of maxWidth) */}
//           <Box
//             display="flex"
//             flexDirection="column"
//             p={3}
//             borderRadius={3}
//             border="1px solid #E5E7EB"
//             bgcolor="#FFFFFF"
//             sx={{ width: "100%" }}
//           >
//    {/* Top section */}
//   <Box display="flex" flexDirection="row" alignItems="center" mb={3}>
//     {/* Icon */}
//     <Box
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       width={40}
//       height={40}
//       borderRadius={2}
//       bgcolor="#EEF2FF"
//       color="#4F46E5"
//       mr={2}
//     >
//       <GroupIcon />
//     </Box>

//     {/* Title + description */}
//     <Box display="flex" flexDirection="column">
//       <Typography fontWeight={600}>Free Bidding Limit</Typography>
//       <Typography variant="body2" color="text.secondary">
//           Set the number of free bids each user can submit per month before charges apply
//       </Typography>
//     </Box>
//   </Box>

//   {/* Bottom section */}
//   <Box display="flex" flexDirection="column" gap={1.5}>
//     {/* Label */}
//     <Typography variant="subtitle2" fontWeight={600}>
//      Free Bids Per User Per Month
//     </Typography>

//     {/* Input + current info */}
//     <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
//       <Input
//         disableUnderline
//         value={bidLimit}
//     onChange={e => setBidLimit(e.target.value)}
//         sx={{
//           width: 80,
//           px: 1.5,
//           py: 1,
//           borderRadius: 1.5,
//           bgcolor: "#F3F4F6",
//           fontWeight: 600,
//         }}
//       />
//       <Typography variant="body2" color="text.secondary">
//         Users can submit upto {bidLimit} free bids each month
//       </Typography>
//     </Box>

//     {/* Example text */}
//     <Typography variant="caption" color="text.secondary">
//       After reaching this limit, users will be charged per additional bid
//     </Typography>
//   </Box>

//           </Box>

//           {/* 3. (same pattern) */}
//             <Box
//             display="flex"
//             flexDirection="column"
//             p={3}
//             borderRadius={3}
//             border="1px solid #E5E7EB"
//             bgcolor="#FFFFFF"
//             sx={{ width: "100%" }}
//           >
//    {/* Top section */}
//   <Box display="flex" flexDirection="row" alignItems="center" mb={3}>
//     {/* Icon */}
//     <Box
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       width={40}
//       height={40}
//       borderRadius={2}
//       bgcolor="#EEF2FF"
//       color="#4F46E5"
//       mr={2}
//     >
//       <LocalPoliceIcon />
//     </Box>

//     {/* Title + description */}
//     <Box display="flex" flexDirection="column">
//       <Typography fontWeight={600}>Quality Expert Fee</Typography>
//       <Typography variant="body2" color="text.secondary">
//         Set the monthly charges for hiring a quality expert for project assistance
//       </Typography>
//     </Box>
//   </Box>

//   {/* Bottom section */}
//   <Box display="flex" flexDirection="column" gap={1.5}>
//     {/* Label */}
//     <Typography variant="subtitle2" fontWeight={600}>
//       Quality Expert Fee (SAR/month)
//     </Typography>

//     {/* Input + current info */}
//     <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
//       <Input
//         disableUnderline
//         value={expertFee}
//     onChange={e => setExpertFee(e.target.value)}
//         sx={{
//           width: 80,
//           px: 1.5,
//           py: 1,
//           borderRadius: 1.5,
//           bgcolor: "#F3F4F6",
//           fontWeight: 600,
//         }}
//       />
//       <Typography variant="body2" color="text.secondary">
//         {expertFee} SAR per month for quality expert services
//       </Typography>
//     </Box>

//     {/* Example text */}
//     <Typography variant="caption" color="text.secondary">
//       This fee will be deducted from project payments when a quality expert is hired
//     </Typography>
//   </Box>

//           </Box>

//           {/* 4. Current Policy Summary */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               width: "100%",
//               p: 3,
//               borderRadius: 3,
//               border: "1px solid #E5E7EB",
//               bgcolor: "#F9FAFB",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//               <SettingsOutlinedIcon sx={{ fontSize: 20, mr: 1 }} />
//               <Typography fontWeight={600}>Current Policy Summary</Typography>
//             </Box>

//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Box sx={{ display: "flex", flexDirection: "column" }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Platform Commission
//                 </Typography>
//                 <Typography sx={{ color: "#4F46E5", fontWeight: 700 }}>{commissionRate}%</Typography>
//               </Box>

//               <Box sx={{ display: "flex", flexDirection: "column" }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Free Bids Per Month
//                 </Typography>
//                 <Typography sx={{ color: "#4F46E5", fontWeight: 700 }}>{bidLimit}</Typography>
//               </Box>

//               <Box sx={{ display: "flex", flexDirection: "column" }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Quality Expert Fee
//                 </Typography>
//                 <Typography sx={{ color: "#16A34A", fontWeight: 700 }}>
//                   {expertFee} SAR
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>

//           {/* 5. Buttons row */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               flexDirection: "row",
//               width: "100%",
//               gap: 2,
//               mt: 1,
//             }}
//           >
//             <Button variant="outlined">Reset to Default</Button>
//             <Button
//               variant="contained"
//               sx={{ bgcolor: "#4F46E5", "&:hover": { bgcolor: "#4338CA" } }}
//               onClick={postPolicy}
//             >
//               Save Changes
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };
// export default ManagePolicies;




const ManagePolicies: React.FC = () => {
  const theme = useTheme();
  const [policies, setPolicies] = useState<any>(null);
  const [commissionRate, setCommissionRate] = useState("");
  const [bidLimit, setBidLimit] = useState("");
  const [expertFee, setExpertFee] = useState("");
  const [isSaving, setIsSaving] = useState(false); // NEW
 const [initialValues, setInitialValues] = useState({
    commissionRate: "",
    bidLimit: "",
    expertFee: "",
  });
  const fetchPolicies = async () => {
    try {
      const response = await apiClient.get("/policies/getActivePolicy");
      console.log("Current policies:", response.data.Data);
      setPolicies(response.data.Data);
    } catch (err) {
      console.error("Failed to fetch policies", err);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  useEffect(() => {
    if (policies?.commissionRate !== undefined) {
      setCommissionRate(policies.commissionRate);
    }
    if (policies?.freeBidsLimit !== undefined) {
      setBidLimit(policies.freeBidsLimit);
    }
    if (policies?.qualityExpertFee !== undefined) {
      setExpertFee(policies.qualityExpertFee);
    }
  }, [policies]);

  const isDirty =
    commissionRate !== initialValues.commissionRate ||
    bidLimit !== initialValues.bidLimit ||
    expertFee !== initialValues.expertFee;

  // SAVE handler with loader + refresh
  const handleSave = async () => {
    if (!isDirty) return; // extra guard

    setIsSaving(true);
    try {
      await apiClient.post("/policies/createPolicies", {
        commissionRate,
        freeBidsLimit: bidLimit,
        qualityExpertFee: expertFee,
      });

      // Re-fetch to refresh from server and reset initialValues
      await fetchPolicies();
    } catch (err) {
      console.error("Failed to save policies", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        gap: 2,
      }}
    >
      {/* Global loader while saving */}
      <Backdrop
        open={isSaving}
        sx={{ color: "#fff", zIndex: theme.zIndex.modal + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Sidebar />

      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          mt: 2,
          px: { xs: 2, sm: 3, md: 6 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
          >
            Manage Policies
          </Typography>
          <Typography variant="caption" sx={{ color: "gray" }}>
            Update platform policies and commission rates. All users will
            receive notifications about policy changes.
          </Typography>
        </Box>

        {/* All policy cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            mt: 3,
            gap: 3,
          }}
        >
          {/* 1. Platform Commission */}
          <Box
            display="flex"
            flexDirection="column"
            p={3}
            borderRadius={3}
            border="1px solid #E5E7EB"
            bgcolor="#FFFFFF"
            sx={{ width: "100%" }}
          >
            <Box display="flex" flexDirection="row" alignItems="center" mb={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={40}
                height={40}
                borderRadius={2}
                bgcolor="#EEF2FF"
                color="#4F46E5"
                mr={2}
              >
                <PercentIcon />
              </Box>

              <Box display="flex" flexDirection="column">
                <Typography fontWeight={600}>Platform Commission</Typography>
                <Typography variant="body2" color="text.secondary">
                  Set the commission percentage applied to every financial
                  transaction on the platform
                </Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" gap={1.5}>
              <Typography variant="subtitle2" fontWeight={600}>
                Commission Rate (%)
              </Typography>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={3}
              >
                <Input
                  disableUnderline
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  sx={{
                    width: 80,
                    px: 1.5,
                    py: 1,
                    borderRadius: 1.5,
                    bgcolor: "#F3F4F6",
                    fontWeight: 600,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Current: {commissionRate}% commission on all transactions
                </Typography>
              </Box>

              <Typography variant="caption" color="text.secondary">
                Example: For a 10,000 SAR transaction, the platform will charge
                500 SAR
              </Typography>
            </Box>
          </Box>

          {/* 2. Free Bidding Limit */}
          <Box
            display="flex"
            flexDirection="column"
            p={3}
            borderRadius={3}
            border="1px solid #E5E7EB"
            bgcolor="#FFFFFF"
            sx={{ width: "100%" }}
          >
            <Box display="flex" flexDirection="row" alignItems="center" mb={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={40}
                height={40}
                borderRadius={2}
                bgcolor="#EEF2FF"
                color="#4F46E5"
                mr={2}
              >
                <GroupIcon />
              </Box>

              <Box display="flex" flexDirection="column">
                <Typography fontWeight={600}>Free Bidding Limit</Typography>
                <Typography variant="body2" color="text.secondary">
                  Set the number of free bids each user can submit per month
                  before charges apply
                </Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" gap={1.5}>
              <Typography variant="subtitle2" fontWeight={600}>
                Free Bids Per User Per Month
              </Typography>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={3}
              >
                <Input
                  disableUnderline
                  value={bidLimit}
                  onChange={(e) => setBidLimit(e.target.value)}
                  sx={{
                    width: 80,
                    px: 1.5,
                    py: 1,
                    borderRadius: 1.5,
                    bgcolor: "#F3F4F6",
                    fontWeight: 600,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Users can submit up to {bidLimit} free bids each month
                </Typography>
              </Box>

              <Typography variant="caption" color="text.secondary">
                After reaching this limit, users will be charged per additional
                bid
              </Typography>
            </Box>
          </Box>

          {/* 3. Quality Expert Fee */}
          <Box
            display="flex"
            flexDirection="column"
            p={3}
            borderRadius={3}
            border="1px solid #E5E7EB"
            bgcolor="#FFFFFF"
            sx={{ width: "100%" }}
          >
            <Box display="flex" flexDirection="row" alignItems="center" mb={3}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={40}
                height={40}
                borderRadius={2}
                bgcolor="#EEF2FF"
                color="#4F46E5"
                mr={2}
              >
                <LocalPoliceIcon />
              </Box>

              <Box display="flex" flexDirection="column">
                <Typography fontWeight={600}>Quality Expert Fee</Typography>
                <Typography variant="body2" color="text.secondary">
                  Set the monthly charges for hiring a quality expert for
                  project assistance
                </Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" gap={1.5}>
              <Typography variant="subtitle2" fontWeight={600}>
                Quality Expert Fee (SAR/month)
              </Typography>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={3}
              >
                <Input
                  disableUnderline
                  value={expertFee}
                  onChange={(e) => setExpertFee(e.target.value)}
                  sx={{
                    width: 80,
                    px: 1.5,
                    py: 1,
                    borderRadius: 1.5,
                    bgcolor: "#F3F4F6",
                    fontWeight: 600,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {expertFee} SAR per month for quality expert services
                </Typography>
              </Box>

              <Typography variant="caption" color="text.secondary">
                This fee will be deducted from project payments when a quality
                expert is hired
              </Typography>
            </Box>
          </Box>

          {/* 4. Current Policy Summary */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              p: 3,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              bgcolor: "#F9FAFB",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <SettingsOutlinedIcon sx={{ fontSize: 20, mr: 1 }} />
              <Typography fontWeight={600}>Current Policy Summary</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" color="text.secondary">
                  Platform Commission
                </Typography>
                <Typography sx={{ color: "#4F46E5", fontWeight: 700 }}>
                  {commissionRate}%
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" color="text.secondary">
                  Free Bids Per Month
                </Typography>
                <Typography sx={{ color: "#4F46E5", fontWeight: 700 }}>
                  {bidLimit}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" color="text.secondary">
                  Quality Expert Fee
                </Typography>
                <Typography sx={{ color: "#16A34A", fontWeight: 700 }}>
                  {expertFee} SAR
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* 5. Buttons row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              width: "100%",
              gap: 2,
              mt: 1,
            }}
          >
            {/* <Button variant="outlined" disabled={isSaving}>
              Reset to Default
            </Button> */}
             <Button
              variant="contained"
              sx={{ bgcolor: "#4F46E5", "&:hover": { bgcolor: "#4338CA" } }}
              onClick={handleSave}
              disabled={isSaving || !isDirty}
              startIcon={
                isSaving ? (
                  <CircularProgress size={18} color="inherit" />
                ) : undefined
              }
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManagePolicies;