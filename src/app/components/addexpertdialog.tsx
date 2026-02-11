"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";

export interface AddQualityExpertFormValues {
  role: string; // will be "qe"

  user: {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  contact: {
    phoneCode: string;
    phoneNumber: string;
    address: string;
    city: string;
    country: string;
  };

  company: {
    name: string;
    crNumber: string;
    logoUrl: string;
    businessCategory: string;
    experience: number;
    websiteUrl: string;
    businessLicenseUrl: string;
    portfolioUrl: string;
  };

  acceptedTerms: boolean;
}

interface AddExpertDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (values: AddQualityExpertFormValues) => void | Promise<void>;
}

const AddExpertDialog: React.FC<AddExpertDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {
  // Role: fixed as "qe"
  const role = "qe";

  // --- User ---
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- Contact ---
  const [phoneCode, setPhoneCode] = useState("+966");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // --- Company ---
  const [companyName, setCompanyName] = useState("");
  const [crNumber, setCrNumber] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [experience, setExperience] = useState<number | string>("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [businessLicenseUrl, setBusinessLicenseUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");

  // --- Terms ---
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const handleSave = () => {
    const values: AddQualityExpertFormValues = {
      role, // "qe"
      user: {
        firstName,
        middleName,
        lastName,
        email,
        password,
        confirmPassword,
      },
      contact: {
        phoneCode,
        phoneNumber,
        address,
        city,
        country,
      },
      company: {
        name: companyName,
        crNumber,
        logoUrl,
        businessCategory,
        experience: Number(experience || 0),
        websiteUrl,
        businessLicenseUrl,
        portfolioUrl,
      },
      acceptedTerms,
    };

    onSave?.(values);
    resetForm();
    onClose();
  };
  const resetForm = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhoneCode("+966");
    setPhoneNumber("");
    setAddress("");
    setCity("");
    setCountry("");
    setCompanyName("");
    setCrNumber("");
    setLogoUrl("");
    setBusinessCategory("");
    setExperience("");
    setWebsiteUrl("");
    setBusinessLicenseUrl("");
    setPortfolioUrl("");
    setAcceptedTerms(true);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" component="span" fontWeight={600}>
          Add Quality Expert
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p">
          Register a new quality expert. Fields marked with * are required.
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 2 }}>
        {/* User Information */}
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Personal Information
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="First Name *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Last Name *"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="Password *"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Confirm Password *"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        {/* Contact Information */}
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Contact Information
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Phone Code *"
            value={phoneCode}
            onChange={(e) => setPhoneCode(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Phone Number *"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="City *"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Country *"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        {/* Company Information */}
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Company Information (optional)
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="CR Number"
            value={crNumber}
            onChange={(e) => setCrNumber(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Business Category"
            value={businessCategory}
            onChange={(e) => setBusinessCategory(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Experience (years)"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Website URL"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Logo URL"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="Business License URL"
            value={businessLicenseUrl}
            onChange={(e) => setBusinessLicenseUrl(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Portfolio URL"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        {/* Terms */}
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              size="small"
            />
          }
          label="I confirm that the expert accepts the platform terms and conditions"
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          variant="text"
          onClick={() => {
            resetForm();
            handleClose();
          }}
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ textTransform: "none", borderRadius: 999 }}
        >
          Save Quality Expert
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpertDialog;