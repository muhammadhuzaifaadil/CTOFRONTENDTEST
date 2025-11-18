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
import { getAllCountries } from "./countryList";
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
  isNumbersOnly?:boolean;
  isAlphabetOnly?:boolean;
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
  isArabic = false,
  isNumbersOnly = false,
  isAlphabetOnly = false,
}) => {
 
  
  const [inputValue, setInputValue] = useState(
    value
  );
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [countries] = useState(getAllCountries());
const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === "PK") || countries[0]);
  useEffect(() => {
    if ((type === "password"||type ==="كلمة المرور" )&& (fieldName?.toLowerCase().includes("confirm")||fieldName?.toLowerCase().includes("تأكيد")) &&
    inputValue) {
      validateInput(inputValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmValue]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let val = e.target.value;
 // 🔹 Block unwanted characters
  if (isNumbersOnly) {
    val = val.replace(/[^0-9]/g, ""); // only digits allowed
  } else if (isAlphabetOnly) {
    val = val.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, ""); // only letters (supports Arabic & English)
  }


    if (maxChar && val.length > maxChar) return; // prevent typing beyond limit
    setInputValue(val);
    if (onChange) onChange(e);
    validateInput(val);
  };

  const validateInput = (val: string) => {
  let newError = "";

  if (maxChar && val.length > maxChar) {
    newError = `Max ${maxChar} characters allowed.`;
  } else if (minChar && val.length < minChar) {
    newError = `Min ${minChar} characters required.`;
  } 
  // else if ((label?.toLowerCase().includes("email") || label?.toLowerCase().includes("البريد الإلكتروني")) && val && !val.includes("@")) {
  //   newError = isArabic?"يجب أن يحتوي البريد الإلكتروني على '@'":"Email must contain '@'";
  // } 
  else if ((label?.toLowerCase().includes("email") || label?.toLowerCase().includes("البريد الإلكتروني")) && val) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(val)) {
    newError = isArabic
      ? "الرجاء إدخال بريد إلكتروني صالح."
      : "Please enter a valid email address.";
  }
}

  else if (phoneFormat && !isPhoneCode) {
    const onlyDigits = val.replace(/\D/g, "");
    if (onlyDigits.length !== 9) {
      // newError = isArabic?"يجب أن يحتوي رقم الهاتف على 9 أرقام بالضبط.":"Phone number must be exactly 9 digits.";
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
useEffect(() => {
  setInputValue(value);
}, [value]);

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
          {countries.map((c) => (
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
      value={selectedCountry.phoneCode}
      onChange={(e) => {
        const country = countries.find((c) => c.phoneCode === e.target.value);
        if (country) setSelectedCountry(country);
        // Also update main inputValue with the phone code only if needed
        setInputValue(country?.phoneCode || "");
        if (onChange)
          onChange({
            target: {
              value: country?.phoneCode || "",
              name: fieldName,
            },
          } as React.ChangeEvent<HTMLInputElement>);
      }}
      sx={{ width: "135px" }}
      margin={margin}
    >
           {countries.map((c) => (
        <MenuItem key={c.code} value={c.phoneCode}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span>{c.flag}</span>
            {c.phoneCode}
          </Box>
        </MenuItem>
      ))}
    </TextField>
      )
      : isNumbersOnly ?
      (<TextField
    fullWidth={fullWidth}
    name={fieldName || label?.replace(/\s+/g, "")}
    placeholder={placeholder}
    margin={margin}
    value={inputValue}
    onChange={handleChange}
    error={!!error}
    helperText={error}
    type="number"
    inputProps={{
      inputMode: "numeric",
      pattern: "[0-9]*",
       style: {
      MozAppearance: "textfield",
    },
      maxLength: maxChar,
      dir: "ltr",
    }}
    onKeyDown={(e) => {
    if (e.key === '-' || e.key === 'e') e.preventDefault();
  }}
  />)
      : (
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


// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Typography,
//   InputAdornment,
//   IconButton,
//   MenuItem,
//   Box,
//   type SxProps,
//   type Theme,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { parsePhoneNumberFromString, AsYouType, CountryCode } from "libphonenumber-js";
// import "country-flag-icons/react/3x2"; // optional SVG flags
// import { getAllCountries } from "./countryList";

// const countryData = [
//   { name: "United States", code: "US", phoneCode: "+1", flag: "🇺🇸" },
//   { name: "United Kingdom", code: "GB", phoneCode: "+44", flag: "🇬🇧" },
//   { name: "Saudi Arabia", code: "SA", phoneCode: "+966", flag: "🇸🇦" },
//   { name: "Pakistan", code: "PK", phoneCode: "+92", flag: "🇵🇰" },
//   { name: "India", code: "IN", phoneCode: "+91", flag: "🇮🇳" },
//   { name: "United Arab Emirates", code: "AE", phoneCode: "+971", flag: "🇦🇪" },
// ];

// interface CustomTextFieldProps {
//   fullWidth?: boolean;
//   label?: string;
//   placeholder?: string;
//   margin?: "none" | "dense" | "normal";
//   required?: boolean;
//   maxChar?: number;
//   minChar?: number;
//   unique?: boolean;
//   type?: string;
//   value?: string;
//   confirmValue?: string;
//   multiline?: boolean;
//   rows?: number;
//   fieldName?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
//   onErrorChange?: (fieldName: string, hasError: boolean) => void;
//   phoneFormat?: boolean;
//   isCountry?: boolean;
//   isPhoneCode?: boolean;
//   sx?: SxProps<Theme>;
//   isArabic?: boolean;
//   isNumbersOnly?: boolean;
//   isAlphabetOnly?: boolean;
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
//   type = "text",
//   value,
//   confirmValue,
//   multiline = false,
//   rows = 1,
//   fieldName,
//   onChange,
//   onErrorChange,
//   phoneFormat = false,
//   isCountry = false,
//   isPhoneCode = false,
//   isArabic = false,
//   isNumbersOnly = false,
//   isAlphabetOnly = false,
// }) => {
//   const [inputValue, setInputValue] = useState(value || "");
//   const [error, setError] = useState<string>("");
//   const [showPassword, setShowPassword] = useState(false);

//   // new states for phone code
//   const [countries] = useState(getAllCountries());
// const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === "PK") || countries[0]);

//   // const [selectedCountry, setSelectedCountry] = useState(countryData[0]);
//   const [phoneNumber, setPhoneNumber] = useState("");

//   useEffect(() => {
//     if (
//       (type === "password" || type === "كلمة المرور") &&
//       (fieldName?.toLowerCase().includes("confirm") ||
//         fieldName?.toLowerCase().includes("تأكيد")) &&
//       inputValue
//     ) {
//       validateInput(inputValue);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [confirmValue]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     let val = e.target.value;
//     if (isNumbersOnly) val = val.replace(/[^0-9]/g, "");
//     else if (isAlphabetOnly) val = val.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, "");
//     if (maxChar && val.length > maxChar) return;
//     setInputValue(val);
//     if (onChange) onChange(e);
//     validateInput(val);
//   };

//   // 📱 Handle phone number change (with libphonenumber-js)
//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;
//     const formatted = new AsYouType(selectedCountry.code as CountryCode).input(val);
//     setPhoneNumber(formatted);

//     // Validate number
//     const parsed = parsePhoneNumberFromString(val, selectedCountry.code as CountryCode);
//     if (parsed && !parsed.isValid()) {
//       setError("Invalid phone number for " + selectedCountry.name);
//       if (onErrorChange && fieldName) onErrorChange(fieldName, true);
//     } else {
//       setError("");
//       if (onErrorChange && fieldName) onErrorChange(fieldName, false);
//     }

//     if (onChange)
//       onChange({
//         ...e,
//         target: {
//           ...e.target,
//           value: `${selectedCountry.phoneCode}${val}`,
//         },
//       } as React.ChangeEvent<HTMLInputElement>);
//   };

//   const validateInput = (val: string) => {
//     let newError = "";
//     if (maxChar && val.length > maxChar) newError = `Max ${maxChar} characters allowed.`;
//     else if (minChar && val.length < minChar) newError = `Min ${minChar} characters required.`;
//     else if (
//       (label?.toLowerCase().includes("email") ||
//         label?.toLowerCase().includes("البريد الإلكتروني")) &&
//       val
//     ) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
//       if (!emailRegex.test(val))
//         newError = isArabic
//           ? "الرجاء إدخال بريد إلكتروني صالح."
//           : "Please enter a valid email address.";
//     }
//     else if (
//       (type === "password" || type === "كلمة المرور") &&
//       (fieldName?.toLowerCase() === "password" ||
//         fieldName?.toLowerCase() === "newpassword" ||
//         fieldName?.toLowerCase() === "كلمة المرور" ||
//         fieldName?.toLowerCase() === "كلمة المرور الجديدة")
//     ) {
//       const passwordRegex =
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
//       if (!passwordRegex.test(val))
//         newError = isArabic
//           ? "يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم ورمز خاص."
//           : "Password must contain uppercase, lowercase, number & special character.";
//     }

//     else if (
//       (type === "password" || type === "كلمة المرور") &&
//       (fieldName?.toLowerCase().includes("confirm") ||
//         fieldName?.toLowerCase().includes("confirmnew") ||
//         fieldName?.toLowerCase().includes("تأكيد") ||
//         fieldName?.toLowerCase().includes("تأكيد جديد"))
//     ) {
//       if (confirmValue && confirmValue !== val)
//         newError = isArabic ? "كلمات المرور غير متطابقة." : "Passwords do not match.";
//     }

//     else if (unique && val === "123456") {
//       newError = isArabic
//         ? "القيمة شائعة جدًا. يرجى اختيار قيمة أخرى."
//         : "Value too common. Please choose another.";
//     }

//     setError(newError);
//     if (onErrorChange && fieldName) onErrorChange(fieldName, !!newError);
//   };

//   return (
//     <div style={{ width: fullWidth ? "100%" : "auto" }}>
//       <Typography
//         variant="subtitle2"
//         sx={{
//           fontWeight: "bold",
//           mb: 0.5,
//           textAlign: `${isArabic ? "right" : "left"}`,
//         }}
//       >
//         {label} {required && <span style={{ color: "red" }}>*</span>}
//       </Typography>
//        {/* 👇 Conditional Rendering */}
//        {isCountry ? (
//         <TextField
//           name={fieldName || label?.replace(/\s+/g, "")}
//           select
//           fullWidth={fullWidth}
//           value={inputValue}
//           onChange={handleChange}
//           margin={margin}
//           helperText={error}
//           error={!!error}
//           label="Country"
//         >
//           <MenuItem value="" disabled>
//             Select Country
//           </MenuItem>
//           {countryData.map((c) => (
//             <MenuItem key={c.code} value={c.name}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <span>{c.flag}</span>
//                 {c.name}
//               </Box>
//             </MenuItem>
//           ))}
//         </TextField>
//       ) :
//       {/* 📞 Phone Code + Number Combo */}
//       {isPhoneCode ? (
//          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//     <TextField
//       select
//       value={selectedCountry.phoneCode}
//       onChange={(e) => {
//         const country = countries.find((c) => c.phoneCode === e.target.value);
//         if (country) setSelectedCountry(country);
//         // Also update main inputValue with the phone code only if needed
//         setInputValue(country?.phoneCode || "");
//         if (onChange)
//           onChange({
//             target: {
//               value: country?.phoneCode || "",
//               name: fieldName,
//             },
//           } as React.ChangeEvent<HTMLInputElement>);
//       }}
//       sx={{ width: "135px" }}
//       margin={margin}
//     >
//       {countries.map((c) => (
//         <MenuItem key={c.code} value={c.phoneCode}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <span>{c.flag}</span>
//             {c.phoneCode}
//           </Box>
//         </MenuItem>
//       ))}
//     </TextField>
//   </Box>
//       ) : (
//         // 🔹 Other fields remain unchanged
//         <Box sx={{ position: "relative" }}>
//           <TextField
//             fullWidth={fullWidth}
//             name={fieldName || label?.replace(/\s+/g, "")}
//             placeholder={placeholder}
//             margin={margin}
//             multiline={multiline}
//             rows={rows}
//             required={required}
//             type={type === "password" && !showPassword ? "password" : "text"}
//             value={inputValue}
//             onChange={handleChange}
//             error={!!error}
//             helperText={error}
//             inputProps={{
//               maxLength: maxChar,
//               minLength: minChar,
//               dir: "ltr",
//             }}
//             sx={{
//               "& .MuiInputBase-input": {
//                 textAlign: isArabic ? "right" : "left",
//               },
//             }}
//             InputProps={{
//               endAdornment:
//                 type === "password" ? (
//                   <InputAdornment position="end">
//                     <IconButton onClick={() => setShowPassword((p) => !p)} edge="end">
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ) : undefined,
//             }}
//           />
//           {multiline && (
//             <Typography
//               variant="caption"
//               sx={{
//                 color: "#888",
//                 display: "flex",
//                 justifyContent: "flex-end",
//               }}
//             >
//               {inputValue?.length}/{maxChar}
//             </Typography>
//           )}
//         </Box>
//       )}
//     </div>
//   );
// };

// export default CustomTextField;
