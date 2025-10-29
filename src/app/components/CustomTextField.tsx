"use client"
import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
  Box,
  type SxProps,
  type Theme
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Temporary country data
const countryData = [
  { name: "United States", code: "US", phoneCode: "+001", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", phoneCode: "+044", flag: "🇬🇧" },
  // { name: "Canada", code: "CA", phoneCode: "+001", flag: "🇨🇦" },
  { name: "Saudi Arabia", code: "SA", phoneCode: "+966", flag: "🇸🇦" },
  { name: "Pakistan", code: "PK", phoneCode: "+092", flag: "🇵🇰" },
  { name: "India", code: "IN", phoneCode: "+091", flag: "🇮🇳" },
  { name: "United Arab Emirates", code: "AE", phoneCode: "+971", flag: "🇦🇪" },
];

interface CustomTextFieldProps {
  fullWidth?: boolean;
  label?: string;
  placeholder?: string;
  margin?: "none" | "dense" | "normal";
  required?: boolean;
  maxChar?: number;
  minChar?: number;
  unique?: boolean;
  type?: string;
  value?: string;
  confirmValue?: string;
  multiline?: boolean;
  rows?: number;
  fieldName?: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onErrorChange?: (fieldName: string, hasError: boolean) => void;
  phoneFormat?: boolean;
  isCountry?: boolean; // 👈 for country dropdown
  isPhoneCode?: boolean; // 👈 for phone code dropdown
  sx?: SxProps<Theme>;
  isArabic?:boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  fullWidth = false,
  label,
  placeholder,
  margin = "normal",
  required = false,
  maxChar,
  minChar,
  unique,
  type = "text",
  value,
  confirmValue,
  multiline = false,
  rows = 1,
  fieldName,
  onChange,
  onErrorChange,
  phoneFormat = false,
  isCountry = false,
  isPhoneCode = false,
  isArabic = false
}) => {
  // const [inputValue, setInputValue] = useState(value || "");
  // 👇 Default values based on field type
  // const defaultCountry = "Saudi Arabia";
  // const defaultPhoneCode = "+966";
  
  const [inputValue, setInputValue] = useState(
    value
  );
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if ((type === "password"||type ==="كلمة المرور" )&& (fieldName?.toLowerCase().includes("confirm")||fieldName?.toLowerCase().includes("تأكيد")) &&
    inputValue) {
      validateInput(inputValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmValue]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const val = e.target.value;
  //   setInputValue(val);
  //   if (onChange) onChange(e);
  //   validateInput(val);
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (maxChar && val.length > maxChar) return; // prevent typing beyond limit
    setInputValue(val);
    if (onChange) onChange(e);
    validateInput(val);
  };
  // const validateInput = (val: string) => {
  //   // let newError = "";
  //   if (maxChar && val.length > maxChar) {
  //     setError(`Max ${maxChar} characters allowed.`);
  //     return;
  //   } else if (minChar && val.length < minChar) {
  //     setError(`Min ${minChar} characters required.`);
  //     return;
  //   }

  //   if (label.toLowerCase().includes("email") && val && !val.includes("@")) {
  //     setError("Email must contain '@'");
  //     return;
  //   }

  //   // ✅ Phone number validation (no +966 auto)
  //   if (phoneFormat && !isPhoneCode) {
  //     const onlyDigits = val.replace(/\D/g, "");
  //     if (onlyDigits.length !== 9) {
  //       setError("Phone number must be exactly 9 digits.");
  //       return;
  //     }
  //   }

  //   // ✅ Password validation
  //   if (type === "password" && fieldName?.toLowerCase().includes("password")) {
  //     const passwordRegex =
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;

  //     if (!passwordRegex.test(val)) {
  //       setError(
  //         "Password must contain uppercase, lowercase, number & special character."
  //       );
  //       return;
  //     }
      
  //     if (fieldName?.toLowerCase().includes("confirm") && confirmValue !== val) {
  //       setError("Passwords do not match.");
  //       return;
  //     }
  //     //remove if not working
  //     const isConfirmField =
  //       fieldName?.toLowerCase().includes("confirm") ||
  //       fieldName?.toLowerCase().includes("confirmnew");

  //     if (isConfirmField && confirmValue !== val) {
  //       setError("Passwords do not match.");
  //       return;
  //     }
  //   }

  //   if (unique && val === "123456") {
  //     setError("Value too common. Please choose another.");
  //     return;
  //   }

  //   setError("");
    
  // };


  const validateInput = (val: string) => {
  let newError = "";

  if (maxChar && val.length > maxChar) {
    newError = `Max ${maxChar} characters allowed.`;
  } else if (minChar && val.length < minChar) {
    newError = `Min ${minChar} characters required.`;
  } else if ((label?.toLowerCase().includes("email") || label?.toLowerCase().includes("البريد الإلكتروني")) && val && !val.includes("@")) {
    newError = isArabic?"يجب أن يحتوي البريد الإلكتروني على '@'":"Email must contain '@'";
  } else if (phoneFormat && !isPhoneCode) {
    const onlyDigits = val.replace(/\D/g, "");
    if (onlyDigits.length !== 9) {
      newError = isArabic?"يجب أن يحتوي رقم الهاتف على 9 أرقام بالضبط.":"Phone number must be exactly 9 digits.";
    }
  } 
  
  // else if (type === "password" && fieldName?.toLowerCase().includes("password")) {
  //   const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
  //   if (!passwordRegex.test(val)) {
  //     newError =
  //       "Password must contain uppercase, lowercase, number & special character.";
  //   } 
  //   else if (
  //     (fieldName?.toLowerCase().includes("confirm") ||
  //       fieldName?.toLowerCase().includes("confirmnew")) &&
  //     confirmValue !== val
  //   ) {
  //     newError = "Passwords do not match.";
  //   }
  // } 
  // 🔹 Password complexity validation (works for both 'password' and 'newPassword')
  else if (
    (type === "password"||type ==="كلمة المرور") &&
    (fieldName?.toLowerCase() === "password" ||
      fieldName?.toLowerCase() === "newpassword"||fieldName?.toLowerCase()==="كلمة المرور"||
    fieldName?.toLowerCase() === "كلمة المرور الجديدة")
  ) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
    if (!passwordRegex.test(val)) {
      newError = isArabic?"يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم ورمز خاص.":
        "Password must contain uppercase, lowercase, number & special character.";
    }
  }

  // 🔹 Confirm password validation (works for both confirmPassword & confirmNewPassword)
  else if (
    (type === "password" || type ==="كلمة المرور") &&
    (fieldName?.toLowerCase().includes("confirm") ||
      fieldName?.toLowerCase().includes("confirmnew") ||fieldName?.toLowerCase().includes("تأكيد")
    || fieldName?.toLowerCase().includes("تأكيد جديد"))
  ) {
    if (confirmValue && confirmValue !== val) {
      newError = isArabic?"كلمات المرور غير متطابقة.":"Passwords do not match.";
    }
  }
  else if (unique && val === "123456") {
    newError = isArabic?"القيمة شائعة جدًا. يرجى اختيار قيمة أخرى.":"Value too common. Please choose another.";
  }

  setError(newError);
  if (onErrorChange && fieldName) onErrorChange(fieldName, !!newError);
};

  return (
<div style={{ width: fullWidth ? "100%" : "auto" }}>
      {/* 👇 Label Above Field */}
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: "bold", mb: 0.5, textAlign: `${isArabic?"right":"left"}` }}
      >
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>

      {/* 👇 Conditional Rendering */}
      {isCountry ? (
        <TextField
          name={fieldName || label?.replace(/\s+/g, "")}
          select
          fullWidth={fullWidth}
          value={inputValue}
          onChange={handleChange}
          margin={margin}
          helperText={error}
          error={!!error}
          label="Country"
        >
          <MenuItem value="" disabled>
            Select Country
          </MenuItem>
          {countryData.map((c) => (
            <MenuItem key={c.code} value={c.name}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span>{c.flag}</span>
                {c.name}
              </Box>
            </MenuItem>
          ))}
        </TextField>
      ) : isPhoneCode ? (
        <TextField
          select
          name={fieldName || label?.replace(/\s+/g, "")}
          label={label}
          value={inputValue}
          onChange={handleChange}
          margin={margin}
          helperText={error}
          error={!!error}
          sx={{width:"135px"}}
          
        >
          <MenuItem value="" disabled>
            Select Phone Code
          </MenuItem>
          {/* {countryData.map((c) => (
            <MenuItem key={c.code} value={c.phoneCode}>
              {c.flag} {c.phoneCode}
            </MenuItem>
          ))} */}
          {countryData.map((c) => {
  // Remove leading zeros just for display
  const displayCode = c.phoneCode.replace(/\+0+/, '+');
  
  return (
    <MenuItem key={c.code} value={c.phoneCode}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontFamily: "monospace", // keeps widths aligned
          minWidth: "80px", // adjust as needed for fixed width look
        }}
      >
        <span>{c.flag}</span>
        <span>{displayCode}</span>
      </Box>
    </MenuItem>
  );
})}

        </TextField>
      ) : (
        <Box sx={{ position: "relative" }}>
          <TextField
            fullWidth={fullWidth}
            name={fieldName || label?.replace(/\s+/g, "")}
            placeholder={placeholder}
            margin={margin}
            multiline={multiline}
            rows={rows}
            required={required}
            type={type === "password" && !showPassword ? "password" : "text"}
            value={inputValue}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            // sx={{direction:isArabic?"right":"left"}}
            inputProps={{
              maxLength: maxChar,
              minLength: minChar,
              dir: "ltr"
            }}
            InputLabelProps={{
      // align label based on language
      sx: {
        textAlign: isArabic ? "right" : "left",
        right: isArabic ? 14 : "auto",
        left: isArabic ? "auto" : 14,
        transformOrigin: isArabic ? "top right" : "top left",
      },
    }}
    sx={{
      "& .MuiInputBase-input": {
        textAlign: isArabic ? "right" : "left", // for Arabic placeholders
      },
    }}
            InputProps={{
              endAdornment:
                type === "password" ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : undefined,
            }}
          />
          {/* Character counter at bottom right */}
          {(multiline) && (
            <Typography
              variant="caption"
              sx={{
                // position: "relative",
                // top:2,
                // right: 8,
                // bottom: 2,
                color: "#888",
                // background: "rgba(255,255,255,0.7)",
                // px: 0.5,
                // zIndex: 2,
                display:'flex',
                justifyContent:"flex-end"
              }}
            >
              {inputValue?.length}/{maxChar}
            </Typography>
          )}
        </Box>
      )}
    </div>
  );
};

