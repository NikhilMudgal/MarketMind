import { useTheme } from "../../../context/ThemeContext";
import { Send } from "lucide-react";

interface ChatInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSend: () => void;
}
  
export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
    const { theme } = useTheme();
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    };
  
    return (
      <div className={`${theme.surface} border-t ${theme.border} p-4`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className={`flex-1 border ${theme.borderInput} rounded-lg px-4 py-2 ${theme.fontFamily} ${theme.text} ${theme.surface} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
          />
          <button
            onClick={onSend}
            className={`${theme.primary} ${theme.primaryHover} text-white p-2 rounded-lg transition-colors`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    );
  }