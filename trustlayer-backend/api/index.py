from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.analyze import router as analyze_router

app = FastAPI(title="TrustLayer AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Hackathon-safe
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)

@app.get("/")
def root():
    return {"message": "TrustLayer AI backend is running on Vercel"}