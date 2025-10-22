import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4a32e6ff", // blue-500 (trustworthy, vibrant)
      light: "#60A5FA",
      dark: "#1E40AF",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#8B5CF6", // violet-500 (creative, tech feel)
      light: "#A78BFA",
      dark: "#5B21B6",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F8FAFC", // soft neutral background
      paper: "#FFFFFF",   // clean card background
    },
    text: {
      primary: "#1E293B", // slate-800
      secondary: "#475569", // slate-600
    },
    success: {
      main: "#10B981", // emerald-500
    },
    error: {
      main: "#EF4444", // red-500
    },
    warning: {
      main: "#F59E0B", // amber-500
    },
    info: {
      main: "#0EA5E9", // sky-500
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
});
export default theme;
