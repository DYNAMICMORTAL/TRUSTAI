SCAM_KEYWORDS = {
    "urgency": ["urgent", "immediately", "verify", "account blocked", "within 24 hours", "suspend", "due to incomplete"],
    "money": ["pay ₹", "registration fee", "refund", "send money", "transfer", "delivery charges", "upi id: l", "gpay"],
    "banking": ["kyc", "bank", "otp", "verify account", "unauthorized order", "freeze"],
    "job": ["internship", "onboarding", "offer letter", "shortlisted", "remote internship", "slot"],
    "impersonation": ["customer care", "support team", "official", "helpline"],
    "prize": ["congratulations", "won", "claim now", "lucky draw", "lottery", "winner alert", "prize"],
    "phishing_urls": ["secure-login", "verify-login", "support-login", "amaz0n", "g00gle", "update-now", "verify-now", "support-verification-login"]
}

def run_rule_engine(content: str, input_type: str) -> dict:
    content_lower = content.lower()
    pre_flags = []
    pre_score = 0
    
    # Rule 1: Urgency
    if any(kw in content_lower for kw in SCAM_KEYWORDS["urgency"]):
        pre_flags.append("Urgency Pressure")
        pre_score += 20
        
    # Rule 2: Money / Fees
    if any(kw in content_lower for kw in SCAM_KEYWORDS["money"]):
        pre_flags.append("Money Request")
        pre_score += 30
        
    # Rule 3: Banking / OTP
    if any(kw in content_lower for kw in SCAM_KEYWORDS["banking"]):
        pre_flags.append("Banking / OTP Request")
        pre_score += 25
        
    # Rule 4: Job Scams
    if any(kw in content_lower for kw in SCAM_KEYWORDS["job"]) and any(kw in content_lower for kw in SCAM_KEYWORDS["money"]):
        pre_flags.append("Fake Job Signals")
        pre_score += 40
        
    # Rule 5: Impersonation
    if any(kw in content_lower for kw in SCAM_KEYWORDS["impersonation"]):
        pre_flags.append("Authority Impersonation")
        pre_score += 15
        
    # Rule 6: Prize Scam
    if any(kw in content_lower for kw in SCAM_KEYWORDS["prize"]):
        pre_flags.append("Reward Bait")
        pre_score += 25
        
    # Rule 7: URLs
    if input_type == "url" or "http" in content_lower:
        if any(kw in content_lower for kw in SCAM_KEYWORDS["phishing_urls"]):
            pre_flags.append("Suspicious URL Pattern")
            pre_score += 35
            
    return {
        "pre_score": min(pre_score, 100),
        "pre_flags": pre_flags
    }
