import { Box } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

interface RegisterLayoutProps {
  children: ReactNode;
}

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/cto/bg.jpg')", // <-- export from Figma as SVG/PNG and put in /public
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity:"70%",
          borderRadius:"19px",
          zIndex: 0,
        }}
      />

      {/* Logo Top Left */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1,
        }}
      >
        <Image
          src="/cto/Logo - Original.png" // <-- your CTO logo image in /public
          alt="CTO Logo"
          width={80}
          height={80}
        />
      </Box>

      {/* Page Content */}
      <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
        {children}
      </Box>
    </Box>
  );
};

export default RegisterLayout;
