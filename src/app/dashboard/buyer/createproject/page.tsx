
"use client"
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Divider,
  useTheme,
  Container,
} from "@mui/material";
import Navbar from "../../../components/NavBar";
import { useAuth } from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import DashBoardLayout from "@/app/layouts/DashboardLayout";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescriptionIcon from '@mui/icons-material/Description';
import CustomTextField from "@/app/components/CustomTextField";
import BudgetSelect from "@/app/components/BudgetSelect";
import DurationSelect from "@/app/components/DaysSelect";
import InputFileUpload from "@/app/components/InputFileUpload";
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import apiClient from "@/api/apiClient";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { useTranslations } from "next-intl";

const skills = [
  "Coding",
  "IT",
  "SQA",
  "Database",
  "AI",
  "ERP",
  "Mobile Apps",
  "Content Writing",
  "UI",
  "Web Experts",
];
const CreateProject: React.FC = () => {
const theme = useTheme();
const router = useRouter();
const { user, isAuthenticated } = useAuth();
const [selectedCategory, setSelectedCategory] = useState("");
const [selectedDuration, setSelectedDuration] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

// api states

const [title, setTitle] = useState("");
const [outline, setOutline] = useState("");
const [requirements, setRequirements] = useState("");
const [budgetRange, setBudgetRange] = useState("");
const [timeline, setTimeline] = useState("");
const [timelineNumber,setTimelineNumber] = useState("");
const [timelineString,setTimeLineString] = useState("");
const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
 const { isArabic, locale } = useContext(LanguageContext);
  const t = useTranslations("CreateProject");
  const validateFile = (file: File, allowed: string[], maxMB: number) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !allowed.includes(ext)) {
      alert("Invalid file format. Allowed: " + allowed.join(", ").toUpperCase());
      return false;
    }
    if (file.size > maxMB * 1024 * 1024) {
      alert(`File size exceeds maximum limit of ${maxMB}MB.`);
      return false;
    }
    return true;
  };
const handleUpload = (file: File | null) => {
  if (file && validateFile(file, ["jpg", "jpeg", "png"], 2)) {
    setProfilePhoto(file);
  } else {
    setProfilePhoto(null);
  }
};
useEffect(()=>{
setTimeline(`${timelineNumber} ${timelineString}`);
},[timelineString,timelineString]);

