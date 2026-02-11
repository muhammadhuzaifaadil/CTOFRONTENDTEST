// "use client";

// import DashBoardLayout from "@/app/layouts/DashboardLayout";
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   Typography,
//   TextField,
//   InputAdornment,
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { use, useEffect, useState } from "react";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import DescriptionIcon from "@mui/icons-material/Description";
// import AddIcon from "@mui/icons-material/Add";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import SendIcon from "@mui/icons-material/Send";
// import theme from "@/app/theme/theme";
// import apiClient from "@/api/apiClient";

// export default function MilestoneProposalPage({
//   params,
// }: {
//   params: Promise<{ projectId: number }>;
// }) {
//   const { projectId } = use(params);
//   const router = useRouter();

//   // States to control the UI flow (switching between the 3 images)
//   const [showForm, setShowForm] = useState(false);
//   const [milestones, setMilestones] = useState<any[]>([]);
  
//   const totalBidAmount = 15000.0;
//   const totalAllocated = milestones.reduce((sum, m) => sum + parseFloat(m.amount || 0), 0);
//   const remaining = totalBidAmount - totalAllocated;


//   const [existingMilestones,setExistingMilestones] = useState();
//   const [milestoneExists,setMileStoneExists] = useState(false);
//   useEffect(()=>{
//     const fetchmilestones = async()=>{
//       const result =await apiClient.get(`/milestone/${projectId}`)
//       console.log("milestone",result)
//       if(result.data.Success===true)
//       {
//         setMileStoneExists(true)
//       }


//     }
//     fetchmilestones()
//   },[])

//   return (
//     <DashBoardLayout>
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           background: theme.palette.background.default,
//           mt: { xs: 6, sm: 4, md: 3 },
//           py: { xs: 2, sm: 4, md: 6 },
//         }}
//       >
//         {/* Back Button */}
//         <Box sx={{ display: "flex", width: { xs: "95%", sm: "90%", md: "1152px" }, mb: 2 }}>
//           <Button
//             startIcon={<ArrowBackIcon />}
//             onClick={() => router.back()}
//             sx={{ textTransform: "none", fontWeight: 600, color: "#5A607F" }}
//           >
//             Back
//           </Button>
//         </Box>

//         <Container
//           maxWidth={false}
//           sx={{
//             backgroundColor: "#FFFFFF",
//             borderRadius: 4,
//             width: { xs: "95%", sm: "90%", md: "1152px" },
//             p: { xs: 3, sm: 4, md: 5 },
//             boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
//           }}
//         >
//           {/* Header */}
//           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4, textAlign: "center" }}>
//             <Avatar sx={{ bgcolor: "#4F46E5", width: 50, height: 50, mb: 2 }}>
//               <DescriptionIcon />
//             </Avatar>
//             <Typography variant="subtitle2" sx={{ color: "#4F46E5", fontWeight: 600 }}>
//               Milestone Proposal
//             </Typography>
//             <Typography variant="h6" sx={{ fontWeight: 700, textTransform: "uppercase" }}>
//               Propose Project Milestones
//             </Typography>
//             <Typography variant="caption" sx={{ color: "#64748B" }}>
//               Break down the project into milestones and send for buyer approval
//             </Typography>
//           </Box>

//           {/* Project Summary Strip */}
//           <Box
//             sx={{
//               backgroundColor: "#F8FAFC",
//               borderRadius: 3,
//               p: 2.5,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 3,
//             }}
//           >
//             <Box>
//               <Typography sx={{ fontSize: "0.75rem", color: "#94A3B8" }}>Project</Typography>
//               <Typography sx={{ fontWeight: 600, color: "#1E293B" }}>E-Commerce Mobile App Development</Typography>
//             </Box>
//             <Box sx={{ textAlign: "right" }}>
//               <Typography sx={{ fontSize: "0.75rem", color: "#94A3B8" }}>Total Bid Amount</Typography>
//               <Typography sx={{ fontWeight: 700, color: "#1E293B", fontSize: "1.2rem" }}>
//                 ${totalBidAmount.toFixed(2)}
//               </Typography>
//             </Box>
//           </Box>

