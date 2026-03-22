import { useState } from "react";
import { Header } from "../../../components/ui/Header";
import { MessagesList } from "../../message/MessagesList";
import { ChatInput } from "./ChatInput";
import type { MessageProps } from "../../message/Message";

export function ChatWindow() {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileUpload = async (file: File) => {
    if (file.type !== 'application/pdf') {
      alert("Please Upload a PDF file.");
      return;
    }

    setIsUploading(true);

    // Showing a temporary message
    const tempId = Date.now().toString();
    const tempMsg: MessageProps = {
      id: tempId,
      role: 'assistant',
      content: `Processing ${file.name}...`,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, tempMsg]);

    try {
      // Prepare the file to upload
      const formData = new FormData();
      formData.append('file', file);

      // call the backend. We are not sending the content tyep as browser handles it automatically for FormData
      const response = await fetch('http://localhost:8000/api/v1/documents/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error("Failed to upload file");

      const data = await response.json();

      // Add AI Message WITH Stock Data
      const aiMsg: MessageProps = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Successfully learned "${file.name}"! I memorized ${data.chunk_processed} data chunks. You can now ask me questions about this document.`,
        created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);

    } catch (error) {
      console.error("Upload error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Failed to process "${file.name}". Please ensure your backend is running and try again.`,
        created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    // 1. Add User Message to UI instantly
    const userMsg: MessageProps = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // 2. Mock Agent Logic: Check for command
      if (text.toLowerCase().startsWith('/stock ')) {
        const ticker = text.split(' ')[1].toUpperCase();

        // Call your backend API
        const response = await fetch(`http://localhost:8000/api/v1/finance/stock/${ticker}`);

        if (!response.ok) throw new Error("Stock data not found.");

        const data = await response.json();

        // 3. Add AI Message WITH Stock Data
        const aiMsg: MessageProps = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Here is the latest market data for ${ticker}:`,
          stockData: data, // Injecting the data here!
          created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);

      } else {
        // Normal chat response
        setTimeout(() => {
          const aiMsg: MessageProps = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `I received: "${text}". \n\nTip: Type "/stock AAPL" or "/stock TSLA" to see my market data tools in action!`,
            created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, aiMsg]);
          setIsTyping(false);
        }, 1000);
        return; // Exit early so we don't hit the bottom setIsTyping(false) too fast
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg: MessageProps = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I couldn't retrieve that stock symbol right now. Please check the ticker and try again.",
        created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <Header title="Chat" status="Online" />
      <MessagesList messages={messages} isTyping={isTyping} />
      <ChatInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFileUpload={handleFileUpload}
        isUploading={isUploading}
        disabled={isTyping || isUploading}
        onSend={(message) => {
          const text = message.trim();
          if (!text) return;
          handleSendMessage(text);
          setInput('');
        }}

      />
    </div>
  );
}