import React from "react";
import {
  Drawer,
  Box,
  Avatar,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  Dashboard,
  Folder,
  Settings,
  Person,
  ChevronLeft,
  ChevronRight,
  MenuOpen,
  Menu as MenuIcon,
  UnfoldLess as UnfoldLessIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const navItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/" },
  { text: "Projects", icon: <Folder />, path: "/projects" },
  { text: "Profile", icon: <Person />, path: "/profile" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
];

export default function Sidebar({ state, setState, variant = "permanent" }) {
  const theme = useTheme();
  const { visible, mini } = state ?? { visible: true, mini: false };

  const updateState = (next) => {
    if (typeof setState === "function") {
      setState((prev) => (typeof next === "function" ? next(prev) : { ...prev, ...next }));
    }
  };

  // If permanent variant and sidebar is hidden entirely -> show floating open button
  if (variant === "permanent" && !visible) {
    return (
      <>
        <Box component="nav" sx={{ width: 0, flexShrink: 0 }} />
        <IconButton
          onClick={() => updateState({ visible: true, mini: false })}
          color="primary"
          aria-label="open sidebar"
          sx={{
            position: "fixed",
            left: 12,
            top: 12,
            zIndex: theme.zIndex.drawer + 2,
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 1,
            px: 0.6,
            py: 0.6,
          }}
          size="medium"
        >
          <MenuIcon />
        </IconButton>
      </>
    );
  }

  // If permanent variant and sidebar is in mini mode -> show floating expand button too
  if (variant === "permanent" && mini) {
    // render the small sidebar plus floating expand button
    return (
      <>
        <Box
          component="aside"
          sx={{
            width: 72,
            flex: "0 0 auto",
            bgcolor: "background.paper",
            borderRight: "none",
            boxShadow: 3,
            height: "100vh",
            position: "relative",
            transition: "width 200ms ease",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 1.25, pt: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40, mx: "auto" }}>A</Avatar>
          </Box>

          <Divider sx={{ my: 1 }} />

          <List sx={{ mt: 1 }}>
            {navItems.map((item) => (
              <NavLink key={item.text} to={item.path} style={{ textDecoration: "none", color: "inherit" }} end={item.path === "/"}>
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      px: 1,
                      py: 1.2,
                      transition: "background-color 160ms ease, box-shadow 160ms ease",
                      bgcolor: isActive ? "primary.main" : "transparent",
                      color: isActive ? "white" : "text.primary",
                      "&:hover": {
                        bgcolor: isActive ? "primary.dark" : "action.hover",
                        boxShadow: isActive ? 6 : 0,
                      },
                      justifyContent: "center",
                    }}
                  >
                    <ListItemIcon sx={{ color: isActive ? "white" : "text.secondary", minWidth: 0, display: "flex", justifyContent: "center" }}>
                      {item.icon}
                    </ListItemIcon>
                  </ListItemButton>
                )}
              </NavLink>
            ))}
          </List>
        </Box>

        {/* Floating expand button for mini -> expand to full */}
        <IconButton
          onClick={() => updateState({ mini: false })}
          color="primary"
          aria-label="expand sidebar"
          sx={{
            position: "fixed",
            left: 82, // just right to the mini sidebar
            top: 12,
            zIndex: theme.zIndex.drawer + 2,
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 1,
            px: 0.6,
            py: 0.6,
          }}
          size="small"
        >
          <UnfoldLessIcon />
        </IconButton>
      </>
    );
  }

  // ---------- Permanent full sidebar ----------
  if (variant === "permanent") {
    return (
      <Box
        component="aside"
        sx={{
          width: 260,
          flex: "0 0 auto",
          bgcolor: "background.paper",
          borderRight: "none",
          boxShadow: 3,
          height: "100vh",
          position: "relative",
          transition: "width 200ms ease",
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 2, pt: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 44, height: 44 }}>A</Avatar>

          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              Admin
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Yig'ish">
            <IconButton onClick={() => updateState({ mini: true })} size="small" aria-label="collapse sidebar">
              <MenuOpen />
            </IconButton>
          </Tooltip>

          <Tooltip title="Yopish">
            <IconButton onClick={() => updateState({ visible: false })} size="small" aria-label="hide sidebar" sx={{ ml: 0.5 }}>
              <ChevronLeft />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider sx={{ my: 1 }} />

        <List sx={{ mt: 1 }}>
          {navItems.map((item) => (
            <NavLink key={item.text} to={item.path} style={{ textDecoration: "none", color: "inherit" }} end={item.path === "/"}>
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    px: 2,
                    py: 1.2,
                    transition: "background-color 160ms ease, box-shadow 160ms ease",
                    bgcolor: isActive ? "primary.main" : "transparent",
                    color: isActive ? "white" : "text.primary",
                    "&:hover": {
                      bgcolor: isActive ? "primary.dark" : "action.hover",
                      boxShadow: isActive ? 6 : 0,
                    },
                    justifyContent: "flex-start",
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? "white" : "text.secondary", minWidth: 0, mr: 1 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              )}
            </NavLink>
          ))}
        </List>

        <Box sx={{ flexGrow: 1 }} />
      </Box>
    );
  }

  // ---------- Temporary (mobile) drawer ----------
  return (
    <Drawer
      open={visible}
      onClose={() => updateState({ visible: false })}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          width: 260,
          borderRight: "none",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 2, pt: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main", width: 44, height: 44 }}>A</Avatar>

        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            Admin
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Premium member
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton onClick={() => updateState({ visible: false })} size="small" aria-label="close sidebar">
          <ChevronLeft />
        </IconButton>
      </Box>

      <Divider sx={{ my: 1 }} />

      <List sx={{ mt: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.text}
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
            end={item.path === "/"}
            onClick={() => updateState({ visible: false })}
          >
            {({ isActive }) => (
              <ListItemButton
                sx={{
                  px: 2,
                  py: 1.2,
                  transition: "background-color 160ms ease, box-shadow 160ms ease",
                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "white" : "text.primary",
                  "&:hover": {
                    bgcolor: isActive ? "primary.dark" : "action.hover",
                    boxShadow: isActive ? 6 : 0,
                  },
                  justifyContent: "flex-start",
                }}
              >
                <ListItemIcon sx={{ color: isActive ? "white" : "text.secondary", minWidth: 0, mr: 1 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            )}
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
}
