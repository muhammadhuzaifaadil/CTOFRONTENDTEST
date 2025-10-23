"use client"
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import RoleCard from "../components/RoleCard";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageContext } from "../contexts/LanguageContext";
const Welcome: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const {locale,isArabic,toggleLanguage} = useContext(LanguageContext);
  const t = useTranslations("Welcome");
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
  // };

  // const isArabic = locale === "ar";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
        width: "100%",
        backgroundColor: "#fff",
        // gap: 2,
        px: 2,
      }}
    >
      <Button
        variant="outlined"
        onClick={toggleLanguage}
        sx={{ alignSelf: "flex-end", m: 2 }}
      >
        {locale === "en" ? "عربي" : "English"}
      </Button>

      {/* ---------- Logo Section ---------- */}
      <Box
        sx={{
          textAlign: "center",
          // mt: 2,
        }}
      >
        <img
          src="/cto/Logo - Original.png"
          alt="CTO Logo"
          style={{ height: "250px" }} //300 before change
        />
        
      </Box>

      {/* ---------- Register Section ---------- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          width: "100%",
          maxWidth: "1400px",
          height: "50vh",
          
        }}
      >
        {/* Buyer Card */}
        <Container
          sx={{
            backgroundColor: "#fff",
            border: "1.5px solid #6A5AF9",
            borderRadius: "16px",
            boxShadow: "0px 3px 8px rgba(0,0,0,0.05)",
            width: { xs: "90%", sm: "40%" },
            height: "85%",
            p: 4,
            gap:2,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#6A5AF9",
              borderRadius: "50%",
              width: 60,
              height: 60,
              mx: "auto",
              mb: 2,
            }}
          >
            <ShoppingCartOutlinedIcon sx={{ color: "#fff", fontSize: 30 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mb: 1, color: "#2B2B2B" }}
          >
            {/* REGISTER AS BUYER */}
          {t("buyerheader")}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#777", mb: 3, lineHeight: 1.5 }}
          >
            {/* Post projects and find the right service providers for <br/> your needs */}
            {t("buyerdesc")}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6A5AF9",
              borderRadius: "25px",
              px: 5,
              textTransform: "none",
              fontWeight: 500,
            }}
            onClick={() => router.push("/register/buyer")}
          >
            {t("buyercontinue")}
          </Button>
        </Container>

        {/* Seller Card */}
        <Container
          sx={{
            backgroundColor: "#fff",
            border: "1.5px solid #6A5AF9",
            borderRadius: "16px",
            boxShadow: "0px 3px 8px rgba(0,0,0,0.05)",
            width: { xs: "90%", sm: "40%" },
            height: "85%",
            p: 4,
            gap:2,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#6A5AF9",
              borderRadius: "50%",
              width: 60,
              height: 60,
              mx: "auto",
             mb:2
            }}
          >
            <CorporateFareOutlinedIcon sx={{ color: "#fff", fontSize: 30 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mb: 1, color: "#2B2B2B" }}
          >
            {/* REGISTER AS SELLER */}
            {t("sellerheader")}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#777", mb: 3, lineHeight: 1.5 }}
          >
            {/* Bid on projects and showcase your company’s <br/>expertise */}
            {t("sellerdesc")}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6A5AF9",
              borderRadius: "25px",
              px: 5,
              textTransform: "none",
              fontWeight: 500,
            }}
            onClick={() => router.push("/register/seller")}
          >
            {t("sellercontinue")}
          </Button>
        </Container>
      </Box>

      {/* ---------- Bottom Sign-In Section ---------- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          
        }}
      >
        <Typography variant="body1" sx={{ color: "#333" }}>
          {t("already")}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6A5AF9",
            borderRadius: "25px",
            px: 4,
            textTransform: "none",
            fontWeight: 500,
          }}
          onClick={() => router.push("/login")}
        >
          {t("login")}
        </Button>
      </Box>
    </Box>
  );
};


export default Welcome;
