def normalize_trust_report(report: dict, pre_flags: list) -> dict:
    # Ensure score between 0 and 100
    risk_score = max(0, min(100, report.get("risk_score", 0)))
    report["risk_score"] = risk_score
    
    # Normalize trust level based on risk_score (standardize output logic)
    if risk_score >= 70:
        report["trust_level"] = "High Risk"
    elif risk_score >= 35:
        report["trust_level"] = "Suspicious"
    else:
        report["trust_level"] = "Safe"
        
    # Merge rules flags without creating duplicates
    existing_flags = report.get("red_flags", [])
    merged_flags = list(set(existing_flags + pre_flags))
    report["red_flags"] = merged_flags
    
    # Ensure keys exist as strings
    report.setdefault("scam_type", "Unknown")
    report.setdefault("verdict", "Analysis completed.")
    report.setdefault("explanation", "No detailed explanation available.")
    report.setdefault("recommendations", ["Exercise standard caution online."])
    
    # Clean confidence breakdown
    cb = report.get("confidence_breakdown", {})
    report["confidence_breakdown"] = {
        "manipulation_level": max(0, min(100, cb.get("manipulation_level", 0))),
        "financial_risk": max(0, min(100, cb.get("financial_risk", 0))),
        "impersonation_risk": max(0, min(100, cb.get("impersonation_risk", 0))),
        "urgency_level": max(0, min(100, cb.get("urgency_level", 0))),
        "trust_confidence": max(0, min(100, cb.get("trust_confidence", 50)))
    }
    
    return report