export default CustomTextField;


// interface CustomTextFieldProps {
//   fullWidth?: boolean;
//   label: string;
//   placeholder?: string;
//   margin?: "none" | "dense" | "normal";
//   required?: boolean;
//   unique?: boolean;
//   maxChar?: number;
//   minChar?: number;
//   multiline?: boolean;
//   rows?: number;
//   type?: string;
//   value?: string;
//   phoneFormat?: boolean;
//   isCountry?: boolean; // 👈 for country dropdown
//   isPhoneCode?: boolean; // 👈 for phone code dropdown
//   onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//   sx?: any;
// }

// const CustomTextField: React.FC<CustomTextFieldProps> = ({
//   fullWidth = false,
//   label,
//   placeholder,
//   margin = "normal",
//   required = false,
//   maxChar,
//   minChar,
//   unique,
//   multiline = false,
//   rows = 1,
//   type = "text",
//   value = "",
//   phoneFormat = false,
//   isCountry = false,
//   isPhoneCode = false,
//   onChange,
//   sx,
// }) => {
//   const [inputValue, setInputValue] = useState(value);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const val = e.target.value;
//     if (maxChar && val.length > maxChar) return; // prevent typing beyond limit
//     setInputValue(val);
//     if (onChange) onChange(e);
//     validate(val);
//   };

