"use client"
import React, { useContext, useState } from "react";
import apiClient from "@/api/apiClient";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import CustomTextField from "../../components/CustomTextField";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import RegisterLayout from "@/app/layouts/RegisterLayout";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { useTranslations } from "next-intl";
import TermsAndConditionsModal from "@/app/components/TermsandConditions";
import PhoneNumberFields from "@/app/components/PhoneNumberField";
import InputFileUpload from "@/app/components/InputFileUpload";
const BuyerRegister: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  // Form state
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
    companyUrl: "",
    category: "",
  });
  const {isArabic,toggleLanguage,locale} = useContext(LanguageContext)
  const t = useTranslations("BuyerRegister")
  const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});
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
const handleFieldError = (field: string, hasError: boolean) => {
  setFieldErrors((prev) => ({ ...prev, [field]: hasError }));
};
  // Generic handler for all fields
  // const handleFieldChange =
  //   (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const value = e.target.value;
  //     setFormData((prev) => ({ ...prev, [field]: value }));
  //   };

  const handleFieldChange =
  (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (isSubmitting) return;


  // 🔍 Check for missing required fields
  const requiredFields = [
    "firstName", "lastName", "email", 
    "phoneCode", "phoneNumber",
    "city", "country", "password", "confirmPassword"
  ];
 const requiredFieldsArabic = [
  "الاسم الأول",
  "اسم العائلة",
  "البريد الإلكتروني",
  // "رمز الهاتف",
  // "رقم الهاتف",
  "المدينة",
  "الدولة",
  "كلمة المرور",
  "تأكيد كلمة المرور"
];



  const missing = requiredFields.filter((f) => !formData[f]);
  if (missing.length > 0) {
    console.log("missing",missing)
    alert(`Please fill all required fields: ${missing.join(", ")}`);
    
    return;
  }

  // 🔍 Check if any field has validation errors
  const hasErrors = Object.values(fieldErrors).some((err) => err === true);
  if (hasErrors) {
    console.log(hasErrors)
    alert("Please fix the highlighted errors before submitting.");
    return;
  }


  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  setIsSubmitting(true);

  try {

    const logoUrl = profilePhoto ? await uploadFile(profilePhoto) : "";

    const payload = {
      role: "buyer", // or "seller"
      user: {
        firstName: formData.firstName,
        middleName: formData.middleName || null,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      },
      contact: {
        phoneCode: formData.phoneCode,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        country: formData.country,
      },
      company: formData.companyName
        ? {
            name: formData.companyName,
            websiteUrl: formData.companyUrl,
            businessCategory: formData.category,
            logoUrl: logoUrl || "",
          }
        : undefined,
      acceptedTerms: acceptedTerms,
    };

    const res = await apiClient.post('/auth/register', payload);

    console.log("✅ Registration Successful:", res.data);
    setAlertSuccess({ type: "success", text: "You have been registered successfully." });;
    
    router.push('/login');
  } catch (error: any) {
    console.error("❌ Registration Error:", error.response?.data || error.message);
    setAlertSuccess({
      type: "error",
      text: error.response?.data?.message || "Registration failed. Please try again.",
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
        maxWidth: "100%",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // background:theme.palette.primary.main,
        // background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
        py: { xs: 2, sm: 4, md: 6 },
        px: { xs: 2, sm: 3 },
      }}
    >
      {/* back and arabic toggle button */}
      {/* Back and Arabic toggle button */}
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
          borderRadius: 3,
          p: { xs: 3, sm: 4, md: 6 },
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
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

        <Box sx={{gap:1}}>
          {/* Personal Information */}
          <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            textAlign: isArabic?"right":"left",
          }}
        >
          {t("PersonalInfoHeader")}
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
          {/* Name Fields */}
          <Box
            sx={{ display: "flex", gap: 2,mt:1, flexDirection: { xs: "column", md: "row" } }}
          >
            <CustomTextField
              fullWidth
              
              label={t("PersonalInfoFirstName")}
              placeholder="John"
              required
              isArabic={isArabic}
              minChar={3}
              maxChar={50}
              value={formData.firstName}
              onChange={handleFieldChange("firstName")}
              onErrorChange={handleFieldError}
              fieldName="firstName"
            />
            <CustomTextField
              fullWidth
              label={t("PersonalInfoMiddleName")}
              isArabic={isArabic}
              placeholder="Optional"
              minChar={3}
              maxChar={50}
              value={formData.middleName}
              onChange={handleFieldChange("middleName")}
            />
            <CustomTextField
              fullWidth
              label={t("PersonalInfoLastName")}
              isArabic={isArabic}
              placeholder="Doe"
              required
              minChar={3}
              maxChar={50}
              value={formData.lastName}
              onChange={handleFieldChange("lastName")}
              onErrorChange={handleFieldError}
              fieldName="lastName"
            />
          </Box>
          {/* Contact Fields */}
          <Box
            sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}
          >
            <CustomTextField
              fullWidth
              label={t("PersonalInfoEmail")}
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
    fullWidth
    label="Phone Code"
    placeholder="phone code"
    required
    isPhoneCode
    value={formData.phoneCode}
    onChange={handleFieldChange("phoneCode")}
    onErrorChange={handleFieldError}
    fieldName="phoneCode"
  />

  <CustomTextField
    fullWidth
    label="Phone Number"
    required
    phoneFormat
    placeholder="512345678"
    value={formData.phoneNumber}
    onChange={handleFieldChange("phoneNumber")}
    onErrorChange={handleFieldError}
    fieldName="phoneNumber"
  /> */}
  <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" }, width: "100%" }}>
  <Box sx={{ flexBasis: { xs: "100%", md: "30%" }, flexShrink: 0 }}>
    <CustomTextField
      label={t("PersonalInfoPhoneCode")}
      isArabic={isArabic}
      placeholder="phone code"
      required
      isPhoneCode
      value={formData.phoneCode}
      onChange={handleFieldChange("phoneCode")}
      onErrorChange={handleFieldError}
      fieldName="phoneCode"
      sx={{width:"120px"}}
    />
   {/* <PhoneNumberFields
  isArabic={isArabic}
  t={t}
  phoneCode={formData.phoneCode}
  phoneNumber={formData.phoneNumber}
  onPhoneCodeChange={(value) =>
    setFormData((prev) => ({ ...prev, phoneCode: value }))
  }
  onPhoneNumberChange={(value) =>
    setFormData((prev) => ({ ...prev, phoneNumber: value }))
  }
  onPhoneError={(field, hasError) =>
    setFieldErrors((prev) => ({ ...prev, [field]: hasError }))
  }
/> */}


  </Box>

  <Box sx={{ flexBasis: { xs: "100%", md: "70%" } }}> 
    <CustomTextField
      label={t("PersonalInfoPhoneNumber")}
      isArabic={isArabic}
      required
      phoneFormat
      placeholder="512345678"
      value={formData.phoneNumber}
      onChange={handleFieldChange("phoneNumber")}
      onErrorChange={handleFieldError}
      fieldName="phoneNumber"
    />
  </Box>

  
