// import {
//   Box,
//   Typography,
//   FormControl,
//   Select,
//   MenuItem,
//   type SelectChangeEvent,
// } from "@mui/material";

// interface BudgetSelectProps {
//   value: string;
//   onChange: (value: string) => void;
//   label?: string; // 👈 optional label prop
//   required?: boolean;
//   isArabic?:boolean;
// }

// const budget = [
//   "$100",
//   "$200",
//   "$300",
//   "$400",
//   "$500",
//   "$600",
//   "$700",
//   "$800",
//   "$900",
//   "$1000",
// ];

// const BudgetSelect: React.FC<BudgetSelectProps> = ({
//   value,
//   onChange,
//   label = "Budget",
//   required = false,
//   isArabic = false,
// }) => {
//   const handleChange = (event: SelectChangeEvent) => {
//     onChange(event.target.value);
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       {/* 👇 Label above the dropdown (similar to CustomTextField) */}
//       <Typography
//         variant="subtitle2"
//         sx={{
//           fontWeight: "bold",
//           mb: 0.5,
//           textAlign:"left",
//           display:"flex",
//           // justifyContent: isArabic ? "flex-end" : "flex-start",
//         }}
//       >
//         {label} {required && <span style={{ color: "red" }}>*</span>}
//       </Typography>

//       <FormControl fullWidth variant="outlined">
//         <Select
//           value={value}
//           onChange={handleChange}
//           displayEmpty
//           sx={{
//             borderRadius: 2,
//             backgroundColor: "#f9f9f9",
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#3B82F6",
//             },
//             "&:hover .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#2563EB",
//             },
//             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#1D4ED8",
//             },
//           }}
//         >
//           <MenuItem value="" disabled>
//             Select Budget
//           </MenuItem>
//           {budget.map((item:any) => (
//             <MenuItem key={item} value={item}>
//               {item}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

// export default BudgetSelect;



import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";

interface BudgetSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  isArabic?: boolean;
}

const budgets = [
  "$100",
  "$200",
  "$300",
  "$400",
  "$500",
  "$600",
  "$700",
  "$800",
  "$900",
  "$1000",
  "Custom",
];

const BudgetSelect: React.FC<BudgetSelectProps> = ({
  value,
  onChange,
  label = "Budget",
  required = false,
  isArabic = false,
}) => {
  const [customValue, setCustomValue] = useState("");
  const [customSelected, setCustomSelected] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    if (selectedValue === "Custom") {
      setCustomSelected(true);
    } else {
      setCustomSelected(false);
      setCustomValue("");
      onChange(selectedValue);
    }
  };

  const handleCustomFocus = (event: React.MouseEvent) => {
    event.stopPropagation(); // prevent select from closing
    setCustomSelected(true);
  };

  const handleCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value.replace(/[^0-9]/g, "");
    setCustomValue(val);
  };

  const handleCustomCommit = () => {
    if (customValue) {
      onChange(`$${customValue}`);
    } else {
      onChange("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCustomCommit();
    }
  };

  const displayedValue =
    customSelected || (!budgets.includes(value) && value) ? "Custom" : value;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "bold",
          mb: 0.5,
          textAlign: "right",
          display: "flex",
          justifyContent:isArabic?"flex-end":"flex-start"
        }}
      >
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>

      <FormControl fullWidth variant="outlined">
        <Select
          value={displayedValue}
          onChange={handleChange}
          displayEmpty
          MenuProps={{
            PaperProps: { sx: { maxHeight: 250 } },
          }}
          sx={{
            borderRadius: 2,
            backgroundColor: "#f9f9f9",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#3B82F6",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2563EB",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1D4ED8",
            },
          }}
        >
          <MenuItem value="" disabled>
            Select Budget
          </MenuItem>

          {budgets.map((item) =>
            item === "Custom" ? (
              <MenuItem
                key={item}
                value="Custom"
                disableRipple
                disableTouchRipple
                onMouseDown={handleCustomFocus}
                sx={{
                  "&:hover": { backgroundColor: "transparent" },
                  cursor: "default",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: "100%",
                    pointerEvents: "auto",
                  }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter custom amount"
                    value={customValue}
                    onChange={handleCustomChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleCustomCommit}
                    autoFocus={customSelected}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        height: "32px",
                        backgroundColor: "#fff",
                      },
                    }}
                    inputProps={{
                      style: { textAlign: "left" },
                    }}
                    onClick={(e) => e.stopPropagation()} // ✅ prevent closing
                  />
                  <Typography variant="body2" color="text.secondary">
                    $
                  </Typography>
                </Box>
              </MenuItem>
            ) : (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BudgetSelect;
