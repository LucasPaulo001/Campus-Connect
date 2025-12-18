"use client";

import { ActionProvider } from "@/contexts/ActionsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import React from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <ActionProvider>
          <Provider store={store}>{children}</Provider>
          <Toaster position="top-right" />
        </ActionProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
