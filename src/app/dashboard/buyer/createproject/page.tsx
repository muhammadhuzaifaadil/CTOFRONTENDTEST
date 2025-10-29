
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
  CircularProgress,
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
  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const res = await apiClient.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data)
      return res.data.url;
    } catch (err) {
      console.error('File upload failed:', err);
      alert('File upload failed. Please try again.');
      return null;
    }
  };
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

// const handleSubmit = async (status: "Draft" | "Published") => {
//   if (!user) return alert("You must be logged in");
  
//   try {
    
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("outline", outline);
//     formData.append("requirements", requirements);
//     formData.append("budgetRange", budgetRange);
//     formData.append("timeline", timeline);
//     formData.append("status", status);

//     // ✅ stringify the skills array properly
//     formData.append("skillsRequired", JSON.stringify(skillsRequired));

//     if (profilePhoto) formData.append("attachment", profilePhoto);

//     const res = await apiClient.post(`/projects`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     alert("✅ Project created successfully!");
//     router.push("/dashboard/buyer");
//   } catch (err: any) {
//     console.error(err);
//     alert("❌ Failed to create project: " + (err.response?.data?.message || err.message));
//   }
// };

const handleSubmit = async (status: "Draft" | "Published") => {
  if (!user) return alert("You must be logged in");

  try {
    let attachmentUrl: string | null = null;

    // ✅ If there's a file, upload first
    if (profilePhoto) {
      attachmentUrl = await uploadFile(profilePhoto);
      if (!attachmentUrl) {
        alert("File upload failed. Please try again.");
        return;
      }
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("outline", outline);
    formData.append("requirements", requirements);
    formData.append("budgetRange", budgetRange);
    formData.append("timeline", timeline);
    formData.append("status", status);
    formData.append("skillsRequired", JSON.stringify(skillsRequired));

    // ✅ Use uploaded URL instead of raw file
    if (attachmentUrl) {
      formData.append("attachment", attachmentUrl);
    }

    const res = await apiClient.post(`/projects`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("✅ Project created successfully!");
    router.push("/dashboard/buyer");
  } catch (err: any) {
    console.error(err);
    alert(
      "❌ Failed to create project: " +
        (err.response?.data?.message || err.message)
    );
  }
};

return (
<DashBoardLayout>
  {!user?(
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={80} thickness={5} />
        </Box>
      ):( 
<Box
  sx={{
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: {
      xs: "column", // for mobile
      sm: "column", // for small screens
      md: "column", // keep same for desktop, but you can switch if needed
    },
    alignItems: {
      xs: "stretch", // make content fit full width on mobile
      sm: "center",
      md: "center", // original desktop behavior
    },
    justifyContent: {
      xs: "flex-start", // start content higher on mobile
      sm: "center",
      md: "center", // keep original
    },
    background: "white",
    mt: { xs: 2, sm: 2, md: 2 }, // slightly less margin top for mobile
    py: { xs: 2, sm: 4, md: 6 }, // already responsive padding
    px: { xs: 2, sm: 4, md: 6 }, // added horizontal padding for better mobile spacing
    gap: { xs: 2, sm: 3, md: 0 }, // add spacing between children on smaller screens
  }}
>


 {/* Back Button */}
      {/* Back Button */}
<Box
  sx={{
    display: "flex",
    width: { xs: "100%", sm: "100%",md:"60%" },
    justifyContent: "flex-start",
    px: { xs: 2, sm: 2,md:0 },
    mt: { xs: 2, sm: 3, md: 2 },
    position: { xs: "static", sm: "static" }, // only sticky on mobile
    top: { xs: "70", sm: "auto" }, // only apply offset for xs
    zIndex: { xs: 10, sm: "auto" },
    backgroundColor: { xs: "white", sm: "transparent" },
    py: { xs: 1, sm: 0 },
  }}
>
  <Button
    startIcon={<ArrowBackIcon />}
    onClick={() => router.push("/dashboard/buyer")}
    sx={{
      textTransform: "none",
      fontSize: { xs: "14px", sm: "14px" },
      fontWeight: 600,
      color: "black",
      px: { xs: 1, sm: 1 },
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
      },
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
    width: {
      xs: "100%", // full width for 375px screen
      sm: "90%",
      md: "70%",
    },
    p: {
      xs: 2, // slightly tighter padding for mobile
      sm: 3.5,
      md: 6,
    },
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    mt: { xs: 1.5, sm: 3, md: 0 },
    mb: { xs: 1.5, sm: 3, md: 0 },
  }}
>
  {/* Header Section */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: { xs: 1.3, sm: 1.2, md: 1 },
      textAlign: "center",
      px: { xs: 1, sm: 2, md: 0 },
    }}
  >
    <DescriptionIcon
      sx={{
        height: { xs: 45, sm: 55, md: 60 },
        width: { xs: 45, sm: 55, md: 60 },
        backgroundColor: theme.palette.primary.main,
        color: "white",
        borderRadius: "50%",
        border: `2px solid ${theme.palette.primary.main}`,
        p: { xs: "8px", sm: "10px", md: "12px" },
      }}
    />
    <Typography
      variant="subtitle2"
      sx={{
        color: theme.palette.primary.main,
        fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem" },
      }}
    >
      {t("Header1")}
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{
        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.1rem" },
      }}
    >
      {t("Header2")}
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: "#6c757d",
        textAlign: "center",
        fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
        width: { xs: "100%", sm: "90%", md: "70%" },
      }}
    >
      {t("Content")}
    </Typography>
  </Box>

  {/* Form Fields */}
  <Box
    sx={{
      mt: 3,
      display: "flex",
      flexDirection: "column",
      gap: { xs: 2, sm: 2, md: 2.5 },
      px: { xs: 1.5, sm: 2, md: 0 },
    }}
  >
    {/* Title Field */}
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

    {/* Outline */}
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

    {/* Requirements */}
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

    {/* Budget */}
    <BudgetSelect
      label={`${t("BudgetLabel")}`}
      value={budgetRange}
      onChange={setBudgetRange}
      isArabic
    />

    {/* Skills Required */}
   <Box sx={{ display: "flex", flexDirection: "column" }}>
  <Typography
    sx={{
      fontWeight: "bold",
      textAlign: isArabic ? "right" : "left",
      mb: { xs: 1, sm: 0 },
      fontSize: { xs: "14px", sm: "16px" },
    }}
  >
    {t("SkillsRequired")}
  </Typography>

  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      width: "100%",
      backgroundColor: "lightgrey",
      justifyContent: "flex-start",
      borderRadius: 1,
      gap: 1,
      height: { xs: "auto", sm: "160px" },
      overflowX: { xs: "auto", sm: "visible" }, // horizontal scroll only on XS
      overflowY: "hidden",
      p: { xs: 1, sm: 2 },
      scrollbarWidth: "none", // Firefox
      "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
      scrollSnapType: { xs: "x mandatory", sm: "none" }, // smooth snap scroll for mobile
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexWrap: { xs: "nowrap", sm: "wrap" },
        gap: 1,
        width: { xs: "max-content", sm: "100%" }, // ensures scrollable width on XS
      }}
    >
      {skills.map((skill) => {
        const isSelected = skillsRequired.includes(skill);
        return (
          <Button
            key={skill}
            onClick={() =>
              setSkillsRequired((prev) =>
                isSelected
                  ? prev.filter((s) => s !== skill)
                  : [...prev, skill]
              )
            }
            sx={{
              flexShrink: 0,
              borderRadius: 3,
              backgroundColor: isSelected
                ? theme.palette.primary.main
                : "#f1f1f1",
              color: isSelected ? "white" : theme.palette.primary.main,
              height: { xs: "32px", sm: "40px" },
              px: { xs: 1.5, sm: 2 },
              fontSize: { xs: "11px", sm: "13px" },
              boxShadow: "none",
              whiteSpace: "nowrap",
              textTransform: "none",
              scrollSnapAlign: { xs: "start", sm: "none" }, // neat snapping while scrolling
            }}
          >
            {skill}
          </Button>
        );
      })}
    </Box>
  </Box>

  <Typography
    variant="caption"
    sx={{
      mt: { xs: 0.5, sm: 1 },
      color: "gray",
      textAlign: isArabic ? "right" : "left",
      fontSize: { xs: "11px", sm: "12px" },
    }}
  >
    {t("SkillAtleastSelection")}
  </Typography>
