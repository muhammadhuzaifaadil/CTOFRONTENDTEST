import React from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

const labelSx = {
  fontSize: 14,
  fontWeight: 600,
  color: "#1F1F39",
  mb: 1,
};

const selectSx = {
  borderRadius: "999px",
  bgcolor: "#F7F7FB",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
    boxShadow: "0 0 0 2px rgba(68,76,247,0.18)",
  },
  "& .MuiSelect-select": {
    py: 1.3,
    px: 2,
  },
};

const sectionBoxSx = {
  mt: 1,
  p: 2,
  borderRadius: 3,
  bgcolor: "#F6F6FB",
};

const MobileApp: React.FC = () => {
  const [platform, setPlatform] = React.useState("");
  const [appType, setAppType] = React.useState("");

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 3,
        }}
      >
        {/* header */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            borderRadius: "12px",
            px: 2,
            py: 1.5,
            background:
              "linear-gradient(90deg, rgba(68,76,247,0.1) 0%, rgba(91,95,255,0.1) 100%)",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Mobile App Specific Details
          </Typography>
        </Box>

        {/* platform */}
        <Box>
          <Typography sx={labelSx}>
            Platform{" "}
            <Typography component="span" sx={{ color: "error.main" }}>
              *
            </Typography>
          </Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              sx={selectSx}
              renderValue={(value) =>
                value !== "" ? (value as string) : "Select platform"
              }
            >
              <MenuItem disabled value="">
                Select platform
              </MenuItem>
              <MenuItem value="ios">iOS</MenuItem>
              <MenuItem value="android">Android</MenuItem>
              <MenuItem value="both">Both</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* app type */}
        <Box>
          <Typography sx={labelSx}>App Type</Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={appType}
              onChange={(e) => setAppType(e.target.value)}
              sx={selectSx}
              renderValue={(value) =>
                value !== "" ? (value as string) : "Select app type"
              }
            >
              <MenuItem disabled value="">
                Select app type
              </MenuItem>
              <MenuItem value="native">Native</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="webview">WebView</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* login options */}
        <Box>
          <Typography sx={labelSx}>Login Options</Typography>
          <Box sx={sectionBoxSx}>
            <FormGroup>
              <FormControlLabel control={<Checkbox color="primary" />} label="Google" />
              <FormControlLabel control={<Checkbox color="primary" />} label="Email" />
              <FormControlLabel control={<Checkbox color="primary" />} label="Phone" />
            </FormGroup>
          </Box>
        </Box>

        {/* deployment */}
        <Box>
          <Typography sx={labelSx}>Deployment</Typography>
          <Box sx={sectionBoxSx}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="App Store"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Play Store"
              />
            </FormGroup>
          </Box>
        </Box>

        {/* additional features */}
        <Box>
          <Typography sx={labelSx}>Additional Features</Typography>
          <Box sx={sectionBoxSx}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Notifications"
              />
              <FormControlLabel control={<Checkbox color="primary" />} label="Chat" />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Tracking"
              />
              <FormControlLabel control={<Checkbox color="primary" />} label="Maps" />
            </FormGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileApp;