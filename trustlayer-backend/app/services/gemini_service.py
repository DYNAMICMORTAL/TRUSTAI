import os
import json
import requests
from typing import Optional

def analyze_with_gemini(content: str, input_type: str, pre_score: int, pre_flags: list) -> Optional[dict]:
    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        return None

    prompt = f"""
    You are a Trust and Safety Analyst, an expert in detecting scams, phishing, and online fraud.
    Analyze the following digital content ({input_type}) and return a trust report.
    
    Content:
    "{content}"
    
    Rule Engine Pre-analysis:
    - Pre-calculated risk score (0-100): {pre_score}
    - Detected flags: {', '.join(pre_flags) if pre_flags else 'None'}
    
    Provide your analysis as a strictly valid JSON object. Do not include markdown formatting like ```json.
    
    Required JSON structure:
    {{
      "risk_score": <int 0-100>,
      "trust_level": "<Safe | Suspicious | High Risk>",
      "scam_type": "<Type of scam, e.g., 'Phishing', 'Fake Job / Internship Scam', 'None'>",
      "verdict": "<A rich, compelling 3-4 sentence comprehensive summary of the risk and tactics.>",
      "red_flags": [
        {{
          "id": "flag-1",
          "severity": "<critical | high | medium | low>",
          "tactic": "<Name of manipulation tactic>",
          "detail": "<Very detailed explanation of how this tactic works against the user>",
          "trigger": "<Exact text snippet that triggered this flag>",
          "category": "<e.g., Fear Manipulation, Urgency, Authority Spoofing>"
        }}
        // Provide at least 3 to 5 detailed red flags
      ],
      "explanation": ["<First paragraph exploring the psychology of the scam>", "<Second paragraph analyzing the technical details>", "<Third paragraph on the expected consequences...>"],
      "recommendations": [
        {{
          "id": "action-1",
          "priority": "<immediate | recommended | urgent-if-paid>",
          "iconName": "<Lucide Icon Name: ShieldX, ShieldCheck, Flag, Lock, Eye, Phone, ExternalLink>",
          "iconBg": "<Tailwind class, e.g., bg-red-500/10 border-red-500/20>",
          "iconColor": "<Tailwind class, e.g., text-red-400 or text-primary>",
          "title": "<Title of action>",
          "description": "<Detailed, highly actionable specific recommendation steps>",
          "cta": "<URL or null>",
          "ctaLabel": "<Label for URL or null>"
        }}
        // Provide at least 3 to 4 detailed recommendations
      ],
      "highlighted_phrases": [
        {{
          "phrase": "<Exact substring from content to highlight>",
          "color": "<e.g., bg-red-500/20 text-red-300 rounded px-0.5>"
        }}
      ],
      "confidence_breakdown": {{
        "manipulation_level": <int 0-100>,
        "financial_risk": <int 0-100>,
        "impersonation_risk": <int 0-100>,
        "urgency_level": <int 0-100>,
        "trust_confidence": <int 0-100>
      }}
    }}
    """
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={api_key}"
    headers = {'Content-Type': 'application/json'}
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.2
        }
    }
    
    print("\n--- [GEMINI_SERVICE] STARTING API CALL ---")
    print(f"[GEMINI_SERVICE] API Key used: {api_key[:10]}...{api_key[-5:] if len(api_key) > 15 else 'INVALID_LENGTH'}")
    print(f"[GEMINI_SERVICE] Sending payload to {url.split('?')[0]}")
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=120)
        print(f"[GEMINI_SERVICE] Received raw response with Status Code: {response.status_code}")
        
        response.raise_for_status()
        data = response.json()
        
        text = data['candidates'][0]['content']['parts'][0]['text'].strip()
        print(f"[GEMINI_SERVICE] Successfully extracted text snippet: {text[:100]}...")
        
        # Clean potential markdown formatting
        if text.startswith("```json"):
            text = text[7:]
        elif text.startswith("```"):
            text = text[3:]
            
        if text.endswith("```"):
            text = text[:-3]
            
        parsed_json = json.loads(text.strip())
        print("[GEMINI_SERVICE] Successfully parsed JSON from Gemini!")
        print("--- [GEMINI_SERVICE] API CALL COMPLETED ---\n")
        return parsed_json
    except Exception as e:
        print(f"\n[GEMINI_SERVICE ERROR] Gemini API Request Failed: {type(e).__name__} - {str(e)}")
        if 'response' in locals() and hasattr(response, 'text'):
            print(f"[GEMINI_SERVICE ERROR] Raw Response Body: {response.text}")
        print("--- [GEMINI_SERVICE] FALLING BACK TO RULES ---\n")
        return None

def get_fallback_result(content: str, pre_score: int, pre_flags: list) -> dict:
    """Returns a fallback result if Gemini API fails or validation errors occur."""
    risk_score = pre_score
    trust_level = "High Risk" if risk_score >= 70 else "Suspicious" if risk_score >= 35 else "Safe"
    scam_type = "Potential Scam" if risk_score > 40 else "Safe Content"
    
    if "Fake Job Signals" in pre_flags:
        scam_type = "Fake Job / Internship Scam"
    elif "Banking / OTP Request" in pre_flags:
        scam_type = "OTP / KYC Scam"
        
    return {
        "risk_score": risk_score,
        "trust_level": trust_level,
        "scam_type": scam_type,
        "verdict": f"Analyzed using fallback engine. Rule-based risk score is {risk_score}/100.",
        "red_flags": [
            {
                "id": f"fallback-flag-{i}",
                "severity": "high",
                "tactic": flag,
                "detail": f"This content triggered the '{flag}' rule during our static analysis.",
                "trigger": "Detected text pattern",
                "category": "Algorithm Alert"
            } for i, flag in enumerate(pre_flags)
        ] if pre_flags else [],
        "explanation": ["This content was analyzed using a rule-based fallback system due to AI service unavailability.", "Please exercise caution."],
        "recommendations": [
            {
                "id": "fallback-act-1",
                "priority": "recommended",
                "iconName": "Eye",
                "iconBg": "bg-blue-500/10 border-blue-500/20",
                "iconColor": "text-blue-400",
                "title": "Verify Independently",
                "description": "Double check the sender's identity through official channels.",
                "cta": None,
                "ctaLabel": None
            }
        ],
        "highlighted_phrases": [],
        "confidence_breakdown": {
            "manipulation_level": min(100, pre_score + 10),
            "financial_risk": 90 if "Money Request" in pre_flags else 10,
            "impersonation_risk": 80 if "Authority Impersonation" in pre_flags else 10,
            "urgency_level": 90 if "Urgency Pressure" in pre_flags else 10,
            "trust_confidence": 30 # Lower confidence for fallback
        }
    }
