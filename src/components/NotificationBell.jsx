import React from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";

/*
 Props:
  - notifications: array of { id, title, message, time, avatarLetter, read }
  - onMarkAllRead: fn
*/

export default function NotificationBell({ notifications = [], onMarkAllRead = () => {} }) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton aria-label="notifications" onClick={handleOpen} size="large">
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { width: 320, maxWidth: "90vw", p: 0 } }}
      >
        <Box sx={{ px: 2, py: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="subtitle1">Notifications</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button size="small" onClick={() => { onMarkAllRead(); }} >Mark all</Button>
        </Box>

        <Divider />

        {notifications.length === 0 ? (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">Xabarnoma yo'q</Typography>
          </Box>
        ) : (
          notifications.map((n) => (
            <MenuItem key={n.id} onClick={() => { /* you can open specific notification */ }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: n.read ? "grey.400" : "primary.main" }}>{n.avatarLetter ?? "N"}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle2" sx={{ fontWeight: n.read ? 400 : 700 }}>{n.title}</Typography>}
                secondary={<Typography variant="body2" color="text.secondary" noWrap>{n.message}</Typography>}
              />
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>{n.time}</Typography>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
}
