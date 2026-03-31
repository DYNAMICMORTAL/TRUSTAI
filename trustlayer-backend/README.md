# TrustLayer AI Backend

This is the FastAPI backend for **TrustLayer AI** — A Human Safety Layer for the AI Internet. It receives suspicious digital content, runs it through a rule-based engine and Google's Gemini LLM to return a structured trust report.

## Tech Stack
- **Python 3.10+**
- **FastAPI** (Web framework)
- **Uvicorn** (ASGI server)
- **Google Generative AI** (Gemini 2.0 Flash)
- **Pydantic** (Data validation)

## Setup & Installation

1. **Clone or navigate to the directory:**
```bash
cd trustlayer-backend
```

2. **Create a virtual environment (Optional but Recommended):**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install Dependencies:**
```bash
pip install -r requirements.txt
```

4. **Environment Variables:**
Create a `.env` file in the root of the backend folder and add your Gemini API Key.
```bash
cp .env.example .env
```
Open `.env` and add:
```env
GEMINI_API_KEY=your_actual_gemini_key_here
```

## Running Locally

Start the local server using Uvicorn:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
The server will be running at `http://localhost:8000`.
You can view the auto-generated API docs at `http://localhost:8000/docs`.

## Deploying to Render

This repository is ready to be deployed instantly on Render as a Web Service.

1. Create a New Web Service on Render and point it to this repository.
2. Select **Python 3** as the runtime environment.
3. The Build Command should be:
   - `pip install -r requirements.txt`
4. The Start Command should be:
   - `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. In **Environment Variables**, add:
   - `GEMINI_API_KEY`: <Your Gemini Key>

*Render will automatically read the `render.yaml` file if you choose to deploy via Blueprint.*

---

## Frontend Integration Example

You can connect your frontend framework (React, Next.js, etc.) to this backend endpoint easily.

### `POST /analyze`
**Request Payload:**
```json
{
  "input_type": "text",
  "content": "Congratulations! You've been shortlisted for our paid remote internship at TechVentures Pvt Ltd. Pay ₹499 registration fee to confirm your onboarding slot. Limited seats — respond within 2 hours. WhatsApp: +91-9876543210"
}
```

**JavaScript Example (fetch):**
```javascript
async function analyzeContent() {
  const response = await fetch("http://localhost:8000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input_type: "text",
      content: "URGENT: Your bank account will be suspended..."
    })
  });

  const result = await response.json();
  console.log("Trust Report Risk Score:", result.risk_score);
  console.log("Verdict:", result.verdict);
}
```

**Successful Output:**
The API will return a structured JSON mapping to the exact data layer expected by the TrustLayer UI (score, trust level, verdict, red flags, recommendations, and a detailed confidence breakdown).
