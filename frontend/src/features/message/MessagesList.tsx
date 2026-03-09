import { Bot } from "lucide-react";
import { MessageBubble } from "../chat/components/MessageBubble";
import { type MessageProps } from "./Message";
import { useEffect, useRef } from "react";

interface MessagesListProps {
    messages: MessageProps[];
    isTyping?: boolean; // Add this prop to indicate if the assistant is typing
}

export function MessagesList({ messages, isTyping }: MessagesListProps) {
    // const { theme } = useTheme();
    
     const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when a new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

    return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">
      
      {/* 1. Empty State */}
      {messages.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center text-gray-400">
          <p>No messages yet. Start analyzing markets!</p>
        </div>
      ) : (
        /* 2. THIS IS WHERE MESSAGE BUBBLES ARE RENDERED */
        messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            role={msg.role} 
            content={msg.content}
            timestamp={msg.created_at}
            stockData={msg.stockData} /* <--- CRUCIAL FIX: Passing the data down! */
          />
        ))
      )}
      
      {/* 3. Typing Indicator */}
      {isTyping && (
         <div className="flex w-full mt-2 space-x-3 max-w-3xl mx-auto justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
               <Bot size={18} className="text-blue-600" />
            </div>
            <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
               <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
            </div>
         </div>
      )}

        {/* Invisible div to scroll to */}
      <div ref={messagesEndRef} />
      
    </div>
  );
  }