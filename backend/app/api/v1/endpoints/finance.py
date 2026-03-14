from fastapi import APIRouter, HTTPException
from app.services.finance import get_stock_summary

router = APIRouter()

@router.get("/stock/{ticker}")
def fetch_stock_data(ticker: str):
    try:
        data = get_stock_summary(ticker)
        if not data.get("currentPrice"):
            raise HTTPException(status_code=404, detail="Stock data not found.")
        return data
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))