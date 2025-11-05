import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
      <Typography variant="caption">
        © {new Date().getFullYear()} Yaratuvchi IT PROGRESS
      </Typography>
    </Box>
  );
}
