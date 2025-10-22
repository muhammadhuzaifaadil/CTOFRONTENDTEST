"use client"
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import { LanguageContext } from "../contexts/LanguageContext";

const Login: React.FC = () => {
    const router = useRouter();
    const { login, isAuthenticated, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
    if (!email || !password) return alert("Enter email and password");
    setLoading(true);
    try {
      console.log("trying",email,password);
      await login(email, password);
      // Redirect handled inside login based on role
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  const {isArabic,locale,toggleLanguage} = useContext(LanguageContext)
  const t = useTranslations("Login");
    // const [locale, setLocale] = useState<string>("en");
    //  // Load locale from cookie or browser
    // useEffect(() => {
    //   const cookieLocale = document.cookie
    //     .split("; ")
    //     .find((row) => row.startsWith("CTONEXTAPP_LOCALE="))
    //     ?.split("=")[1];
  
    //   if (cookieLocale) setLocale(cookieLocale);
    //   else {
    //     const browserLocale = navigator.language.slice(0, 2);
    //     document.cookie = `CTONEXTAPP_LOCALE=${browserLocale}; path=/;`;
    //     setLocale(browserLocale);
    //     router.refresh();
    //   }
    // }, [router]);
  
    // const toggleLanguage = () => {
    //   const newLocale = locale === "en" ? "ar" : "en";
    //   document.cookie = `CTONEXTAPP_LOCALE=${newLocale}; path=/;`;
    //   setLocale(newLocale);
    //   router.refresh();
    //     // router.replace(window.location.pathname); // replaces without full reload

    // };
  
    // const isArabic = locale === "ar";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* Left Box - Logo (Reduced Width) */}
      <Box
        sx={{
          flex: 0,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          p: 1,
        }}
      >
          <img
            src="/cto/Logo - Original.png" 
            alt="Company Logo"
            width="120"
            height="120"
            // style={{ borderRadius: "50%" }}
          />
        
      </Box>
      {/* arabic english toggle */}
      <Button
        variant="outlined"
        onClick={toggleLanguage}
        sx={{ position:'fixed', ml:"888px",mt:1 }}
      >
        {locale === "en" ? "عربي" : "English"}
      </Button>

      {/* Center Box - Login Form (Wider) */}
      
      <Box
        sx={{
          flex: 2.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          
          <Typography variant="subtitle1" color="text.secondary" align="center">
            {t("HeaderGreeting")}
          </Typography>

          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: "bold", color: "#0a0a60" }}
          >
            {t("LoginHeader")}
          </Typography>

          {/* <TextField
            label={`${t("EmailORPhone")}`}
            variant="outlined"
            
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)
            

            }

          /> */}
          <TextField
  label={t("EmailORPhone")}
  variant="outlined"
  required
  fullWidth
  value={email}
  onChange={(e) => setEmail(e.target.value)}
 InputLabelProps={{
    sx: {
      right: isArabic ? 18 : "auto",  // push label to right edge
      left: isArabic ? "auto" : 1,   // push label to left edge
      transformOrigin: isArabic ? "top right" : "top left",
      direction: isArabic ? "rtl" : "ltr",
      textAlign: isArabic ? "right" : "left",
    },
  }}
  InputProps={{
    sx: {
      "& .MuiOutlinedInput-notchedOutline": {
        textAlign: isArabic ? "right" : "left",
        direction: isArabic ? "rtl" : "ltr",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: "1px",
        borderColor: "#1976d2",
      },
      "& .MuiInputBase-input": {
        textAlign: isArabic ? "right" : "left",
        direction: isArabic ? "rtl" : "ltr",
        paddingRight: isArabic ? "22px" : undefined,
        paddingLeft: !isArabic ? "14px" : undefined,
      },
    },
  }}
/>


          <TextField
            label={`${t("Password")}`}
            type="password"
            variant="outlined"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
    sx: {
      right: isArabic ? 18 : "auto",  // push label to right edge
      left: isArabic ? "auto" : 1,   // push label to left edge
      transformOrigin: isArabic ? "top right" : "top left",
      direction: isArabic ? "rtl" : "ltr",
      textAlign: isArabic ? "right" : "left",
    },
  }}
  InputProps={{
    sx: {
      "& .MuiOutlinedInput-notchedOutline": {
        textAlign: isArabic ? "right" : "left",
        direction: isArabic ? "rtl" : "ltr",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: "1px",
        borderColor: "#1976d2",
      },
      "& .MuiInputBase-input": {
        textAlign: isArabic ? "right" : "left",
        direction: isArabic ? "rtl" : "ltr",
        paddingRight: isArabic ? "22px" : undefined,
        paddingLeft: !isArabic ? "14px" : undefined,
      },
    },
  }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel control={<Checkbox />} label={`${t("RememberMe")}`} />
            <Button onClick={()=>router.push("/forgotpassword")} sx={{cursor:"pointer"}}>
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: "pointer", }}
            >
              {t("ForgotPass")}
            </Typography>
            </Button>
          </Box>

          <Button
            onClick={handleLogin}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#3d3bf3",
              borderRadius: "30px",
              p: 1.2,
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#2f2ce6" },
            }}
          >
            {loading ? `${t("LoginLoading")}` : `${t("LoginButton")}`}
          </Button>
        </Box>
      </Box>

      {/* Right Box - Sign Up Section */}
      <Box
        sx={{
          flex: 1.7,
          backgroundImage: "url('/cto/bg.jpg')",
          backgroundSize: "cover",
          height:"99%",
          borderRadius:4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 3,
            p: 4,
            width: "70%",
            maxWidth: 300,
            textAlign: "center",
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 1, color: "#1e1e21ff" }}
          >
            {t("SignUpGreeting")}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            {t("SignUpHeader")}
          </Typography>
          <Button
            variant="contained"
            onClick={()=>router.push("/")}
            fullWidth
            sx={{
              backgroundColor: "#3d3bf3",
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#2f2ce6" },
            }}
          >
            {t("SignUpButton")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
