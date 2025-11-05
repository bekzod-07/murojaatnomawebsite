import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Typography,
  Button,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Logout as LogoutIcon } from "@mui/icons-material";

/*
 Props:
  - open: boolean
  - onClose: fn
  - user: { name, email, phone, role, avatarLetter } (optional)
*/

export default function ProfileModal({ open, onClose, user = {} }) {
  const { name = "Admin User", email = "admin@example.com", phone = "+998 90 000 00 00", role = "Premium", avatarLetter = "A" } = user;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>{avatarLetter}</Avatar>
          <Box>
            <Typography variant="h6" component="div">{name}</Typography>
            <Typography variant="caption" color="text.secondary">{role}</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton aria-label="edit-profile" size="small" onClick={() => alert("Edit profile clicked")}>
            <EditIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Box sx={{ mt: 1, display: "grid", gap: 1 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Email</Typography>
            <Typography variant="body2">{email}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">Telefon</Typography>
            <Typography variant="body2">{phone}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">A'zolik</Typography>
            <Typography variant="body2">{role}</Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button startIcon={<LogoutIcon />} color="inherit" onClick={() => alert("Logout clicked")}>
          Logout
        </Button>
        <Button variant="contained" onClick={onClose}>Yopish</Button>
      </DialogActions>
    </Dialog>
  );
}
