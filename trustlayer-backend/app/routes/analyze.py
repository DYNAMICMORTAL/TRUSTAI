from fastapi import APIRouter
from app.models.schemas import AnalyzeRequest, AnalyzeResponse
from app.services.scam_rules import run_rule_engine
from app.services.gemini_service import analyze_with_gemini, get_fallback_result
from app.services.response_formatter import normalize_trust_report
from app.utils.helpers import sanitize_input

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_content_endpoint(request: AnalyzeRequest):
    try:
        # Sanitize input slightly
        clean_content = sanitize_input(request.content)
        
        if request.input_type == "screenshot" and request.screenshot_scenario:
            clean_content = f"[{request.screenshot_scenario}] " + clean_content
            
        # 1. Run Rule Engine
        rules_result = run_rule_engine(clean_content, request.input_type)
        pre_score = rules_result["pre_score"]
        pre_flags = rules_result["pre_flags"]
        
        # 2. Call Gemini API
        raw_report = analyze_with_gemini(
            content=clean_content,
            input_type=request.input_type,
            pre_score=pre_score,
            pre_flags=pre_flags
        )
        
        # 3. Handle Fallback if Gemini fails or returns malformed response
        if not raw_report:
            raw_report = get_fallback_result(clean_content, pre_score, pre_flags)
            
        # 4. Normalize and format response
        final_report = normalize_trust_report(raw_report, pre_flags)
        
        return AnalyzeResponse(**final_report)
        
    except Exception as e:
        print(f"Error in /analyze: {e}")
        # Always return a valid fallback structure on total failure
        fallback = get_fallback_result(request.content, 50, ["Analysis Error"])
        return AnalyzeResponse(**fallback)
