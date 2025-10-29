import React, { useContext } from "react";
import { AppBar, Toolbar, Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AuthContext } from "@/app/contexts/AuthContext"; // ✅ adjust path if needed
import LogoutIcon from '@mui/icons-material/Logout';
import { LanguageContext } from "../contexts/LanguageContext";
import { useTranslations } from "next-intl";
const Navbar: React.FC = () => {
  const { locale, toggleLanguage,isArabic } = useContext(LanguageContext);
  const { logout, user } = useContext(AuthContext);
  const t = useTranslations("Navbar");
  const handleLogout = async () => {
    try {
      await logout(); // calls backend + clears localStorage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
    const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
if(!user) return <div></div>;
  return (

<AppBar
      position="fixed"
      elevation={2}
      sx={{
        background: (theme) =>
          `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // flexDirection: isSmallScreen ? "column" : "row",
          // alignItems: isSmallScreen ? "flex-start" : "center",
          // gap: isSmallScreen ? 1.5 : 0,
          // py: isSmallScreen ? 1 : 0,
          flexDirection:"row",
          alignItems:"center",
          gap:0,
          py:0
        }}
      >
        {/* Logo + Name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => console.log("/")}
        >
          <img
            src="/cto/Logo - Monochrome.png"
            alt="Company Logo"
            width= {isSmallScreen?"50":"60"}
            height={isSmallScreen?"50":"60"}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontWeight: "bold", textTransform: "uppercase",fontSize: isSmallScreen ? "13px" : "auto", }}>
              {user?.role} {t("Dashboard")}
            </Typography>
            <Typography variant="caption">
              {isArabic ? (
                <>
                  {user?.role === "seller"
                    ? user?.companyName
                    : `${user?.firstName ?? ""} ${user?.lastName ?? ""}`}، مرحباً بعودتك
                </>
              ) : (
                <>
                  Welcome Back,{" "}
                  {user?.role === "seller"
                    ? user?.companyName
                    : `${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
                </>
              )}
            </Typography>
          </Box>
        </Box>

        {/* Buttons Section */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: "row",
            alignItems:  "center",
            width:  "auto",
            mt:  0,
          }}
        >
          {/* Language Toggle */}
          <Button
            variant="outlined"
            onClick={toggleLanguage}
            sx={{
              textTransform: "none",
              color: "white",
              border: "1px solid white",
              fontWeight: 600,
              width:  "auto",
            }}
          >
            {locale === "en" ? "عربي" : "English"}
          </Button>

          {/* Logout Button */}
          {user && (
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon sx={{ color: "white" }} />}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                border: "1px solid white",
                borderRadius: "20px",
                px: 2,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                width: isSmallScreen ? "100%" : "auto",
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>  
);
};

export default Navbar;
