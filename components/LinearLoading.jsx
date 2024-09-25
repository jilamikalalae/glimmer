import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, LinearProgress } from "@mui/material";

const theme = createTheme({
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFB6C1", // Background color (track)
        },
        bar: {
          backgroundColor: "#FF69B4", // Custom color for the progress bar (Hot Pink)
        },
      },
    },
  },
});

export default function LinearLoading() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </ThemeProvider>
  );
}
