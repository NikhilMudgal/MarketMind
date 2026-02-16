import { createContext, useContext, useState, type ReactNode } from "react";
import { themes, type ThemeConfig, type ThemeName } from "./ThemeConfig";

interface ThemeContextType {
    theme: ThemeConfig;
    currentTheme: ThemeName;
    setCurrentTheme: (theme: ThemeName) => void;
    themes: Record<ThemeName, ThemeConfig>;
  }

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [currentTheme, setCurrentTheme] = useState<ThemeName>('light');
    
    const theme = themes[currentTheme];
    
    return (
      <ThemeContext.Provider value={{ theme, currentTheme, setCurrentTheme, themes }}>
        {children}
      </ThemeContext.Provider>
    );
  }
  
  export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
  }
  