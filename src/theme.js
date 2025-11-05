import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1e88e5" },
    background: { default: "#f6f8fb", paper: "#fff" },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: "6px 8px",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    background: { default: "#0f1724", paper: "#0b1220" },
    text: { primary: "#e6eef8", secondary: "#9fb3cf" },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: "6px 8px",
        },
      },
    },
  },
});
