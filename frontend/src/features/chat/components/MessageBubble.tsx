import { Bot, User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { StockData } from '../../../components/finance/StockCard'; // Add this import
import { StockCard } from '../../../components/finance/StockCard';

interface MessageBubbleProps {
    content: string;
    role: 'user' | 'assistant';
    timestamp?: string;
    stockData?: StockData; // Add this
}

export function MessageBubble({ content, role, timestamp, stockData }: MessageBubbleProps) {
    const isUser = role === 'user';

    return (
        <div className={clsx(
            "flex w-full mt-2 space-x-3 max-w-3xl mx-auto",
            isUser ? "justify-end" : "justify-start"
        )}>
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot size={18} className="text-blue-600" />
                </div>
            )}

            {/* Bubble Container */}
            <div className="flex flex-col max-w-[80%]">
                <div className={twMerge(
                    "relative px-5 py-3.5 text-sm shadow-sm",
                    isUser
                        ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm"
                        : "bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-sm"
                )}>
                    <p className="leading-relaxed whitespace-pre-wrap">{content}</p>

                    {timestamp && (
                        <span className={clsx(
                            "text-[10px] block mt-1 opacity-60 text-right",
                            isUser ? "text-blue-100" : "text-gray-400"
                        )}>
                            {timestamp}
                        </span>
                    )}
                </div>

                {/* --- Render the Stock Card if data exists --- */}
                {stockData && (
                    <div className="mt-3">
                        <StockCard data={stockData} />
                    </div>
                )}
            </div>

            {isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={18} className="text-gray-600" />
                </div>
            )}
        </div>
    );
}