</Box>


    {/* Timeline */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        width: "100%",
        gap: { xs: 2, sm: 1 },
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
        <CustomTextField
          label={`${t("Timeline")}`}
          placeholder={`${t("Duration")}`}
          required
          fullWidth
          value={timelineNumber}
          onChange={(e) => setTimelineNumber(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", sm: "50%" },
          mt: { xs: 0, sm: 4.4 },
        }}
      >
        <DurationSelect
          label=""
          value={timelineString}
          onChange={setTimeLineString}
        />
      </Box>
    </Box>

    {/* Attachments */}
    <Box>
      <InputFileUpload
        text={t("UploadButtonLabel")}
        sx={{ width: "100%" }}
        isArabic
        onFileSelect={handleUpload}
      />
      <Typography
        variant="caption"
        sx={{
          color: "gray",
          textAlign: isArabic ? "right" : "left",
          fontSize: { xs: "11px", sm: "12px" },
        }}
      >
        {t("DocCheck")}
      </Typography>
    </Box>

    {/* Buttons */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 1, sm: 2 },
        justifyContent: "space-between",
        width: "100%",
        borderRadius: 3,
        mt: { xs: 2, sm: 0 },
      }}
    >
      <Button
        sx={{
          borderRadius: 3,
          backgroundColor: "#f1f1f1",
          width: "100%",
          color: "black",
          height: { xs: "36px", sm: "42px" },
          fontSize: { xs: "12px", sm: "14px" },
        }}
      >
        {t("CancelButton")}
      </Button>

      <Button
        startIcon={<SaveIcon sx={{ fontSize: 18, color: "black" }} />}
        onClick={() => handleSubmit("Draft")}
        sx={{
          borderRadius: 3,
          width: "100%",
          backgroundColor: "white",
          color: "black",
          height: { xs: "36px", sm: "42px" },
          fontSize: { xs: "12px", sm: "14px" },
        }}
      >
        {t("DraftButton")}
      </Button>

      <Button
        startIcon={<SendIcon sx={{ fontSize: 18, color: "white" }} />}
        onClick={() => handleSubmit("Published")}
        sx={{
          borderRadius: 3,
          backgroundColor: theme.palette.primary.main,
          color: "white",
          width: "100%",
          height: { xs: "36px", sm: "42px" },
          fontSize: { xs: "12px", sm: "14px" },
        }}
      >
        {t("PublishButton")}
      </Button>
    </Box>
  </Box>
</Container>




</Box>
      )}

</DashBoardLayout>




)
}
export default CreateProject;