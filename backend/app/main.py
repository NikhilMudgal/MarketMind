from fastapi import FastAPI

app = FastAPI(title = "MarketMind", version = "1.0.0")

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "MarketMind is running",
        "version": "1.0.0"
    }