//           {/* Stats Boxes */}
//           <Box sx={{ display: "flex", gap: 2, mb: 4, flexDirection: { xs: "column", sm: "row" } }}>
//             <StatCard icon={<AttachMoneyIcon />} label="Total Allocated" value={`$${totalAllocated.toFixed(2)}`} bgColor="#EEF2FF" iconColor="#4F46E5" />
//             <StatCard icon={<CheckCircleIcon />} label="Remaining" value={`$${remaining.toFixed(2)}`} bgColor="#ECFDF5" iconColor="#10B981" />
//             <StatCard icon={<AssignmentIcon />} label="Milestones" value={milestones.length.toString()} bgColor="#FFFBEB" iconColor="#F59E0B" />
//           </Box>

//           {/* CONDITIONAL CONTENT BASED ON STATE */}

//           {!showForm && milestones.length === 0 ? (
//             /* IMAGE 1: Empty State */
//             <Box sx={{ textAlign: "center", py: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 startIcon={<AddIcon />}
//                 onClick={() => setShowForm(true)}
//                 sx={{ borderRadius: "12px", py: 1.5, mb: 6, borderStyle: "solid", textTransform: "none" }}
//               >
//                 Add New Milestone
//               </Button>
//               <Avatar sx={{ bgcolor: "#EEF2FF", width: 60, height: 60, mb: 2 }}>
//                 <DescriptionIcon sx={{ color: "#4F46E5" }} />
//               </Avatar>
//               <Typography sx={{ color: "#64748B", fontSize: "0.9rem" }}>
//                 No milestones added yet. Create your first milestone to get started.
//               </Typography>
//             </Box>
//           ) : showForm ? (
//             /* IMAGE 2: Add Milestone Form */
//             <Box sx={{ backgroundColor: "#F8FAFC", borderRadius: 4, p: 3 }}>
//               <Typography sx={{ fontWeight: 700, mb: 3, color: "#1E293B" }}>Add New Milestone</Typography>
//               <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
//                 <FormInput label="Milestone Title" placeholder="e.g., UI/UX Design Phase" required />
//                 <FormInput label="Description" placeholder="Brief description of this milestone" multiline rows={3} required />
//                 <FormInput label="Deliverables" placeholder="List the specific deliverables for this milestone" multiline rows={3} required />
//                 <Box>
//                   <FormInput label="Payment Amount ($)" placeholder="0.00" required />
//                   <Typography sx={{ fontSize: "0.75rem", color: "#94A3B8", mt: 0.5 }}>
//                     Remaining to allocate: ${remaining.toFixed(2)}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", gap: 2 }}>
//                   <FormInput label="Start Date" type="date" sx={{ flex: 1 }} required />
//                   <FormInput label="End Date" type="date" sx={{ flex: 1 }} required />
//                 </Box>
//                 <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//                   <Button fullWidth variant="outlined" onClick={() => setShowForm(false)} sx={{ borderRadius: "25px", textTransform: "none" }}>
//                     Cancel
//                   </Button>
//                   <Button 
//                     fullWidth 
//                     variant="contained" 
//                     sx={{ borderRadius: "25px", textTransform: "none", bgcolor: "#4F46E5" }}
//                     onClick={() => {
//                         // Mock adding a milestone to switch to Image 3
//                         setMilestones([{ title: 'Phase 1 - User stories and UI/UX Design', amount: 5000 }]);
//                         setShowForm(false);
//                     }}
//                   >
//                     Add Milestone
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//           ) : (
//             /* IMAGE 3: Milestone List */
//             <Box>
//               {remaining > 0 && (
//                 <Box sx={{ backgroundColor: "#FFFBEB", border: "1px solid #FEF3C7", borderRadius: 3, p: 2, display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
//                   <WarningAmberIcon sx={{ color: "#F59E0B" }} />
//                   <Box>
//                     <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#92400E" }}>
//                       You need to allocate the remaining ${remaining.toFixed(2)} to milestones
//                     </Typography>
//                     <Typography sx={{ fontSize: "0.75rem", color: "#B45309" }}>
//                       The sum of all milestone payments must equal the bid amount
//                     </Typography>
//                   </Box>
//                 </Box>
//               )}

