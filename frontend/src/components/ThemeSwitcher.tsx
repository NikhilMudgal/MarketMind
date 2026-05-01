import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeSwitcher() {
  const { currentTheme, setCurrentTheme } = useTheme();
  
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${
        currentTheme === 'light' 
          ? 'bg-white/20 text-white hover:bg-white/30' 
          : 'bg-gray-800 text-yellow-400 hover:bg-gray-700 shadow-md'
      }`}
      aria-label="Toggle theme"
      title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
    >
      {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}