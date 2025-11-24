
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import MobileApp from "@/app/components/createprojectforms/MobileApp";
import WebsiteApp from "@/app/components/createprojectforms/WebApp";
import { AiMlDetailsForm, DigitalMarketingDetailsForm, ErpSystemDetailsForm, MobileAppDetailsForm, UiUxDesignDetailsForm, WebsiteAppDetailsForm } from "@/app/components/createprojectforms/AIML";
import useTemplateQuestions from "@/app/contexts/useTemplateQuestion";


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


// Put these near the top of the file
const sectionHeaderSx = {
  display: "flex",
  width: "100%",
  borderRadius: "12px",
  px: 2,
  py: 1.5,
  mb: 2,
  background:
    "linear-gradient(90deg, rgba(68,76,247,0.1) 0%, rgba(91,95,255,0.1) 100%)",
};

const pillSelectSx = {
  borderRadius: "999px",
  bgcolor: "#F3F3F7", // <-- Match your screenshot's grey
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
    boxShadow: "0 0 0 2px rgba(68,76,247,0.18)",
  },
  "& .MuiSelect-select": {
    py: 1.3,
    px: 2,
  },
};

const CreateProject: React.FC = () => {
const theme = useTheme();
const router = useRouter();
const { user, isAuthenticated } = useAuth();
const [selectedCategory, setSelectedCategory] = useState("");
const [selectedDuration, setSelectedDuration] = useState("");
const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
const [formType, setFormType] = useState("");
const [uiuxRequirement, setUiuxRequirement] = useState(""); 
const [postLaunchSupport,setPostLaunchSupport] = useState("");
const [thirdPartyIntegrations,setThirdPartyIntegrations] = useState("");
const [targetUser,setTargetUser] = useState("");
const [techStack,setTechStack] = useState("");
// api states

const [title, setTitle] = useState("");
const [outline, setOutline] = useState("");
const [requirements, setRequirements] = useState("");
const [budgetRange, setBudgetRange] = useState("");
const [timeline, setTimeline] = useState("");
const [timelineNumber,setTimelineNumber] = useState("");
const [timelineString,setTimeLineString] = useState("");
const [templateKey, setTemplateKey] = useState<number | null>(null);
const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
const { questions, addQuestion } = useTemplateQuestions();
const [formTypes,setFormTypes]=useState<any>([]);
// const [formTypes, setFormTypes] = useState([]);


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
      return res.data.Data.url;
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
  if (file && validateFile(file, ["jpg", "jpeg", "png","pdf","docx","doc"], 2)) {
    setProfilePhoto(file);
  } else {
    setProfilePhoto(null);
  }
};
useEffect(()=>{
setTimeline(`${timelineNumber} ${timelineString}`);
},[timelineString,timelineString]);

const getFormTypes = async()=>{
  try {
    const response = await apiClient.get("/template");
    console.log(response);
    const dynamic = response.data.map((x: any) => ({
    id: x.id,
    type: x.name, // convert "name" → "type"
  }));
  setFormTypes(dynamic);
  } catch (error) {
    console.log(error)
  }
}
useEffect(()=>{
getFormTypes()
},[formType])

// const formTypes = [
//   { id: 1, type: "MobileApp" },
//   { id: 2, type: "WebApp" },
//   { id: 3, type: "ERP" },
//   { id: 4, type: "AI/ML" },
//   { id: 5, type: "Digital Marketing" },
//   { id: 6, type: "UI/UX Design"}
//   // forms
  
// ];
// const handleSubmit = async (status: "Draft" | "Published") => {
//   if (!user) return alert("You must be logged in");

//   try {
//     let attachmentUrl: any = null;

//     // ✅ If there's a file, upload first
//     if (profilePhoto) {
//       attachmentUrl = await uploadFile(profilePhoto);
//       if (!attachmentUrl) {
//         alert("File upload failed. Please try again.");
//         return;
//       }
      
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("outline", outline);
//     formData.append("requirements", requirements);
//     formData.append("budgetRange", budgetRange);
//     formData.append("timeline", timeline);
//     formData.append("status", status);
//     formData.append("skillsRequired", JSON.stringify(skillsRequired));

//     // ✅ Use uploaded URL instead of raw file
//     if (attachmentUrl) {
//       formData.append("attachment", attachmentUrl);
//     }

//     const res = await apiClient.post(`/projects`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     alert("✅ Project created successfully!");
//     router.push("/dashboard/buyer");
//   } catch (err: any) {
//     console.error(err);
//     alert(
//       "❌ Failed to create project: " +
//         (err.response?.data?.message || err.message)
//     );
//   }
// };
const handleSubmit = async (status: "Draft" | "Published") => {
  if (!user) return alert("You must be logged in");

  try {
    let attachmentUrl: string | null = null;

    if (profilePhoto) {
      attachmentUrl = await uploadFile(profilePhoto);
      if (!attachmentUrl) {
        alert("File upload failed. Please try again.");
        return;
      }
    }

    const payload = {
      title,
      outline,
      requirements,
      thirdPartyIntegrations,
      budgetRange,
      timeline,
      targetUser,
      uiuxRequirement,
      techStack,
      postLaunchSupport,

      status,

      // skillsRequired,
      attachment: attachmentUrl, // now just string URL
      templateId:templateKey,
      templateQuestions: questions.map((e: any) => ({
      questionText: e.questionText,
      questionValue: e.questionValue,
}))


    };

    const res = await apiClient.post(`/projects`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    alert("✅ Project created successfully!");
    router.push("/dashboard/buyer");

  } catch (err: any) {
    console.error(err);
    alert("❌ Failed to create project: " + (err.response?.data?.message || err.message));
  }
};
// const renderForm = () => {
//     switch (formType) {
//       // case "MobileApp":
//       //   return <MobileAppForm addQuestion={addQuestion} />;
//       // case "WebApp":
//       //   return <WebAppForm addQuestion={addQuestion} />;
//       case "ERP":
//         return <ErpSystemDetailsForm addQuestion={addQuestion} />;
//       case "AI/ML":
//         return <AiMlDetailsForm addQuestion={addQuestion} />;
//       default:
//         return null;
//     }
//   };
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
    mt: { xs: 6, sm: 2, md: 2 }, // slightly less margin top for mobile
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
    // justifyContent: "flex-start",
    flexDirection: isArabic ? "row-reverse" : "row", // 👈 flips layout
    justifyContent: isArabic ? "flex-start" : "flex-start", // 👈 Arabic aligns left, English stays left
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
    startIcon={<ArrowBackIcon sx={{
          transform: isArabic ? "scaleX(-1)" : "none", // 👈 flips arrow direction
          transition: "transform 0.2s ease",
        }} />}
    onClick={() => router.push("/dashboard/buyer")}
    sx={{
      textTransform: "none",
      fontSize: { xs: "14px", sm: "14px" },
      fontWeight: 600,
      color: "black",
      flexDirection: isArabic ? "row-reverse" : "row", // 👈 ensures icon on right, text on left in Arabic
      gap: 1,
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
   {/* ================= BASIC PROJECT INFORMATION ================= */}
<Box sx={{ mb: 0 }}>
  <Box sx={sectionHeaderSx}>
    <Typography
      variant="subtitle1"
      sx={{ fontWeight: 600, textAlign: isArabic ? "right" : "left" }}
    >
      {t("BasicProjectInformationTitle") /* ex: "Basic Project Information" */}
    </Typography>
  </Box>

  {/* Project Title */}
  <CustomTextField
    label={t("TitleFieldLabel")}            // ex: "Project Title"
    placeholder={t("TitleFieldPlaceholder")} // ex: "Enter project title"
    fullWidth
    required
    maxChar={150}
    multiline
    rows={1}
    value={title}
    isArabic={isArabic}
    onChange={(e) => setTitle(e.target.value)}
  />

  {/* Project Description (your "Outline") */}
  <CustomTextField
    label={t("OutlineLabel")}            // ex: "Project Description"
    placeholder={t("OutlinePlaceholder")} // ex: "Describe your project in detail..."
    fullWidth
    required
    multiline
    rows={4}
    maxChar={1000}
    value={outline}
    isArabic={isArabic}
    onChange={(e) => setOutline(e.target.value)}
  />

  {/* Core Features (your "Requirements") */}
  <CustomTextField
    label={t("RequirementsLabel")}            // ex: "Core Features"
    placeholder={t("RequirementsPlaceholder")} // ex: "List the core features (one per line)..."
    fullWidth
    required
    multiline
    rows={5}
    maxChar={1000}
    value={requirements}
    isArabic={isArabic}
    onChange={(e) => setRequirements(e.target.value)}
  />

  {/* Third‑Party Integrations (Optional) */}
  <CustomTextField
    label={t("ThirdPartyIntegrationsLabel")}            // ex: "Third-Party Integrations (Optional)"
    placeholder={t("ThirdPartyIntegrationsPlaceholder")} // ex: "e.g., payment gateways, chat systems, SDKs"
    fullWidth
    multiline
    rows={3}
    maxChar={700}
    value={thirdPartyIntegrations}
    isArabic={isArabic}
    onChange={(e) => setThirdPartyIntegrations(e.target.value)}
  />
</Box>

{/* ================= BUDGET & TIMELINE ================= */}
<Box sx={{ mb: 0 }}>
  <Box sx={sectionHeaderSx}>
    <Typography
      variant="subtitle1"
      sx={{ fontWeight: 600, textAlign: isArabic ? "right" : "left" }}
    >
      {t("BudgetTimelineSectionTitle") /* ex: "Budget & Timeline" */}
    </Typography>
  </Box>

  {/* Budget Type + Budget Amount (2‑column on desktop, stacked on mobile) */}
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: isArabic ? "row-reverse" : "row" },
      gap: 2,
      mb: 0,
    }}
  >
    {/* Budget Type (reuses your BudgetSelect) */}
    <Box sx={{ width: { xs: "100%", sm: "100%" } }}>
      <BudgetSelect
        label={t("BudgetAmountLabel")} // ex: "Budget Type"
        value={budgetRange}
        onChange={setBudgetRange}
        isArabic={isArabic}
      />
    </Box>

    {/* Budget Amount
    <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
      <CustomTextField
        label={t("BudgetAmountLabel")}            // ex: "Budget Amount"
        placeholder={t("BudgetAmountPlaceholder")} // ex: "Enter amount"
        fullWidth
        required
        isNumbersOnly
        maxChar={12}
        // value={budgetAmount}
        isArabic={isArabic}
        // onChange={(e) => setBudgetAmount(e.target.value)}
      />
    </Box> */}
  </Box>

  {/* Timeline (keeps your existing responsive logic) */}
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: isArabic ? "row-reverse" : "row" },
      justifyContent: "space-between",
      width: "100%",
      gap: { xs: 2, sm: 1 },
    }}
  >
    <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
      <CustomTextField
        label={t("Timeline")}         // ex: "Timeline"
        placeholder={t("TimelinePlaceholder")} // ex: "e.g., 2–3 months"
        required
        fullWidth
        value={timelineNumber}
        onChange={(e) => setTimelineNumber(e.target.value)}
        isArabic={isArabic}
        isNumbersOnly={true}
      />
    </Box>

    <Box
      sx={{
        width: { xs: "100%", sm: "50%" },
        mt: { xs: 0, sm: 4.4 },
      }}
    >
      {/* if you still want units (Days/Weeks/Months) */}
      <DurationSelect
        label=""
        value={timelineString}
        onChange={setTimeLineString}
        isArabic={isArabic}
      />
    </Box>
  </Box>