</Box>

           
          </Box>
          {/* Address */}
          <Box
            sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}
          >
           
            <CustomTextField
              fullWidth
              label={t("PersonalInfoCity")}
              isArabic={isArabic}
              placeholder = "Riyadh"
              required
              minChar={3}
              maxChar={50}
              isAlphabetOnly={true}
              unique
              value={formData.city}
              onChange={handleFieldChange("city")}
              onErrorChange={handleFieldError}
              fieldName="city"
            />
             <CustomTextField
    fullWidth
    label={t("PersonalInfoCountry")}
    isArabic={isArabic}
    required
    isCountry
    placeholder="Select Country"
    value={formData.country}
    onChange={handleFieldChange("country")}
    onErrorChange={handleFieldError}
    fieldName="country"
  />
         
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
           {/* Password Fields */}
          <Box
            sx={{ display: "flex", gap: 2,mt:1, flexDirection: { xs: "column", md: "row" } }}
          >
            <CustomTextField
              fullWidth
              label={t("SecurityPassword")}
              isArabic={isArabic}
              placeholder="Enter Password"
              required
              type="password"
              fieldName="password"
              minChar={8}
              value={formData.password}
              onChange={handleFieldChange("password")}
              onErrorChange={handleFieldError}
            />

            <CustomTextField
              fullWidth
              label={t("SecurityConfirmPassword")}
              isArabic={isArabic}
              placeholder="Confirm Password"
              required
              type="password"
              fieldName="confirmPassword"
              minChar={8}
              value={formData.confirmPassword}
              confirmValue={formData.password}
              onChange={handleFieldChange("confirmPassword")}
              onErrorChange={handleFieldError}
            
            />

          </Box>
        </Box>
        <Box>
          {/* Company Info and Terms And Conditions */}
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
      {/* Company Info */}
          <Box
            sx={{ display: "flex", gap: 2,mt:1, flexDirection: { xs: "column", md: "row" } }}
          >
            <CustomTextField
              fullWidth
              label={t("CompanyName")}
              isArabic={isArabic}
              placeholder="Your Company Ltd."
              value={formData.companyName}
              onChange={handleFieldChange("companyName")}
            />
            <CustomTextField
              fullWidth
              label={t("CompanyWebsite")}
              isArabic={isArabic}
              placeholder="https://example.com"
              value={formData.companyUrl}
              onChange={handleFieldChange("companyUrl")}
            />
            
          </Box>

             <InputFileUpload
                sx={{display:"flex",width:"100%",textAlign:"center"}}
                text={t("Logo")}
                onFileSelect={handleProfilePhotoSelect}
                isArabic={isArabic}
              />
           {/* Terms */}
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
    // sx={{ml:1}}
              control={
                <Checkbox
                  color="primary"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
              }
              // label={t("TermsAcceptance")}
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
          {/* Upload + Category */}
      
        </Box>
        <Box>
          {/* Buttons */}
        </Box>
          {/* Buttons */}
          <Box display={"flex"} gap={2} flexDirection={{ xs: "column", sm: "row" }}>
            <Button
              variant="contained"
              type="submit"
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
                //   background: `lightred`,
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

export default BuyerRegister;



