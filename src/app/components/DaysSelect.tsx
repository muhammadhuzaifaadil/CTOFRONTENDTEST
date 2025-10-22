import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";

interface DurationSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string; // 👈 optional label prop
  required?: boolean;
}

const duration = [
  "Days",
  "Weeks",
  "Months",
  "Hours",
  "Years",
];

const DurationSelect: React.FC<DurationSelectProps> = ({
  value,
  onChange,
  label = "Duration",
  required = false,
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
          textAlign: "left",
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
            Select Duration
          </MenuItem>
          {duration.map((item:any) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DurationSelect;
