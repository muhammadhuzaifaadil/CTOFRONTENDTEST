import React from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const labelSx = {
  fontSize: 14,
  fontWeight: 600,
  color: "#1F1F39",
  mb: 1,
};

const pillFieldBase = {
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
};

const selectSx = {
  ...pillFieldBase,
  "& .MuiSelect-select": {
    py: 1.3,
    px: 2,
  },
};

const textFieldSx = {
  ...pillFieldBase,
  "& .MuiInputBase-input": {
    py: 1.3,
    px: 2,
  },
};

const WebsiteApp: React.FC = () => {
  const [websiteType, setWebsiteType] = React.useState("");
  const [adminPanel, setAdminPanel] = React.useState("");
  const [analytics, setAnalytics] = React.useState("");
  const [domainHosting, setDomainHosting] = React.useState("");
  const [pages, setPages] = React.useState("");

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
            Website Specific Details
          </Typography>
        </Box>

        {/* Website Type */}
        <Box>
          <Typography sx={labelSx}>
            Website Type{" "}
            <Typography component="span" sx={{ color: "error.main" }}>
              *
            </Typography>
          </Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={websiteType}
              onChange={(e) => setWebsiteType(e.target.value)}
              sx={selectSx}
              renderValue={(value) =>
                value !== "" ? (value as string) : "Select website type"
              }
            >
              <MenuItem disabled value="">
                Select website type
              </MenuItem>
              <MenuItem value="landing">Landing Page</MenuItem>
              <MenuItem value="corporate">Corporate Website</MenuItem>
              <MenuItem value="ecommerce">E‑commerce</MenuItem>
              <MenuItem value="webapp">Web Application</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Admin Panel Required? */}
        <Box>
          <Typography sx={labelSx}>Admin Panel Required?</Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={adminPanel}
              onChange={(e) => setAdminPanel(e.target.value)}
              sx={selectSx}
              renderValue={(value) =>
                value !== "" ? (value as string) : "Select option"
              }
            >
              <MenuItem disabled value="">
                Select option
              </MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Number of Pages */}
        <Box>
          <Typography sx={labelSx}>Number of Pages</Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="e.g., 5–10 pages"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            sx={textFieldSx}
          />
        </Box>

        {/* Analytics Integration? */}
        <Box>
          <Typography sx={labelSx}>Analytics Integration?</Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={analytics}
              onChange={(e) => setAnalytics(e.target.value)}
              sx={selectSx}
              renderValue={(value) =>
                value !== "" ? (value as string) : "Select option"
              }
            >
              <MenuItem disabled value="">
                Select option
              </MenuItem>
              <MenuItem value="google-analytics">Google Analytics</MenuItem>
              <MenuItem value="mixpanel">Mixpanel</MenuItem>
              <MenuItem value="none">None</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Domain & Hosting */}
        <Box>
          <Typography sx={labelSx}>Domain & Hosting</Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={domainHosting}
              onChange={(e) => setDomainHosting(e.target.value)}
              sx={selectSx}
              renderValue={(value) =>
                value !== "" ? (value as string) : "Select option"
              }
            >
              <MenuItem disabled value="">
                Select option
              </MenuItem>
              <MenuItem value="provided-by-client">Provided by client</MenuItem>
              <MenuItem value="need-domain">Need domain</MenuItem>
              <MenuItem value="need-hosting">Need hosting</MenuItem>
              <MenuItem value="need-both">Need both domain & hosting</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default WebsiteApp;