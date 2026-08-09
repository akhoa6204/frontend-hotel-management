import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    rating: Palette["primary"];
  }

  interface PaletteOptions {
    rating?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E90FA",
      dark: "#1478D4",
      light: "#EAF4FA",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#163B47",
      secondary: "#66716F",
    },
    background: {
      default: "#F7F5F0",
      paper: "#FFFDFC",
    },
    divider: "#DEDAD2",
    success: { main: "#2F7D61" },
    error: { main: "#C95656" },
    rating: { main: "#C78B2C" },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: `"Open Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`,
    h1: { fontWeight: 700, fontSize: "2.25rem", lineHeight: 1.2 },
    h2: { fontWeight: 700, fontSize: "1.875rem", lineHeight: 1.25 },
    h3: { fontWeight: 600, fontSize: "1.5rem" },
    body1: { fontSize: "1rem" },
    button: { fontWeight: 600, textTransform: "none" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F7F5F0",
          color: "#163B47",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFDFC",
          color: "#163B47",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 10,
          paddingInline: 16,
          paddingBlock: 8,
        },
        containedPrimary: { color: "#FFFFFF" },
        text: { paddingInline: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 14 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#DEDAD2",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#AEB9B7",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2E90FA",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "inherit",
          textDecoration: "none",
          transition: "color 180ms ease",
          "&:hover": { color: "#2E90FA" },
        },
      },
    },
  },
});

export default theme;
