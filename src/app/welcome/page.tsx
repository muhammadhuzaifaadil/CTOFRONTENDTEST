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
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     // minHeight: "100vh",
    //     width: "100%",
    //     backgroundColor: "#fff",
    //     // gap: 2,
    //     px: 2,
    //   }}
    // >
    //   <Button
    //     variant="outlined"
    //     onClick={toggleLanguage}
    //     sx={{ alignSelf: "flex-end", m: 2 }}
    //   >
    //     {locale === "en" ? "عربي" : "English"}
    //   </Button>

    //   {/* ---------- Logo Section ---------- */}
    //   <Box
    //     sx={{
    //       textAlign: "center",
    //       // mt: 2,
    //     }}
    //   >
    //     <img
    //       src="/cto/Logo - Original.png"
    //       alt="CTO Logo"
    //       style={{ height: "250px" }} //300 before change
    //     />
        
    //   </Box>

    //   {/* ---------- Register Section ---------- */}
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: { xs: "column", sm: "row" },
    //       justifyContent: "center",
    //       alignItems: "center",
    //       gap: 8,
    //       width: "100%",
    //       maxWidth: "1400px",
    //       height: "50vh",
          
    //     }}
    //   >
    //     {/* Buyer Card */}
    //     <Container
    //       sx={{
    //         backgroundColor: "#fff",
    //         border: "1.5px solid #6A5AF9",
    //         borderRadius: "16px",
    //         boxShadow: "0px 3px 8px rgba(0,0,0,0.05)",
    //         width: { xs: "90%", sm: "40%" },
    //         height: "85%",
    //         p: 4,
    //         gap:2,
    //         textAlign: "center",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           backgroundColor: "#6A5AF9",
    //           borderRadius: "50%",
    //           width: 60,
    //           height: 60,
    //           mx: "auto",
    //           mb: 2,
    //         }}
    //       >
    //         <ShoppingCartOutlinedIcon sx={{ color: "#fff", fontSize: 30 }} />
    //       </Box>
    //       <Typography
    //         variant="h6"
    //         sx={{ fontWeight: 600, mb: 1, color: "#2B2B2B" }}
    //       >
    //         {/* REGISTER AS BUYER */}
    //       {t("buyerheader")}
    //       </Typography>
    //       <Typography
    //         variant="body2"
    //         sx={{ color: "#777", mb: 3, lineHeight: 1.5 }}
    //       >
    //         {/* Post projects and find the right service providers for <br/> your needs */}
    //         {t("buyerdesc")}
    //       </Typography>
    //       <Button
    //         variant="contained"
    //         sx={{
    //           backgroundColor: "#6A5AF9",
    //           borderRadius: "25px",
    //           px: 5,
    //           textTransform: "none",
    //           fontWeight: 500,
    //         }}
    //         onClick={() => router.push("/register/buyer")}
    //       >
    //         {t("buyercontinue")}
    //       </Button>
    //     </Container>

    //     {/* Seller Card */}
    //     <Container
    //       sx={{
    //         backgroundColor: "#fff",
    //         border: "1.5px solid #6A5AF9",
    //         borderRadius: "16px",
    //         boxShadow: "0px 3px 8px rgba(0,0,0,0.05)",
    //         width: { xs: "90%", sm: "40%" },
    //         height: "85%",
    //         p: 4,
    //         gap:2,
    //         textAlign: "center",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           backgroundColor: "#6A5AF9",
    //           borderRadius: "50%",
    //           width: 60,
    //           height: 60,
    //           mx: "auto",
    //          mb:2
    //         }}
    //       >
    //         <CorporateFareOutlinedIcon sx={{ color: "#fff", fontSize: 30 }} />
    //       </Box>
    //       <Typography
    //         variant="h6"
    //         sx={{ fontWeight: 600, mb: 1, color: "#2B2B2B" }}
    //       >
    //         {/* REGISTER AS SELLER */}
    //         {t("sellerheader")}
    //       </Typography>
    //       <Typography
    //         variant="body2"
    //         sx={{ color: "#777", mb: 3, lineHeight: 1.5 }}
    //       >
    //         {/* Bid on projects and showcase your company’s <br/>expertise */}
    //         {t("sellerdesc")}
    //       </Typography>
    //       <Button
    //         variant="contained"
    //         sx={{
    //           backgroundColor: "#6A5AF9",
    //           borderRadius: "25px",
    //           px: 5,
    //           textTransform: "none",
    //           fontWeight: 500,
    //         }}
    //         onClick={() => router.push("/register/seller")}
    //       >
    //         {t("sellercontinue")}
    //       </Button>
    //     </Container>
    //   </Box>

    //   {/* ---------- Bottom Sign-In Section ---------- */}
    //   <Box
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       gap: 1,
          
    //     }}
    //   >
    //     <Typography variant="body1" sx={{ color: "#333" }}>
    //       {t("already")}
    //     </Typography>
    //     <Button
    //       variant="contained"
    //       sx={{
    //         backgroundColor: "#6A5AF9",
    //         borderRadius: "25px",
    //         px: 4,
    //         textTransform: "none",
    //         fontWeight: 500,
    //       }}
    //       onClick={() => router.push("/login")}
    //     >
    //       {t("login")}
    //     </Button>
    //   </Box>
    // </Box>

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#fff",
        px: { xs: 1.5, sm: 2, md: 3,xl:2 }, // responsive padding
        py: { xs: 3, sm: 4 },
      }}
    >
      {/* ---------- Language Toggle ---------- */}
      <Button
        variant="outlined"
        onClick={toggleLanguage}
        sx={{
          alignSelf: "flex-end",
          m: { xs: 1, sm: 2 },
          fontSize: { xs: "0.8rem", sm: "1rem" },
        }}
      >
        {locale === "en" ? "عربي" : "English"}
      </Button>

      {/* ---------- Logo Section ---------- */}
      <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 } }}>
        <img
          src="/cto/Logo - Original.png"
          alt="CTO Logo"
          style={{
            width: "100%",
            maxWidth: "250px", // responsive logo
            height: "auto",
          }}
        />
      </Box>

      {/* ---------- Register Section ---------- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 4, sm: 8 },
          width: "100%",
          maxWidth: "1400px",
          height: { xs: "auto", sm: "50vh",lg:"auto" },
          my: { xs: 3, sm: 0 },
        }}
      >
        {/* ---------- Buyer Card ---------- */}
        <Container
          sx={{
            backgroundColor: "#fff",
            border: "1.5px solid #6A5AF9",
            borderRadius: "16px",
            boxShadow: "0px 3px 8px rgba(0,0,0,0.05)",
            width: { xs: "90%", sm: "40%" },
            height: { xs: "auto", sm: "85%" ,lg:"auto"},
            p: { xs: 3, sm: 4 },
            mb: { xs: 3, sm: 0 },
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
            {t("buyerheader")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#777",
              mb: 3,
              lineHeight: 1.5,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            {t("buyerdesc")}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6A5AF9",
              borderRadius: "25px",
              px: { xs: 4, sm: 5 },
              py: { xs: 1, sm: 1.2 },
              textTransform: "none",
              fontWeight: 500,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
            onClick={() => router.push("/register/buyer")}
          >
            {t("buyercontinue")}
          </Button>
        </Container>

        {/* ---------- Seller Card ---------- */}
        <Container
          sx={{
            backgroundColor: "#fff",
            border: "1.5px solid #6A5AF9",
            borderRadius: "16px",
            boxShadow: "0px 3px 8px rgba(0,0,0,0.05)",
            width: { xs: "90%", sm: "40%" },
            height: { xs: "auto", sm: "85%",lg:"auto" },
            p: { xs: 3, sm: 4 },
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
            <CorporateFareOutlinedIcon sx={{ color: "#fff", fontSize: 30 }} />
          </Box>

          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mb: 1, color: "#2B2B2B" }}
          >
            {t("sellerheader")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#777",
              mb: 3,
              lineHeight: 1.5,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            {t("sellerdesc")}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6A5AF9",
              borderRadius: "25px",
              px: { xs: 4, sm: 5 },
              py: { xs: 1, sm: 1.2 },
              textTransform: "none",
              fontWeight: 500,
              fontSize: { xs: "0.9rem", sm: "1rem" },
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
          flexWrap: "wrap",
          mt: { xs: 4, sm: 2,lg:4 },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#333",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          {t("already")}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6A5AF9",
            borderRadius: "25px",
            px: { xs: 4, sm: 5 },
            py: { xs: 1, sm: 1.2 },
            textTransform: "none",
            fontWeight: 500,
            fontSize: { xs: "0.9rem", sm: "1rem" },
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