//   const validate = (val: string) => {
//     if (minChar && val.length < minChar) {
//       setError(`Minimum ${minChar} characters required.`);
//       return;
//     }
//         if (unique && val === "123456") {
//       setError("Value too common. Please choose another.");
//       return;
//     }
//     //     // ✅ Phone number validation (no +966 auto)
//     if (phoneFormat && !isPhoneCode) {
//       const onlyDigits = val.replace(/\D/g, "");
//       if (onlyDigits.length !== 9) {
//         setError("Phone number must be exactly 9 digits.");
//         return;
//       }
//     }
//     setError("");
//   };

//   return (
//     <Box sx={{ width: fullWidth ? "100%" : "auto", ...sx }}>
//       <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 0.5 }}>
//         {label} {required && <span style={{ color: "red" }}>*</span>}
//       </Typography>

//       <TextField
//         fullWidth={fullWidth}
//         placeholder={placeholder}
//         required={required}
//         multiline={multiline}
//         rows={rows}
//         value={inputValue}
//         onChange={handleChange}
//         error={!!error}
//         helperText={error}
//         inputProps={{ maxLength: maxChar }}
//         margin={margin}
//         type={type === "password" && !showPassword ? "password" : "text"}
//         InputProps={{
//           endAdornment:
//             type === "password" ? (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setShowPassword(!showPassword)}>
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ) : undefined,
//         }}
//         sx={{
//           "& .MuiOutlinedInput-root": {
//             backgroundColor: "#f9f9f9",
//           },
//         }}
//       />

//       {/* Character counter */}
//       {maxChar && (
//         <Typography
//           variant="caption"
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             color: "#888",
//             mt: 0.3,
//           }}
//         >
//           {inputValue.length}/{maxChar}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default CustomTextField;
