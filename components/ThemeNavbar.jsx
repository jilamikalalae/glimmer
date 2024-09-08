"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppNavbar from "@/components/AppNavbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import getBlogTheme from "@/theme/getBlogTheme";

export default function ThemeNavbar() {
  const mode = "light";
  const blogTheme = createTheme(getBlogTheme(mode));

  return (
    <ThemeProvider theme={blogTheme}>
      <CssBaseline enableColorScheme />
      <AppNavbar />
    </ThemeProvider>
  );
}
