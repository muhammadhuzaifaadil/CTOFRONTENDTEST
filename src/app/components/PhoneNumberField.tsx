import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { PhoneInput } from "react-international-phone";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-international-phone/style.css";

interface PhoneNumberFieldsProps {
  isArabic?: boolean;
  t?: (key: string) => string;
  phoneCode: string;
  phoneNumber: string;
  onPhoneCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onPhoneError?: (field: string, hasError: boolean) => void;
}

const PhoneNumberFields: React.FC<PhoneNumberFieldsProps> = ({
  isArabic,
  t = (key) => key,
  phoneCode,
  phoneNumber,
  onPhoneCodeChange,
  onPhoneNumberChange,
  onPhoneError,
}) => {
  const [tempCode, setTempCode] = useState(phoneCode);

  useEffect(() => {
    setTempCode(phoneCode);
  }, [phoneCode]);

  // When user selects a country, extract only the code (e.g., +92)
  const handleCodeChange = (value: string) => {
    setTempCode(value);

    const parsed = parsePhoneNumberFromString(value);
    if (parsed && parsed.countryCallingCode) {
      const code = `+${parsed.countryCallingCode}`;
      onPhoneCodeChange(code);
      onPhoneError?.("phoneCode", false);
    } else {
      onPhoneError?.("phoneCode", true);
    }
  };

  // Handle number field input
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // digits only
    onPhoneNumberChange(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        // mt:1,
        alignItems: "flex-end",
        direction: isArabic ? "rtl" : "ltr",
      }}
    >
      {/* ---- Left: Country Flag + Code ---- */}
      <Box sx={{ flexBasis: { xs: "100%",sm:"100%", md: "30%" } }}>
        <label
          style={{
            display: "flex",
            justifyContent:"center",  
            fontWeight: 500,
            textAlign: isArabic ? "right" : "left",
          }}
        >
          {t("PersonalInfoPhoneCode")}
        </label>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
            paddingRight: isArabic ? 1 : 0,
            paddingLeft: isArabic ? 0 : 1,
            width: "100%",
            background: "#fff",
          }}
        >
          <PhoneInput
            defaultCountry="sa"
            value={tempCode}
            onChange={handleCodeChange}
            inputStyle={{
              display:"flex",
              justifyContent:"center",
              width: "100%",
              height: "65px",
              border: "none",
              outline: "none",
              direction: isArabic ? "rtl" : "ltr",
              background: "transparent",
            }}
            countrySelectorStyleProps={{
              buttonStyle: {
                border: "none",
                background: "transparent",
                borderRadius: "8px 0 0 8px",
              },
            }}
            disableFormatting
          />
        </Box>
      </Box>

      {/* ---- Right: Phone Number Field ---- */}
      <Box sx={{ flexBasis: { xs: "100%", md: "70%" } }}>
        <label
          style={{
            display: "flex",
            fontWeight: 500,
            textAlign: isArabic ? "right" : "left",
          }}
        >
          {t("PersonalInfoPhoneNumber")}
        </label>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="512345678"
          required
          value={phoneNumber}
          onChange={handleNumberChange}
          inputProps={{
            style: {
              direction: isArabic ? "rtl" : "ltr",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PhoneNumberFields;
