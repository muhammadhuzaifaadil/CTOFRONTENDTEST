"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import apiClient from "@/api/apiClient";
import { Box, Typography, Snackbar, Alert, TextField, CircularProgress } from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import InputFileUpload from "./InputFileUpload";
import { LanguageContext } from "../contexts/LanguageContext";
import CustomTextField from "./CustomTextField";
import DurationSelect from "./DaysSelect";
import { useRouter } from "next/navigation";

export interface Bid {
  id?: number;
  budget: string;
  timeline: string;
  coverLetter: string;
  files: File[];
}

interface BidFormProps {
  mode: "add" | "edit";
  projectId: number;
  bidId?: number;
  projectName?: string;
  clientBudgetRange?: string;
  requiredTimeline?: string;

    outline?: string;
  requirements?: string;
  skillsRequired?: string[];
  attachment?: string;
  TargetUser?: string;
  PostLaunchSupport?:string;
  PreferredTechStack?:string;
UIUXRequirement?:string;
ThirdPartyIntegrations?:string;
templateQuestions?:string[];
ExistingBidAmount?:any;
ExistingTimelineNumber?:any;
ExistingTimelineUnit?:any;
ExistingProposal?:any;
ExistingAttachment?:any;
  buyerName?: string;
  buyerEmail?: string;

  initialData?: Bid | null;
  onSuccess?: () => void; // optional callback on successful submit
}



const BidForm: React.FC<BidFormProps> = ({
  mode,
  bidId,
  projectId,
  projectName = "Brand Identity and Logo Design",
  clientBudgetRange = "$1,000 - $5,000",
  requiredTimeline = "3 Weeks",
  outline="",
  requirements="",
  skillsRequired="",
  attachment="",
  TargetUser="",
  buyerName="",
  buyerEmail="",
  templateQuestions,
  PostLaunchSupport,
  PreferredTechStack,
  ThirdPartyIntegrations,
  UIUXRequirement,
  ExistingBidAmount,
  ExistingTimelineNumber,
  ExistingTimelineUnit,
  ExistingProposal,
  ExistingAttachment,
  initialData,
  onSuccess,
}) => {
  const maxChars = 1000;
  const minChars = 50;
  const router = useRouter();
  const [formData, setFormData] = useState({
    budget: "",
    timeline: "",
    coverLetter: "",
  });

  const [charCount, setCharCount] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // file handling
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);

  // feedback
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
//   timeline
  const [timeline, setTimeline] = useState("");
    const [bidTimeline, setBidTimeline] = useState("");
  const [timelineNumber,setTimelineNumber] = useState("");
  const [timelineString,setTimeLineString] = useState("");

