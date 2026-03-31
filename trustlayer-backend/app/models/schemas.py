from pydantic import BaseModel
from typing import List, Optional

class AnalyzeRequest(BaseModel):
    input_type: str
    content: str
    screenshot_scenario: Optional[str] = None

class ConfidenceBreakdown(BaseModel):
    manipulation_level: int
    financial_risk: int
    impersonation_risk: int
    urgency_level: int
    trust_confidence: int

class AnalyzeResponse(BaseModel):
    risk_score: int
    trust_level: str
    scam_type: str
    verdict: str
    red_flags: List[str]
    explanation: str
    recommendations: List[str]
    confidence_breakdown: ConfidenceBreakdown
