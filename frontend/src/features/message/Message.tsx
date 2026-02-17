import { useTheme } from "../../context/ThemeContext";


export interface MessageProps {
    id: string;
    role: string;
    content: string;
    created_at: string;
}

export function Message({ content, role, created_at }: MessageProps) {
    const { theme } = useTheme();
    const isUser = role === 'user';
    
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${theme.fontFamily} ${
            isUser
              ? `${theme.primary} text-white`
              : `${theme.surface} ${theme.text} ${theme.shadow}`
          }`}
        >
          <p className="break-words">{content}</p>
          <p className={`text-xs mt-1 ${
            isUser ? theme.primaryLight : theme.textSecondary
          }`}>
            {created_at}
          </p>
        </div>
      </div>
    );
  }