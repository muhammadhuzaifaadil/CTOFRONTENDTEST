import React from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

/* ---------- Shared styles (reuse across all forms) ---------- */

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
  "& .MuiInputBase-input": {
    py: 1.3,
    px: 2,
  },
};

const selectSx = {
  ...pillFieldBase,
};

const textFieldSx = {
  ...pillFieldBase,
};

const multilineTextFieldSx = {
  ...pillFieldBase,
  borderRadius: 3,
};

const sectionBoxSx = {
  mt: 1,
  p: 2,
  borderRadius: 3,
  bgcolor: "#F6F6FB",
};

const headerBoxSx = {
  display: "flex",
  width: "100%",
  borderRadius: "12px",
  px: 2,
  py: 1.5,
  mb: 3,
  background:
    "linear-gradient(90deg, rgba(68,76,247,0.1) 0%, rgba(91,95,255,0.1) 100%)",
};

/* ============================================================= */
/* 1. AI / ML SPECIFIC DETAILS                                   */
/* ============================================================= */

export const AiMlDetailsForm: React.FC<{ addQuestion: any }> = ({ addQuestion }) => {
  const [projectType, setProjectType] = React.useState("");
  const [datasetAvailability, setDatasetAvailability] = React.useState("");
  const [preferredModel, setPreferredModel] = React.useState("");
  const [integration, setIntegration] = React.useState("");
  const [outputFormat, setOutputFormat] = React.useState("");

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 3 }}>

        {/* Header */}
        <Box sx={headerBoxSx}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            AI/ML Specific Details
          </Typography>
        </Box>

        {/* Project Type */}
        <Box>
          <Typography sx={labelSx}>
            Project Type{" "}
            <Typography component="span" sx={{ color: "error.main" }}>
              *
            </Typography>
          </Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={projectType}
              onChange={(e) => {
                setProjectType(e.target.value);
                addQuestion("AI Project Type", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) =>
                v !== "" ? (v as string) : "Select AI project type"
              }
            >
              <MenuItem disabled value="">
                Select AI project type
              </MenuItem>
              <MenuItem value="prediction">Prediction / Forecasting</MenuItem>
              <MenuItem value="classification">Classification</MenuItem>
              <MenuItem value="nlp">NLP / Chatbot</MenuItem>
              <MenuItem value="cv">Computer Vision</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Dataset Availability */}
        <Box>
          <Typography sx={labelSx}>Dataset Availability</Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={datasetAvailability}
              onChange={(e) => {
                setDatasetAvailability(e.target.value);
                addQuestion("Dataset Availability", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select option")}
            >
              <MenuItem disabled value="">
                Select option
              </MenuItem>
              <MenuItem value="provided">Client will provide data</MenuItem>
              <MenuItem value="need-collection">Need help collecting data</MenuItem>
              <MenuItem value="public">Use public datasets</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Preferred Model */}
        <Box>
          <Typography sx={labelSx}>Preferred Model</Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={preferredModel}
              onChange={(e) => {
                setPreferredModel(e.target.value);
                addQuestion("Preferred Model", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select model")}
            >
              <MenuItem disabled value="">
                Select model
              </MenuItem>
              <MenuItem value="tree">Tree-based models</MenuItem>
              <MenuItem value="nn">Neural Networks</MenuItem>
              <MenuItem value="llm">LLM / GPT-style</MenuItem>
              <MenuItem value="no-pref">No preference</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Integration */}
        <Box>
          <Typography sx={labelSx}>Integration</Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={integration}
              onChange={(e) => {
                setIntegration(e.target.value);
                addQuestion("Integration Type", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select integration")}
            >
              <MenuItem disabled value="">
                Select integration
              </MenuItem>
              <MenuItem value="api">API</MenuItem>
              <MenuItem value="webapp">Web App</MenuItem>
              <MenuItem value="mobile">Mobile App</MenuItem>
              <MenuItem value="internal">Internal tool</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Output Format */}
        <Box>
          <Typography sx={labelSx}>Output Format</Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={outputFormat}
              onChange={(e) => {
                setOutputFormat(e.target.value);
                addQuestion("Output Format", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) =>
                v !== "" ? (v as string) : "Select output format"
              }
            >
              <MenuItem disabled value="">
                Select output format
              </MenuItem>
              <MenuItem value="dashboard">Dashboard / UI</MenuItem>
              <MenuItem value="api">JSON / API</MenuItem>
              <MenuItem value="file">File export (CSV, Excel)</MenuItem>
              <MenuItem value="notification">Alerts / Notifications</MenuItem>
            </Select>
          </FormControl>
        </Box>

      </Box>
    </Box>
  );
};


/* ============================================================= */
/* 2. ERP SYSTEM SPECIFIC DETAILS                                */
/* ============================================================= */

export const ErpSystemDetailsForm: React.FC<{ addQuestion: any }> = ({ addQuestion }) => {
  const [numUsers, setNumUsers] = React.useState("");
  const [deployment, setDeployment] = React.useState("");
  const [integrateExisting, setIntegrateExisting] = React.useState("");
  const [customizationLevel, setCustomizationLevel] = React.useState("");
  const [multiLocation, setMultiLocation] = React.useState("");
  const [multiCurrency, setMultiCurrency] = React.useState("");

  const [requiredModules, setRequiredModules] = React.useState<string[]>([]);
  const [reportingModules, setReportingModules] = React.useState<string[]>([]);

  // helper for checkbox groups
  const toggleModule = (
    module: string,
    current: string[],
    setter: (v: string[]) => void,
    questionLabel: string
  ) => {
    let updated: string[];

    if (current.includes(module)) {
      updated = current.filter((m) => m !== module);
    } else {
      updated = [...current, module];
    }

    setter(updated);
    addQuestion(questionLabel, updated.join(", "));
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 3 }}>
        
        {/* Header */}
        <Box sx={headerBoxSx}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            ERP System Specific Details
          </Typography>
        </Box>

        {/* Required Modules */}
        <Box>
          <Typography sx={labelSx}>Required Modules</Typography>
          <Box sx={sectionBoxSx}>
            <FormGroup>
              {["HR", "Finance", "Inventory", "CRM", "Payroll", "Sales", "Procurement"].map((m) => (
                <FormControlLabel
                  key={m}
                  control={
                    <Checkbox
                      checked={requiredModules.includes(m)}
                      onChange={() =>
                        toggleModule(m, requiredModules, setRequiredModules, "Required Modules")
                      }
                    />
                  }
                  label={m}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>

        {/* Number of Users */}
        <Box>
          <Typography sx={labelSx}>Number of Users</Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g., 50–100 users"
            value={numUsers}
            onChange={(e) => {
              setNumUsers(e.target.value);
              addQuestion("Number of Users", e.target.value);
            }}
            sx={textFieldSx}
          />
        </Box>

        {/* Deployment */}
        <Box>
          <Typography sx={labelSx}>Deployment</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={deployment}
              onChange={(e) => {
                setDeployment(e.target.value);
                addQuestion("Deployment Type", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select deployment")}
            >
              <MenuItem disabled value="">Select deployment</MenuItem>
              <MenuItem value="cloud">Cloud</MenuItem>
              <MenuItem value="on-prem">On-premise</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Integrate Existing Systems */}
        <Box>
          <Typography sx={labelSx}>Integrate Existing Systems?</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={integrateExisting}
              onChange={(e) => {
                setIntegrateExisting(e.target.value);
                addQuestion("Integrate Existing Systems", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select option")}
            >
              <MenuItem disabled value="">Select option</MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Customization Level */}
        <Box>
          <Typography sx={labelSx}>Customization Level</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={customizationLevel}
              onChange={(e) => {
                setCustomizationLevel(e.target.value);
                addQuestion("Customization Level", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select level")}
            >
              <MenuItem disabled value="">Select level</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Reporting */}
        <Box>
          <Typography sx={labelSx}>Reporting</Typography>
          <Box sx={sectionBoxSx}>
            <FormGroup>
              {["Sales", "Finance", "Inventory", "HR", "Production"].map((m) => (
                <FormControlLabel
                  key={m}
                  control={
                    <Checkbox
                      checked={reportingModules.includes(m)}
                      onChange={() =>
                        toggleModule(m, reportingModules, setReportingModules, "Reporting Modules")
                      }
                    />
                  }
                  label={m}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>

        {/* Multi-Location */}
        <Box>
          <Typography sx={labelSx}>Multi-Location Support?</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={multiLocation}
              onChange={(e) => {
                setMultiLocation(e.target.value);
                addQuestion("Multi-Location Support", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select option")}
            >
              <MenuItem disabled value="">Select option</MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Multi-Currency or Multi-Language */}
        <Box>
          <Typography sx={labelSx}>Multi-Currency or Multi-Language?</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={multiCurrency}
              onChange={(e) => {
                setMultiCurrency(e.target.value);
                addQuestion("Multi-Currency or Language", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select option")}
            >
              <MenuItem disabled value="">Select option</MenuItem>
              <MenuItem value="currency">Multi-currency</MenuItem>
              <MenuItem value="language">Multi-language</MenuItem>
              <MenuItem value="both">Both</MenuItem>
              <MenuItem value="none">None</MenuItem>
            </Select>
          </FormControl>
        </Box>

      </Box>
    </Box>
  );
};


/* ============================================================= */
/* 3. UI/UX DESIGN SPECIFIC DETAILS                              */
/* ============================================================= */

export const UiUxDesignDetailsForm: React.FC<{ addQuestion: any }> = ({ addQuestion }) => {
  const [screens, setScreens] = React.useState("");
  const [themePref, setThemePref] = React.useState("");
  const [stylePref, setStylePref] = React.useState("");
  const [refLinks, setRefLinks] = React.useState("");
  const [colorPalette, setColorPalette] = React.useState("");
  const [preferredTool, setPreferredTool] = React.useState("");
  const [projectOrigin, setProjectOrigin] = React.useState("");
  const [painPoints, setPainPoints] = React.useState("");
  const [competitorUrls, setCompetitorUrls] = React.useState("");

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 3 }}>
        <Box sx={headerBoxSx}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            UI/UX Design Specific Details
          </Typography>
        </Box>

        {/* Number of Screens / Pages */}
        <Box>
          <Typography sx={labelSx}>Number of Screens / Pages</Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g., 10–15 screens"
            value={screens}
            onChange={(e) => {
              setScreens(e.target.value);
              addQuestion("Number of Screens / Pages", e.target.value);
            }}
            sx={textFieldSx}
          />
        </Box>

        {/* Design Preferences */}
        <Box>
          <Typography sx={labelSx}>Design Preferences</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Theme: Light / Dark"
              value={themePref}
              onChange={(e) => {
                setThemePref(e.target.value);
                addQuestion("Theme Preference", e.target.value);
              }}
              sx={textFieldSx}
            />
            <TextField
              fullWidth
              size="small"
              placeholder="Style: Minimal / Modern / Creative"
              value={stylePref}
              onChange={(e) => {
                setStylePref(e.target.value);
                addQuestion("Style Preference", e.target.value);
              }}
              sx={textFieldSx}
            />
            <TextField
              fullWidth
              size="small"
              placeholder="References: Dribbble/Behance links"
              value={refLinks}
              onChange={(e) => {
                setRefLinks(e.target.value);
                addQuestion("Reference Links", e.target.value);
              }}
              sx={textFieldSx}
            />
            <TextField
              fullWidth
              size="small"
              placeholder="Color Palette: e.g., Blue & White"
              value={colorPalette}
              onChange={(e) => {
                setColorPalette(e.target.value);
                addQuestion("Color Palette", e.target.value);
              }}
              sx={textFieldSx}
            />
          </Box>
        </Box>

        {/* Preferred Tools */}
        <Box>
          <Typography sx={labelSx}>Preferred Tools</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={preferredTool}
              onChange={(e) => {
                setPreferredTool(e.target.value);
                addQuestion("Preferred Tool", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select tool")}
            >
              <MenuItem disabled value="">Select tool</MenuItem>
              <MenuItem value="figma">Figma</MenuItem>
              <MenuItem value="xd">Adobe XD</MenuItem>
              <MenuItem value="sketch">Sketch</MenuItem>
              <MenuItem value="no-pref">No preference</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Project Origin */}
        <Box>
          <Typography sx={labelSx}>Project Origin</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={projectOrigin}
              onChange={(e) => {
                setProjectOrigin(e.target.value);
                addQuestion("Project Origin", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select option")}
            >
              <MenuItem disabled value="">Select option</MenuItem>
              <MenuItem value="new">New product</MenuItem>
              <MenuItem value="redesign">Redesign</MenuItem>
              <MenuItem value="mvp">MVP / Prototype</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Redesign Pain Points */}
        <Box>
          <Typography sx={labelSx}>Redesign Pain Points (If applicable)</Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="What issues need to be addressed?"
            value={painPoints}
            onChange={(e) => {
              setPainPoints(e.target.value);
              addQuestion("Redesign Pain Points", e.target.value);
            }}
            sx={multilineTextFieldSx}
          />
        </Box>

        {/* Competitor References */}
        <Box>
          <Typography sx={labelSx}>Competitor References (URLs)</Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Enter competitor website URLs"
            value={competitorUrls}
            onChange={(e) => {
              setCompetitorUrls(e.target.value);
              addQuestion("Competitor References", e.target.value);
            }}
            sx={multilineTextFieldSx}
          />
        </Box>
      </Box>
    </Box>
  );
};


/* ============================================================= */
/* 4. DIGITAL MARKETING SPECIFIC DETAILS                         */
/* ============================================================= */

export const DigitalMarketingDetailsForm: React.FC<{ addQuestion: any }> = ({ addQuestion }) => {
  const [services, setServices] = React.useState("");
  const [reporting, setReporting] = React.useState("");
  const [campaignStart, setCampaignStart] = React.useState("");

  const [goals, setGoals] = React.useState<string[]>([]);
  const [channels, setChannels] = React.useState<string[]>([]);
  const [assets, setAssets] = React.useState<string[]>([]);
  const [extras, setExtras] = React.useState<string[]>([]);

  const handleCheckboxChange = (
    value: string,
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
    fieldName: string
  ) => {
    const newArray = array.includes(value)
      ? array.filter((v) => v !== value)
      : [...array, value];
    setArray(newArray);
    addQuestion(fieldName, newArray.join(", "));
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 3 }}>
        <Box sx={headerBoxSx}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Digital Marketing Specific Details
          </Typography>
        </Box>

        {/* Goals */}
        <Box>
          <Typography sx={labelSx}>Goals</Typography>
          <Box sx={sectionBoxSx}>
            <FormGroup>
              {["Leads", "Awareness", "Sales", "Traffic"].map((goal) => (
                <FormControlLabel
                  key={goal}
                  control={
                    <Checkbox
                      checked={goals.includes(goal)}
                      onChange={() => handleCheckboxChange(goal, goals, setGoals, "Goals")}
                    />
                  }
                  label={goal}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>

        {/* Channels */}
        <Box>
          <Typography sx={labelSx}>Channels</Typography>
          <Box sx={sectionBoxSx}>
            <FormGroup>
              {["SEO", "Social Media", "Email", "Paid Ads"].map((ch) => (
                <FormControlLabel
                  key={ch}
                  control={
                    <Checkbox
                      checked={channels.includes(ch)}
                      onChange={() => handleCheckboxChange(ch, channels, setChannels, "Channels")}
                    />
                  }
                  label={ch}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>

        {/* Existing Assets */}
        <Box>
          <Typography sx={labelSx}>Existing Assets</Typography>
          <Box sx={sectionBoxSx}>
            <FormGroup>
              {["Website Analytics", "Social Accounts"].map((asset) => (
                <FormControlLabel
                  key={asset}
                  control={
                    <Checkbox
                      checked={assets.includes(asset)}
                      onChange={() => handleCheckboxChange(asset, assets, setAssets, "Existing Assets")}
                    />
                  }
                  label={asset}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>

        {/* Services */}
        <Box>
          <Typography sx={labelSx}>Services</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={services}
              onChange={(e) => {
                setServices(e.target.value);
                addQuestion("Services", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select services")}
            >
              <MenuItem disabled value="">Select services</MenuItem>
              <MenuItem value="seo">SEO</MenuItem>
              <MenuItem value="smm">Social Media Marketing</MenuItem>
              <MenuItem value="sem">Paid Ads / SEM</MenuItem>
              <MenuItem value="email">Email Marketing</MenuItem>
              <MenuItem value="all">Full‑funnel marketing</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Extras */}
        <Box>
          <Typography sx={labelSx}>Extras</Typography>
          <Box sx={sectionBoxSx}>
            <FormGroup>
              {["Influencer Marketing", "Affiliate Marketing"].map((extra) => (
                <FormControlLabel
                  key={extra}
                  control={
                    <Checkbox
                      checked={extras.includes(extra)}
                      onChange={() => handleCheckboxChange(extra, extras, setExtras, "Extras")}
                    />
                  }
                  label={extra}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>

        {/* Reporting */}
        <Box>
          <Typography sx={labelSx}>Reporting</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={reporting}
              onChange={(e) => {
                setReporting(e.target.value);
                addQuestion("Reporting", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select reporting type")}
            >
              <MenuItem disabled value="">Select reporting type</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Campaign Start */}
        <Box>
          <Typography sx={labelSx}>Campaign Start</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={campaignStart}
              onChange={(e) => {
                setCampaignStart(e.target.value);
                addQuestion("Campaign Start", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select start time")}
            >
              <MenuItem disabled value="">Select start time</MenuItem>
              <MenuItem value="immediate">Immediately</MenuItem>
              <MenuItem value="1week">Within 1 week</MenuItem>
              <MenuItem value="1month">Within 1 month</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};


// mobileapp

export const MobileAppDetailsForm: React.FC<{ addQuestion: any }> = ({ addQuestion }) => {
  const [platform, setPlatform] = React.useState("");
  const [appType, setAppType] = React.useState("");

  const [loginOptions, setLoginOptions] = React.useState<string[]>([]);
  const [deployment, setDeployment] = React.useState<string[]>([]);
  const [features, setFeatures] = React.useState<string[]>([]);

  const handleCheckboxChange = (
    value: string,
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
    fieldName: string
  ) => {
    const newArray = array.includes(value)
      ? array.filter((v) => v !== value)
      : [...array, value];
    setArray(newArray);
    addQuestion(fieldName, newArray.join(", "));
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 3 }}>
        <Box sx={headerBoxSx}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Mobile App Specific Details
          </Typography>
        </Box>

        {/* Platform */}
        <Box>
          <Typography sx={labelSx}>Platform *</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={platform}
              onChange={(e) => {
                setPlatform(e.target.value);
                addQuestion("Platform", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select platform")}
            >
              <MenuItem disabled value="">Select platform</MenuItem>
              <MenuItem value="ios">iOS</MenuItem>
              <MenuItem value="android">Android</MenuItem>
              <MenuItem value="both">Both</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* App Type */}
        <Box>
          <Typography sx={labelSx}>App Type</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={appType}
              onChange={(e) => {
                setAppType(e.target.value);
                addQuestion("App Type", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select app type")}
            >
              <MenuItem disabled value="">Select app type</MenuItem>
              <MenuItem value="native">Native</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="webview">WebView</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Login Options */}
        <Box>
          <Typography sx={labelSx}>Login Options</Typography>
          <Box sx={sectionBoxSx}>
            <FormGroup>
              {["Google", "Email", "Phone"].map((opt) => (
                <FormControlLabel
                  key={opt}
                  control={
                    <Checkbox
                      checked={loginOptions.includes(opt)}
                      onChange={() => handleCheckboxChange(opt, loginOptions, setLoginOptions, "Login Options")}
                    />
                  }
                  label={opt}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>

        {/* Deployment */}
        <Box>
          <Typography sx={labelSx}>Deployment</Typography>
          <Box sx={sectionBoxSx}>
            <FormGroup>
              {["App Store", "Play Store"].map((dep) => (
                <FormControlLabel
                  key={dep}
                  control={
                    <Checkbox
                      checked={deployment.includes(dep)}
                      onChange={() => handleCheckboxChange(dep, deployment, setDeployment, "Deployment")}
                    />
                  }
                  label={dep}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>

        {/* Additional Features */}
        <Box>
          <Typography sx={labelSx}>Additional Features</Typography>
          <Box sx={sectionBoxSx}>
            <FormGroup>
              {["Notifications", "Chat", "Tracking", "Maps"].map((feat) => (
                <FormControlLabel
                  key={feat}
                  control={
                    <Checkbox
                      checked={features.includes(feat)}
                      onChange={() => handleCheckboxChange(feat, features, setFeatures, "Additional Features")}
                    />
                  }
                  label={feat}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};


// webapp
export const WebsiteAppDetailsForm: React.FC<{ addQuestion: any }> = ({ addQuestion }) => {
  const [websiteType, setWebsiteType] = React.useState("");
  const [adminPanel, setAdminPanel] = React.useState("");
  const [analytics, setAnalytics] = React.useState("");
  const [domainHosting, setDomainHosting] = React.useState("");
  const [pages, setPages] = React.useState("");

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 3 }}>
        <Box sx={headerBoxSx}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Website Specific Details
          </Typography>
        </Box>

        {/* Website Type */}
        <Box>
          <Typography sx={labelSx}>Website Type *</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={websiteType}
              onChange={(e) => {
                setWebsiteType(e.target.value);
                addQuestion("Website Type", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select website type")}
            >
              <MenuItem disabled value="">Select website type</MenuItem>
              <MenuItem value="landing">Landing Page</MenuItem>
              <MenuItem value="corporate">Corporate Website</MenuItem>
              <MenuItem value="ecommerce">E‑commerce</MenuItem>
              <MenuItem value="webapp">Web Application</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Admin Panel */}
        <Box>
          <Typography sx={labelSx}>Admin Panel Required?</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={adminPanel}
              onChange={(e) => {
                setAdminPanel(e.target.value);
                addQuestion("Admin Panel Required", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select option")}
            >
              <MenuItem disabled value="">Select option</MenuItem>
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
            onChange={(e) => {
              setPages(e.target.value);
              addQuestion("Number of Pages", e.target.value);
            }}
            sx={textFieldSx}
          />
        </Box>

        {/* Analytics Integration */}
        <Box>
          <Typography sx={labelSx}>Analytics Integration?</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={analytics}
              onChange={(e) => {
                setAnalytics(e.target.value);
                addQuestion("Analytics Integration", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select option")}
            >
              <MenuItem disabled value="">Select option</MenuItem>
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
              onChange={(e) => {
                setDomainHosting(e.target.value);
                addQuestion("Domain & Hosting", e.target.value);
              }}
              sx={selectSx}
              renderValue={(v) => (v !== "" ? (v as string) : "Select option")}
            >
              <MenuItem disabled value="">Select option</MenuItem>
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
