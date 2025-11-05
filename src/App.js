import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, useMediaQuery } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import ContentContainer from "./components/ContentContainer";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export default function App() {
  // detect system preference once
  const prefersSystemDark = useMediaQuery("(prefers-color-scheme: dark)");

  // safe lazy initializer for sidebar state from localStorage
  const [sidebar, setSidebar] = React.useState(() => {
    try {
      const raw = localStorage.getItem("app_sidebar_state");
      return raw ? JSON.parse(raw) : { visible: true, mini: false };
    } catch {
      return { visible: true, mini: false };
    }
  });

  // dark mode state (lazy initializer checks localStorage, then system preference)
  const [darkMode, setDarkMode] = React.useState(() => {
    try {
      const v = localStorage.getItem("app_dark_mode");
      if (v === "true") return true;
      if (v === "false") return false;
      return prefersSystemDark;
    } catch {
      return prefersSystemDark;
    }
  });

  // persist sidebar state
  React.useEffect(() => {
    try {
      localStorage.setItem("app_sidebar_state", JSON.stringify(sidebar));
    } catch {
      // ignore storage errors
    }
  }, [sidebar]);

  // persist dark mode
  React.useEffect(() => {
    try {
      localStorage.setItem("app_dark_mode", darkMode ? "true" : "false");
    } catch {
      // ignore storage errors
    }
  }, [darkMode]);

  // breakpoint check for permanent vs temporary drawer
  const mdUp = useMediaQuery(lightTheme.breakpoints.up("md"));

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
          {/* Sidebar: permanent on md and up, temporary on small screens */}
          <Sidebar
            state={sidebar}
            setState={setSidebar}
            variant={mdUp ? "permanent" : "temporary"}
          />

          {/* Main area */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Topbar
              onMenu={() => setSidebar((s) => ({ ...s, visible: !s.visible }))}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />

            <Box component="main" sx={{ flexGrow: 1 }}>
              <ContentContainer>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </ContentContainer>
            </Box>

            <Footer />
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}
