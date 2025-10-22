import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string; // 👈 optional label prop
  required?: boolean;
}

const categories = [
  "Coding",
  "IT",
  "SQA",
  "Database",
  "AI",
  "ERP",
  "Mobile Apps",
  "Content Writing",
  "UI",
  "Web Experts",
];

const CategorySelect: React.FC<CategorySelectProps> = ({
  value,
  onChange,
  label = "Category",
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
            Select Category
          </MenuItem>
          {categories.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategorySelect;