//               <Typography sx={{ fontWeight: 700, mb: 2 }}>Proposed Milestones ({milestones.length})</Typography>
              
//               {/* Milestone Card */}
//               <Box sx={{ backgroundColor: "#F8FAFC", borderRadius: 4, p: 3, position: "relative", mb: 3 }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <Avatar sx={{ bgcolor: "#4F46E5", width: 28, height: 28, fontSize: "0.8rem" }}>1</Avatar>
//                     <Box>
//                       <Typography sx={{ fontWeight: 600, color: "#1E293B" }}>Phase 1 - User stories and UI/UX Design</Typography>
//                       <Typography sx={{ fontSize: "0.8rem", color: "#64748B", mt: 0.5 }}>In this phase, we will focus on basics of the app</Typography>
                      
//                       <Typography sx={{ fontSize: "0.8rem", color: "#4F46E5", fontWeight: 600, mt: 1.5 }}>Deliverables:</Typography>
//                       <Typography sx={{ fontSize: "0.8rem", color: "#64748B" }}>Userstories, Wireframes, Prototype (Figma)</Typography>
                      
//                       <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
//                          <InfoItem icon={<AttachMoneyIcon sx={{ fontSize: 16 }} />} label="Payment" value="$5000.00" />
//                          <InfoItem icon={<CalendarMonthIcon sx={{ fontSize: 16 }} />} label="Start Date" value="1/15/2026" />
//                          <InfoItem icon={<CalendarMonthIcon sx={{ fontSize: 16 }} />} label="End Date" value="1/30/2026" />
//                       </Box>
//                     </Box>
//                   </Box>
//                   <Box sx={{ display: "flex", gap: 1 }}>
//                     <EditIcon sx={{ color: "#4F46E5", cursor: "pointer", fontSize: 20 }} />
//                     <DeleteOutlineIcon sx={{ color: "#EF4444", cursor: "pointer", fontSize: 20 }} />
//                   </Box>
//                 </Box>
//               </Box>

//               <Button
//                 fullWidth
//                 variant="outlined"
//                 startIcon={<AddIcon />}
//                 onClick={() => setShowForm(true)}
//                 sx={{ borderRadius: "12px", py: 1, mb: 4, textTransform: "none" }}
//               >
//                 Add Another Milestone
//               </Button>

//               <Button
//                 fullWidth
//                 variant="contained"
//                 disabled={remaining > 0}
//                 startIcon={<SendIcon />}
//                 sx={{ borderRadius: "25px", py: 1.5, bgcolor: "#4F46E5", textTransform: "none", opacity: remaining > 0 ? 0.5 : 1 }}
//               >
//                 Submit Proposal to Buyer
//               </Button>
//               <Typography sx={{ textAlign: "center", color: "#EF4444", fontSize: "0.75rem", mt: 2 }}>
//                 Please ensure total milestone payments equal the bid amount before submitting
//               </Typography>
//             </Box>
//           )}
//         </Container>
//       </Box>
//     </DashBoardLayout>
//   );
// }

