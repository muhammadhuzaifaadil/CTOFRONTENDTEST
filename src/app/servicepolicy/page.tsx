"use client";

import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import RegisterLayout from "../layouts/RegisterLayout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
const PrivacyPolicyPage: React.FC = () => {
    const router = useRouter();
  return (
    <RegisterLayout>
        
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="80vh"
        overflow={"hidden"}
        sx={{
          backgroundColor: "#f5f5f5",
          py: { xs: 2, md: 0 },
          overflowY:"hidden",
          borderRadius:3
        }}
      >
        <Box
          sx={{
            width: { xs: "90vw", md: "60vw" },
            backgroundColor: "white",
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            boxShadow: "0px 2px 12px rgba(0,0,0,0.08)",
            maxHeight: "85vh",
            overflowY: "auto",
             position: "relative",
             // Custom scrollbar styling
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "linear-gradient(180deg, #1976d2, #42a5f5)",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "linear-gradient(180deg, #1565c0, #2196f3)",
    },
    // For Firefox
    scrollbarWidth: "thin",
    scrollbarColor: "#1976d2 #f1f1f1",
          }}
        >
            {/* --- Back Button --- */}
        <Button
          onClick={() => router.push("/login")}
          startIcon={<ArrowBackIcon />}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            color: "#1976d2",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.08)",
            },
            fontSize: { xs: "13px", md: "15px" },
          }}
        >
          Back to Login
        </Button>
          {/* --- Title --- */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 3,
              textAlign: "center",
              color: "#1a1a1a",
              mt: { xs: 6, md: 4 },
            }}
          >
            Privacy Policy
          </Typography>

          {/* --- Section: Intro --- */}
          <Typography sx={{ color: "#555", mb: 2, lineHeight: 1.7 }}>
            Our Privacy Policy explains how we collect, use, and disclose
            “personal information” and other “non-personal information” we have
            gathered about you.
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* --- Section 1 --- */}
          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            What is Personal Information and why do we collect it from you?
          </Typography>
          <Typography sx={{ color: "#555", mb: 2, lineHeight: 1.7 }}>
            ‘Personal Information’ is information or an opinion that identifies
            you as an individual. We collect and store your email when you sign
            up for our service, or when you specifically provide it in
            connection with your account (e.g., as part of your profile as a
            project Buyer or Seller). If you contact us directly for any reason,
            we may also keep a copy of that correspondence.
          </Typography>
          <Typography sx={{ color: "#555", mb: 2, lineHeight: 1.7 }}>
            For users engaging in transactions (Buyers and Sellers), we may also
            collect and store information such as:
          </Typography>
          <ul style={{ color: "#555", marginLeft: "20px" }}>
            <li>Your full name, professional title, and/or business name.</li>
            <li>
              Payment information (processed securely by third-party payment
              processors).
            </li>
            <li>
              Information related to the projects you post or complete (e.g.,
              project descriptions, service categories, and proposals).
            </li>
          </ul>

          <Divider sx={{ my: 2 }} />

          {/* --- Section 2 --- */}
          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            Newsletter and Marketing Communications
          </Typography>
          <Typography sx={{ color: "#555", mb: 2, lineHeight: 1.7 }}>
            When you elect to join our mailing list for the purpose of receiving
            our newsletter, we may use that “personal information” to provide
            you with direct marketing communications about new features, service
            updates, promotional events, or educational content relevant to
            project Buyers and Sellers on our platform. You may unsubscribe from
            our newsletter at any time. All you need to do is unsubscribe from
            the link in the letter or let us know in writing that you want to be
            removed.
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* --- Section 3 --- */}
          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            Sensitive Information
          </Typography>
          <Typography sx={{ color: "#555", mb: 2, lineHeight: 1.7 }}>
            Sensitive information includes information or opinions about such
            things as an individual’s racial or ethnic origin, political
            opinions, membership of a political association, religious or
            philosophical beliefs, membership of a professional body, criminal
            records, or health information. We do not intentionally collect or
            store Sensitive Information on our platform.
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* --- Section 4 --- */}
          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            Disclosure of Personal Information
          </Typography>
          <Typography sx={{ color: "#555", mb: 2, lineHeight: 1.7 }}>
            We will not sell, trade, rent or disclose any of the personal
            information you provide to us for any reason, without your prior
            consent. However, as an operational requirement of the marketplace:
          </Typography>
          <ul style={{ color: "#555", marginLeft: "20px" }}>
            <li>
              Information necessary to facilitate a project (such as a Seller’s
              professional profile to a Buyer, or a Buyer’s project details to a
              Seller) will be shared between those parties.
            </li>
            <li>
              We may share necessary personal information with third-party
              service providers (e.g., payment processors, identity verification
              services) essential for the functioning of the app and completion
              of projects.
            </li>
            <li>
              Otherwise, your Personal Information will only be disclosed where
              required or allowable by law.
            </li>
          </ul>

          <Divider sx={{ my: 2 }} />

          {/* --- Section 5 --- */}
          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            Security of Personal Information
          </Typography>
          <Typography sx={{ color: "#555", mb: 2, lineHeight: 1.7 }}>
            Your Personal Information is stored offsite in a manner that
            reasonably protects it from misuse, loss, unauthorized access,
            modification, or disclosure. We don’t guarantee website links or
            policy of authorized third parties and you access those sites at
            your own risk.
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* --- Section 6 --- */}
          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            Access to your Personal Information
          </Typography>
          <Typography sx={{ color: "#555", mb: 2, lineHeight: 1.7 }}>
            Under the Privacy Act, NPP 6 gives you the right to access the
            Personal Information we hold about you and to update and/or correct
            it, subject to certain exceptions. If you wish to access your
            Personal Information, please make out your request to us in writing
            at the address listed below. Please be aware that in order to
            protect the Personal Information in our database, we will require
            identification from you before releasing any information.
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* --- Section 7 --- */}
          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            Collection of other ‘Non-Personal’ Information
          </Typography>
          <Typography sx={{ color: "#555", mb: 2, lineHeight: 1.7 }}>
            We collect certain information from your mobile device, including
            but not limited to:
          </Typography>
          <ul style={{ color: "#555", marginLeft: "20px" }}>
            <li>
              <strong>Location Information</strong> – allows us to determine
              your location to help connect Buyers and Sellers in relevant
              geographic areas.
            </li>
            <li>
              <strong>Device and Usage Information</strong> – includes device
              make, model, OS, advertising identifier, usage metrics, and signal
              data such as WiFi strength or battery level.
            </li>
          </ul>
          <Typography sx={{ color: "#555", mb: 2, lineHeight: 1.7 }}>
            Our website and app may use third-party APIs, including Google
            Analytics, to collect anonymous log and behavior data to improve our
            service experience.
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* --- Section 8 --- */}
          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            Use and Transfer of Information
          </Typography>
          <Typography sx={{ color: "#555", mb: 2, lineHeight: 1.7 }}>
            We use the information to connect you with relevant project
            opportunities (if you are a Seller) or with suitable service
            providers (if you are a Buyer).
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* --- Section 9 --- */}
          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            Disclosure and Sharing
          </Typography>
          <Typography sx={{ color: "#555", mb: 2, lineHeight: 1.7 }}>
            We share the information we collect with third-party business
            partners who comply with applicable laws concerning their usage of
            information. They may use this data to:
          </Typography>
          <ul style={{ color: "#555", marginLeft: "20px" }}>
            <li>Operate and improve their services.</li>
            <li>
              Provide you with advertisements or business product suggestions
              based on your interests or location.
            </li>
          </ul>

          <Divider sx={{ my: 2 }} />

          {/* --- Section 10 --- */}
          <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            Location Services
          </Typography>
          <Typography sx={{ color: "#555", mb: 2, lineHeight: 1.7 }}>
            We use your location to match you with nearby projects or Sellers
            and to allow third-party service providers (e.g., for location-based
            advertising) to engage with you based on your location.
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#888", mt: 4, textAlign: "center" }}
          >
            Last updated: October 2025
          </Typography>
        </Box>
      </Box>
    </RegisterLayout>
  );
};

export default PrivacyPolicyPage;
