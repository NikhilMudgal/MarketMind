import { useRef, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { Send, Paperclip, Loader2 } from "lucide-react";

interface ChatInputProps {
  value: string;
  onFileUpload?: (file: File) => void;
  isUploading?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: (message: string) => void;
}

export function ChatInput({ value, onChange, onSend, onFileUpload, isUploading, disabled }: ChatInputProps) {

  const { theme } = useTheme();

  const [input, setInput] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null); // 3. Reference to hidden input

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
    // Reset the input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`${theme.surface} border-t ${theme.border} p-4`}>
      <div className="max-w-3xl mx-auto flex justify-start">
        {/* 4. Hidden File Input */}
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* 5. Updated Paperclip Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
          className="p-2 text-gray-400 hover:text-blue-600 transition-colors disabled:opacity-50 size-14"
          title="Upload PDF"
        >
          {isUploading ? <Loader2 size={20} className="animate-spin text-blue-600" /> : <Paperclip size={20} />}
        </button>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask MarketMind about a stock or upload a PDF..."
          className="size-14 grow w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 mr-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 max-h-[150px] overflow-y-auto"
          rows={1}
          disabled={disabled || isUploading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled || isUploading}
          className={`${theme.primary} ${theme.primaryHover} text-white rounded-lg transition-colors p-3 size-14`}
        >
          <Send size={20} />
        </button>

      </div>
    </div>
  );
}