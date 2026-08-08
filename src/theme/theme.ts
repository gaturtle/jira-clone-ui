import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0052CC",
    },
    secondary: {
      main: "#6554C0",
    },
    background: {
      default: "#F7F8F9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#172B4D",
      secondary: "#42526E",
    },
    divider: "#DFE1E6",
  },
  shape: {
    borderRadius: 3,
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 13,
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 3,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          fontWeight: 500,
        },
      },
    },
  },
});
