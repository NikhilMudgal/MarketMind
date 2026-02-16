import { useTheme } from "../../context/ThemeContext";


export interface MessageProps {
    id: string;
    text: string;
    sender: string;
    timestamp: string;
}

export function Message({ text, sender, timestamp }: MessageProps) {
    const { theme } = useTheme();
    const isUser = sender === 'user';
    
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${theme.fontFamily} ${
            isUser
              ? `${theme.primary} text-white`
              : `${theme.surface} ${theme.text} ${theme.shadow}`
          }`}
        >
          <p className="break-words">{text}</p>
          <p className={`text-xs mt-1 ${
            isUser ? theme.primaryLight : theme.textSecondary
          }`}>
            {timestamp}
          </p>
        </div>
      </div>
    );
  }