"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  theme: "light" | "dark";
  toggleTheme: () => void;

  currentThemeColor: string;
  setTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // LIGHT / DARK
  const [theme, setThemeMode] = useState<"light" | "dark">("dark");

  // MULTIPLE PREDEFINED THEMES (green, purple, blue, orange...)
  const [currentThemeColor, setCurrentThemeColor] = useState("purple"); // default theme

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("currentThemeColor");
    const savedMode = localStorage.getItem("theme");
    if (savedTheme) setCurrentThemeColor(savedTheme);
    if (savedMode === "light" || savedMode === "dark") setThemeMode(savedMode);
  }, []);

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement;

    // Light / Dark mode
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    // Multiple theme
    root.setAttribute("data-theme", currentThemeColor);

    // Save user selection
    localStorage.setItem("currentThemeColor", currentThemeColor);
    localStorage.setItem("theme", theme);
  }, [theme, currentThemeColor]);

  const toggleTheme = () => setThemeMode(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,

        currentThemeColor,
        setTheme: setCurrentThemeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
};