</Box>

{/* ================= ADDITIONAL REQUIREMENTS ================= */}
<Box sx={{ mb: 0 }}>
  <Box sx={sectionHeaderSx}>
    <Typography
      variant="subtitle1"
      sx={{ fontWeight: 600, textAlign: isArabic ? "right" : "left" }}
    >
      {t("AdditionalRequirementsSectionTitle") /* ex: "Additional Requirements" */}
    </Typography>
  </Box>

  {/* Target User / Audience (Optional) */}
  <CustomTextField
    label={t("TargetUserLabel")}            // ex: "Target User / Audience (Optional)"
    placeholder={t("TargetUserPlaceholder")} // ex: "e.g., Young professionals, Businesses"
    fullWidth
    multiline
    rows={2}
    maxChar={300}
    value={targetUser}
    isArabic={isArabic}
    onChange={(e) => setTargetUser(e.target.value)}
  />

  {/* UI/UX Requirement (Yes/No) */}
  <Box sx={{ mb: 2 }}>
    <Typography
      sx={{
        fontWeight: "bold",
        mb: 0.5,
        textAlign: isArabic ? "right" : "left",
        fontSize: { xs: "14px", sm: "16px" },
      }}
    >
      {t("UiUxRequirementLabel")}{" "}
      <span style={{ color: "red" }}>*</span>
    </Typography>
   
