import React from "react";
import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box p={3}>
      <Typography variant="h4">Dashboard</Typography>
      <Typography mt={1}>
        Welcome to your premium dashboard — quick stats and widgets go here.
      </Typography>
    </Box>
  );
}
