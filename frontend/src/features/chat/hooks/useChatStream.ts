// import { useState, useEffect, useCallback } from 'react';
// import { api, ChatWebSocket, Message } from '../services/api';

// export const useChat = (roomId: string = 'default', useWebSocket: boolean = true) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [ws, setWs] = useState<ChatWebSocket | null>(null);

//   // Load initial messages
//   useEffect(() => {
//     const loadMessages = async () => {
//       try {
//         setLoading(true);
//         const fetchedMessages = await api.getMessages(roomId);
//         setMessages(fetchedMessages);
//         setError(null);
//       } catch (err) {
//         setError('Failed to load messages');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadMessages();
//   }, [roomId]);

//   // Setup WebSocket connection
//   useEffect(() => {
//     if (!useWebSocket) return;

//     const chatWs = new ChatWebSocket(roomId);
//     chatWs.connect((newMessage) => {
//       setMessages((prev) => {
//         // Avoid duplicates
//         if (prev.some((msg) => msg.id === newMessage.id)) {
//           return prev;
//         }
//         return [...prev, newMessage];
//       });
//     });
//     setWs(chatWs);

//     return () => {
//       chatWs.disconnect();
//     };
//   }, [roomId, useWebSocket]);

//   // Send message via WebSocket
//   const sendMessageWs = useCallback(
//     (text: string, sender: 'user' | 'other' = 'user') => {
//       if (ws) {
//         ws.sendMessage(text, sender);
//       }
//     },
//     [ws]
//   );

//   // Send message via REST API
//   const sendMessageRest = useCallback(
//     async (text: string, sender: 'user' | 'other' = 'user') => {
//       try {
//         const newMessage = await api.sendMessage({ text, sender, room_id: roomId });
//         setMessages((prev) => [...prev, newMessage]);
//         return newMessage;
//       } catch (err) {
//         setError('Failed to send message');
//         console.error(err);
//         throw err;
//       }
//     },
//     [roomId]
//   );

//   const sendMessage = useWebSocket ? sendMessageWs : sendMessageRest;

//   return {
//     messages,
//     loading,
//     error,
//     sendMessage,
//   };
// };