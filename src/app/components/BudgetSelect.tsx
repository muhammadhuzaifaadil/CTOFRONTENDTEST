import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";

interface BudgetSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string; // 👈 optional label prop
  required?: boolean;
  isArabic?:boolean;
}

const budget = [
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
];

const BudgetSelect: React.FC<BudgetSelectProps> = ({
  value,
  onChange,
  label = "Budget",
  required = false,
  isArabic = false,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* 👇 Label above the dropdown (similar to CustomTextField) */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "bold",
          mb: 0.5,
          textAlign:"left",
          display:"flex",
          // justifyContent: isArabic ? "flex-end" : "flex-start",
        }}
      >
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>

      <FormControl fullWidth variant="outlined">
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
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
          {budget.map((item:any) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BudgetSelect;