// // Helper Components
// function StatCard({ icon, label, value, bgColor, iconColor }: any) {
//   return (
//     <Box sx={{ flex: 1, backgroundColor: bgColor, borderRadius: 3, p: 2, display: "flex", alignItems: "center", gap: 2 }}>
//       <Avatar sx={{ bgcolor: "white", color: iconColor, width: 40, height: 40, boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
//         {icon}
//       </Avatar>
//       <Box>
//         <Typography sx={{ fontSize: "0.75rem", color: "#64748B" }}>{label}</Typography>
//         <Typography sx={{ fontWeight: 700, color: "#1E293B" }}>{value}</Typography>
//       </Box>
//     </Box>
//   );
// }

// function FormInput({ label, ...props }: any) {
//   return (
//     <Box sx={{ width: "100%" }}>
//       <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, mb: 1, color: "#334155" }}>
//         {label} {props.required && <span style={{ color: "red" }}>*</span>}
//       </Typography>
//       <TextField
//         fullWidth
//         variant="outlined"
//         size="small"
//         {...props}
//         sx={{
//           "& .MuiOutlinedInput-root": {
//             backgroundColor: "white",
//             borderRadius: "8px",
//             "& fieldset": { borderColor: "#E2E8F0" },
//           },
//         }}
//       />
//     </Box>
//   );
// }

// function InfoItem({ icon, label, value }: any) {
//     return (
//         <Box>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
//                 <Box sx={{ color: "#4F46E5", display: "flex" }}>{icon}</Box>
//                 <Typography sx={{ fontSize: "0.7rem", color: "#94A3B8" }}>{label}</Typography>
//             </Box>
//             <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#1E293B", ml: 2.5 }}>{value}</Typography>
//         </Box>
//     )
// }





"use client";

import {
  Box,
  Button,
  Container,
  Typography,
  Avatar,
  TextField,
} from "@mui/material";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SendIcon from "@mui/icons-material/Send";
import apiClient from "@/api/apiClient";
import DashBoardLayout from "@/app/layouts/DashboardLayout";
import theme from "@/app/theme/theme";

