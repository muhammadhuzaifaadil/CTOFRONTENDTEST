"use client"
import {useContext, useState} from 'react';
import DashBoardLayout from "@/app/layouts/DashboardLayout";
import { Box, Button, CircularProgress, Container, Divider, TextField, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import CustomTextField from "@/app/components/CustomTextField";
import { useAuth } from "@/hooks/useAuth";
import CategorySelect from '@/app/components/CategorySelect';
import apiClient from '@/api/apiClient';
import { LanguageContext } from '@/app/contexts/LanguageContext';
import { useTranslations } from 'next-intl';

const ProfileManagement:React.FC = ()=>{
    const theme = useTheme()
    const router = useRouter()
    const { user, isAuthenticated, logout,updateUser } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState("");
    const {isArabic,locale} = useContext(LanguageContext)
    const t = useTranslations("ProfileManagement")
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

      const handleFieldChange =
      (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
      };


  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Construct raw payload
    const rawPayload = {
      FirstName: formData.firstName,
      MiddleName: formData.middleName,
      LastName: formData.lastName,
      email: user?.email, // not editable but sent
      PhoneCode: formData.phoneCode,
      PhoneNumber: formData.phoneNumber,
      Address: formData.address,
      City: formData.city,
      Country: formData.country,
      experience: formData.experience,
      CompanyName: formData.companyName,
      websiteUrl: formData.companyUrl,
      businessCategory: selectedCategory,
    };

    // ✅ Remove empty ("") or undefined/null fields
    const payload = Object.fromEntries(
      Object.entries(rawPayload).filter(
        ([, value]) => value !== "" && value !== undefined && value !== null
      )
    );

    console.log("📤 Submitting cleaned payload:", payload);

    const res = await apiClient.put(`/users/${user?.id}`, payload);

    if (res.data?.Success) {
      updateUser({
    firstName: formData.firstName,
    // middleName: formData.middleName,
    lastName: formData.lastName,
    companyName: formData.companyName,
  });
      alert("✅ Profile updated successfully!");
      router.push("/dashboard/seller");
    } else {
      alert("⚠️ Failed to update profile. Please try again.");
    }
  } catch (err: any) {
    console.error("❌ Error updating profile:", err);
    alert("Error updating profile. Check console for details.");
  }
};


    return(
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "white",
    mt: { xs: 8,sm:4, md: 3 },
    py: { xs: 2, sm: 4, md: 6 },
  }}
