from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from .env if present
load_dotenv()

from app.routes import analyze

app = FastAPI(
    title="TrustLayer AI API",
    description="Backend API for analyzing suspicious digital content.",
    version="1.0.0"
)

# Allow all origins for hackathon speed and easy integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(analyze.router)

@app.get("/")
def health_check():
    """Simple health check endpoint."""
    return {"status": "ok", "message": "TrustLayer AI Backend is running!"}
