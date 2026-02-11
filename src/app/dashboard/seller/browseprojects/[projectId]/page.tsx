"use client";
import BidForm, { type Bid } from "@/app/components/BidForm";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import DashBoardLayout from "@/app/layouts/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";
import axios from "axios";
import {useRouter} from "next/navigation";
import { use, useContext, useEffect, useState } from "react";

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
  TargetUser?:string;
  PostLaunchSupport?:string;
  PreferredTechStack?:string;
  ThirdPartyIntegrations?:string;
  UIUXRequirement?:string;
  templateQuestions?:string[];

  status: string;
  buyerInfo: BuyerInfo;
}

export default function AddBidPage({ params }: { params: Promise<{ projectId: string }> }) {
    const {projectId}= use(params)
    const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProjectData | null>(null);
    const { accessToken } = useAuth();
     const fetchProjectData = async () => {
        try {
          setLoading(true);
          const token = accessToken;
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('result in projectid',res.data.Data);
          setData(res.data.Data);
        } catch (error) {
          console.error("Error fetching project:", error);
        } finally {
          setLoading(false);
        }
      };
    const handleSubmit = (data: Bid) => {
        console.log("NEW BID:", data);
        // save to backend...
    };
    useEffect(() => {
        if (projectId) fetchProjectData();
      }, []);
    console.log("Projectid on this page:",projectId);
    const {isArabic} = useContext(LanguageContext)
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
      onClick={() => router.push("/dashboard/seller/browseprojects")}
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
       Back to Browse
    </Button>
  </Box>
             <BidForm
          mode="add"
          projectId={Number(projectId)}
          projectName={data?.title}
          clientBudgetRange={data?.budgetRange}
          requiredTimeline={data?.timeline}
          outline={data?.outline}
          requirements={data?.requirements}
          TargetUser={data?.TargetUser}
          PostLaunchSupport={data?.PostLaunchSupport}
          PreferredTechStack={data?.PreferredTechStack}
          ThirdPartyIntegrations={data?.ThirdPartyIntegrations}
          UIUXRequirement={data?.UIUXRequirement}
          buyerName={data?.buyerInfo.name}
          buyerEmail={data?.buyerInfo.email}
          templateQuestions={data?.templateQuestions}
        //   attachment={data?.attachment}
        />
        </Box>
        </DashBoardLayout>
    )
}