import { useEffect, useRef, useState } from "react";
import { Header } from "../../../components/ui/Header";
import { MessagesList } from "../../message/MessagesList";
import { ChatInput } from "./ChatInput";
import type { MessageProps } from "../../message/Message";

export function ChatWindow() {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [input, setInput] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when a new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

    const handleSendMessage = async (text: string) => {
    // 1. Add User Message to UI instantly
    const userMsg: MessageProps = { 
        id: Date.now().toString(), 
        role: 'user', 
        content: text, 
        created_at: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
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
                id: (Date.now()+1).toString(), 
                role: 'assistant', 
                content: `Here is the latest market data for ${ticker}:`, 
                stockData: data, // Injecting the data here!
                created_at: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
            };
            setMessages(prev => [...prev, aiMsg]);
            
        } else {
            // Normal chat response
            setTimeout(() => {
                const aiMsg: MessageProps = { 
                    id: (Date.now()+1).toString(), 
                    role: 'assistant', 
                    content: `I received: "${text}". \n\nTip: Type "/stock AAPL" or "/stock TSLA" to see my market data tools in action!`, 
                    created_at: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
                };
                setMessages(prev => [...prev, aiMsg]);
                setIsTyping(false);
            }, 1000);
            return; // Exit early so we don't hit the bottom setIsTyping(false) too fast
        }
    } catch (error) {
        console.error("Error:", error);
        const errorMsg: MessageProps = { 
            id: (Date.now()+1).toString(), 
            role: 'assistant', 
            content: "Sorry, I couldn't retrieve that stock symbol right now. Please check the ticker and try again.", 
            created_at: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
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
          onSend={() => {
            if (input.trim()) {
              handleSendMessage(input);
              setInput('');
            }
          }}
          
        />
      </div>
    );
     {/* Invisible div to scroll to */}
      <div ref={messagesEndRef} />
  }