import React from "react";
import { Box, Container, Paper } from "@mui/material";

/*
 ContentContainer: markaziy kontentni ekran o'rtasida ko'rsatadi.
 maxWidth bilan container markazga joylanadi.
 Parent App.jsx orqali sidebar width offsetni hisoblash mumkin,
 ammo biz content markazda qolishini ta'minlaymiz.
*/
export default function ContentContainer({ children }) {
  return (
    <Box sx={{ width: "100%", py: 4 }}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
          {children}
        </Paper>
      </Container>
    </Box>
  );
}
