import { useState } from "react";
import { Header } from "../../../components/ui/Header";
import { MessagesList } from "../../message/MessagesList";
import { ChatInput } from "./ChatInput";
import type { MessageProps } from "../../message/Message";

export function ChatWindow() {
    const [messages, setMessages] = useState<MessageProps[]>([
      { id: "1", text: "Hey! How are you?", sender: "other", timestamp: "10:30 AM" },
      { id: "2", text: "I'm doing great, thanks! How about you?", sender: "user", timestamp: "10:31 AM" },
      { id: "3", text: "Pretty good! Just working on some projects.", sender: "other", timestamp: "10:32 AM" },
    ]);
    const [input, setInput] = useState<string>('');
  
    const handleSend = (): void => {
      if (input.trim()) {
        const newMessage: MessageProps = {
          id: (messages.length + 1).toString(),
          text: input,
          sender: "user",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMessage]);
        setInput('');
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