"use client"
import DashBoardLayout from "@/app/layouts/DashboardLayout"
import theme from "@/app/theme/theme"
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { use, useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { useRouter } from "next/navigation";

const viewbidbyID:React.FC<{params:any }> = ({ params }: { params: Promise<{ id:string,BidId: string }> })=>{
   // return(
    //     <DashBoardLayout>
    //   <Box
    //     sx={{
    //       minHeight: "100vh",
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       justifyContent: "flex-start",
    //       background: "white",
    //       mt: { xs: 6, sm: 4, md: 3 },
    //       py: { xs: 2, sm: 4, md: 6 },
    //     }}
    //   >
    //     {/* Back Button */}
    //     <Box
    //       sx={{
    //         display: "flex",
    //         width: { xs: "95%", sm: "90%", md: "75%" },
    //         // justifyContent: isArabic ? "flex-end" : "flex-start",
    //         mb: 2,
    //       }}
    //     >
    //       <Button
    //         startIcon={
    //           <ArrowBackIcon
    //             sx={{
    //             //   transform: isArabic ? "scaleX(-1)" : "none",
    //               transition: "transform 0.2s ease",
    //             }}
    //           />
    //         }
    //         // onClick={handleBack}
    //         sx={{
    //           textTransform: "none",
    //           fontSize: { xs: "14px", sm: "16px" },
    //           fontWeight: "600",
    //           display: "flex",
    //         //   flexDirection: isArabic ? "row-reverse" : "row",
    //         //   gap: isArabic ? "4px" : 0,
    //           color: "black",
    //         }}
    //       >
    //         {/* {t("BackDashboard")} */}
    //         back to view all bids
    //       </Button>
    //     </Box>

    //     {/* Main Container */}
    //     <Container
    //       maxWidth={false}
    //       sx={{
    //         backgroundColor: theme.palette.background.default,
    //         borderRadius: 3,
    //         width: { xs: "95%", sm: "90%", md: "1152px" },
    //         height: "100%",
    //         p: { xs: 2, sm: 4, md: 5 },
    //         boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //         </Container>
    //         </Box>
    //         </DashBoardLayout>

    
//    )
const router = useRouter();
const { BidId: bidId,id:projectId } = use(params);  
console.log(params)
const [bidDetails,setBidDetails] = useState<any>([]);
const [loading,setLoading] = useState(true)
const getBidById= async()=>{
    try {
        let response  = await apiClient.get(`/bids/${bidId}`);
        console.log(response);
        console.log("bidId:",bidId)
        setBidDetails(response?.data.Data);
    } catch (error) {
        console.log(error)
    }
    finally{
      setLoading(false)
    }
}
useEffect(()=>{
    getBidById()
},[])

  // Static data – replace this with API data later
  const bid = {
    status: bidDetails?.status?.toLowerCase()||"pending", // "pending" | "accepted" | "rejected"
    statusLabel: "Pending Review",
    submittedAt: new Date(bidDetails?.createdAt).toLocaleString()||"October 2, 2025 at 05:00 AM",
    sellerName: bidDetails?.sellerEmail||"Mohammed Alharbi",
    company: bidDetails?.sellerName||"Digital Pro Solutions",
    proposedBudget: bidDetails?.projectBudget||"$14,500",
    proposedTimeline: bidDetails?.timeline||"7 Weeks",
    proposalText: bidDetails?.proposalText||`Dear Sarah,

I am excited to submit my proposal for your E‑commerce website development project. With over 6 years of experience in building scalable e‑commerce platforms, I am confident I can deliver exactly what you need.

My approach:
- Frontend: ReactJS with Next.js for optimal performance and SEO
- Backend: Node.js with Express and MongoDB for scalability
- Payment: Stripe and PayPal integration with PCI compliance
- UX: Mobile-first design, conversion‑optimized UI

I have successfully delivered 15+ e‑commerce platforms, including one for a major electronics retailer in KSA that processes 10,000+ orders monthly. I can share live sites during our call.

My proposed timeline of 7 weeks includes:
Week 1–2: Architecture setup, database design, and initial UI mockups
Week 3–4: Core functionality (product catalog, cart, user auth)
Week 5–6: Payment integration, admin dashboard, testing
Week 7: Bug fixing, refinements, and documentation

I’m available to start immediately and can provide weekly progress updates.

Looking forward to discussing this project with you!

Best regards,
Mohammed Alharbi
Digital Pro Solutions`,
  };

  const statusColorMap: Record<string, string> = {
    pending: "#FFA726",
    accepted: "#4CAF50",
    rejected: "#EF5350",
  };

  const statusColor = statusColorMap[bid.status] || "#9E9E9E";
if(loading){
   return(
      <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7FB",
        py: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >

      <Container
        maxWidth="md"
        sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
           {/* Back to Bids */}
        <Button
          startIcon={<ArrowBackIosNewIcon fontSize="small" />}
          sx={{
            alignSelf: "flex-start",
            textTransform: "none",
            fontSize: 14,
            color: "#4F46E5",
            mb: 2,
          }}
          onClick={() => {
            router.push(`/dashboard/buyer/manageproject/${projectId}/viewallbids`)
          }}
        >
          Back to View All Bids
        </Button>
         {/* Card */}
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            p: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
 <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                    <CircularProgress />
                  </Box>
        </Box>

       
      </Container>


    </Box>
    ) 
}
return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7FB",
        py: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="md"
        sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        {/* Back to Bids */}
        <Button
          startIcon={<ArrowBackIosNewIcon fontSize="small" />}
          sx={{
            alignSelf: "flex-start",
            textTransform: "none",
            fontSize: 14,
            color: "#4F46E5",
            mb: 2,
          }}
          onClick={() => {
            router.push(`/dashboard/buyer/manageproject/${projectId}/viewallbids`)
          }}
        >
          Back to View All Bids
        </Button>

        {/* Card */}
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            p: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Bid Details */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Bid Details
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 0.75,
                  borderRadius: 999,
                  bgcolor: statusColor,
                  color: "#FFFFFF",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {bid.statusLabel}
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: 13 }}
              >
                Submitted on {bid.submittedAt}
              </Typography>
            </Box>
          </Box>

          {/* Seller Information */}
          <Box
            sx={{
              pt: 2,
              borderTop: "3px solid #E5E7FF",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Seller Information
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              {/* Seller Name card */}
              <Box
                sx={{
                  flex: 1,
                  bgcolor: "#F7F8FF",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: "#4F46E5",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    S
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontSize: 13 }}
                  >
                    Seller Email
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, fontSize: 14 }}
                >
                  {bid.sellerName}
                </Typography>
              </Box>

              {/* Company card */}
              <Box
                sx={{
                  flex: 1,
                  bgcolor: "#F7F8FF",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: "#4F46E5",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    C
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontSize: 13 }}
                  >
                    Company
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, fontSize: 14 }}
                >
                  {bid.company}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Proposal Details */}
          <Box
            sx={{
              pt: 2,
              borderTop: "3px solid #E5E7FF",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Proposal Details
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              {/* Budget */}
              <Box
                sx={{
                  flex: 1,
                  bgcolor: "#4F46E5",
                  borderRadius: 2,
                  p: 2.5,
                  color: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.75,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: 13, opacity: 0.9 }}
                >
                  Proposed Budget
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1.1rem", fontWeight: 600 }}
                >
                  {bid.proposedBudget}
                </Typography>
              </Box>

              {/* Timeline */}
              <Box
                sx={{
                  flex: 1,
                  bgcolor: "#4F46E5",
                  borderRadius: 2,
                  p: 2.5,
                  color: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.75,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: 13, opacity: 0.9 }}
                >
                  Proposed Timeline
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1.1rem", fontWeight: 600 }}
                >
                  {bid.proposedTimeline}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Cover Letter */}
          <Box
            sx={{
              pt: 2,
              borderTop: "3px solid #E5E7FF",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Cover Letter
            </Typography>

            <Box
              sx={{
                bgcolor: "#F7F8FF",
                borderRadius: 2,
                p: 2.5,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, fontSize: 13 }}
              >
                Seller&apos;s Proposal
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: 13,
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                }}
              >
                {bid.proposalText}
              </Typography>
            </Box>
          </Box>

          {/* Bottom button */}
          {/* <Box sx={{ pt: 1, display: "flex", justifyContent: "center" }}>
            <Button
              variant="text"
              sx={{
                px: 4,
                py: 1,
                borderRadius: 999,
                bgcolor: "#F3F4FF",
                textTransform: "none",
                fontWeight: 500,
                fontSize: 14,
                "&:hover": {
                  bgcolor: "#E0E3FF",
                },
              }}
              onClick={() => {
                // TODO: navigate back
              }}
            >
              Back to All Bids
            </Button>
          </Box> */}
        </Box>
      </Container>
    </Box>
  );
}
export default viewbidbyID;