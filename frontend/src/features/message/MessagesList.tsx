import { useTheme } from "../../context/ThemeContext";
import { Message, type MessageProps } from "./Message";

interface MessagesListProps {
    messages: MessageProps[];
}

export function MessagesList({ messages }: MessagesListProps) {
    const { theme } = useTheme();
    
    return (
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${theme.background}`}>
        {messages.map((message) => (
          <Message
            key= { message.id }
            id= { message.id }
            text= { message.text }
            sender= { message.sender }
            timestamp= { message.timestamp }
          />
        ))}
      </div>
    );
  }