const handleSubmit = async (status: "Draft" | "Published") => {
  if (!user) return alert("You must be logged in");
  
  try {
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("outline", outline);
    formData.append("requirements", requirements);
    formData.append("budgetRange", budgetRange);
    formData.append("timeline", timeline);
    formData.append("status", status);

    // ✅ stringify the skills array properly
    formData.append("skillsRequired", JSON.stringify(skillsRequired));

    if (profilePhoto) formData.append("attachment", profilePhoto);

    const res = await apiClient.post(`/projects`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("✅ Project created successfully!");
    router.push("/dashboard/buyer");
  } catch (err: any) {
    console.error(err);
    alert("❌ Failed to create project: " + (err.response?.data?.message || err.message));
  }
};

return (
<DashBoardLayout>
<Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
         background:"white",
         mt:2,
        py: { xs: 2, sm: 4, md: 6 },
      }}
    >

 {/* Back Button */}
      <Box sx={{ display: "flex", width: "60%", color:"black", justifyContent: "flex-start" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={()=>router.push("/dashboard/buyer")}
          sx={{
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "600",
            color:"black"
            
          }}
        >
          {t("BackButton")}
        </Button>
      </Box>

       {/* Form Container */}
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: 3,
          width: "70%",
          p: { xs: 3, sm: 4, md: 6 },
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <DescriptionIcon
            sx={{
              height: 60,
              width: 60,
              backgroundColor: theme.palette.primary.main,
              color: "white",
              borderRadius: "60%",
              border: `2px solid ${theme.palette.primary.main}`,
              padding: "12px",
            }}
          />
          <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }} >
            {t("Header1")}
          </Typography>
            <Typography variant="subtitle1">{t("Header2")}</Typography>
              <Typography variant="body1" sx={{ color: "#6c757d", textAlign: "center" }}>
                {t("Content")}
              </Typography>
          
        </Box>

        {/* Form Fields */}
        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          
          {/* title */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

            <CustomTextField 
            label={`${t("TitleFieldLabel")}`}
  placeholder={`${t("TitleFieldPlaceholder")}`}
  fullWidth
  required
  maxChar={150}
  multiline
  rows={1}
  value={title}
  isArabic={isArabic}
  onChange={(e) => setTitle(e.target.value)}
   />
          </Box>
          {/* outline */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

            <CustomTextField 
            label={`${t("OutlineLabel")}`}
  placeholder={`${t("OutlinePlaceholder")}`}
  fullWidth
  required
  multiline
  rows={4}
  maxChar={700}
  value={outline}
  isArabic={isArabic}
  onChange={(e) => setOutline(e.target.value)}
   />
          </Box>

          {/* requirements */}
             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

            <CustomTextField 
            label={`${t("RequirementsLabel")}`}
  placeholder={`${t("RequirementsPlaceholder")}`}
  fullWidth
  multiline
  rows={5}
  maxChar={1000}
  value={requirements}
  isArabic={isArabic}
  onChange={(e) => setRequirements(e.target.value)}
   />
          </Box>
          {/* Budget range */}
<Box>
            <BudgetSelect label={`${t("BudgetLabel")}`} value={budgetRange} onChange={setBudgetRange} isArabic/>
     </Box>

     {/* Skills Required */}
<Box sx={{display:"flex",flexDirection:"column"}}>
  <Typography sx={{fontWeight:"bold"}} display={"flex"} justifyContent={`${isArabic?"flex-end":"flex-start"}`}>
    {t("SkillsRequired")}
  </Typography>
     <Box sx={{display:'flex',flexDirection:'row',width:"100%", backgroundColor:"lightgrey",justifyContent:"space-between", borderRadius:1, gap:1, height:"160px"}}>
          
          {/* Use flex-wrap to wrap buttons, and whiteSpace to keep text in one line */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, width: '100%' }}>
            {/* {skills.map((skill) => (
              <Button
                key={skill}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  mt: 2,
                  ml:0.5,
                  backgroundColor: 'white',
                  height: '50px',
                  color: theme.palette.primary.main,
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  px: 2,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                {skill}
              </Button>
            ))} */}

            {skills.map((skill) => {
  const isSelected = skillsRequired.includes(skill);
  return (
    <Button
      key={skill}
      onClick={() => {
        setSkillsRequired((prev) =>
          isSelected ? prev.filter((s) => s !== skill) : [...prev, skill]
        );
      }}
      sx={{
        borderRadius: 4,
        mt: 2,
        backgroundColor: isSelected ? theme.palette.primary.main : "white",
        color: isSelected ? "white" : theme.palette.primary.main,
        height: "50px",
        px: 2,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {skill}
    </Button>
  );
})}

          </Box>
            
</Box>

<Typography variant ="caption" sx={{display:"flex", flexDirection:'flex-start', color:"gray", gap:0.8}} display={"flex"} justifyContent={`${isArabic?"flex-end":"flex-start"}`}>
                {t("SkillAtleastSelection")}
              </Typography>
     </Box>
          {/* Timeline */}
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:"space-between", width:"100%",gap:1}}>
              <Box sx={{display:"flex", width:"50%"}}>
              <CustomTextField label={`${t("Timeline")}`} placeholder={`${t("Duration")}`} 
              sx={{display:"flex",
               justifyContent:isArabic?"flex-end":"flex-start",
               textAlign: isArabic ? "right" : "left",
        right: isArabic ? 14 : "auto",
        left: isArabic ? "auto" : 14,
        transformOrigin: isArabic ? "top right" : "top left",
        "& .MuiInputBase-input": {
        textAlign: isArabic ? "right" : "left", // for Arabic placeholders
      },
               
               }}
               
               
               required fullWidth value={timelineNumber} onChange={(e) => setTimelineNumber(e.target.value)} />
              </Box>
              <Box sx={{display:"flex", width:"50%", mt:4.4}}>
              <DurationSelect  label="" value={timelineString} onChange={setTimeLineString}/>
            </Box>
            
            </Box>
          {/* Skills required */}

          {/* Attachments */}
            <Box>
              <InputFileUpload text={t("UploadButtonLabel")} sx={{width:"100%"}} isArabic onFileSelect={handleUpload}/>
              <Typography variant ="caption" sx={{display:"flex", flexDirection:'flex-start', color:"gray", gap:0.8}} display={"flex"} justifyContent={`${isArabic?"flex-end":"flex-start"}`}>
                {t("DocCheck")}
              </Typography>
            </Box>
          {/* Buttons */}
          <Box sx={{display:"flex",flexDirection:'row', gap:2,justifyContent:"space-between", width:"100%", borderRadius:3}}>
            <Button sx={{borderRadius:4,backgroundColor:"lightgray", width:"100%",color:"black" }}>
              {t("CancelButton")}
              </Button>
               <Button startIcon={<SaveIcon sx={{fontSize: 20, color: "black"}} />} onClick={() => handleSubmit("Draft")} sx={{borderRadius:4, width:"100%", backgroundColor:"white",color:"black" }}>
              {t("DraftButton")}
              </Button>
               <Button startIcon={<SendIcon sx={{fontSize: 20, color: "white"}} />} onClick={() => handleSubmit("Published")} sx={{borderRadius:4,backgroundColor:theme.palette.primary.main,color:"white", width:"100%" }}>
              {t("PublishButton")}
              </Button>
          </Box>
        </Box>
      </Container>



</Box>

</DashBoardLayout>




)
}
export default CreateProject;