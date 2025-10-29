"use client"
import React, { useContext, useState } from "react";
import { Modal, Box, Typography, Button, Link } from "@mui/material";
import { useTranslations } from "next-intl";
import { LanguageContext } from "../contexts/LanguageContext";

const TermsAndConditionsModal = () => {
  const [open, setOpen] = useState(false);
    const t = useTranslations("BuyerRegister")
    const {isArabic} = useContext(LanguageContext)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    
    <Box display="flex" alignItems="center" gap={0.5}>
        {isArabic? 
        <>
        <Link
        component="button"
        onClick={handleOpen}
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        {t("Terms&Conditions")}
      </Link>
                 <Typography sx={{ fontSize: 14 }}>{t("AcceptTerms")}</Typography>
   <Typography component="span" sx={{ color: 'red' }}>*</Typography>
   </>
:

   <>
   <Typography component="span" sx={{ color: 'red' }}>*</Typography>
   
           <Typography sx={{ fontSize: 14 }}>{t("AcceptTerms")}</Typography>
      <Link
        component="button"
        onClick={handleOpen}
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        {t("Terms&Conditions")}
      </Link>
      </>
       }
</Box>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="terms-title"
        aria-describedby="terms-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography
            id="terms-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
          >
            Terms & Conditions
          </Typography>

          <Typography id="terms-description" sx={{ mb: 2, textAlign: "justify" }}>
            1. By accessing or using this website, you agree to comply with all applicable
            laws and these Terms & Conditions. <br />
            2. We reserve the right to modify or update these terms at any time without
            prior notice. <br />
            3. You are responsible for maintaining the confidentiality of your account
            information. <br />
            4. You agree not to use our services for any unlawful or unauthorized
            purposes. <br />
            5. We may suspend or terminate your access if you violate any of these terms. <br />
            6. All content provided on this platform is for informational purposes only. <br />
            7. We do not guarantee the accuracy, completeness, or reliability of any
            information provided. <br />
            8. Your continued use of the site after changes to the Terms & Conditions
            signifies your acceptance of those changes.
          </Typography>

          <Box sx={{ textAlign: "center" }}>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              sx={{ mt: 2, borderRadius: 2 }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TermsAndConditionsModal;
