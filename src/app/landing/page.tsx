"use client";

import React, { useContext, useRef } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { LanguageContext } from "../contexts/LanguageContext";
import { useTranslations } from "next-intl";
import DescriptionIcon from "@mui/icons-material/Description"; // 📄
import GroupIcon from "@mui/icons-material/Group"; // 👥
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // ✅
import SecurityIcon from "@mui/icons-material/Security"; // 🛡️
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"; // 💬
import ShieldIcon from "@mui/icons-material/Shield"; // 🛡️ Verified Companies
import VerifiedIcon from "@mui/icons-material/Verified"; // ✅ Independent Quality Reviews
import LockIcon from "@mui/icons-material/Lock"; // 🔒 Secure Escrow System
import GavelIcon from "@mui/icons-material/Gavel"; // ⚖️ Technical Arbitration
import GroupsIcon from "@mui/icons-material/Groups"; // 👥 Platform Management
import PhoneIcon from "@mui/icons-material/Phone";
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { Tajawal } from "next/font/google";
import { Group, WorkOutlineOutlined } from "@mui/icons-material";
import theme from "../theme/theme";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});


const Landing: React.FC = () => {
  const router = useRouter();
  const {isArabic,toggleLanguage,locale} = useContext(LanguageContext);
  const t = useTranslations("Landing");
  // Refs for scrolling
  const taglineRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (


<Box className={isArabic ? tajawal.variable : ""}
  sx={{
    bgcolor: "#fff",
    color: "#000",
    fontFamily: isArabic ? "'Tajawal', sans-serif" : "Inter, sans-serif",
  }}>
      {/* ✅ NAVBAR */}

      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          bgcolor: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          display: "flex",
          justifyContent: "space-between",
          flexDirection:isArabic?"row-reverse":"row",
          alignItems: "center",
          px: { xs: 2, sm: 4, md: 8, lg: 12 },
          py: { xs: 1, sm: 1.5, md: 2 },
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="/cto/Logo - Original.png"
          alt="CTO Logo"
          onClick={() => scrollToSection(taglineRef)}
          sx={{
            height: { xs: 36, sm: 48, md: 60, lg: 70, xl: 80 },
            width: "auto",
            cursor: "pointer",
          }}
        />

        {/* Navbar Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection:isArabic?"row-reverse":"row",
            gap: { xs: 1, sm: 2, md: 3 },
          }}
        >
          {[
            { label: `${t("NB_Home")}`, ref: taglineRef },
            { label: `${t("NB_Works")}`, ref: howItWorksRef },
            { label: `${t("NB_Choose")}`, ref: whyChooseRef },
            { label: `${t("NB_Contact")}`, ref: footerRef },
          ].map((item, i) => (
            <Button
              key={i}
              onClick={() => scrollToSection(item.ref)}
              sx={{
                textTransform: "none",
                color: "#001",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                fontFamily:isArabic?"Tajawal":"sans-serif"
              }}
            >
              {item.label}
            </Button>
          ))}
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
          <Button
            variant="contained"
            sx={{
              bgcolor: "#5459FD",
              color: "#fff",
              textTransform: "none",
              borderRadius: "10px",
              px: { xs: 2, sm: 3 },
              py: { xs: 0.8, sm: 1 },
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              "&:hover": { bgcolor: "#3e43d1" },
            }}
            onClick={() => router.push("/welcome")}
          >
            {t("NB_GETSTARTED")}
          </Button>
        </Box>
      </Box>

      {/* ✅ TAGLINE SECTION */}
      {/* <Box
        ref={taglineRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: { xs: "80vh", md: "100vh" },
          textAlign: "center",
          color: "#fff",
          px: { xs: 2, sm: 4, md: 8 },
          py: { xs: 6, md: 10 },
          // background: "linear-gradient(135deg, #4C5EFF 0%, #6A7CFF 100%)",
          backgroundImage: `url('/cto/tagbg.jpg')`, // 👈 path to your image
    backgroundSize: "cover",                       // makes it cover the full area
    backgroundPosition: "fixed",                  // centers the image
    backgroundRepeat: "no-repeat",                 // prevents tiling
    backgroundAttachment: "fixed",  
        }}
      >
        <Box display={"flex"} flexDirection={"row"} sx={{borderRadius:2,backgroundColor:"black"}}>
          <ShieldIcon sx={{width:"5", height:"3"}} />
          <Typography>Trusted Project Delivery Platform in Saudi Arabia</Typography>
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem", lg: "3.5rem" },
            mb: 1.5,
            fontFamily:isArabic?"Tajawal":"sans-serif"
          }}
        >
          {t("Home_Heading_11")}
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            opacity: 0.85,
            fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem", lg: "4rem" },
            mb: 3,
            fontFamily:isArabic?"Tajawal":"sans-serif"
          }}
        >
          {t("Home_Heading_12")}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            color: "#f1f1f1",
            maxWidth: "700px",
            mb: 4,
            lineHeight: 1.6,
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            px: { xs: 2, sm: 0 },
            fontFamily:isArabic?"Tajawal":"sans-serif"
          }}
        >
         {t("Home_Heading2")}
        </Typography>

        <Box display={"flex"} flexDirection={"row"}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#6970FF",
            color: "#fff",
            borderRadius: "30px",
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.3 },
            fontWeight: 600,
            fontFamily:isArabic?"Tajawal":"sans-serif",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            "&:hover": { bgcolor: "#5459FD" },
          }}
          onClick={() => router.push("/welcome")}
        >
          {t("NB_GETSTARTED_A")}
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#6970FF",
            color: "#fff",
            borderRadius: "30px",
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.3 },
            fontWeight: 600,
            fontFamily:isArabic?"Tajawal":"sans-serif",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            "&:hover": { bgcolor: "#5459FD" },
          }}
          onClick={() => router.push("/welcome")}
        >
          Learn More
        </Button>
        </Box>
        <Box display={"flex"} flexDirection={"row"} gap={3}>
        <Box display={"flex"} flexDirection={"column"}>
          <Group />
          <Typography>Three User Types</Typography>
          <Typography>Buyer, Sellers and Quality Experts</Typography>

        </Box>

<Box display={"flex"} flexDirection={"column"}>
          <Group />
          <Typography>Three User Types</Typography>
          <Typography>Buyer, Sellers and Quality Experts</Typography>

        </Box>
        <Box display={"flex"} flexDirection={"column"}>
          <Group sx={{display:"flex", justifyContent:"center",alignItems:"center"}}/>
          <Typography>Three User Types</Typography>
          <Typography>Buyer, Sellers and Quality Experts</Typography>

        </Box>  
        </Box>
      </Box> */}
<Box
  ref={taglineRef}
  sx={{
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: { xs: "80vh", md: "100vh" },
    textAlign: "center",
    color: "#fff",
    px: { xs: 2, sm: 4, md: 8 },
    py: { xs: 6, md: 10 },
    backgroundImage: `url('/cto/tagbg.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    
  }}
>
  {/* Trusted badge */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      bgcolor: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(6px)",
      px: 2.5,
      py: 0.8,
      borderRadius: 50,
      mb: 3,
    }}
  >
    <ShieldOutlinedIcon sx={{ fontSize: 20 }} />
    <Typography sx={{ fontSize: "1.2rem"}}>
      {t("Trusted")}
    </Typography>
  </Box>

  {/* Headings */}
  <Typography
    variant="h3"
    sx={{
      fontWeight: 700,
      fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem", lg: "3.5rem" },
      mb: 1,
      fontFamily: isArabic ? "Tajawal" : "sans-serif",
    }}
  >
    {t("Home_Heading_11")}
  </Typography>

  <Typography
    variant="h2"
    sx={{
      fontWeight: 700,
      fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem", lg: "4rem" },
      mb: 3,
      fontFamily: isArabic ? "Tajawal" : "sans-serif",
    }}
  >
    {t("Home_Heading_12")}
  </Typography>

  {/* Subtext */}
  <Typography
    variant="subtitle1"
    sx={{
      color: "#f1f1f1",
      maxWidth: "700px",
      mb: 4,
      lineHeight: 1.6,
      fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.55rem" },
      fontFamily: isArabic ? "Tajawal" : "sans-serif",
      opacity: 1.8,
    }}
  >
    {t("Tagline")}
  </Typography>

  {/* Buttons */}
  <Box sx={{ display: "flex", gap: 2, mb: 6,flexDirection:isArabic?"row-reverse":"row" }}>
    <Button
      variant="contained"
      sx={{
        bgcolor: "#6970FF",
        color: "#fff",
        borderRadius: "30px",
        px: { xs: 3, sm: 4 },
        py: { xs: 1, sm: 1.3 },
        fontWeight: 600,
        fontFamily: isArabic ? "Tajawal" : "sans-serif",
        textTransform: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        "&:hover": { bgcolor: "#5459FD" },
      }}
      onClick={() => router.push("/welcome")}
    >
      {t("NB_GETSTARTED_A")}
    </Button>

    <Button
      variant="outlined"
      sx={{
        borderRadius: "30px",
        px: { xs: 3, sm: 4 },
        py: { xs: 1, sm: 1.3 },
        fontWeight: 600,
        fontFamily: isArabic ? "Tajawal" : "sans-serif",
        textTransform: "none",
        borderColor: "#fff",
        backgroundColor:"#fff",
        color: "#5459FD",
        // "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
      }}
    >
      {t("LearnMore")}
    </Button>
  </Box>

  {/* Feature boxes */}
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: isArabic?"row-reverse":"row" },
      gap: 3,
      justifyContent: "center",
      alignItems: "center",
      mt: 2,
    }}
  >
    {[
      {
        icon: <Group sx={{fontSize:50}}/>,
        title: `${t("BoxHeading1")}`,
        subtitle: `${t("BoxContent1")}`,
      },
      {
        icon: <WorkOutlineOutlined  sx={{color: "#15ef74ff",fontSize:50}}/>,
        title: `${t("BoxHeading2")}`,
        subtitle: `${t("BoxContent2")}`,
      },
      {
        icon:     <ShieldOutlinedIcon sx={{ color: "#FFD700", fontSize: 50 }} />,
        title: `${t("BoxHeading3")}`,
        subtitle: `${t("BoxContent3")}`,
      },
    ].map((item, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          p: 3,
          borderRadius: 3,
          bgcolor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(6px)",
          minWidth: { xs: "80%", sm: 220 },
        }}
      >
        {item.icon}
        <Typography
          sx={{ fontWeight: 600, color: "#fff", fontSize: "1rem", mt: 1 }}
        >
          {item.title}
        </Typography>
        <Typography sx={{ color: "#ddd", fontSize: "0.9rem" }}>
          {item.subtitle}
        </Typography>
      </Box>
    ))}
  </Box>
</Box>



      <Divider />

     {/* ✅ HOW CTO WORKS SECTION (GRID BASED) */}
<Box ref={howItWorksRef}>
  <Box
    sx={{
      py: { xs: 6, sm: 8, md: 10 },
      px: { xs: 2, sm: 4, md: 8, lg: 12 },
      bgcolor: "#F6F6FA",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: 700,
        color: "#111",
        mb: 1,
        textAlign: "center",
        fontSize: { xs: "1.6rem", md: "2rem" },
        fontFamily:isArabic?"Tajawal":"sans-serif"
      }}
    >
      {t("Works_Heading")}
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{
        color: "#666",
        mb: 6,
        textAlign: "center",
        fontSize: { xs: "0.9rem", sm: "1rem" },
        fontFamily:isArabic?"Tajawal":"sans-serif"
      }}
    >
      {t("Works_Tagline")}
    </Typography>

    {/* GRID CARDS */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(3, 1fr)",
        },
        gap: { xs: 3, sm: 4, md: 5 },
        width: "100%",
        maxWidth: "1100px",
        direction: isArabic ? "rtl" : "ltr",   // 👈 flips the grid flow
        textAlign: isArabic ? "right" : "left", // optional: aligns text inside items
        
      }}
    >
      {[
        {
          icon: <DescriptionIcon color="primary" sx={{ fontSize: 40 }} />,
          title: `${t("Works_1_Heading")}`,
          desc: `${t("Works_1_Content")}`,
          // step: "1",
        },
        {
          icon: <GroupIcon color="primary" sx={{ fontSize: 40 }} />,
           title: `${t("Works_2_Heading")}`,
          desc: `${t("Works_2_Content")}`,
          // step: "2",
        },
        {
          icon: <CheckCircleIcon color="primary" sx={{ fontSize: 40 }} />,
           title: `${t("Works_3_Heading")}`,
          desc: `${t("Works_3_Content")}`,
          // step: "3",
        },
        {
          icon: <SecurityIcon color="primary" sx={{ fontSize: 40 }} />,
           title: `${t("Works_4_Heading")}`,
          desc: `${t("Works_4_Content")}`,
          // step: "4",
        },
        {
          icon: <ChatBubbleOutlineIcon color="primary" sx={{ fontSize: 40 }} />,
           title: `${t("Works_5_Heading")}`,
          desc: `${t("Works_5_Content")}`,
          // step: "5",
        },
      ].map((item, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            p: { xs: 2.5, sm: 3 },
            borderRadius: "12px",
            bgcolor: "#fff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            },
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: 12,
              right: 16,
              fontWeight: 700,
              fontSize: "2rem",
              color: "rgba(84,89,253,0.1)",
              fontFamily:isArabic?"Tajawal":"sans-serif"
            }}
          >
            {/* {item.step} */}
          </Typography>

          <Box sx={{ fontSize: "2.2rem", color: "#5459FD",fontFamily:isArabic?"Tajawal":"sans-serif" }}>
            {item.icon}
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600, color: "#111",fontFamily:isArabic?"Tajawal":"sans-serif" }}>
            {item.title}
          </Typography>

          <Typography
            sx={{ color: "#555", fontSize: { xs: "0.9rem", sm: "1rem",fontFamily:isArabic?"Tajawal":"sans-serif" } }}
          >
            {item.desc}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
</Box>

<Divider />

{/* ✅ WHY CHOOSE CTO SECTION (FLEX BASED) */}
<Box ref={whyChooseRef}>
  <Box
    sx={{
      py: { xs: 6, sm: 8, md: 10 },
      px: { xs: 2, sm: 4, md: 8, lg: 12 },
      bgcolor: "#F5F7FF",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: 700,
        mb: 1,
        textAlign: "center",
        color: "#001",
        fontSize: { xs: "1.6rem", md: "2rem" },
        fontFamily:isArabic?"Tajawal":"sans-serif"
      }}
    >
      {t("Choose_Heading")}
    </Typography>

    <Typography
      variant="subtitle1"
      sx={{
        color: "#666",
        mb: 6,
        textAlign: "center",
        fontSize: { xs: "0.9rem", sm: "1rem" },
        fontFamily:isArabic?"Tajawal":"sans-serif"
      }}
    >
      {t("Choose_Tagline")}
    </Typography>

    {/* FLEX ROWS */}
    {[
      [
        {
          icon: <ShieldIcon color="primary" sx={{ fontSize: 40 }} />,
          title: `${t("Choose_1_Heading")}`,
          desc: `${t("Choose_1_Content")}`,
        },
        {
          icon: <DescriptionIcon color="primary" sx={{ fontSize: 40 }} />,
           title: `${t("Choose_2_Heading")}`,
          desc: `${t("Choose_2_Content")}`,
        },
        {
          icon: <VerifiedIcon color="primary" sx={{ fontSize: 40 }} />,
           title: `${t("Choose_3_Heading")}`,
          desc: `${t("Choose_3_Content")}`,
        },
      ],
      [
        {
          icon: <LockIcon color="primary" sx={{ fontSize: 40 }} />,
           title: `${t("Choose_4_Heading")}`,
          desc: `${t("Choose_4_Content")}`,
        },
        {
          icon: <GavelIcon color="primary" sx={{ fontSize: 40 }} />,
           title: `${t("Choose_5_Heading")}`,
          desc: `${t("Choose_5_Content")}`,
        },
        {
          icon: <GroupsIcon color="primary" sx={{ fontSize: 40 }} />,
           title: `${t("Choose_6_Heading")}`,
          desc: `${t("Choose_6_Content")}`,
        },
      ],
    ].map((row, rowIndex) => (
      <Box
        key={rowIndex}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: isArabic?"row-reverse":"row" },
          justifyContent: "center",
          alignItems: "stretch",
          gap: { xs: 3, md: 4 },
          width: "100%",
          maxWidth: "1200px",
          mb: rowIndex === 0 ? 4 : 0,
        }}
      >
        {row.map((item, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              bgcolor: "#fff",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
              textAlign: isArabic?"right":"left",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              },
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                bgcolor: "rgba(99, 102, 241, 0.1)",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                color: "#6366F1",
                mb: 2,
                 ml: isArabic ? "auto" : 0, // ✅ Push icon to right if Arabic
    mr: isArabic ? 0 : "auto", // ✅ Push icon to left if English
              }}
            >
              {item.icon}
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#001",
                mb: 1,
                fontSize: { xs: "1rem", md: "1.1rem" },
                fontFamily:isArabic?"Tajawal":"sans-serif"
              }}
            >
              {item.title}
            </Typography>
            <Typography
              sx={{ color: "#555", fontSize: { xs: "0.9rem", sm: "1rem",fontFamily:isArabic?"Tajawal":"sans-serif" } }}
            >
              {item.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    ))}
  </Box>
</Box>

<Divider />


      {/* ✅ FOOTER SECTION */}
      <Box ref={footerRef}>
        <Box
          sx={{
            py: 8,
            px: { xs: 2, sm: 4, md: 8, lg: 12 },
            bgcolor: "#F7F8FC",
            color: "#001",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Top Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: isArabic?"row-reverse":"row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "flex-start" },
              width: "100%",
              maxWidth: "1200px",
              gap: { xs: 5, md: 10 },
            }}
          >
            {/* Logo + Description */}
            <Box sx={{ flex: 1, minWidth: 220 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: "#6366F1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 18,
                    mr: 1.5,
                  }}
                >
                  C
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#001" }}>
                  CTO.sa
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#555", maxWidth: 260,fontFamily:isArabic?"Tajawal":"sans-serif" }}>
                {t("Contact_Heading_Tagline")}
              </Typography>
            </Box>

            {/* Links */}
            {[
              {
                name: "Muhammed Alaseeri",
                phone: "+966 50 650 8998",
              },
              {
                name: "Salman Saeed",
                phone: "+966 531977403",
              },
              {
                name: "Ihsan Ullah",
                phone: "+966 55 410 4725",
              },
            ].map((col, i) => (
              <Box key={i} sx={{ flex: 1, minWidth: 150 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 2, color: "#001",fontFamily:isArabic?"Tajawal":"sans-serif" }}
                >
                  {col.name}
                </Typography>
                {/* col.phones.map if further links */}
                <Box display={"flex"} flexDirection={"row"}>
                                    <PhoneIcon />

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#555",
                      mb: 1,
                      cursor: "pointer",
                      fontFamily:isArabic?"Tajawal":"sans-serif",
                      "&:hover": { color: "#6366F1" },
                    }}
                  > 
                    {col.phone}
                  </Typography>
                  </Box>
              </Box>
            ))}
          </Box>

          {/* Divider */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "1200px",
              height: "1px",
              bgcolor: "#E0E2EB",
              my: 4,
            }}
          />

          {/* Bottom Section */}
          <Typography
            variant="body2"
            sx={{ color: "#555", textAlign: "center", width: "100%" }}
          >
            © {new Date().getFullYear()} CTO.sa. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
