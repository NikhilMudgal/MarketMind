import { useState } from "react";
import { Header } from "../../../components/ui/Header";
import { MessagesList } from "../../message/MessagesList";
import { ChatInput } from "./ChatInput";
import type { MessageProps } from "../../message/Message";

export function ChatWindow() {
    const [messages, setMessages] = useState<MessageProps[]>([
      { id: "1", content: "Hey! How are you?", role: "other", created_at: "10:30 AM" },
      { id: "2", content: "I'm doing great, thanks! How about you?", role: "user", created_at: "10:31 AM" },
      { id: "3", content: "Pretty good! Just working on some projects.", role: "other", created_at: "10:32 AM" },
    ]);
    const [input, setInput] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
  
    const handleSend = async () => {
      const currentTime = Date.now().toString()
      setMessages(prev => [...prev , {
        id: "4",
        role: "user",
        content: input,
        created_at: currentTime
      }]);
      
      if (input.trim()) {
          setInput('');
      }

      const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      };

      try {
        // 2. Call the Backend
        const response = await fetch('http://localhost:8000/api/v1/chat/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                content: input,
                conversation_id: null // We will handle IDs later
            })
        });

        const data = await response.json();

        // 3. Display AI Response
        setMessages(prev => [...prev, {
            id: data.id,
            role: 'assistant',
            content: data.content,
            created_at: new Date(data.created_at).toLocaleTimeString()
        }]);

    } catch (error) {
      // return (
            // <div className="flex items-center justify-center h-screen">
            //   <p className="text-red-500">{error}</p>
            // </div>
          // );
        console.error("Error sending message:", error);
        // Ideally, show an error toast here
    } finally {
        setIsTyping(false);
    }

      if (isTyping) {
        return (
          <div className="flex items-center justify-center h-screen">
            <p>Loading messages...</p>
          </div>
        );
      }
    };
  
    return (
      <div className="flex flex-col h-screen max-w-2xl mx-auto">
        <Header title="Chat" status="Online" />
        <MessagesList messages={messages} />
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSend={handleSend}
          
        />
      </div>
    );
  }