>
  {/* Back Button */}
  <Box
    sx={{
      display: "flex",
      width: { xs: "95%", sm: "75%", md: "75%" },
      justifyContent: isArabic?"flex-end":"flex-start",
      mb: 2,
    }}
  >
    <Button
      startIcon={<ArrowBackIcon 
      sx={{
        transform: isArabic ? "scaleX(-1)" : "none", // 👈 flips arrow direction
            transition: "transform 0.2s ease",
      }}/>}
      onClick={() => router.push("/dashboard/seller")}
      sx={{
        textTransform: "none",
        fontSize: { xs: "14px", sm: "16px", md: "16px" },
        fontWeight: 600,
        display:"flex",
        flexDirection:isArabic?"row-reverse":"row",
        gap:isArabic?"4px":0,
        color: "black",
      }}
    >
      {t("BackButton")}
    </Button>
  </Box>

  {/* Main Container */}
  <Container
    maxWidth={false}
    sx={{
      backgroundColor: theme.palette.background.default,
      borderRadius: 3,
      width: { xs: "90%", sm: "90%", md: "1152px" },
      p: { xs: 2, sm: 3, md: 5 },
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      transition: "0.3s ease",
      overflowX: "hidden",
    }}
  >
    {/* Logo Headers */}
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <AccountCircleOutlinedIcon
        sx={{
          height: { xs: 50, sm: 55, md: 60 },
          width: { xs: 50, sm: 55, md: 60 },
          color: "white",
          backgroundColor: theme.palette.primary.main,
          borderRadius: "50%",
          border: `2px solid ${theme.palette.primary.main}`,
          padding: "12px",
        }}
      />
      <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }}>
        {t("Header1")}
      </Typography>
      <Typography variant="subtitle1">{t("Header2")}</Typography>
    </Box>

    {/* Account Info */}
    <Box sx={{ gap: 1, display: "flex", flexDirection: "column", width: "100%", mt: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: theme.palette.primary.main, textAlign: isArabic ? "right" : "left" }}
      >
        {t("AccountInfoHeader")}
      </Typography>
      <Divider
        sx={{
          mt: 1,
          borderBottomWidth: 3,
          borderColor: theme.palette.primary.main,
          opacity: 0.7,
          width: "100%",
        }}
      />
      <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" }, width: "100%" }}>
        {/* Email */}
        <Box sx={{ display: "flex", flexDirection: "column", width: { xs: "100%", md: "50%" } }}>
          <Typography
            sx={{ fontWeight: "bold" }}
            display={"flex"}
            justifyContent={isArabic ? "flex-end" : "flex-start"}
          >
            {t("AccountEmail")}
          </Typography>
          <TextField fullWidth label={`${user?.email}`} disabled />
          <Typography sx={{ display: "flex", justifyContent: isArabic ? "flex-start" : "flex-end" }}>
            {t("AccountEmailCheck")}
          </Typography>
        </Box>

        {/* Role */}
        <Box sx={{ display: "flex", flexDirection: "column", width: { xs: "100%", md: "50%" } }}>
          <Typography
            sx={{ fontWeight: "bold" }}
            display={"flex"}
            justifyContent={isArabic ? "flex-end" : "flex-start"}
          >
            {t("AccountRole")}
          </Typography>
          <TextField fullWidth label={`${user?.role}`} disabled />
          <Typography sx={{ display: "flex", justifyContent: isArabic ? "flex-start" : "flex-end" }}>
            {t("AccountRoleCheck")}
          </Typography>
        </Box>
      </Box>
    </Box>

    {/* Personal Info */}
    <Box sx={{ gap: 1, display: "flex", flexDirection: "column", width: "100%", mt: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: theme.palette.primary.main, textAlign: isArabic ? "right" : "left" }}
      >
        {t("PersonalInfoHeader")}
      </Typography>
      <Divider sx={{ mt: 1, borderBottomWidth: 3, borderColor: theme.palette.primary.main, opacity: 0.7, width: "100%" }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
        {/* Name Fields */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1, width: "100%" }}>
          <CustomTextField fullWidth label={t("PersonalInfoFirstName")} placeholder="John" isArabic={isArabic} required minChar={3} maxChar={50} value={formData.firstName} onChange={handleFieldChange("firstName")} />
          <CustomTextField fullWidth label={t("PersonalInfoMiddleName")} placeholder="Optional" isArabic={isArabic} minChar={3} maxChar={50} value={formData.middleName} onChange={handleFieldChange("middleName")} />
          <CustomTextField fullWidth label={t("PersonalInfoLastName")} placeholder="Doe" isArabic={isArabic} required minChar={3} maxChar={50} value={formData.lastName} onChange={handleFieldChange("lastName")} />
        </Box>

        {/* Phone Fields */}
        <Box sx={{ display: "flex", flexDirection: { xs: "row", md: "row" }, gap: 1, width: "100%" }}>
          <CustomTextField sx={{ width: { xs: "100%", md: "30%" } }} label={t("PersonalInfoPhoneCode")} isArabic={isArabic} required isPhoneCode value={formData.phoneCode} onChange={handleFieldChange("phoneCode")} />
          <CustomTextField fullWidth label={t("PersonalInfoPhoneNumber")} isArabic={isArabic} required phoneFormat placeholder="512345678" value={formData.phoneNumber} onChange={handleFieldChange("phoneNumber")} />
        </Box>
      </Box>
    </Box>

    {/* Address Info */}
    <Box sx={{ gap: 1, display: "flex", flexDirection: "column", width: "100%", mt: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.primary.main, textAlign: isArabic ? "right" : "left" }}>
        {t("AddressHeader")}
      </Typography>
      <Divider sx={{ mt: 1, borderBottomWidth: 3, borderColor: theme.palette.primary.main, opacity: 0.7, width: "100%" }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
        <CustomTextField fullWidth label={t("AddressSurfaceAdd")} isArabic={isArabic} required minChar={3} maxChar={50} value={formData.address} onChange={handleFieldChange("address")} />
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1, width: "100%" }}>
          <CustomTextField fullWidth label={t("AddressCity")} placeholder="Riyadh" isArabic={isArabic} required minChar={3} maxChar={50} unique value={formData.city} onChange={handleFieldChange("city")} />
          <CustomTextField fullWidth label={t("AddressCountry")} isArabic={isArabic} isCountry placeholder="Select Country" value={formData.country} onChange={handleFieldChange("country")} />
        </Box>
      </Box>
    </Box>

    {/* Business Info */}
    <Box sx={{ gap: 1, display: "flex", flexDirection: "column", width: "100%", mt: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>{t("BusinessInfoHeader")}</Typography>
      <Divider sx={{ mt: 1, borderBottomWidth: 3, borderColor: theme.palette.primary.main, opacity: 0.7, width: "100%" }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1, width: "100%" }}>
          {/* <CategorySelect label={`${t("BusinessInfoCategory")}`} value={selectedCategory} onChange={setSelectedCategory} /> */}
          <Box display={"flex"} width={"100%"} flexDirection={"column"} sx={{justifyContent:"flex-start", mt:"15px"}}>
            <Typography
                    variant="subtitle2"
                    display={"flex"}
                    sx={{ fontWeight: "bold", justifyContent: `${isArabic?"flex-end":"flex-start"}` }}
                  >
              {t("BusinessInfoCategory")}
            </Typography>
            <Box sx={{position:"relative"}}>
            <CategorySelect isArabic={isArabic}  value={selectedCategory} onChange={setSelectedCategory} />
            </Box>
            </Box>
         <Box display={"flex"} width={"100%"} flexDirection={"column"} sx={{justifyContent:"flex-start"}}>
            <Box>
            <Typography
                    variant="subtitle2"
                    display={"flex"}
                    
                    sx={{ fontWeight: "bold", justifyContent: `${isArabic?"flex-end":"left"}` }}
                  >
                    {t("BusinessInfoExp")}
                  </Typography>
            </Box>
            <Box>
            <CustomTextField
              fullWidth
              placeholder="5.0"
              value={formData.experience}
              onChange={handleFieldChange("experience")}
            />
            </Box>
          </Box>
          {/* <CustomTextField
            fullWidth
            label={`${t("BusinessInfoExp")}`}
            isArabic={isArabic}
            placeholder="5.0"
            value={formData.experience}
            onChange={handleFieldChange("experience")}
          /> */}
        </Box>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1, width: "100%" }}>
          <CustomTextField fullWidth label={t("BusinessInfoCompanyName")} isArabic={isArabic} placeholder="Your Company Ltd." required minChar={3} maxChar={50} value={formData.companyName} onChange={handleFieldChange("companyName")} />
          <CustomTextField fullWidth label={t("BusinessInfoCompanyURL")} isArabic={isArabic} placeholder="https://example.com" value={formData.companyUrl} onChange={handleFieldChange("companyUrl")} />
        </Box>
      </Box>
    </Box>

    {/* Submit Button */}
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", mt: 2 }}>
      <Button onClick={handleSubmit} sx={{ color: "white", backgroundColor: theme.palette.primary.main, width: "100%", borderRadius: 3, py: 1.1 }}>
        {t("EditProfileButton")}
      </Button>
    </Box>
  </Container>
</Box>
    )}
        </DashBoardLayout>
    )
};

export default ProfileManagement;