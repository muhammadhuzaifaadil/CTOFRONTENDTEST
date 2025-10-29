"use client"
import react, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CustomTextField from "../components/CustomTextField";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import apiClient from "@/api/apiClient"; // axios client
import { useTranslations } from "next-intl";
import {useRouter} from "next/navigation";

const ForgotPassword: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await apiClient.post("/auth/generate-otp", { email });
      setStep("otp");
    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await apiClient.post("/auth/verify-otp", { email, otp });
      setResetToken(res.data.resetToken);
      setStep("reset");
    } catch (err) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

 const handleResetPassword = async () => {
    if (!newPassword) return alert("Please enter your new password");
    setLoading(true);
    try {
      await apiClient.post("/auth/reset-password", {
        token: resetToken,
        newPassword,
      });
      alert("✅ Password reset successful! Please log in again.");
      window.location.href = "/login";
    } catch (err) {
      alert("Password reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

const t = useTranslations("ForgotPage");
    const [locale, setLocale] = useState<string>("en");
     // Load locale from cookie or browser
    useEffect(() => {
      const cookieLocale = document.cookie
        .split("; ")
        .find((row) => row.startsWith("CTONEXTAPP_LOCALE="))
        ?.split("=")[1];
  
      if (cookieLocale) setLocale(cookieLocale);
      else {
        const browserLocale = navigator.language.slice(0, 2);
        document.cookie = `CTONEXTAPP_LOCALE=${browserLocale}; path=/;`;
        setLocale(browserLocale);
        router.refresh();
      }
    }, [router]);
  
    const toggleLanguage = () => {
      const newLocale = locale === "en" ? "ar" : "en";
      document.cookie = `CTONEXTAPP_LOCALE=${newLocale}; path=/;`;
      setLocale(newLocale);
      router.refresh();
    };
  
    const isArabic = locale === "ar";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // background: theme.palette.primary.main,
        backgroundImage: "url('/cto/blue-bg.png')", // <-- export from Figma as SVG/PNG and put in /public
          backgroundSize: "cover",
          backgroundPosition: "center",
        py: { xs: 2, sm: 4, md: 6 },
      }}
    >
      {/* Back Button */}
      <Box sx={{ display: "flex",     width: { xs: "90%", sm: "70%", md: "50%", lg: "30%" },  justifyContent: "flex-start" }}>
         
        <Button
          startIcon={<ArrowBackIcon />}
          href="/login"
          sx={{
            display:"flex",
            justifyContent:"flex-start",
            width:"100%",
            textTransform: "none",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            marginTop: "20px",
          }}
        >
          {t("Header1")}
        </Button>

        {/* arabic english toggle */}
              <Button
                variant="outlined"
                onClick={toggleLanguage}
                sx={{ display:"flex",justifyContent:"flex-end",width:"100%",mt:1,textTransform: "none",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            marginTop: "20px",
            border:"ActiveBorder" }}
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
    width: { xs: "90%", sm: "70%", md: "50%", lg: "30%" }, // ✅ Responsive widths
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
          <EmailOutlinedIcon
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
          <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }}>
            {t("Header1")}
          </Typography>

          {step === "email" && (
            <>
              <Typography variant="subtitle1">{t("Header2")}</Typography>
              <Typography variant="body1" sx={{ color: "#6c757d", textAlign: "center" }}>
                {t("Content")}
              </Typography>
            </>
          )}

          {step === "otp" && (
            <>
              <Typography variant="subtitle1">{t("OTPHeader")}</Typography>
              <Typography variant="body1" sx={{ color: "#6c757d", textAlign: "center" }}>
                {t("OTPContent")}
              </Typography>
            </>
          )}

          {step === "reset" && (
            <>
              <Typography variant="subtitle1">{t("NewPassHeader")}</Typography>
              <Typography variant="body1" sx={{ color: "#6c757d", textAlign: "center" }}>
                {t("NewPassContent")}
              </Typography>
            </>
          )}
        </Box>

        {/* Form Fields */}
        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {step === "email" && (
            <>
              <CustomTextField
                label={`${t("FieldLabel")}`}
                type="email"
                placeholder={`${t("FieldPlaceholder")}`}
                fullWidth
                required
                isArabic={isArabic}
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                disabled={loading}
                onClick={handleSendOtp}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  py: 1.5,
                }}
              >
                {loading ? <CircularProgress size={24} /> : `${t("SendOTPButton")}`}
              </Button>
            </>
          )}

          {step === "otp" && (
            <>
              {/* <TextField
                label="Enter OTP"
                placeholder="4-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                fullWidth
              /> */}

              {/* 🔹 OTP Input Boxes */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mb: 3,
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <TextField
          key={index}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "600",
              width: "50px",
              height: "55px",
              borderRadius: "10px",
            },
          }}
          value={otp[index] || ""}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ""); // only digits
            if (value.length > 1) return;

            const otpArray = otp.split("");
            otpArray[index] = value;
            setOtp(otpArray.join(""));

            // Auto focus next box
            if (value && index < 5) {
              const nextInput = document.getElementById(`otp-${index + 1}`);
              if (nextInput) nextInput.focus();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !otp[index] && index > 0) {
              const prevInput = document.getElementById(`otp-${index - 1}`);
              if (prevInput) prevInput.focus();
            }
          }}
          id={`otp-${index}`}
        />
      ))}
    </Box>

              <Button
                variant="contained"
                fullWidth
                disabled={loading}
                onClick={handleVerifyOtp}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  py: 1.5,
                }}
              >
                {loading ? <CircularProgress size={24} /> : `${t("OTPConfirmButton")}`}
              </Button>
            </>
          )}

          {step === "reset" && (
            <>
              <CustomTextField
                label={t("NewPasswordLabel")}
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e: any) => setNewPassword(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                disabled={loading}
                onClick={handleResetPassword}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  py: 1.5,
                }}
              >
                {loading ? <CircularProgress size={24} /> : `${t("ResetPasswordButton")}`}
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;