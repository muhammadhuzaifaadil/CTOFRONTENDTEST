"use client"
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Typography,
  useTheme,
  Avatar,

  Divider,
  Alert,
  Collapse,
  IconButton
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField";
import InputFileUpload from "../../components/InputFileUpload";
import CategorySelect from "../../components/CategorySelect";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import apiClient from "@/api/apiClient";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import RegisterLayout from "@/app/layouts/RegisterLayout";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { useTranslations } from "next-intl";
import TermsAndConditionsModal from "@/app/components/TermsandConditions";

const SellerRegister: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
type FormDataType = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  phone: string;
  gender: string;
  address: string;
  city: string;
  country: string;
  password: string;
  confirmPassword: string;
  experience: string;
  companyName: string;
  crNumber:string;
  companyUrl: string;
  category: string;
  [key: string]: string; // <-- Add this line
};
   const [formData, setFormData] = useState<FormDataType>({
     firstName: "",
     middleName: "",
     lastName: "",
     email: "",
     phoneCode: "",
     phoneNumber: "",
     phone: "",
     gender: "",
     address: "",
     city: "",
     country: "",
     password: "",
     confirmPassword: "",
     experience: "",
     companyName: "",
     crNumber:"",
     companyUrl: "",
     category: "",
   });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [portfolio, setPortfolio] = useState<File | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors , setFieldErrors]=useState("");
  const [alertSuccess, setAlertSuccess] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const {locale,isArabic,toggleLanguage} = useContext(LanguageContext)
  const t = useTranslations("SellerRegister")
const uploadFile = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await apiClient.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.Data.url;
  } catch (err) {
    console.error('File upload failed:', err);
    alert('File upload failed. Please try again.');
    return null;
  }
};
const handleFieldError = (field: string, hasError: boolean) => {
  setFieldErrors((prev:any) => ({ ...prev, [field]: hasError }));
};
  const handleFieldChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
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

 const handleProfilePhotoSelect = (file: File | null) => {
  if (file && validateFile(file, ["jpg", "jpeg", "png"], 2)) {
    setProfilePhoto(file);
  } else {
    setProfilePhoto(null);
  }
};


  const handleLicenseSelect = (file: File| null) => {
    if (file && validateFile(file, ["pdf", "doc", "jpg", "jpeg", "png"], 10))
      setBusinessLicense(file);
    else
      setBusinessLicense(null);
  };

  const handlePortfolioSelect = (file: File|null) => {
    if (file && validateFile(file, ["pdf", "doc"], 10)) setPortfolio(file);
    else setPortfolio(null);
  };


// const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   if (isSubmitting) return;

//   // ✅ basic validations
//   if (formData.password !== formData.confirmPassword) {
//     alert("Passwords do not match!");
//     return;
//   }
//   if (!acceptedTerms) {
//     alert("Please accept Terms & Conditions.");
//     return;
//   }

//   setIsSubmitting(true);

//   try {
//     const form = new FormData();

//     // User fields
//     form.append("role", "seller");
//     form.append("user[firstName]", formData.firstName || "");
//     form.append("user[middleName]", formData.middleName || "");
//     form.append("user[lastName]", formData.lastName || "");
//     form.append("user[email]", formData.email);
//     form.append("user[password]", formData.password);
//     form.append("user[confirmPassword]", formData.confirmPassword);

//     // Contact fields
//     form.append("contact[phoneCode]", formData.phoneCode);
//     form.append("contact[phoneNumber]", formData.phoneNumber);
//     form.append("contact[city]", formData.city);
//     form.append("contact[country]", formData.country);

//     // Company fields
//     form.append("company[name]", formData.companyName);
//     form.append("company[websiteUrl]", formData.companyUrl || "");
//     form.append("company[businessCategory]", selectedCategory);

//     // Files for seller
//     if (profilePhoto) form.append("companyLogo", profilePhoto);
//     if (businessLicense) form.append("businessLicense", businessLicense);
//     if (portfolio) form.append("portfolio", portfolio);

//     // Accepted terms
//     form.append("acceptedTerms", String(acceptedTerms));

//     const res = await apiClient.post("/auth/register", form, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     console.log("✅ Seller registration successful:", res.data);
//     setAlertSuccess({ type: "success", text: "Registered successfully." });
//     router.push("/login");

