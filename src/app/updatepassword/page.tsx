"use client"
import react,{useContext, useState} from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
  useTheme,
} from "@mui/material";
import CustomTextField from "../components/CustomTextField";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockPersonSharpIcon from '@mui/icons-material/LockPersonSharp';
import { AuthContext } from "@/app/contexts/AuthContext";
import passwordUpdateService  from "@/api/userService";
import { useRouter } from "next/navigation";
import { LanguageContext } from "../contexts/LanguageContext";
import { useTranslations } from "next-intl";
const updatePassword :React.FC = () =>{
    const theme = useTheme();
    const router = useRouter();
  const { isAuthenticated, user } = useContext(AuthContext);
  const {locale,isArabic,toggleLanguage} = useContext(LanguageContext)
  const t = useTranslations("UpdatePassword")
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Redirect if not logged in
  if (!isAuthenticated&&!user) {
    router.push("/login");
    return null;
  }
    const arr = [
        `${t("firstrequirement")}`,
        `${t("secondrequirement")}`,
        `${t("thirdrequirement")}`,
        `${t("fourthrequirement")}`,
        `${t("fifthrequirement")}`
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
console.log("all passwords:")
console.log("current pass",form.currentPassword)
console.log("new pass",form.newPassword)
console.log("conifrm new pass",form.confirmNewPassword)
    try {
      const res = await passwordUpdateService(form);
      <Alert variant="filled" severity="success">
      You have successfully updated the password.
    </Alert>
      setMessage({ type: "success", text: res });
      setForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      if (user?.role === "buyer") router.push("/dashboard/buyer");
    else if (user?.role === "seller") router.push("/dashboard/seller");
    else router.push("/dashboard/admin");
      
    } catch (error: any) {
      <Alert variant="filled" severity="error">
      Password cannot be updated.
    </Alert>
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update password",
      });
    } finally {
      setLoading(false);
    }
  };

    return (
       
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
    backgroundImage: "url('/cto/blue-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    py: { xs: 2, sm: 4, md: 6 },
    px: { xs: 2, sm: 3 },
  }}
>
  {/* Back Button & Language Toggle */}
{/* Back Button & Language Toggle */}
<Box
  sx={{
    display: "flex",
    width: {xs:"100%",sm:"100%",md:"50%"},
    justifyContent: "space-between", // left & right alignment
    alignItems: "center",
    mb: { xs: 2, sm: 2, md: 3 },
    px: { xs: 0, sm: 0, md: 0 },
  }}
>
  {/* Back Button */}
  <Button
    startIcon={<ArrowBackIcon />}
    onClick={() => router.push("/dashboard/buyer")}
    sx={{
      textTransform: "none",
      color: "white",
      fontSize: { xs: "14px", sm: "15px", md: "16px" },
      fontWeight: "600",
      justifyContent: "flex-start",
    }}
  >
    {t("backbutton")}
  </Button>

  {/* Arabic/English Toggle */}
  <Button
    variant="outlined"
    onClick={toggleLanguage}
    sx={{
      textTransform: "none",
      justifyContent: "center",
      color: "white",
      fontSize: { xs: "14px", sm: "15px", md: "16px" },
      fontWeight: "600",
      borderColor: "white",
    }}
  >
    {locale === "en" ? "عربي" : "English"}
  </Button>
</Box>



  {/* Form Container */}
  <Container
    maxWidth="md"
    sx={{
      backgroundColor: theme.palette.background.default,
      borderRadius: 3,
      width: { xs: "100%", sm: "90%", md: "50%" },
      p: { xs: 2, sm: 3, md: 6 },
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      gap: 3,
    }}
  >
    {/* Form Header */}
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <LockPersonSharpIcon
        sx={{
          fontSize: { xs: 40, sm: 50, md: 60 },
          height: { xs: 50, sm: 60, md: 60 },
          width: { xs: 50, sm: 60, md: 60 },
          backgroundColor: theme.palette.primary.main,
          color: "white",
          borderRadius: "50%",
          border: `2px solid ${theme.palette.primary.main}`,
          padding: "12px",
        }}
      />
      <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }}>
        {t("Header")}
      </Typography>
      <Typography variant="subtitle1">{t("Header2")}</Typography>
      <Typography variant="body1" sx={{ color: "#6c757d", textAlign: "center" }}>
        {t("Content")}
      </Typography>
    </Box>

    {/* Password Fields */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <CustomTextField
        label={`${t("CurrentPassLabel")}`}
        fieldName="currentPassword"
        placeholder={`${t("CurrentPassPlaceholder")}`}
        onChange={handleChange}
        isArabic={isArabic}
        value={form.currentPassword}
        required
        type="password"
        fullWidth
      />
      <CustomTextField
        label={`${t("NewPasswordLabel")}`}
        fieldName="newPassword"
        placeholder={`${t("NewPasswordPlaceholder")}`}
        type="password"
        onChange={handleChange}
        value={form.newPassword}
        isArabic={isArabic}
        required
        fullWidth
      />
      <CustomTextField
        label={`${t("ConfirmNewPasswordLabel")}`}
        fieldName="confirmNewPassword"
        placeholder={`${t("ConfirmNewPasswordPlaceholder")}`}
        onChange={handleChange}
        isArabic={isArabic}
        value={form.confirmNewPassword}
        confirmValue={form.newPassword}
        required
        type="password"
        fullWidth
      />

      {/* Password Requirements */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "flex-start",
          mt: 1,
          backgroundColor: "lightgray",
          borderRadius: 2,
          p: 1,
        }}
      >
        <Typography variant="body1">{t("PasswordRequirementsHeader")}</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mt: 1, pl: 1 }}>
          {arr.map((req, idx) => (
            <Typography key={idx} variant="body2" sx={{ color: "#6c757d" }}>
              {"\u2022\u00A0"}{req}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>

    {/* Action Buttons */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        mt: 2,
      }}
    >
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        fullWidth
        sx={{
          backgroundColor: theme.palette.primary.main,
          textTransform: "none",
          fontSize: "16px",
          fontWeight: "600",
          py: 1.2,
          borderRadius: 4,
        }}
      >
        {t("updatebutton")}
      </Button>
      <Button
        variant="outlined"
        fullWidth
        onClick={()=>{router.push(`/dashboard/${user?.role}`)}}
        sx={{
          color: "black",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: "600",
          py: 1.2,
          borderRadius: 4,
          borderColor: "#ced4da",
          backgroundColor: "lightgray",
        }}
      >
        {t("cancelbutton")}
      </Button>
    </Box>
  </Container>
</Box>

    );
}
export default updatePassword;