export default function MilestoneProposalPage({
  params,
}: {
  params: Promise<{ projectId: number }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();

  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [remaining, setRemaining] = useState<number>(0);
  const [totalAllocation,setTotalAllocation] = useState(0);
  const [projectTitle,setProjectTitle] = useState();
  const [projectBudget,setProjectBudget] = useState();
  // form state
  const [form, setForm] = useState<any>({
    Title: "",
    Description: "",
    Deliverables: "",
    PaymentAmount: "",
    startDate: "",
    endDate: "",
  });

  

const fetchMilestones = async () => {
  try {
    setLoading(true);

    // 1️⃣ fetch all milestones for display
    const result = await apiClient.get(`/milestone/${projectId}`);
    if (result.data.Success) {
      setMilestones(result.data.Data || []);
    } else {
      setMilestones([]);
    }

    // 2️⃣ fetch latest milestone to determine remaining allocation
    const latest = await apiClient.get(`/milestone/latestmilestone/${projectId}`);
    if (latest.data.Success && latest.data.Data) {
      console.log("latest project data",latest.data.Data)
      setRemaining(latest.data.Data.remainingAmount);
      setTotalAllocation((latest.data.Data.projectBudget)-(latest.data.Data.remainingAmount))
      setProjectTitle(latest.data.Data.projectTitle);
      setProjectBudget(latest.data.Data.projectBudget);
    } else {
      // no milestones yet → full project budget is remaining
      setRemaining(latest.data.Data.budget); // use your project's total bid amount here
    }
  } catch (err) {
    console.error(err);
    // fallback in case of API errors
    setMilestones([]);
    setRemaining(0);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchMilestones();
  }, [projectId]);
  // const totalBidAmount = 15000;

  // const totalAllocated = milestones.reduce(
  //   (sum, m) => sum + Number(m.paymentAmount || 0),
  //   0
  // );

  // const remaining = totalBidAmount - totalAllocated;

  const handleCreateMilestone = async () => {
    await apiClient.post("/milestone", {
      ...form,
      PaymentAmount: Number(form.PaymentAmount),
      projectId,
    });

    setForm({
      Title: "",
      Description: "",
      Deliverables: "",
      PaymentAmount: "",
      startDate: "",
      endDate: "",
    });

    setShowForm(false);
    fetchMilestones();
  };

  if (loading) return null;

  return (
    <DashBoardLayout>
             <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: theme.palette.background.default,
          mt: { xs: 6, sm: 4, md: 3 },
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {/* Back Button */}
        <Box sx={{ display: "flex", width: { xs: "95%", sm: "90%", md: "1152px" }, mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/dashboard/seller/managebids")}
            sx={{ textTransform: "none", fontWeight: 600, color: "#5A607F" }}
          >
            Back
          </Button>
        </Box>

        <Container
          maxWidth={false}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            width: { xs: "95%", sm: "90%", md: "1152px" },
            p: { xs: 3, sm: 4, md: 5 },
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
          }}
        >
          {/* Header */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4, textAlign: "center" }}>
            <Avatar sx={{ bgcolor: "#4F46E5", width: 50, height: 50, mb: 2 }}>
              <DescriptionIcon />
            </Avatar>
            <Typography variant="subtitle2" sx={{ color: "#4F46E5", fontWeight: 600 }}>
              Milestone Proposal
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, textTransform: "uppercase" }}>
              Propose Project Milestones
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B" }}>
              Break down the project into milestones and send for buyer approval
            </Typography>
          </Box>
                     {/* Project Summary Strip */}
           <Box
            sx={{
              backgroundColor: "#F8FAFC",
              borderRadius: 3,
              p: 2.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "0.75rem", color: "#94A3B8" }}>Project</Typography>
              <Typography sx={{ fontWeight: 600, color: "#1E293B" }}>{projectTitle}</Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ fontSize: "0.75rem", color: "#94A3B8" }}>Total Budget Amount</Typography>
              <Typography sx={{ fontWeight: 700, color: "#1E293B", fontSize: "1.2rem" }}>
                ${(projectBudget??0).toFixed(2)}
              </Typography>
            </Box>
          </Box>

          {/* Stats */}
          <Box display="flex" gap={2} mb={4}>

<StatCard
  icon={<AttachMoneyIcon />}
  label="Total Allocation"
  value={`$${totalAllocation.toFixed(2)}`}
  bgColor="#EEF2FF"
  iconColor="#4F46E5"
/>
<StatCard
  icon={<CheckCircleIcon />}
  label="Remaining Allocation"
  value={`$${remaining.toFixed(2)}`}
  bgColor="#ECFDF5"
  iconColor="#10B981"
/>
<StatCard
  icon={<AssignmentIcon />}
  label="Milestones"
  value={milestones.length.toString()}
  bgColor="#FFFBEB"
  iconColor="#F59E0B"