<FormControl fullWidth size="small">
  <Select
    value={uiuxRequirement}
    onChange={(e) => setUiuxRequirement(e.target.value as string)}
    displayEmpty
    sx={pillSelectSx}
    renderValue={(v) =>
      v !== "" ? v : t("SelectOptionPlaceholder")   // show placeholder
    }
  >
    {/* Disabled Placeholder (shown first, cannot be selected) */}
    <MenuItem value="" disabled>
      {t("SelectOptionPlaceholder")}
    </MenuItem>

    <MenuItem value="yes">Yes</MenuItem>
    <MenuItem value="no">No</MenuItem>
  </Select>
</FormControl>


  </Box>

  {/* Preferred Technology Stack (Optional) */}
  <CustomTextField
    label={t("PreferredTechStackLabel")}
    placeholder={t("PreferredTechStackPlaceholder")} // ex: "e.g., Next.js, Node.js, Flutter, React.js"
    fullWidth
    multiline
    rows={2}
    maxChar={400}
    value={techStack}
    isArabic={isArabic}
    onChange={(e) => setTechStack(e.target.value)}
  />

  {/* Post‑Launch Support Required? */}
  <Box sx={{ mt: 1 }}>
    <Typography
      sx={{
        fontWeight: "bold",
        mb: 0.5,
        textAlign: isArabic ? "right" : "left",
        fontSize: { xs: "14px", sm: "16px" },
      }}
    >
      {t("PostLaunchSupportLabel")}{" "}
      <span style={{ color: "red" }}>*</span>
    </Typography>
    <FormControl fullWidth size="small">
      <Select
        value={postLaunchSupport}
        onChange={(e) => setPostLaunchSupport(e.target.value as string)}
        displayEmpty
        sx={pillSelectSx}
        renderValue={(v) =>
          v !== "" ? (v as string) : t("SelectOptionPlaceholder")
        }
      >
        <MenuItem disabled value="Select Yes or No">
          {t("SelectOptionPlaceholder")}
        </MenuItem>
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">No</MenuItem>
      </Select>
    </FormControl>
  </Box>

  {/* Attachments */}
  <Box sx={{ mt: 2 }}>
    <Typography
      sx={{
        fontWeight: "bold",
        mb: 0.5,
        textAlign: isArabic ? "right" : "left",
        fontSize: { xs: "14px", sm: "16px" },
      }}
    >
      {t("AttachmentsLabel")}{" "}
      <Typography component="span" sx={{ color: "gray", ml: 0.5 }}>
        {/* ({t("Optional")}) */}
      </Typography>
    </Typography>

    <InputFileUpload
      text={t("UploadButtonLabel")}
      sx={{ width: "100%" }}
      isArabic={isArabic}
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
      {t("DocCheck") /* ex: "PDF, DOC, JPG, or PNG, maximum 10MB per file" */}
    </Typography>
  </Box>

  {/* Skills Required – kept exactly as you wrote it */}
  <Box sx={{ mt: 3 }}>
    {/* your whole SkillsRequired block goes here unchanged */}
    {/* ...existing Skills Required code... */}
  </Box>

  {/* Project Type (was "Select Form Type") */}
  <Box sx={{ mb:0 }}>
    <Typography
      sx={{
        fontWeight: "bold",
        mb: 0.5,
        textAlign: isArabic ? "right" : "left",
        fontSize: { xs: "14px", sm: "16px" },
      }}
    >
      {t("ProjectTypeLabel")}{" "}
      <span style={{ color: "red" }}>*</span>
    </Typography>
    <FormControl fullWidth size="small">
      {/* <Select
        value={formType}
        onChange={(e) => setFormType(e.target.value as string)}
        displayEmpty
        sx={pillSelectSx}
        renderValue={(v) =>
          v !== "" ? (v as string) : t("ProjectTypePlaceholder")
        }
      >
        <MenuItem disabled value="">
          {t("ProjectTypePlaceholder")}
        </MenuItem>
        {formTypes.map((item) => (
          <MenuItem key={item.id} value={item.type}>
            {item.type}
          </MenuItem>
        ))}
      </Select> */}
      <>
      <Select
  value={formType}
  onChange={(e) => {
    const value = e.target.value as string;
    setFormType(value);

    // Find ID from lookup array
    const selected = formTypes.find((x:any) => x.type === value);
    setTemplateKey(selected?.id ?? null);
  }}
  displayEmpty
  sx={pillSelectSx}
  renderValue={(v) =>
    v !== "" ? (v as string) : t("ProjectTypePlaceholder")
  }
