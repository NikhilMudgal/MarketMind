import yfinance as yf
from typing import Dict, Any

def get_stock_summary(ticker_symbol: str) -> Dict[str, Any]:
    """
    Fetches the current price and key metrics for a given stock ticker.
    This will eventually become a 'Tool' for our AI Agent.
    """
    try:
        ticker = yf.Ticker(ticker_symbol)
        info = ticker.info
        
        # Extract only the data we care about to save bandwidth and LLM tokens later
        summary = {
            "symbol": info.get("symbol", ticker_symbol.upper()),
            "shortName": info.get("shortName", "Unknown"),
            "currentPrice": info.get("currentPrice"),
            "previousClose": info.get("previousClose"),
            "marketCap": info.get("marketCap"),
            "sector": info.get("sector"),
            "forwardPE": info.get("forwardPE"),
            "dividendYield": info.get("dividendYield", 0) * 100 if info.get("dividendYield") else None,
        }
        
        # Calculate daily change percentage
        if summary["currentPrice"] and summary["previousClose"]:
            change = summary["currentPrice"] - summary["previousClose"]
            summary["changePercent"] = round((change / summary["previousClose"]) * 100, 2)
            
        return summary
    except Exception as e:
        # In a real app, use proper logging here
        raise ValueError(f"Could not fetch data for {ticker_symbol}. Error: {str(e)}")