//   } catch (error: any) {
//     console.error("❌ Registration Error:", error.response?.data || error.message);
//     setAlertSuccess({
//       type: "error",
//       text: error.response?.data?.message || "Registration failed. Try again.",
//     });
//   } finally {
//     setIsSubmitting(false);
//   }
// };
const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (isSubmitting) return;

  // Basic validations
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  if (!acceptedTerms) {
    alert("Please accept Terms & Conditions.");
    return;
  }

  setIsSubmitting(true);

  try {
    // 1️⃣ Upload files first (if present)
    const logoUrl = profilePhoto ? await uploadFile(profilePhoto) : "";
    const licenseUrl = businessLicense ? await uploadFile(businessLicense) : "";
    const portfolioUrl = portfolio ? await uploadFile(portfolio) : "";

    // 2️⃣ Prepare JSON payload
    const payload = {
      role: "seller",
      user: {
        firstName: formData.firstName,
        middleName: formData.middleName || "",
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      },
      contact: {
        phoneCode: formData.phoneCode,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        country: formData.country,
      },
      company: {
        name: formData.companyName,
        crNumber: formData.crNumber || "",
        logoUrl: logoUrl || "",
        businessCategory: selectedCategory,
        experience: Number(formData.experience) || 0,
        websiteUrl: formData.companyUrl || "",
        businessLicenseUrl: licenseUrl || "",
        portfolioUrl: portfolioUrl || "",
      },
      acceptedTerms: acceptedTerms,
    };

    // 3️⃣ Send JSON payload
    const res = await apiClient.post("/auth/register", payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("✅ Seller registration successful:", res.data);
    setAlertSuccess({ type: "success", text: "Registered successfully." });
    router.push("/login");

  } catch (error: any) {
    console.error("❌ Registration Error:", error.response?.data || error.message);
    setAlertSuccess({
      type: "error",
      text: error.response?.data?.message || "Registration failed. Try again.",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <RegisterLayout>
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent: "center",
        // background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
        // background:theme.palette.primary.main,
        py: { xs: 2, sm: 4, md: 6 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box
  sx={{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "900px",
    mb: { xs: 2, sm: 3 },
    px: { xs: 1, sm: 2 },
  }}
>
  {/* Back Button */}
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Button onClick={() => router.push("/welcome")} sx={{ minWidth: "auto", p: 0.5 }}>
      <ArrowBackIcon sx={{ color: "white" }} />
    </Button>
    <Typography
      variant="subtitle1"
      sx={{
        color: "white",
        fontSize: { xs: "0.9rem", sm: "1rem" },
      }}
    >
      {t("BackButton")}
    </Typography>
  </Box>

  {/* Arabic / English Toggle */}
  <Button
    variant="outlined"
    onClick={toggleLanguage}
    sx={{
      color: "white",
      borderColor: "white",
      textTransform: "none",
      fontSize: { xs: "0.8rem", sm: "0.9rem" },
      px: { xs: 1.5, sm: 2 },
      py: { xs: 0.5, sm: 0.7 },
      "&:hover": {
        borderColor: "white",
        backgroundColor: "rgba(255,255,255,0.1)",
      },
    }}
  >
    {locale === "en" ? "عربي" : "English"}
  </Button>
</Box>
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: 4,
          p: { xs: 3, sm: 4, md: 6 },
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center", gap:1, mb:3}}>
                    {/* Default Headings */}
              <AccountCircleOutlinedIcon
                sx={{
                  height: 60,
                  width: 60,
                  color: "white", // icon color
                  backgroundColor: theme.palette.primary.main, // fill background with theme color
                  borderRadius: "60%", // make it circular
                  border: `2px solid ${theme.palette.primary.main}`, // solid border matching theme
                  padding: "12px", // centers the svg nicely
                }}
              />          <Typography variant="subtitle2" sx={{color:theme.palette.primary.main}}>
                      {t("Header")}
                    </Typography>
                    <Typography variant="subtitle1">
                      {t("Header2")}
                    </Typography>
                  </Box>
          <Box>
            {alertSuccess && (
  <Collapse in={!!alert}>
    <Alert
      variant="filled"
      severity={alertSuccess.type}
      sx={{ mb: 2, width: "100%" }}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => setAlertSuccess(null)}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {alertSuccess.text}
    </Alert>
  </Collapse>
)}
          {/* Company Info */}
                    <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                       textAlign: isArabic?"right":"left",
                    }}
                  >
                    {t("CompanyInfoHeader")}
                  </Typography>
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
                {/* Basic Info */}
          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}>
            <CustomTextField
              fullWidth
              label={t("CompanyInfoName")}
              isArabic={isArabic}
              placeholder="Your Company Ltd."
              required
              minChar={3}
              maxChar={50}
              value={formData.companyName}
              onChange={handleFieldChange("companyName")}
            />
            <CustomTextField
              fullWidth
              label={t("CompanyInfoCRNO")}
              isArabic={isArabic}
              placeholder="CR No"
              required
              unique
              value={formData.crNumber}
              onChange={handleFieldChange("email")}
            />
          </Box>
        {/* File Uploads */}
        <Box sx={{display:"flex", flexDirection:"column",gap:1}}>
  <InputFileUpload
    sx={{width:"100%"}}
    text={t("Logo")}
    onFileSelect={handleProfilePhotoSelect}
    isArabic={isArabic}
  />
  <Typography variant="subtitle2" sx={{color:"silver"}}>
    {t("FileCheck")}
  </Typography>
</Box>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}>
            <Box display={"flex"} width={"100%"} flexDirection={"column"} sx={{justifyContent:"flex-start", mt:"15px"}}>
            <Typography
                    variant="subtitle2"
                    display={"flex"}
                    sx={{ fontWeight: "bold", justifyContent: `${isArabic?"flex-end":"flex-start"}` }}
                  >
              {t("BusinessCategory")}
            </Typography>
            <CategorySelect isArabic={isArabic}  value={selectedCategory} onChange={setSelectedCategory} />
            </Box>
            <Box display={"flex"} width={"100%"} flexDirection={"column"} sx={{justifyContent:"flex-start"}}>
            <Box>
            <Typography
                    variant="subtitle2"
                    display={"flex"}
                    
                    sx={{ fontWeight: "bold", justifyContent: `${isArabic?"flex-end":"left"}` }}
                  >
                    {t("Experience")}
                  </Typography>
            </Box>
            <Box>
            <CustomTextField
              fullWidth
              placeholder="5.0"
              value={formData.experience}
              onChange={handleFieldChange("experience")}
              isArabic={isArabic}
            />
            </Box>
          </Box>
          </Box>
           <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}>
            
            <CustomTextField
              fullWidth
              label={t("CompanyURL")}
              isArabic={isArabic}
              placeholder="https://example.com"
              value={formData.companyUrl}
              onChange={handleFieldChange("companyUrl")}
            />
          </Box>
          </Box>
          
          <Box>
            {/* Contact INformation */}
             <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                        textAlign: isArabic?"right":"left",
                      }}
                    >
                      {t("CompanyInfoHeader")}
                    </Typography>
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
                  <Box
            sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}
          >
            <CustomTextField
              fullWidth
              label={t("CompanyInfoEmail")}
              isArabic={isArabic}
              placeholder="johndoe@example.com"
              required
              unique
              value={formData.email}
              onChange={handleFieldChange("email")}
              onErrorChange={handleFieldError}
              fieldName="email"
            />
            {/* <CustomTextField
    sx={{width:"50%"}}
    label={t("CompanyInfoPhoneCode")}
    isArabic={isArabic}
    required
    isPhoneCode
    value={formData.phoneCode}
    onChange={handleFieldChange("phoneCode")}
  /> */}
   <CustomTextField
      label={t("CompanyInfoPhoneCode")}
      isArabic={isArabic}
      placeholder="phone code"
      required
      isPhoneCode
      value={formData.phoneCode}
      onChange={handleFieldChange("phoneCode")}
      onErrorChange={handleFieldError}
      fieldName="phoneCode"
      sx={{width:"50%"}}
    />

  <CustomTextField
    fullWidth
    label={t("CompanyInfoPhoneNumber")}
    isArabic={isArabic}
    required
    phoneFormat
    placeholder="512345678"
    value={formData.phoneNumber}
    onChange={handleFieldChange("phoneNumber")}
  />
          </Box>
 <CustomTextField
            fullWidth
            label={t("CompanySurfaceAddress")}
            isArabic={isArabic}
            required
            maxChar={300}
            value={formData.address}
            onChange={handleFieldChange("address")}
          />
 <Box
             sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}
           >
             {/* <CustomTextField
               fullWidth
               label="Address"
               required
               minChar={2}
               maxChar={50}
               value={formData.address}
               onChange={handleFieldChange("address")}
             /> */}
             <CustomTextField
               fullWidth
               label={t("CompanyInfoCity")}
               isArabic={isArabic}
               placeholder = "Riyadh"
               required
               minChar={5}
               maxChar={50}
               unique
               value={formData.city}
               onChange={handleFieldChange("city")}
             />
              <CustomTextField
     fullWidth
     label={t("CompanyInfoCountry")}
     isArabic={isArabic}
     isCountry
     placeholder="Select Country"
     value={formData.country}
     onChange={handleFieldChange("country")}
   />
             {/* <CustomTextField
               fullWidth
               label="Country"
               required
               minChar={5}
               maxChar={50}
               unique
               value={formData.country}
               onChange={handleFieldChange("country")}
             /> */}
           </Box>

          </Box>
          <Box>
            {/* Security */}
            <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                        textAlign: isArabic?"right":"left",
                      }}
                    >
                      {t("SecurityHeader")}
                    </Typography>
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
{/* Password */}
          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}>
            <CustomTextField
              fullWidth
              label={t("SecurityPassword")}
              isArabic={isArabic}
              required
              type="password"
              value={formData.password}
              onChange={handleFieldChange("password")}
            />
            <CustomTextField
              fullWidth
              label={t("SecurityConfirmPassword")}
              isArabic={isArabic}
              required
              type="password"
              value={formData.confirmPassword}
              onChange={handleFieldChange("confirmPassword")}
            />
          </Box>
            </Box>
