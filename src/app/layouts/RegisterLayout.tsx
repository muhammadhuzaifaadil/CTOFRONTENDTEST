import { Box } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

interface RegisterLayoutProps {
  children: ReactNode;
}

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ children }) => {
  return (
  //   <Box
  //     sx={{
  //       minHeight: "100vh",
  //       width: "100%",
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       position: "relative",
  //       overflow: "hidden",
  //     }}
  //   >
  //     {/* Background Image */}
  //     <Box
  //       sx={{
  //         position: "absolute",
  //         inset: 0,
  //         backgroundImage: "url('/cto/blue-bg.png')", // <-- export from Figma as SVG/PNG and put in /public
  //         backgroundSize: "cover",
  //         backgroundPosition: "center",
  //         // opacity:"80%",
  //         borderRadius:"19px",
  //         zIndex: 0,
  //       }}
  //     />
  //     {/* overlay */}
  //     {/* <Box
  //   sx={{
  //     position: "absolute",
  //     inset: 0,
  //     backgroundColor: "rgba(0, 102, 255, 0.4)", // adjust opacity (0.5 = 50%)
  //     zIndex: 1,
  //   }}
  // /> */}

  //     {/* Logo Top Left */}
  //     <Box
  //       sx={{
  //         position: "absolute",
  //         top: 20,
  //         left: 20,
  //         zIndex: 1,
  //       }}
  //     >
  //       <Image
  //         src="/cto/Logo - Monochrome.png" // <-- your CTO logo image in /public
  //         alt="CTO Logo"
  //         width={80}
  //         height={80}
  //       />
  //     </Box>

  //     {/* Page Content */}
  //     <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
  //       {children}
  //     </Box>
  //   </Box>
  <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url('/cto/blue-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top Header (Logo) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 2, sm: 3, md: 1 },
        }}
      >
        <Image
          src="/cto/Logo - Monochrome.png"
          alt="CTO Logo"
          width={80}
          height={80}
          style={{
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Main Content (children) */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default RegisterLayout;