>
  {/* Disabled Placeholder */}
  <MenuItem disabled value="">
    {t("ProjectTypePlaceholder")}
  </MenuItem>

  {/* Dynamic Items */}
  {formTypes.map((item:any) => (
    <MenuItem key={item.id} value={item.type}>
      {item.type}
    </MenuItem>
  ))}
</Select>
</>
    </FormControl>
  </Box>
</Box>
{/* Blue Divider */}
              <Box>
                <Divider
                  sx={{
                    mt: 1,
                    borderBottomWidth: 3,
                    borderColor: theme.palette.primary.main,
                    opacity: 0.7,
                    width: "100%",
                  }}
                />
              </Box>   
{/* Conditional Rendering of Forms */}
      {formType === "MobileApp" && <MobileAppDetailsForm addQuestion={addQuestion} />}
      {formType === "WebApp" && <WebsiteAppDetailsForm addQuestion={addQuestion} />}
      {formType === "ERP" && <ErpSystemDetailsForm addQuestion={addQuestion} />}
      {formType === "AI/ML" && <AiMlDetailsForm addQuestion={addQuestion} />}
      {formType === "Digital Marketing" && <DigitalMarketingDetailsForm addQuestion={addQuestion} />}
      {formType === "UI/UX Design" && <UiUxDesignDetailsForm addQuestion={addQuestion} />}

    {/* Buttons */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: isArabic?"row-reverse":"row" },
        gap: { xs: 1, sm: 2 },
        justifyContent: "space-between",
        width: "100%",
        borderRadius: 3,
        mt: { xs: 2, sm: 0 },
      }}
    >
      <Button
      onClick={()=>router.push("/dashboard/buyer")}
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
        startIcon={<SendIcon sx={{ fontSize: 18, color: "white",
          transform: isArabic ? "scaleX(-1)" : "none", // 👈 flips arrow direction
          transition: "transform 0.2s ease",
         }} />}
        onClick={() => handleSubmit("Published")}
        sx={{
          borderRadius: 3,
          backgroundColor: theme.palette.primary.main,
          color: "white",
          width: "100%",
          display:"flex",
          // flexDirection:isArabic?"row-reverse":"row",
          // gap:`${isArabic?1:0}`,
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