<Box>
  {/* Required Documents */}
  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                        textAlign: isArabic?"right":"left",
                      }}
                    >
                      {t("RequiredDocHeader")}
                    </Typography>
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
                  <Box>
          <InputFileUpload text={t("BusinessLicense")} onFileSelect={handleLicenseSelect} isArabic={isArabic} />
          {businessLicense && (
            <Typography variant="body2" color="textSecondary">
              {businessLicense.name}
            </Typography>
          )}

          <InputFileUpload text={t("Portfolio")} onFileSelect={handlePortfolioSelect} isArabic={isArabic} />
          {portfolio && (
            <Typography variant="body2" color="textSecondary">
              {portfolio.name}
            </Typography>
          )}

          <Box sx={{backgroundColor:theme.palette.grey[200],borderRadius:3,mt:1}}>
                    <FormGroup>
                      <FormControlLabel
                        required
                        sx={{
    ml: 1,
    '& .MuiFormControlLabel-asterisk': {
      display: 'none',
    },
  }}    
                        control={
                          <Checkbox
                            color="primary"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                          />
                        }
                        label={
                              <Box display="flex" alignItems="center" gap={0.5}>
                                  {/* <Typography component="span" sx={{ color: 'red' }}>*</Typography>
                        
                                <Typography sx={{ fontSize: 14 }}>{t("AcceptTerms")}</Typography> */}
                                
                                <TermsAndConditionsModal />
                              </Box>
                        }
                      />
                    </FormGroup>
                    </Box>
          </Box>
