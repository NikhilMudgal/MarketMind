import type { ThemeName } from "../context/ThemeConfig";
import { useTheme } from "../context/ThemeContext";

export function ThemeSwitcher() {
  const { currentTheme, setCurrentTheme, themes } = useTheme();
  
  return (
    <div className="flex gap-2">
      {(Object.keys(themes) as ThemeName[]).map((themeName) => (
        <button
          key={themeName}
          onClick={() => setCurrentTheme(themeName)}
          className={`px-3 py-1 rounded text-sm capitalize ${
            currentTheme === themeName
              ? 'bg-white bg-opacity-30 font-semibold'
              : 'bg-white bg-opacity-10 hover:bg-opacity-20'
          }`}
        >
          {themeName}
        </button>
      ))}
    </div>
  );
}