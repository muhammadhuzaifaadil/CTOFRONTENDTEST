import React, { useContext } from "react";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { AuthContext } from "@/app/contexts/AuthContext"; // ✅ adjust path if needed
import LogoutIcon from '@mui/icons-material/Logout';
import { LanguageContext } from "../contexts/LanguageContext";
const Navbar: React.FC = () => {
  const { locale, toggleLanguage } = useContext(LanguageContext);
  const { logout, user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout(); // calls backend + clears localStorage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        background: (theme) =>
          `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
            src="/cto/Logo - Monochrome.png" // or your client's company logo
            alt="Company Logo"
            width="60"
            height="60"
            // style={{ borderRadius: "30%" }}
          />
          <Box sx={{display:"flex", flexDirection:"column"}}>          
            <Typography sx={{fontWeight:"bold", textTransform:"uppercase"}}>
              {user?.role} DASHBOARD
            </Typography>
            <Typography variant="caption">
              Welcome Back, {user?.role === "seller" ? user?.companyName : `${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
            </Typography>
          </Box>

          {/* <Typography variant="h6" sx={{ fontWeight: 700 }}>
            CTO
          </Typography> */}
        </Box>

        {/* Logout Button */}
        <Box sx={{ display: "flex", gap: 2 }}>

          {/* Language Toggle + Logout */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={toggleLanguage}
            sx={{
              textTransform: "none",
              color: "white",
              border: "1px solid white",
              fontWeight: 600,
            }}
          >
            {locale === "en" ? "عربي" : "English"}
          </Button>
          </Box>
          {user && (
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon = {<LogoutIcon sx={{color:"white"}}/>}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                border: "1px solid white",
                borderRadius: "20px",
                px: 2,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
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