</Box>
          {/* <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}>
            <CustomTextField
              fullWidth
              label="Company Fax No."
              required
              minChar={3}
              maxChar={50}
              value={formData.fax}
              onChange={handleFieldChange("fax")}
            />
            <CustomTextField
              fullWidth
              label="Phone Number"
              required
              phoneFormat
              minChar={13}
              maxChar={13}
              value={formData.phone}
              onChange={handleFieldChange("phone")}
            />
          </Box> */}

          

          

          {/* Address Info */}
         

         

          

         

         

          {/* Buttons */}
           <Box display={"flex"} gap={2} flexDirection={{ xs: "column", sm: "row" }}>
                      <Button
                      type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                          borderRadius: 3,
                          textTransform: "none",
                          background: theme.palette.primary.main,
                          color: theme.palette.common.white,
                          // "&:hover": {
                          //   background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.success.dark})`,
                          // },
                        }}
                      >
                        {isSubmitting ? "Registering..." : `${t("RegisterButton")}`}
                      </Button>
          
                      <Button
                        variant="contained"
                        fullWidth
                        disabled={isSubmitting}
                        onClick={() => router.push('/')}
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                          borderRadius: 3,
                          textTransform: "none",
                          background:theme.palette.grey[200],
                          color: theme.palette.common.black,
                          // "&:hover": {
                          //   background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                          // },
                        }}
                      >
                      {t("CancelButton")}
                        {/* {isSubmitting ? "Registering..." : "Register"} */}
                      </Button>
                    </Box>
        </Box>
      </Container>
    </Box>
    </RegisterLayout>
  );
};

export default SellerRegister;
