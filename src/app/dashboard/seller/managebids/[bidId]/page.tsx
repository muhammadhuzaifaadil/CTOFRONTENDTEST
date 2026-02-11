"use client";

import apiClient from "@/api/apiClient";
import BidForm, { Bid } from "@/app/components/BidForm";
import DashBoardLayout from "@/app/layouts/DashboardLayout";
import { Box, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "@/hooks/useAuth";
import { LanguageContext } from "@/app/contexts/LanguageContext";



export interface TemplateQuestion {
  questionText: string;
  questionValue: string;
}

export interface ProjectInfo {
  id: number;
  title: string;
  budgetRange: string;
  buyerName: string;
  buyerEmail: string;
  attachment: string | null;
  outline: string;
  PostLaunchSupport: string;
  PreferredTechStack: string;
  requirements: string;
  TargetUser: string;
  ThirdPartyIntegrations?: string;
  timeline: string;
  UIUXRequirement?: string;
  templateQuestions?: string[];
}

export interface BidData {
  id: number;
  projectTitle: string;
  buyerName: string;
  buyerEmail: string;
  projectBudget: string;
  sellerName: string;
  proposalText: string;
  bidAmount: string | number; 
  timeline: string;
  sellerEmail: string;
  attachment: string | null;
  status: string;
  createdAt: string;
  projectInfo: ProjectInfo;
}
export default function EditBidPage({ params }: { params: Promise<{ bidId: string }> }) {
    const {bidId}= use(params)
    console.log("params",params)
      const router = useRouter()
      const [loading, setLoading] = useState(false);
      const [bidData,setBidData] = useState< BidData | null>(null);
      const [timelineNumber,setTimeLineNumber] = useState("");
      const [timelineUnit,setTimeLineUnit] = useState("");
      const { accessToken } = useAuth();
  
    const fetchBid = async ()=>{
        try {
            setLoading(true)
        const res = await apiClient.get(`/bids/${bidId}`)
        console.log("response:",res.data.Data);
        setBidData(res?.data?.Data);
        
        } catch (error) {
            console.log(error)
        }
       finally{
        setLoading(false)
       }
    }
    useEffect(()=>{
        fetchBid();
        
    },[])

    useEffect(()=>{
        const val = parseTimeline(bidData?.timeline)
        setTimeLineNumber(val?.number);
        setTimeLineUnit(val?.unit);
        console.log("timeline number is",val);
    },[bidData])
    const handleSubmit = (updated: Bid) => {
        console.log("UPDATED BID:", updated);
        // update backend...
    };
    const handleCancel = (updated: Bid) => {
        console.log("UPDATED BID:", updated);
        // update backend...
    };
    const {isArabic} = useContext(LanguageContext)
    const parseTimeline = (timeline?: string) => {
  if (!timeline) return { number: "", unit: "" };

  const parts = timeline.split(" "); // ["3", "Weeks"]
  return {
    number: parts[0],
    unit: parts[1],
  };
};
if(loading)
{
    return (
        <DashBoardLayout>
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
      onClick={() => router.push("/dashboard/seller/managebids")}
      sx={{
        textTransform: "none",
        fontSize: { xs: "14px", sm: "16px" },
        fontWeight: 600,
        color: "black",
        flexDirection: isArabic ? "row-reverse" : "row", // 👈 ensures icon on right, text on left in Arabic
        gap: 1,
        ml:8
      }}
    >
       {/* {t("BackDashboard")} */}
       Back to Manage Bids
    </Button>
  </Box>
            <CircularProgress sx={{display:"flex", justifyContent:"center"}}/>
        </Box>
        </DashBoardLayout>
    )
}

    return (
    <DashBoardLayout>
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
      onClick={() => router.push("/dashboard/seller/managebids")}
      sx={{
        textTransform: "none",
        fontSize: { xs: "14px", sm: "16px" },
        fontWeight: 600,
        color: "black",
        flexDirection: isArabic ? "row-reverse" : "row", // 👈 ensures icon on right, text on left in Arabic
        gap: 1,
        ml:8
      }}
    >
       {/* {t("BackDashboard")} */}
       Back to Manage Bids
    </Button>
  </Box>
        <BidForm
            mode="edit"
          bidId = {Number(bidId)}
          projectId={Number(bidData?.projectInfo?.id)}
          projectName={bidData?.projectInfo?.title}
          clientBudgetRange={bidData?.projectInfo?.budgetRange}
          requiredTimeline={bidData?.projectInfo?.timeline}
          outline={bidData?.projectInfo?.outline}
          requirements={bidData?.projectInfo?.requirements}
          TargetUser={bidData?.projectInfo?.TargetUser}
          PostLaunchSupport={bidData?.projectInfo?.PostLaunchSupport}
          PreferredTechStack={bidData?.projectInfo?.PreferredTechStack}
          ThirdPartyIntegrations={bidData?.projectInfo?.ThirdPartyIntegrations}
          UIUXRequirement={bidData?.projectInfo?.UIUXRequirement}
          buyerName={bidData?.projectInfo?.buyerName}
          buyerEmail={bidData?.projectInfo?.buyerEmail}
          templateQuestions={bidData?.projectInfo?.templateQuestions}
          ExistingBidAmount={bidData?.bidAmount}
          ExistingProposal={bidData?.proposalText}
          ExistingTimelineNumber={timelineNumber}
          ExistingTimelineUnit= {timelineUnit}
          ExistingAttachment={bidData?.attachment}
        />
    </Box>
    </DashBoardLayout>
)
}