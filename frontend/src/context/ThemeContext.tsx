import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeConfig {
  primaryColor: string; // e.g., "221 83% 53%"
  fontFamily: string;
  mode: "light" | "dark";
}

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (newTheme: Partial<ThemeConfig>) => void;
}

const defaultTheme: ThemeConfig = {
  primaryColor: "221 83% 53%",
  fontFamily: "Inter",
  mode: "light",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    // Persist theme in localStorage
    const saved = localStorage.getItem("app-theme");
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;

    // 1. Update Color Variables
    root.style.setProperty("--primary", theme.primaryColor);
    root.style.setProperty("--font-sans", theme.fontFamily);

    // 2. Handle Dark Mode Class
    if (theme.mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // 3. Save to LocalStorage
    localStorage.setItem("app-theme", JSON.stringify(theme));
  }, [theme]);

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setTheme((prev) => ({ ...prev, ...updates }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};