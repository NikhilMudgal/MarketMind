import { useTheme } from "../context/ThemeContext";

export function ThemeSwitcher() {
  const { theme, updateTheme } = useTheme();

  return (
    <div className="p-4 border rounded-lg bg-background text-foreground">
      <h3 className="text-lg font-bold mb-2">Theme Settings</h3>
      
      {/* 1. Toggle Dark Mode */}
      <button
        onClick={() => updateTheme({ mode: theme.mode === "dark" ? "light" : "dark" })}
        className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
      >
        Toggle {theme.mode === "dark" ? "Light" : "Dark"} Mode
      </button>

      {/* 2. Change Primary Color Instantly */}
      <div className="mt-4 flex gap-2">
        {/* Red Theme */}
        <button
          className="w-8 h-8 rounded-full bg-red-500"
          onClick={() => updateTheme({ primaryColor: "0 84% 60%" })} // Red HSL
        />
        {/* Green Theme */}
        <button
          className="w-8 h-8 rounded-full bg-green-500"
          onClick={() => updateTheme({ primaryColor: "142 71% 45%" })} // Green HSL
        />
        {/* Blue Theme (Default) */}
        <button
          className="w-8 h-8 rounded-full bg-blue-600"
          onClick={() => updateTheme({ primaryColor: "221 83% 53%" })}
        />
      </div>
    </div>
  );
}