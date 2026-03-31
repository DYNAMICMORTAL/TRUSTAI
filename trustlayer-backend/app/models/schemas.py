from pydantic import BaseModel
from typing import List, Optional, Dict, Any

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

class RedFlag(BaseModel):
    id: str
    severity: str
    tactic: str
    detail: str
    trigger: str
    category: str

class RecommendedAction(BaseModel):
    id: str
    priority: str
    iconName: str
    iconBg: str
    iconColor: str
    title: str
    description: str
    cta: Optional[str] = None
    ctaLabel: Optional[str] = None

class HighlightedPhrase(BaseModel):
    phrase: str
    color: str

class AnalyzeResponse(BaseModel):
    risk_score: int
    trust_level: str
    scam_type: str
    verdict: str
    red_flags: List[RedFlag]
    explanation: List[str]
    recommendations: List[RecommendedAction]
    highlighted_phrases: List[HighlightedPhrase]
    confidence_breakdown: ConfidenceBreakdown