const [bidAmount, setBidAmount] = useState("");
  const [proposalText, setProposalText] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const { isArabic } = useContext(LanguageContext);

  useEffect(() => {
    if (mode === "edit") {
    if (ExistingBidAmount) setBidAmount(ExistingBidAmount);
    if (ExistingTimelineNumber) setBidTimeline(ExistingTimelineNumber);
    if(ExistingTimelineUnit) setTimeLineString(ExistingTimelineUnit)
    if (ExistingProposal) {
      setProposalText(ExistingProposal);
      setCharCount(ExistingProposal.length);
    }
    if (ExistingAttachment) setAttachmentUrl(ExistingAttachment);
  }

  },[mode, ExistingBidAmount, ExistingTimelineNumber,ExistingTimelineUnit, ExistingProposal, ExistingAttachment]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === "coverLetter") setCharCount(value.length);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};

    

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // For initial Loading

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     return(
  //       <Box>
  //         <CircularProgress />
  //       </Box>
  //     )
  //   },2000)
  // },[])

  // --- same helpers as in modal ---

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await apiClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.Data.url;
    } catch (err) {
      console.error("File upload failed:", err);
      alert("File upload failed. Please try again.");
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

  const handleFileSelect = async (file: File | null) => {
    if (!file) {
      setAttachmentFile(null);
      setAttachmentUrl(null);
      return;
    }

    // adjust allowed extensions & size as you need
    if (!validateFile(file, ["jpg", "jpeg", "png", "pdf", "doc", "docx"], 5)) {
      return;
    }

    setAttachmentFile(file);

    // upload immediately and store URL
    const url = await uploadFile(file);
    if (url) setAttachmentUrl(url);
  };

  useEffect(()=>{
  setTimeline(`${bidTimeline} ${timelineString}`);
  },[bidTimeline,timelineString]);

const handleSubmit = async () => {
  if (!validate()) return;

  try {
    setSubmitting(true);
    setErrorMsg(null);

    let finalAttachmentUrl = attachmentUrl;
    if (attachmentFile && !attachmentUrl) {
      finalAttachmentUrl = await uploadFile(attachmentFile);
      setAttachmentUrl(finalAttachmentUrl);
    }

    const token = localStorage.getItem("accessToken");

    const payload = {
      ProjectId: projectId,
      proposalText: proposalText,
      timeline: timeline,
      bidAmount: bidAmount,
      attachment: finalAttachmentUrl || null,
    };
    let result;
if (mode === "edit") {
  // 🔹 UPDATE existing bid
   result = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/bids/${bidId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

}
else{
     result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/bids`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
}
    console.log("Bid API result:", result.data);
    if (mode === "edit") {
  setSuccessMessage("Bid updated successfully!");
} else {
  setSuccessMessage("Bid submitted successfully!");
}

    setShowSuccess(true);

    // ⭐ Redirect after success
    if(mode == "edit"){
      router.push("/dashboard/seller/managebids")
    }
    else{
    router.push("/dashboard/seller/browseprojects");
}
    if (mode === "add") {
      setFormData({ budget: "", timeline: "", coverLetter: "" });
      setCharCount(0);
      setAttachmentFile(null);
      setAttachmentUrl(null);
    }

    if (onSuccess) onSuccess();

  } catch (error) {
    console.error("Error submitting bid:", error);
    setErrorMsg("Something went wrong while submitting your bid. Please try again.");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div
      style={{
        maxWidth: 1000,
        width: "100%",
        margin: "0 auto",
        padding: "32px 24px",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
        background: "#FFFFFF",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#444CF7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
          }}
        >
          <SendRounded
            sx={{
              color: "white",
              fontSize: 29,
              paddingLeft: "5px",
              rotate: "-40deg",
            }}
          />
        </div>
        <h2
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: "#444CF7",
            margin: "0 0 8px 0",
            letterSpacing: 0.5,
          }}
        >
          Submit Your Proposal
        </h2>
        <h1
          style={{
            fontSize: 16,
            fontWeight: 400,
            margin: "0 0 4px 0",
            color: "#13006C",
          }}
        >
          {mode === "add" ? "BID ON PROJECT" : "EDIT YOUR BID"}
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "#13006C",
            margin: "0",
          }}
        >
          <span style={{ color: "#717182" }}>Project:</span> {projectName}
        </p>
      </div>

      {/* Optional error message (API level) */}
      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Alert>
      )}

      {/* Project Details Section */}
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
                      <Box display="flex"  gap={2} mb={1} >
                        <Box flex={2} >
                          <Typography fontWeight="bold" display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>Title</Typography>
                          <Typography display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>{projectName}</Typography>
                        </Box>
                      </Box>
      
                      <Box mb={1}>
                        <Typography fontWeight="bold" display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>Outline</Typography>
                        <Typography display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>{outline}</Typography>
                      </Box>
      
                      <Box mb={1}>
                        <Typography fontWeight="bold" display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>Requirements</Typography>
                        <Typography display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>{requirements}</Typography>
                      </Box>
      
                      {/* <Box mb={1}> */}
                        {/* <Typography fontWeight="bold" display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>{t("SkillsRequired")}</Typography> */}
                        {/* <Typography display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>{data.skillsRequired.join(", ")}</Typography> */}
                      {/* </Box> */}
      
                      <Box display="flex" gap={2} mb={1}>
                        <Box flex={1}>
                          <Typography fontWeight="bold" display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>Budget Range</Typography>
                          <Typography display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>{clientBudgetRange}</Typography>
                        </Box>
                        <Box flex={1}>
                          <Typography fontWeight="bold" display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>Timeline</Typography>
                          <Typography display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>{requiredTimeline}</Typography>
                        </Box>
                      </Box>
      
                      {/* <Box display="flex" gap={2}> */}
                        <Box mb={1}>
                          <Typography fontWeight="bold" display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>Buyer Name</Typography>
                          <Typography display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>{buyerName}</Typography>
                        </Box>
                        <Box mb={1}>
                          <Typography fontWeight="bold" display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>Buyer Email</Typography>
                          <Typography display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>{buyerEmail}</Typography>
                        </Box>
                        {templateQuestions && templateQuestions.length > 0 && (
  <Box mt={2}>
    <Typography
      fontWeight="bold"
      fontSize="1.1rem"
      mb={1}
      display="flex"
      justifyContent={isArabic ? "flex-end" : "flex-start"}
    >
      Additional Project Questions
    </Typography>

    {templateQuestions.map((q: any, index: number) => (
      <Box
        key={index}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          p: 2,
          mb: 1.5,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          fontWeight="bold"
          display="flex"
          justifyContent={isArabic ? "flex-end" : "flex-start"}
        >
          {q.questionText}
        </Typography>

        <Typography
          display="flex"
          justifyContent={isArabic ? "flex-end" : "flex-start"}
        >
          {q.questionValue || "—"}
        </Typography>
      </Box>
    ))}
  </Box>
)}

                      {/* </Box> */}
                    </Box>

      {/* Budget Input */}
      <div style={{ marginBottom: 20 }}>
       
                    <CustomTextField
          label={!isArabic ? "Bid Amount ($)" : "قيمة العرض ($)"}
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          fullWidth
          margin="normal"
          required
        //   InputProps={{
        //     sx: {
        //       textAlign: isArabic ? "right" : "left",
        //       direction: isArabic ? "rtl" : "ltr",
        //     },
        //   }}
        //   InputLabelProps={{
        //     sx: {
        //       textAlign: isArabic ? "right" : "left",
        //       right: isArabic ? 14 : "auto",
        //       left: isArabic ? "auto" : 14,
        //       transition: "opacity 0.3s ease",
        //       opacity: bidAmount ? 0 : 1, // hide label when value exists
        //     },
        //     shrink: false, // prevent label floating on focus
        //   }}
        //   onFocus={(e:any) => {
        //     e.target.labels[0].style.opacity = "0"; // hide label on focus
        //   }}
        //   onBlur={(e:any) => {
        //     if (!e.target.value) e.target.labels[0].style.opacity = "1"; // show again if empty
        //   }}
        />
      
      </div>

      {/* Timeline Dropdown */}
       <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: isArabic?"row-reverse":"row" },
        justifyContent: "space-between",
        width: "100%",
        gap: { xs: 2, sm: 1 },
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
        <CustomTextField
          label={!isArabic ? "Estimated Timeline" : "المدة المتوقعة"}
          placeholder={!isArabic ? "e.g., 3 weeks, 2 months" : "مثلاً: ٣ أسابيع، شهرين"}
          required
          fullWidth
          value={bidTimeline}
          onChange={(e) => setBidTimeline(e.target.value)}
          isArabic={isArabic}
          isNumbersOnly={true}
        />
        {/* <TextField
          label={!isArabic ? "Estimated Timeline" : "المدة المتوقعة"}
          placeholder={!isArabic ? "e.g., 3 weeks, 2 months" : "مثلاً: ٣ أسابيع، شهرين"}
          required
          fullWidth
          value={bidTimeline}
          onChange={(e) => setBidTimeline(e.target.value)}
          type="number"
        /> */}
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
          isArabic={isArabic}
          
        />
      </Box>
    </Box>

      {/* Cover Letter */}
      <div style={{ marginBottom: 20 }}>
     
        <CustomTextField
  label={!isArabic ? "Your Proposal" : "اقتراحك"}
  placeholder={
    !isArabic
      ? "Describe your approach, experience, and why you're a perfect fit..."
      : "اشرح طريقتك وخبرتك ولماذا أنت الأنسب..."
  }
  value={proposalText}
  onChange={(e) => setProposalText(e.target.value)}
  fullWidth
  multiline
  rows={4}
  maxChar={1000}
  margin="normal"
  
//   InputProps={{
//     sx: {
//       textAlign: isArabic ? "right" : "left",
//       direction: isArabic ? "rtl" : "ltr",
//     },
//   }}
//   InputLabelProps={{
//     sx: {
//       textAlign: isArabic ? "right" : "left",
//       right: isArabic ? 14 : "auto",
//       left: isArabic ? "auto" : 14,
//       transition: "opacity 0.3s ease",
//       opacity: proposalText ? 0 : 1,
//     },
//     shrink: false,
//   }}
//   onFocus={(e:any) => {
//     e.target.labels[0].style.opacity = "0";
//   }}
//   onBlur={(e:any) => {
//     if (!e.target.value) e.target.labels[0].style.opacity = "1";
//   }}
/>
      </div>

      {/* File Upload Section */}
      <Box mt={2}>
        <Typography
          fontWeight="bold"
          mb={1}
          display={"flex"}
          justifyContent={isArabic ? "flex-end" : "flex-start"}
        >
          Attachment
        </Typography>
        <InputFileUpload
          sx={{ display: "flex", width: "100%", textAlign: "center" }}
          text="file"
          onFileSelect={handleFileSelect}
          isArabic={isArabic}
          initialUrl={ExistingAttachment}
        />
        {attachmentFile && (
          <Typography mt={1} fontSize={14}>
            {attachmentFile.name}
          </Typography>
        )}
      </Box>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button
          style={{
            flex: 1,
            background: "#F3F3F5",
            color: "#000",
            padding: "14px",
            borderRadius: 28,
            border: "none",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onClick={()=>router.push("/dashboard/seller/browseprojects")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#E8E8EB")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#F3F3F5")
          }
          type="button"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            flex: 1,
            background: submitting ? "#94a3ff" : "#5568FF",
            color: "white",
            padding: "14px",
            borderRadius: 28,
            border: "none",
            fontSize: 15,
            fontWeight: 600,
            cursor: submitting ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!submitting)
              e.currentTarget.style.background = "#4557E8";
          }}
          onMouseLeave={(e) => {
            if (!submitting)
              e.currentTarget.style.background = "#5568FF";
          }}
          type="button"
        >
          <SendRounded sx={{ fontSize: 18, rotate: "-40deg" }} />
          {submitting
            ? "Submitting..."
            : mode === "add"
            ? "Submit Bid"
            : "Save Changes"}
        </button>
      </div>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
      >
        
        <Alert severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BidForm;