/>

          </Box>

          {/* EMPTY STATE */}
          {!showForm && milestones.length === 0 && (
            <Box textAlign="center" py={6}>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setShowForm(true)}
              >
                Add New Milestone
              </Button>
              <Typography color="text.secondary" mt={2}>
                No milestones created yet
              </Typography>
            </Box>
          )}

          {/* ADD FORM */}
          {showForm && (
            <Box sx={{ background: "#F8FAFC", p: 3, borderRadius: 3 }}>
              <Typography fontWeight={700} mb={2}>
                Add Milestone
              </Typography>

              <FormInput
                label="Title"
                value={form.Title}
                onChange={(e: any) =>
                  setForm({ ...form, Title: e.target.value })
                }
              />

              <FormInput
                label="Description"
                multiline
                value={form.Description}
                onChange={(e: any) =>
                  setForm({ ...form, Description: e.target.value })
                }
              />

              <FormInput
                label="Deliverables"
                multiline
                value={form.Deliverables}
                onChange={(e: any) =>
                  setForm({ ...form, Deliverables: e.target.value })
                }
              />

              <FormInput
                label="Payment Amount"
                type="number"
                value={form.PaymentAmount}
                onChange={(e: any) =>
                  setForm({ ...form, PaymentAmount: e.target.value })
                }
              />

              <Box display="flex" gap={2}>
                <FormInput
                  label="Start Date"
                  type="date"
                  value={form.startDate}
                  onChange={(e: any) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                />
                <FormInput
                  label="End Date"
                  type="date"
                  value={form.endDate}
                  onChange={(e: any) =>
                    setForm({ ...form, endDate: e.target.value })
                  }
                />
              </Box>

              <Box display="flex" gap={2} mt={2}>
                <Button fullWidth onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={Number(form.PaymentAmount) > remaining}
                  onClick={handleCreateMilestone}
                >
                  Save Milestone
                </Button>
              </Box>
            </Box>
          )}

          {/* LIST */}
          {!showForm && milestones.length > 0 && (
            <>
              {remaining > 0 && (
                <Box
                  sx={{
                    background: "#FFFBEB",
                    border: "1px solid #FDE68A",
                    p: 2,
                    borderRadius: 2,
                    mb: 3,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <WarningAmberIcon color="warning" />
                  <Typography fontSize="0.85rem">
                    Allocate remaining ${remaining}
                  </Typography>
                </Box>
              )}

              {milestones.map((m, i) => (
                <Box
                  key={m.id}
                  sx={{ background: "#F8FAFC", p: 3, borderRadius: 3, mb: 3 }}
                >
                  <Typography fontWeight={700}>
                    {i + 1}. {m.title}
                  </Typography>

                  <Typography fontSize="0.85rem" color="text.secondary">
                    {m.description}
                  </Typography>

                  <Typography mt={1} fontWeight={600}>
                    Deliverables
                  </Typography>
                  <Typography fontSize="0.85rem">
                    {m.deliverables}
                  </Typography>

                  <Box display="flex" gap={4} mt={2}>
                    <InfoItem
                      icon={<AttachMoneyIcon />}
                      label="Payment"
                      value={`$${m.paymentAmount}`}
                    />
                    <InfoItem
                      icon={<CalendarMonthIcon />}
                      label="Start"
                      value={new Date(m.startDate).toLocaleDateString()}
                    />
                    <InfoItem
                      icon={<CalendarMonthIcon />}
                      label="End"
                      value={new Date(m.endDate).toLocaleDateString()}
                    />
                  </Box>
                </Box>
              ))}

              <Button
                startIcon={<AddIcon />}
                onClick={() => setShowForm(true)}
              >
                Add Another Milestone
              </Button>

              {/* <Button
                fullWidth
                variant="contained"
                startIcon={<SendIcon />}
                disabled={remaining > 0}
                sx={{ mt: 3 }}
              >
                Submit Proposal
              </Button> */}
            </>
          )}
        </Container>
      </Box>
    </DashBoardLayout>
  );
}

/* ------------------ HELPERS ------------------ */

function StatCard({ icon, label, value, bgColor = "#F1F5F9", iconColor = "#4F46E5" }: any) {
  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: bgColor,
        p: 2,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar
        sx={{
          bgcolor: "white",
          color: iconColor,
          width: 40,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </Avatar>
      <Box>
        <Typography sx={{ fontSize: "0.75rem", color: "#64748B" }}>{label}</Typography>
        <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
      </Box>
    </Box>
  );
}


function FormInput({ label, ...props }: any) {
  return (
    <Box mb={2}>
      <Typography fontSize="0.8rem" fontWeight={600}>
        {label}
      </Typography>
      <TextField fullWidth size="small" {...props} />
    </Box>
  );
}

function InfoItem({ icon, label, value }: any) {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={0.5}>
        {icon}
        <Typography fontSize="0.7rem">{label}</Typography>
      </Box>
      <Typography fontWeight={600}>{value}</Typography>
    </Box>
  );
}
