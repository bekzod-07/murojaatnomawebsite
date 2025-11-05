import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Avatar, Switch, Box, Tooltip } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import ProfileModal from "./ProfileModal";
import NotificationBell from "./NotificationBell";

export default function Topbar({ onMenu, darkMode, setDarkMode }) {
  // sample user + notifications state — siz backend bilan almashtiring
  const user = React.useMemo(() => ({
    name: "Bekzod Sindorov",
    email: "bekzod@example.com",
    phone: "+998 95 328 15 00",
    role: "Premium",
    avatarLetter: "B",
  }), []);

  const [profileOpen, setProfileOpen] = React.useState(false);

  const [notifications, setNotifications] = React.useState([
    { id: 1, title: "Yangi test", message: "Sizga yangi test yuborildi.", time: "2m", avatarLetter: "T", read: false },
    { id: 2, title: "To'lov", message: "Obuna muddati tugamoqda.", time: "1h", avatarLetter: "P", read: false },
    { id: 3, title: "Xabar", message: "Yangi foydalanuvchi ro'yxatdan o'tdi.", time: "1d", avatarLetter: "U", read: true },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none", mb: 2 }}>
      <Toolbar>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Notifications">
            <NotificationBell notifications={notifications} onMarkAllRead={markAllRead} />
          </Tooltip>

          <Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />

          <Tooltip title="Profil">
            <IconButton onClick={() => setProfileOpen(true)} sx={{ p: 0 }}>
              <Avatar sx={{ width: 36, height: 36 }}>{user.avatarLetter}</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} user={user} />
    </AppBar>
  );
}
