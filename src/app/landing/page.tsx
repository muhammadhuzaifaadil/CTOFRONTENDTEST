"use client";

import React, { useRef } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";

const Landing: React.FC = () => {
  const router = useRouter();

  // Refs for scrolling
  const taglineRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (


<Box sx={{ bgcolor: "#fff", color: "#000", fontFamily: "Inter, sans-serif" }}>
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
            gap: { xs: 1, sm: 2, md: 3 },
          }}
        >
          {[
            { label: "Home", ref: taglineRef },
            { label: "How It Works", ref: howItWorksRef },
            { label: "Why Choose Us", ref: whyChooseRef },
            { label: "Contact", ref: footerRef },
          ].map((item, i) => (
            <Button
              key={i}
              onClick={() => scrollToSection(item.ref)}
              sx={{
                textTransform: "none",
                color: "#001",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              }}
            >
              {item.label}
            </Button>
          ))}

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
            onClick={() => router.push("/auth/login")}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* ✅ TAGLINE SECTION */}
      <Box
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
          background: "linear-gradient(135deg, #4C5EFF 0%, #6A7CFF 100%)",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem", lg: "3.5rem" },
            mb: 1.5,
          }}
        >
          The Smart Balance Between
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            opacity: 0.85,
            fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem", lg: "4rem" },
            mb: 3,
          }}
        >
          Time, Cost, and Quality
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
          }}
        >
          Connect with verified tech companies. Get transparent proposals,
          milestone-based development, and independent quality reviews.
        </Typography>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#6970FF",
            color: "#fff",
            borderRadius: "30px",
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.3 },
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            "&:hover": { bgcolor: "#5459FD" },
          }}
          onClick={() => router.push("/auth/login")}
        >
          Get Started →
        </Button>
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
      }}
    >
      How CTO.sa Works
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{
        color: "#666",
        mb: 6,
        textAlign: "center",
        fontSize: { xs: "0.9rem", sm: "1rem" },
      }}
    >
      A transparent, secure process from start to finish
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
      }}
    >
      {[
        {
          icon: "📄",
          title: "Share Your Project",
          desc: "Submit your requirements and receive detailed proposals from verified companies.",
          step: "1",
        },
        {
          icon: "👥",
          title: "Choose Your Partner",
          desc: "Compare proposals with clear timelines, costs, and deliverables.",
          step: "2",
        },
        {
          icon: "✅",
          title: "Milestone-Based Development",
          desc: "Your project is divided into stages, each verified before payment release.",
          step: "3",
        },
        {
          icon: "🛡️",
          title: "Quality Expert Review",
          desc: "Independent professionals assess each milestone against standards.",
          step: "4",
        },
        {
          icon: "💬",
          title: "Fair Arbitration",
          desc: "Neutral technical arbitration ensures fairness if disagreements arise.",
          step: "5",
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
            }}
          >
            {item.step}
          </Typography>

          <Box sx={{ fontSize: "2.2rem", color: "#5459FD" }}>
            {item.icon}
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600, color: "#111" }}>
            {item.title}
          </Typography>

          <Typography
            sx={{ color: "#555", fontSize: { xs: "0.9rem", sm: "1rem" } }}
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
      }}
    >
      Why Choose CTO.sa
    </Typography>

    <Typography
      variant="subtitle1"
      sx={{
        color: "#666",
        mb: 6,
        textAlign: "center",
        fontSize: { xs: "0.9rem", sm: "1rem" },
      }}
    >
      Built on trust, transparency, and technical excellence
    </Typography>

    {/* FLEX ROWS */}
    {[
      [
        {
          icon: "🛡️",
          title: "Verified Companies Only",
          desc: "All providers are officially registered companies with proven track records.",
        },
        {
          icon: "📄",
          title: "Transparent Proposals",
          desc: "Receive detailed proposals with clear timelines, costs, and deliverables.",
        },
        {
          icon: "✅",
          title: "Independent Quality Reviews",
          desc: "Certified experts verify each milestone before payment approval.",
        },
      ],
      [
        {
          icon: "🔒",
          title: "Secure Escrow System",
          desc: "Your payments are protected and only released after milestone approval.",
        },
        {
          icon: "⚖️",
          title: "Technical Arbitration",
          desc: "Neutral experts resolve disputes fairly for both parties.",
        },
        {
          icon: "👥",
          title: "Platform Management",
          desc: "Everything documented and managed within the CTO.sa platform.",
        },
      ],
    ].map((row, rowIndex) => (
      <Box
        key={rowIndex}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
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
              textAlign: "left",
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
              }}
            >
              {item.title}
            </Typography>
            <Typography
              sx={{ color: "#555", fontSize: { xs: "0.9rem", sm: "1rem" } }}
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
              flexDirection: { xs: "column", md: "row" },
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
              <Typography variant="body2" sx={{ color: "#555", maxWidth: 260 }}>
                The smart platform for managing tech projects with balance and trust.
              </Typography>
            </Box>

            {/* Links */}
            {[
              {
                title: "Platform",
                links: ["How It Works", "Find Companies", "Quality Review", "Pricing"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Help Center", "Blog", "Case Studies"],
              },
              {
                title: "Company",
                links: ["About Us", "Contact", "Terms of Service", "Privacy Policy"],
              },
            ].map((col, i) => (
              <Box key={i} sx={{ flex: 1, minWidth: 150 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 2, color: "#001" }}
                >
                  {col.title}
                </Typography>
                {col.links.map((link, j) => (
                  <Typography
                    key={j}
                    variant="body2"
                    sx={{
                      color: "#555",
                      mb: 1,
                      cursor: "pointer",
                      "&:hover": { color: "#6366F1" },
                    }}
                  >
                    {link}
                  </Typography>
                ))}
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
