import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { clsx } from 'clsx';

export interface StockData {
    symbol: string;
    shortName: string;
    currentPrice: number;
    changePercent: number;
    marketCap: number;
    sector: string;
}

interface StockCardProps {
    data: StockData;
}

export function StockCard({ data }: StockCardProps) {
    const isPositive = data.changePercent >= 0;

    // Helper to format large numbers (e.g., 2.5T, 500B)
    const formatMarketCap = (num: number) => {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
        return num.toString();
    };

    return (
        <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{data.symbol}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{data.shortName}</p>
                </div>
                <div className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    {data.sector}
                </div>
            </div>

            <div className="mt-4 flex items-end gap-2">
                <span className="text-3xl font-black text-gray-900">
                    ${data.currentPrice?.toFixed(2)}
                </span>
                <div className={clsx(
                    "flex items-center gap-1 mb-1 text-sm font-semibold",
                    isPositive ? "text-green-600" : "text-red-600"
                )}>
                    {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>{Math.abs(data.changePercent)}%</span>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <DollarSign size={14} className="text-gray-400" />
                    <span>Mkt Cap: <strong>{formatMarketCap(data.marketCap)}</strong></span>
                </div>
            </div>
        </div>
    );
}