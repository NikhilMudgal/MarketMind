export interface ThemeConfig {
    primary: string;
    primaryHover: string;
    primaryText: string;
    primaryLight: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    borderInput: string;
    shadow: string;
    fontFamily: string;
  }
  
  // Theme Type
  export type ThemeName = 'light' | 'dark' | 'ocean';
  
  // Themes Object
  export const themes: Record<ThemeName, ThemeConfig> = {
    light: {
      primary: 'bg-blue-600',
      primaryHover: 'hover:bg-blue-700',
      primaryText: 'text-blue-600',
      primaryLight: 'text-blue-100',
      secondary: 'bg-white',
      background: 'bg-gray-50',
      surface: 'bg-white',
      text: 'text-gray-800',
      textSecondary: 'text-gray-500',
      border: 'border-gray-200',
      borderInput: 'border-gray-300',
      shadow: 'shadow-md',
      fontFamily: 'font-sans',
    },
    dark: {
      primary: 'bg-purple-600',
      primaryHover: 'hover:bg-purple-700',
      primaryText: 'text-purple-400',
      primaryLight: 'text-purple-200',
      secondary: 'bg-gray-800',
      background: 'bg-gray-900',
      surface: 'bg-gray-800',
      text: 'text-gray-100',
      textSecondary: 'text-gray-400',
      border: 'border-gray-700',
      borderInput: 'border-gray-600',
      shadow: 'shadow-xl',
      fontFamily: 'font-sans',
    },
    ocean: {
      primary: 'bg-teal-600',
      primaryHover: 'hover:bg-teal-700',
      primaryText: 'text-teal-600',
      primaryLight: 'text-teal-100',
      secondary: 'bg-cyan-50',
      background: 'bg-gradient-to-b from-cyan-50 to-blue-50',
      surface: 'bg-white',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-cyan-200',
      borderInput: 'border-cyan-300',
      shadow: 'shadow-lg',
      fontFamily: 'font-sans',
    }
  };