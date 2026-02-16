import { useTheme } from "../../context/ThemeContext";
import { ThemeSwitcher } from "../ThemeSwitcher";

interface HeaderProps {
    title: string;
    status: string;
}
export function Header({ title, status }: HeaderProps) {
    const { theme } = useTheme();
    
    return (
      <div className={`${theme.primary} text-white p-4 ${theme.shadow}`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-xl font-semibold ${theme.fontFamily}`}>{title}</h1>
            <p className={`text-sm ${theme.primaryLight}`}>{status}</p>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    );
  }