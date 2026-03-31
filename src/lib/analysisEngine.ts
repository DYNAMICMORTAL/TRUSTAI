'use client';

export type ScamType =
    | 'Fake Job / Internship Scam' | 'Bank KYC / Phishing Scam' | 'UPI / Payment Fraud' | 'Support Impersonation Scam' | 'Prize / Giveaway Scam' | 'Phishing URL' | 'OTP Fraud' | 'Screenshot Payment Fraud' | 'Suspicious Content';

export type RiskLevel = 'safe' | 'low' | 'medium' | 'high' | 'critical';

export interface RedFlag {
    id: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    tactic: string;
    detail: string;
    trigger: string;
    category: string;
}

export interface ConfidenceSignal {
    label: string;
    score: number;
    color: string;
}

export interface RecommendedAction {
    id: string;
    priority: 'immediate' | 'recommended' | 'urgent-if-paid';
    iconName: string;
    iconBg: string;
    iconColor: string;
    title: string;
    description: string;
    cta: string | null;
    ctaLabel: string | null;
}

export interface AnalysisResult {
    riskScore: number;
    riskLevel: RiskLevel;
    scamType: ScamType;
    scamSubType: string;
    confidence: number;
    verdict: string;
    redFlags: RedFlag[];
    aiExplanation: string[];
    verdictStatement: string;
    recommendedActions: RecommendedAction[];
    confidenceSignals: ConfidenceSignal[];
    inputType: 'text' | 'screenshot' | 'url';
    inputPreview: string;
    analyzedAt: string;
    highlightedPhrases: { phrase: string; color: string }[];
}

export interface AnalysisInput {
    type: 'text' | 'screenshot' | 'url';
    content: string;
    screenshotScenario?: string;
}

function detectScamType(content: string, type: 'text' | 'screenshot' | 'url'): {
    scamType: ScamType;
    subType: string;
    riskScore: number;
    confidence: number;
} {
    const lower = content.toLowerCase();

    if (type === 'url') {
        const urlPatterns = [
            'verify', 'secure-login', 'account-check', 'support-login', 'kyc-update',
            'amaz0n', 'paypa1', 'g00gle', 'netfl1x', 'hdfc-', 'sbi-', 'icici-',
            'login-verify', 'account-suspend', 'urgent-verify', 'claim-prize',
            'free-gift', 'lucky-draw', 'reward-claim', 'update-kyc', 'otp-verify'
        ];
        const hasSuspiciousPattern = urlPatterns.some(p => lower.includes(p));
        const hasTyposquat = /[0-9]/.test(lower.replace(/^https?:\/\//, '').split('/')[0]);
        const hasLongSubdomain = lower.split('.').length > 4;
        const hasSuspiciousTLD = lower.includes('.in/') || lower.includes('.xyz') || lower.includes('.tk') || lower.includes('.ml');

        let score = 30;
        if (hasSuspiciousPattern) score += 35;
        if (hasTyposquat) score += 20;
        if (hasLongSubdomain) score += 15;
        if (hasSuspiciousTLD) score += 10;
        score = Math.min(score, 97);

        return {
            scamType: 'Phishing URL',
            subType: hasSuspiciousPattern ? 'Credential Harvesting Portal' : 'Suspicious Domain',
            riskScore: score,
            confidence: Math.min(score - 5, 94),
        };
    }

    if (type === 'screenshot') {
        const scenario = content.toLowerCase();
        if (scenario.includes('payment') || scenario.includes('upi') || scenario.includes('gpay') || scenario.includes('paytm')) {
            return { scamType: 'UPI / Payment Fraud', subType: 'Fake Payment Screenshot', riskScore: 88, confidence: 85 };
        }
        if (scenario.includes('internship') || scenario.includes('job') || scenario.includes('offer letter')) {
            return { scamType: 'Fake Job / Internship Scam', subType: 'Fake Offer Letter', riskScore: 86, confidence: 83 };
        }
        return { scamType: 'Screenshot Payment Fraud', subType: 'Suspicious Screenshot Content', riskScore: 72, confidence: 68 };
    }

    // Text analysis
    const internshipPatterns = ['internship', 'registration fee', 'onboarding fee', 'offer letter', 'shortlisted', 'remote internship', 'pay ₹', 'joining fee', 'techventures', 'work from home opportunity'];
    const bankKycPatterns = ['kyc', 'account suspended', 'account blocked', 'account will be', 'verify your account', 'hdfc', 'sbi', 'icici', 'bank account', 'net banking', 'debit card blocked', 'update kyc'];
    const otpPatterns = ['otp', 'one time password', 'share the otp', 'enter otp', 'otp sent', 'verify otp', 'amazon customer care', 'flipkart support', 'unauthorized order'];
    const upiPatterns = ['upi', 'gpay', 'phonepe', 'paytm', 'payment done', 'payment successful', 'dispatch now', 'send money', 'transfer ₹', 'collect request', 'qr code'];
    const prizePatterns = ['congratulations', 'you have won', 'winner', 'lucky draw', 'claim your prize', 'claim now', 'gift', 'iphone', 'reward', 'diwali offer', 'lucky winner', 'selected'];
    const supportPatterns = ['customer care', 'customer support', 'helpline', 'technical support', 'refund process', 'unauthorized transaction', 'remote access', 'anydesk', 'teamviewer'];
    const urgencyPatterns = ['urgent', 'immediately', 'within 24 hours', 'within 2 hours', 'limited time', 'expires today', 'act now', 'respond now', 'last chance', 'final notice'];

    const internshipScore = internshipPatterns.filter(p => lower.includes(p)).length;
    const bankKycScore = bankKycPatterns.filter(p => lower.includes(p)).length;
    const otpScore = otpPatterns.filter(p => lower.includes(p)).length;
    const upiScore = upiPatterns.filter(p => lower.includes(p)).length;
    const prizeScore = prizePatterns.filter(p => lower.includes(p)).length;
    const supportScore = supportPatterns.filter(p => lower.includes(p)).length;
    const urgencyBonus = urgencyPatterns.filter(p => lower.includes(p)).length * 5;

    const scores = [
        { type: 'internship', score: internshipScore },
        { type: 'bank', score: bankKycScore },
        { type: 'otp', score: otpScore },
        { type: 'upi', score: upiScore },
        { type: 'prize', score: prizeScore },
        { type: 'support', score: supportScore },
    ];

    const maxScore = Math.max(...scores.map(s => s.score));
    const winner = scores.find(s => s.score === maxScore);

    if (maxScore === 0) {
        return { scamType: 'Suspicious Content', subType: 'Unclassified Suspicious Content', riskScore: 35, confidence: 40 };
    }

    const baseRisk = Math.min(40 + maxScore * 12 + urgencyBonus, 97);
    const conf = Math.min(baseRisk - 3, 94);

    switch (winner?.type) {
        case 'internship':
            return { scamType: 'Fake Job / Internship Scam', subType: 'Registration Fee Fraud', riskScore: baseRisk, confidence: conf };
        case 'bank':
            return { scamType: 'Bank KYC / Phishing Scam', subType: 'Account Suspension Threat', riskScore: baseRisk, confidence: conf };
        case 'otp':
            return { scamType: 'OTP Fraud', subType: 'Support Impersonation + OTP Extraction', riskScore: baseRisk, confidence: conf };
        case 'upi':
            return { scamType: 'UPI / Payment Fraud', subType: 'Fake Payment / Collect Request', riskScore: baseRisk, confidence: conf };
        case 'prize':
            return { scamType: 'Prize / Giveaway Scam', subType: 'Fake Lottery / Lucky Draw', riskScore: baseRisk, confidence: conf };
        case 'support':
            return { scamType: 'Support Impersonation Scam', subType: 'Fake Customer Care Fraud', riskScore: baseRisk, confidence: conf };
        default:
            return { scamType: 'Suspicious Content', subType: 'Unclassified Suspicious Content', riskScore: 45, confidence: 50 };
    }
}

function getRiskLevel(score: number): RiskLevel {
    if (score >= 80) return 'critical';
    if (score >= 60) return 'high';
    if (score >= 40) return 'medium';
    if (score >= 20) return 'low';
    return 'safe';
}

function generateRedFlags(content: string, scamType: ScamType, type: 'text' | 'screenshot' | 'url'): RedFlag[] {
    const lower = content.toLowerCase();
    const flags: RedFlag[] = [];

    // Universal flags based on content
    if (lower.includes('urgent') || lower.includes('immediately') || lower.includes('within') || lower.includes('hours') || lower.includes('expires')) {
        flags.push({
            id: 'flag-urgency',
            severity: 'critical',
            tactic: 'Artificial Urgency Pressure',
            detail: 'Scammers deliberately create false time pressure to prevent victims from thinking critically or verifying the claim. Phrases like "respond within 2 hours" or "account suspended immediately" are designed to trigger panic and override rational decision-making.',
            trigger: content.match(/(urgent|immediately|within \d+ hours?|expires today|act now|respond now)/i)?.[0] || 'Urgency language detected',
            category: 'Urgency Manipulation',
        });
    }

    if (lower.includes('pay') || lower.includes('₹') || lower.includes('rs.') || lower.includes('fee') || lower.includes('charges') || lower.includes('deposit')) {
        flags.push({
            id: 'flag-payment',
            severity: 'critical',
            tactic: 'Upfront Payment Demand',
            detail: 'Legitimate companies, banks, and platforms never demand upfront payments for onboarding, verification, or prize claims. Any request for money transfer — regardless of the stated reason — is a primary indicator of fraud.',
            trigger: content.match(/(pay ₹[\d,]+|rs\.?\s*[\d,]+|registration fee|delivery charges|processing fee)/i)?.[0] || 'Payment demand detected',
            category: 'Financial Manipulation',
        });
    }

    if (lower.includes('otp') || lower.includes('one time password') || lower.includes('share the') || lower.includes('tell me the')) {
        flags.push({
            id: 'flag-otp',
            severity: 'critical',
            tactic: 'OTP / Credential Extraction Attempt',
            detail: 'No legitimate bank, platform, or company will ever ask you to share an OTP over phone, chat, or message. OTPs are single-use authentication codes — sharing them gives the fraudster complete access to your account.',
            trigger: content.match(/(share.*otp|otp.*share|tell.*otp|enter.*otp)/i)?.[0] || 'OTP request detected',
            category: 'Credential Theft',
        });
    }

    if (lower.includes('congratulations') || lower.includes('you have won') || lower.includes('winner') || lower.includes('selected') || lower.includes('lucky')) {
        flags.push({
            id: 'flag-reward-bait',
            severity: 'high',
            tactic: 'Reward Bait / Unsolicited Win',
            detail: 'Being told you\'ve "won" something you never entered is a classic reward bait tactic. It creates excitement and lowers psychological defenses, making victims more likely to comply with subsequent payment or data requests.',
            trigger: content.match(/(congratulations|you have won|lucky winner|selected for|shortlisted)/i)?.[0] || 'Reward bait language',
            category: 'Reward Bait',
        });
    }

    if (lower.includes('kyc') || lower.includes('account blocked') || lower.includes('suspended') || lower.includes('verify your account') || lower.includes('account will be')) {
        flags.push({
            id: 'flag-account-threat',
            severity: 'critical',
            tactic: 'Account Suspension Threat',
            detail: 'Threatening account suspension or blocking is a fear-based manipulation tactic. Banks and platforms send official communications through registered email/SMS — never through WhatsApp or unofficial channels demanding immediate action.',
            trigger: content.match(/(account.*blocked|account.*suspended|kyc.*expire|verify.*account)/i)?.[0] || 'Account threat detected',
            category: 'Fear Manipulation',
        });
    }

    if (type === 'url') {
        const domain = content.split('/')[0];
        if (/[0-9]/.test(domain) || domain.includes('-verify') || domain.includes('-login') || domain.includes('-secure')) {
            flags.push({
                id: 'flag-suspicious-domain',
                severity: 'critical',
                tactic: 'Typosquatted / Fake Domain',
                detail: 'This URL uses a domain designed to look like a legitimate brand but contains subtle differences — numbers replacing letters, extra hyphens, or misleading subdomains. These are classic phishing domain patterns used to harvest credentials.',
                trigger: domain,
                category: 'Domain Spoofing',
            });
        }
        if (content.includes('verify') || content.includes('login') || content.includes('account') || content.includes('secure')) {
            flags.push({
                id: 'flag-phishing-path',
                severity: 'high',
                tactic: 'Phishing URL Path Structure',
                detail: 'The URL path contains keywords like "verify", "login", "account", or "secure" — common patterns in phishing pages designed to mimic legitimate authentication flows and steal credentials.',
                trigger: content,
                category: 'Phishing Pattern',
            });
        }
    }

    if (lower.includes('whatsapp') || lower.includes('+91') || lower.includes('personal number') || lower.includes('call me at')) {
        flags.push({
            id: 'flag-unofficial-channel',
            severity: 'high',
            tactic: 'Unofficial Contact Channel',
            detail: 'Legitimate organizations communicate through official email domains, verified phone numbers, and official portals — not personal WhatsApp numbers or unofficial mobile contacts. This is a definitive red flag.',
            trigger: content.match(/(\+91[\s-]?\d{10}|whatsapp.*\d{10})/i)?.[0] || 'Unofficial contact channel',
            category: 'Authority Spoofing',
        });
    }

    if (lower.includes('click here') || lower.includes('click the link') || lower.includes('http://') || (lower.includes('https://') && (lower.includes('verify') || lower.includes('update')))) {
        flags.push({
            id: 'flag-suspicious-link',
            severity: 'high',
            tactic: 'Suspicious Link / Redirect',
            detail: 'The message contains a link directing you to an external page for "verification" or "account update." Phishing links are designed to look legitimate but redirect to credential-harvesting pages.',
            trigger: content.match(/(https?:\/\/[^\s]+)/i)?.[0] || 'Suspicious link detected',
            category: 'Phishing Link',
        });
    }

    // Scam-type specific flags
    if (scamType === 'Fake Job / Internship Scam') {
        if (!lower.includes('@') || lower.includes('gmail') || lower.includes('yahoo')) {
            flags.push({
                id: 'flag-no-official-email',
                severity: 'high',
                tactic: 'No Official Company Email Domain',
                detail: 'Legitimate corporate recruiters always communicate from official company email domains (e.g., hr@company.com). The absence of a verifiable company email — or use of Gmail/Yahoo — strongly indicates this is not from a real company.',
                trigger: 'No official email domain present in communication',
                category: 'Missing Legitimacy',
            });
        }
        flags.push({
            id: 'flag-no-verification',
            severity: 'medium',
            tactic: 'No Verifiable Job Reference',
            detail: 'There is no job posting ID, application reference number, or interview process mentioned. Legitimate job offers always reference a specific application, interview, or referral — not a cold unsolicited message.',
            trigger: 'No application ID, job posting reference, or prior contact mentioned',
            category: 'Context Mismatch',
        });
    }

    if (scamType === 'Support Impersonation Scam' || scamType === 'OTP Fraud') {
        flags.push({
            id: 'flag-impersonation',
            severity: 'critical',
            tactic: 'Brand / Authority Impersonation',
            detail: 'The message impersonates a well-known brand or authority figure to build false trust. Fraudsters use recognizable names (Amazon, HDFC, RBI) to lower your guard before extracting sensitive information.',
            trigger: content.match(/(amazon|flipkart|hdfc|sbi|rbi|icici|paytm|google|microsoft)/i)?.[0] || 'Brand impersonation detected',
            category: 'Impersonation',
        });
    }

    // Ensure at least 3 flags
    if (flags.length < 3) {
        flags.push({
            id: 'flag-generic-suspicious',
            severity: 'medium',
            tactic: 'Suspicious Communication Pattern',
            detail: 'This content contains language patterns commonly associated with social engineering and online fraud. The combination of unsolicited contact, requests for action, and lack of verifiable identity signals are consistent with scam communications.',
            trigger: 'Multiple suspicious language patterns detected',
            category: 'Behavioral Pattern',
        });
    }

    return flags.slice(0, 7);
}

function generateExplanation(content: string, scamType: ScamType, riskScore: number): string[] {
    const explanations: Record<ScamType, string[]> = {
        'Fake Job / Internship Scam': [
            `This message exhibits the classic hallmarks of a **registration fee internship scam** — one of the most prevalent fraud patterns targeting students and recent graduates in 2025–2026.`,
            `The core mechanism is straightforward: the fraudster poses as a recruiter from a plausible-sounding company, claims the victim has been "shortlisted" without any prior interaction, and then demands a small fee framed as a legitimate onboarding cost. The small amount is deliberate — it reduces psychological resistance while allowing the scammer to collect from hundreds of victims simultaneously.`,
            `The message deploys **multiple simultaneous manipulation tactics**: urgency ("respond within hours"), scarcity ("limited seats"), and reward bait ("paid remote internship"). This combination is designed to override rational decision-making by triggering fear of missing out.`,
            `Critically, the message contains **zero verifiable legitimacy signals**: no official company email domain, no LinkedIn or company website reference, no named HR contact, no job posting ID, and no application reference number. Legitimate corporate recruitment communications always include at least some of these anchors.`,
        ],
        'Bank KYC / Phishing Scam': [
            `This message is a **bank phishing / KYC scam** — a highly sophisticated fraud pattern that impersonates legitimate financial institutions to steal account credentials and personal information.`,
            `The tactic relies on **fear-based manipulation**: threatening account suspension or KYC expiry creates panic that overrides critical thinking. Victims are rushed into clicking links or calling numbers before they can verify the communication's legitimacy.`,
            `Real banks **never** send account suspension notices via WhatsApp, SMS with external links, or unofficial channels. All legitimate KYC communications come through official bank apps, registered email addresses, or verified SMS sender IDs — not random numbers.`,
            `The link or contact provided in this message leads to a **credential harvesting page** designed to look like your bank's official portal. Entering your details there gives fraudsters complete access to your account.`,
        ],
        'UPI / Payment Fraud': [
            `This content shows strong indicators of **UPI payment fraud** — a category that includes fake payment screenshots, collect request scams, and QR code manipulation.`,
            `A common variant involves sending a **fake payment confirmation screenshot** to convince a seller that payment has been made, then demanding goods or services before the fraud is discovered. Another variant sends a "collect request" that appears to be a payment but actually withdraws money.`,
            `The **psychological mechanism** here exploits trust in digital payment systems. Victims see what appears to be a legitimate transaction confirmation and lower their guard, not realizing the screenshot is fabricated or the UPI request is a withdrawal, not a deposit.`,
            `Always verify payments directly in your bank app or UPI app — **never trust screenshots or messages** as proof of payment. A real payment will appear in your bank statement within seconds.`,
        ],
        'Support Impersonation Scam': [
            `This is a **support impersonation scam** — where fraudsters pose as customer care representatives from well-known brands to extract OTPs, remote access, or personal information.`,
            `The script follows a predictable pattern: create alarm about an "unauthorized transaction" or "account issue," offer to "help resolve it," then request sensitive information (OTP, card details, remote access) under the guise of fixing the problem.`,
            `**No legitimate company** will ever call you unsolicited about an account issue and ask for OTPs, passwords, or remote access. Real customer support only responds when you initiate contact through official channels.`,
            `The mention of specific transaction amounts or account details is designed to make the call seem legitimate — fraudsters often obtain partial information from data breaches to build false credibility.`,
        ],
        'Prize / Giveaway Scam': [
            `This is a **prize / lottery scam** — one of the oldest and most persistent fraud patterns, now updated for the digital age with UPI payment requests and fake brand associations.`,
            `The psychological hook is powerful: the excitement of winning something valuable temporarily disables critical thinking. Once the victim is emotionally invested in claiming their "prize," they're more likely to comply with payment requests framed as "delivery charges" or "processing fees."`,
            `**You cannot win a contest you never entered.** Any message claiming you've won a prize, lottery, or lucky draw without your prior participation is definitively fraudulent — regardless of how official it looks.`,
            `The small fee requested (typically ₹99–₹999) is designed to seem trivial compared to the "prize value" — this is deliberate. The scammer collects these small amounts from thousands of victims simultaneously.`,
        ],
        'Phishing URL': [
            `This URL shows **multiple phishing domain characteristics** — patterns specifically designed to trick users into believing they're visiting a legitimate website when they're actually on a credential-harvesting page.`,
            `The domain structure uses **typosquatting** (replacing letters with numbers, adding hyphens, using misleading subdomains) to visually mimic legitimate brands. At a glance, it can look convincing — especially on mobile where the full URL isn't visible.`,
            `Clicking this link would likely take you to a **fake login page** that looks identical to the real service. Any credentials entered there are immediately captured by the fraudster and used to access your real account.`,
            `Always verify URLs by checking the **exact domain name** (the part just before .com/.in/.net) — not the subdomain or path. When in doubt, navigate directly to the official website by typing it yourself.`,
        ],
        'OTP Fraud': [
            `This is an **OTP extraction scam** — a sophisticated social engineering attack where fraudsters impersonate trusted brands to trick victims into sharing one-time passwords.`,
            `The script is carefully crafted: create urgency with a fake "unauthorized transaction," offer to "reverse" or "protect" the account, then request the OTP that was "just sent to your phone." That OTP is actually for a real transaction the fraudster is initiating.`,
            `**OTPs are single-use authentication codes** — sharing them with anyone, regardless of who they claim to be, gives that person complete control over the associated transaction or account access. Banks explicitly state they will never ask for OTPs.`,
            `The fraudster's knowledge of your name, partial account number, or recent activity (often from data breaches) is used to build false credibility. This information does not make the call legitimate.`,
        ],
        'Screenshot Payment Fraud': [
            `This screenshot shows characteristics consistent with **fake payment proof fraud** — a common scam where fraudsters use edited or fabricated payment screenshots to deceive sellers or recipients.`,
            `Modern image editing tools make it trivially easy to create convincing fake UPI, GPay, or PhonePe payment screenshots. These are used to claim payment has been made before goods are dispatched or services rendered.`,
            `**Always verify payments through your official bank app or UPI app** — not through screenshots sent by the other party. A real payment will appear in your transaction history within seconds of completion.`,
            `If you're a seller or service provider, establish a policy of never dispatching goods or providing services until the payment appears in your own bank statement — regardless of any screenshots provided.`,
        ],
        'Suspicious Content': [
            `This content contains **multiple suspicious language patterns** that are commonly associated with social engineering, online fraud, and scam communications.`,
            `While the specific scam type couldn't be definitively classified, the combination of unsolicited contact, requests for action, and lack of verifiable identity signals are consistent with fraudulent communications.`,
            `**Exercise caution** before responding, clicking any links, making any payments, or sharing any personal information based on this content.`,
            `If this is from someone you know, verify through a separate, trusted communication channel before taking any action.`,
        ],
    };

    return explanations[scamType] || explanations['Suspicious Content'];
}

function generateVerdictStatement(scamType: ScamType, riskScore: number): string {
    const verdicts: Record<RiskLevel, Record<string, string>> = {
        critical: {
            'Fake Job / Internship Scam': 'This message shows overwhelming evidence of a fake job scam. Do not pay any fee, do not engage further.',
            'Bank KYC / Phishing Scam': 'This is a bank phishing attempt with critical risk indicators. Do not click any links or share any information.',
            'UPI / Payment Fraud': 'This content shows critical signs of UPI payment fraud. Verify all payments directly in your bank app.',
            'Support Impersonation Scam': 'This is a support impersonation scam. Hang up immediately and do not share any OTP or account details.',
            'Prize / Giveaway Scam': 'This is a prize scam with critical risk. You cannot win contests you never entered — do not pay any fee.',
            'Phishing URL': 'This URL is a high-confidence phishing link. Do not visit this URL or enter any credentials.',
            'OTP Fraud': 'This is an OTP extraction scam. Never share OTPs with anyone — hang up immediately.',
            'Screenshot Payment Fraud': 'This screenshot shows signs of payment fraud. Verify all payments directly in your bank app.',
            'Suspicious Content': 'This content shows critical risk signals. Do not act on it without independent verification.',
        },
        high: {
            default: 'This content shows strong indicators of fraud. Exercise extreme caution before taking any action.',
        },
        medium: {
            default: 'This content shows several suspicious patterns. Verify independently before responding or acting.',
        },
        low: {
            default: 'This content shows some minor suspicious signals. Proceed with caution and verify if uncertain.',
        },
        safe: {
            default: 'This content appears relatively safe, but always exercise general caution online.',
        },
    };

    const level = getRiskLevel(riskScore);
    const levelVerdicts = verdicts[level];
    return levelVerdicts[scamType] || levelVerdicts['default'] || 'Exercise caution with this content.';
}

function generateActions(scamType: ScamType, riskScore: number): RecommendedAction[] {
    const baseActions: RecommendedAction[] = [
        {
            id: 'action-do-not-engage',
            priority: 'immediate',
            iconName: 'ShieldX',
            iconBg: 'bg-red-500/10 border-red-500/20',
            iconColor: 'text-red-400',
            title: 'Do Not Respond or Engage',
            description: 'Stop all communication with this sender immediately. Do not reply, click any links, or follow any instructions in this message.',
            cta: null,
            ctaLabel: null,
        },
        {
            id: 'action-block',
            priority: 'immediate',
            iconName: 'ShieldCheck',
            iconBg: 'bg-red-500/10 border-red-500/20',
            iconColor: 'text-red-400',
            title: 'Block and Report the Sender',
            description: 'Block the sender on WhatsApp, SMS, or email. Report as spam. This prevents further contact and helps protect other users from the same scammer.',
            cta: null,
            ctaLabel: null,
        },
        {
            id: 'action-report-cybercrime',
            priority: 'recommended',
            iconName: 'Flag',
            iconBg: 'bg-orange-500/10 border-orange-500/20',
            iconColor: 'text-orange-400',
            title: 'Report to Cybercrime Portal',
            description: 'File a complaint at the National Cybercrime Reporting Portal. Reports help law enforcement track and shut down scam operations.',
            cta: 'https://cybercrime.gov.in',
            ctaLabel: 'File Complaint at cybercrime.gov.in',
        },
    ];

    const scamSpecificActions: Record<ScamType, RecommendedAction[]> = {
        'Fake Job / Internship Scam': [
            {
                id: 'action-no-payment',
                priority: 'immediate',
                iconName: 'Lock',
                iconBg: 'bg-red-500/10 border-red-500/20',
                iconColor: 'text-red-400',
                title: 'Do Not Pay Any Registration Fee',
                description: 'Legitimate companies never charge candidates for joining, onboarding, or interview confirmation. Any fee request is the scam mechanism itself.',
                cta: null,
                ctaLabel: null,
            },
            {
                id: 'action-verify-company',
                priority: 'recommended',
                iconName: 'Eye',
                iconBg: 'bg-cyan-500/10 border-cyan-500/20',
                iconColor: 'text-primary',
                title: 'Verify the Company on MCA',
                description: 'Search for the company on the Ministry of Corporate Affairs website. If it exists, contact their official HR directly — never through the number provided.',
                cta: 'https://www.mca.gov.in',
                ctaLabel: 'Check MCA Company Registry',
            },
        ],
        'Bank KYC / Phishing Scam': [
            {
                id: 'action-no-link',
                priority: 'immediate',
                iconName: 'Lock',
                iconBg: 'bg-red-500/10 border-red-500/20',
                iconColor: 'text-red-400',
                title: 'Do Not Click Any Links',
                description: 'Never click links in suspicious messages. Navigate directly to your bank\'s official website by typing the URL yourself, or use the official banking app.',
                cta: null,
                ctaLabel: null,
            },
            {
                id: 'action-call-bank',
                priority: 'recommended',
                iconName: 'Phone',
                iconBg: 'bg-cyan-500/10 border-cyan-500/20',
                iconColor: 'text-primary',
                title: 'Call Your Bank\'s Official Helpline',
                description: 'If you\'re concerned about your account, call the number on the back of your debit card or the official bank website — not any number provided in the suspicious message.',
                cta: null,
                ctaLabel: null,
            },
        ],
        'UPI / Payment Fraud': [
            {
                id: 'action-verify-payment',
                priority: 'immediate',
                iconName: 'Eye',
                iconBg: 'bg-cyan-500/10 border-cyan-500/20',
                iconColor: 'text-primary',
                title: 'Verify Payment in Your Bank App',
                description: 'Never trust payment screenshots. Always verify transactions directly in your bank app or UPI app. A real payment appears in your statement within seconds.',
                cta: null,
                ctaLabel: null,
            },
            {
                id: 'action-no-collect',
                priority: 'immediate',
                iconName: 'Lock',
                iconBg: 'bg-red-500/10 border-red-500/20',
                iconColor: 'text-red-400',
                title: 'Do Not Accept Collect Requests',
                description: 'UPI "collect requests" withdraw money from your account — they are not payments to you. Never approve collect requests from unknown senders.',
                cta: null,
                ctaLabel: null,
            },
        ],
        'Support Impersonation Scam': [
            {
                id: 'action-no-otp',
                priority: 'immediate',
                iconName: 'Lock',
                iconBg: 'bg-red-500/10 border-red-500/20',
                iconColor: 'text-red-400',
                title: 'Never Share OTP or Passwords',
                description: 'No legitimate company will ever ask for your OTP, password, or PIN over phone or chat. Sharing these gives the fraudster complete access to your account.',
                cta: null,
                ctaLabel: null,
            },
            {
                id: 'action-no-remote',
                priority: 'immediate',
                iconName: 'ShieldX',
                iconBg: 'bg-red-500/10 border-red-500/20',
                iconColor: 'text-red-400',
                title: 'Do Not Install Remote Access Apps',
                description: 'Never install AnyDesk, TeamViewer, or similar apps at the request of a "support agent." These give fraudsters complete control of your device and access to all your accounts.',
                cta: null,
                ctaLabel: null,
            },
        ],
        'Prize / Giveaway Scam': [
            {
                id: 'action-no-prize-fee',
                priority: 'immediate',
                iconName: 'Lock',
                iconBg: 'bg-red-500/10 border-red-500/20',
                iconColor: 'text-red-400',
                title: 'Do Not Pay Any "Delivery" or "Processing" Fee',
                description: 'Legitimate prizes never require upfront payment. Any fee request — regardless of how small — is the scam mechanism. Once paid, the scammer disappears.',
                cta: null,
                ctaLabel: null,
            },
        ],
        'Phishing URL': [
            {
                id: 'action-no-visit',
                priority: 'immediate',
                iconName: 'Lock',
                iconBg: 'bg-red-500/10 border-red-500/20',
                iconColor: 'text-red-400',
                title: 'Do Not Visit This URL',
                description: 'This link leads to a phishing page designed to steal your credentials. Close it immediately if already open, and clear your browser cache.',
                cta: null,
                ctaLabel: null,
            },
            {
                id: 'action-change-password',
                priority: 'recommended',
                iconName: 'ShieldCheck',
                iconBg: 'bg-cyan-500/10 border-cyan-500/20',
                iconColor: 'text-primary',
                title: 'Change Passwords If You Visited',
                description: 'If you already visited this URL and entered any credentials, change your passwords immediately on the real website and enable two-factor authentication.',
                cta: null,
                ctaLabel: null,
            },
        ],
        'OTP Fraud': [
            {
                id: 'action-hang-up',
                priority: 'immediate',
                iconName: 'Phone',
                iconBg: 'bg-red-500/10 border-red-500/20',
                iconColor: 'text-red-400',
                title: 'Hang Up Immediately',
                description: 'End the call without sharing any information. Real customer support never calls you unsolicited about account issues and asks for OTPs.',
                cta: null,
                ctaLabel: null,
            },
        ],
        'Screenshot Payment Fraud': [
            {
                id: 'action-verify-screenshot',
                priority: 'immediate',
                iconName: 'Eye',
                iconBg: 'bg-cyan-500/10 border-cyan-500/20',
                iconColor: 'text-primary',
                title: 'Verify Payment in Your Bank Statement',
                description: 'Never accept screenshots as proof of payment. Check your actual bank statement or UPI transaction history before providing any goods or services.',
                cta: null,
                ctaLabel: null,
            },
        ],
        'Suspicious Content': [
            {
                id: 'action-verify-independently',
                priority: 'recommended',
                iconName: 'Eye',
                iconBg: 'bg-cyan-500/10 border-cyan-500/20',
                iconColor: 'text-primary',
                title: 'Verify Through Official Channels',
                description: 'Before taking any action, verify the claim through official channels — the company\'s official website, registered helpline, or in-person verification.',
                cta: null,
                ctaLabel: null,
            },
        ],
    };

    const specific = scamSpecificActions[scamType] || [];
    const combined = [...specific, ...baseActions];

    // Add "if already paid" action for high-risk financial scams
    if (riskScore >= 70 && ['Fake Job / Internship Scam', 'UPI / Payment Fraud', 'Prize / Giveaway Scam'].includes(scamType)) {
        combined.push({
            id: 'action-if-paid',
            priority: 'urgent-if-paid',
            iconName: 'ExternalLink',
            iconBg: 'bg-red-500/10 border-red-500/20',
            iconColor: 'text-red-400',
            title: 'If You Already Paid — Act Immediately',
            description: 'Contact your bank or UPI provider immediately to initiate a chargeback or fraud claim. Call RBI Helpline 14440. Time is critical — act within 24 hours for the best recovery chance.',
            cta: 'tel:14440',
            ctaLabel: 'Call RBI Helpline: 14440',
        });
    }

    return combined.slice(0, 6);
}

function generateConfidenceSignals(scamType: ScamType, riskScore: number): ConfidenceSignal[] {
    const base = riskScore;

    const signalMap: Record<ScamType, ConfidenceSignal[]> = {
        'Fake Job / Internship Scam': [
            { label: 'Manipulation Level', score: Math.min(base + 3, 99), color: 'bg-red-500' },
            { label: 'Financial Risk', score: Math.min(base - 2, 97), color: 'bg-red-400' },
            { label: 'Identity Impersonation', score: Math.min(base - 8, 90), color: 'bg-orange-500' },
            { label: 'Action Urgency', score: Math.min(base - 5, 94), color: 'bg-orange-400' },
            { label: 'Trust Confidence', score: Math.min(base + 1, 98), color: 'bg-red-500' },
        ],
        'Bank KYC / Phishing Scam': [
            { label: 'Phishing Indicators', score: Math.min(base + 2, 99), color: 'bg-red-500' },
            { label: 'Financial Risk', score: Math.min(base + 4, 99), color: 'bg-red-500' },
            { label: 'Identity Impersonation', score: Math.min(base - 3, 96), color: 'bg-red-400' },
            { label: 'Action Urgency', score: Math.min(base - 6, 93), color: 'bg-orange-500' },
            { label: 'Trust Confidence', score: Math.min(base - 1, 97), color: 'bg-red-500' },
        ],
        'UPI / Payment Fraud': [
            { label: 'Payment Manipulation', score: Math.min(base + 3, 99), color: 'bg-red-500' },
            { label: 'Financial Risk', score: Math.min(base + 5, 99), color: 'bg-red-500' },
            { label: 'Screenshot Authenticity', score: Math.min(base - 5, 94), color: 'bg-orange-500' },
            { label: 'Action Urgency', score: Math.min(base - 10, 88), color: 'bg-orange-400' },
            { label: 'Trust Confidence', score: Math.min(base - 2, 96), color: 'bg-red-400' },
        ],
        'Support Impersonation Scam': [
            { label: 'Impersonation Level', score: Math.min(base + 4, 99), color: 'bg-red-500' },
            { label: 'Credential Risk', score: Math.min(base + 2, 98), color: 'bg-red-500' },
            { label: 'Social Engineering', score: Math.min(base - 3, 96), color: 'bg-red-400' },
            { label: 'Action Urgency', score: Math.min(base - 7, 92), color: 'bg-orange-500' },
            { label: 'Trust Confidence', score: Math.min(base - 1, 97), color: 'bg-red-500' },
        ],
        'Prize / Giveaway Scam': [
            { label: 'Reward Bait Level', score: Math.min(base + 2, 98), color: 'bg-red-500' },
            { label: 'Financial Risk', score: Math.min(base - 3, 95), color: 'bg-orange-500' },
            { label: 'Identity Impersonation', score: Math.min(base - 8, 90), color: 'bg-orange-400' },
            { label: 'Action Urgency', score: Math.min(base - 5, 93), color: 'bg-orange-500' },
            { label: 'Trust Confidence', score: Math.min(base + 1, 98), color: 'bg-red-500' },
        ],
        'Phishing URL': [
            { label: 'Domain Spoofing', score: Math.min(base + 5, 99), color: 'bg-red-500' },
            { label: 'Credential Risk', score: Math.min(base + 3, 98), color: 'bg-red-500' },
            { label: 'Malware Risk', score: Math.min(base - 10, 88), color: 'bg-orange-500' },
            { label: 'Redirect Complexity', score: Math.min(base - 5, 93), color: 'bg-orange-400' },
            { label: 'Trust Confidence', score: Math.min(base - 2, 96), color: 'bg-red-400' },
        ],
        'OTP Fraud': [
            { label: 'Manipulation Level', score: Math.min(base + 3, 99), color: 'bg-red-500' },
            { label: 'Credential Risk', score: Math.min(base + 5, 99), color: 'bg-red-500' },
            { label: 'Identity Impersonation', score: Math.min(base - 4, 95), color: 'bg-red-400' },
            { label: 'Action Urgency', score: Math.min(base - 6, 93), color: 'bg-orange-500' },
            { label: 'Trust Confidence', score: Math.min(base - 1, 97), color: 'bg-red-500' },
        ],
        'Screenshot Payment Fraud': [
            { label: 'Screenshot Authenticity', score: Math.min(base + 4, 99), color: 'bg-red-500' },
            { label: 'Financial Risk', score: Math.min(base + 2, 98), color: 'bg-red-500' },
            { label: 'Manipulation Level', score: Math.min(base - 5, 93), color: 'bg-orange-500' },
            { label: 'Action Urgency', score: Math.min(base - 8, 90), color: 'bg-orange-400' },
            { label: 'Trust Confidence', score: Math.min(base - 2, 96), color: 'bg-red-400' },
        ],
        'Suspicious Content': [
            { label: 'Manipulation Level', score: Math.min(base + 2, 75), color: 'bg-yellow-500' },
            { label: 'Financial Risk', score: Math.min(base - 5, 65), color: 'bg-yellow-400' },
            { label: 'Identity Impersonation', score: Math.min(base - 10, 55), color: 'bg-yellow-400' },
            { label: 'Action Urgency', score: Math.min(base - 8, 60), color: 'bg-yellow-500' },
            { label: 'Trust Confidence', score: Math.min(base, 70), color: 'bg-orange-400' },
        ],
    };

    return signalMap[scamType] || signalMap['Suspicious Content'];
}

function generateHighlightedPhrases(content: string, scamType: ScamType): { phrase: string; color: string }[] {
    const phrases: { phrase: string; color: string }[] = [];

    const criticalPatterns = [
        /pay ₹[\d,]+/gi,
        /registration fee/gi,
        /otp/gi,
        /account.*blocked/gi,
        /account.*suspended/gi,
        /kyc.*expire/gi,
        /verify.*account/gi,
    ];

    const urgencyPatterns = [
        /within \d+ hours?/gi,
        /limited seats?/gi,
        /urgent/gi,
        /immediately/gi,
        /expires today/gi,
        /act now/gi,
        /last chance/gi,
    ];

    const rewardPatterns = [
        /congratulations/gi,
        /you have won/gi,
        /shortlisted/gi,
        /lucky winner/gi,
        /selected/gi,
    ];

    criticalPatterns.forEach(pattern => {
        const match = content.match(pattern);
        if (match) phrases.push({ phrase: match[0], color: 'bg-red-500/20 text-red-300 rounded px-0.5' });
    });

    urgencyPatterns.forEach(pattern => {
        const match = content.match(pattern);
        if (match) phrases.push({ phrase: match[0], color: 'bg-orange-500/20 text-orange-300 rounded px-0.5' });
    });

    rewardPatterns.forEach(pattern => {
        const match = content.match(pattern);
        if (match) phrases.push({ phrase: match[0], color: 'bg-yellow-500/20 text-yellow-300 rounded px-0.5' });
    });

    return phrases.slice(0, 6);
}

export function analyzeContent(input: AnalysisInput): AnalysisResult {
    const { type, content } = input;

    const { scamType, subType, riskScore, confidence } = detectScamType(content, type);
    const riskLevel = getRiskLevel(riskScore);
    const redFlags = generateRedFlags(content, scamType, type);
    const aiExplanation = generateExplanation(content, scamType, riskScore);
    const verdictStatement = generateVerdictStatement(scamType, riskScore);
    const recommendedActions = generateActions(scamType, riskScore);
    const confidenceSignals = generateConfidenceSignals(scamType, riskScore);
    const highlightedPhrases = generateHighlightedPhrases(content, scamType);

    const now = new Date();
    const analyzedAt = now.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata',
    }) + ' IST';

    const inputPreview = type === 'url'
        ? content
        : content.length > 200
            ? content.slice(0, 200) + '...'
            : content;

    return {
        riskScore,
        riskLevel,
        scamType,
        scamSubType: subType,
        confidence,
        verdict: verdictStatement,
        redFlags,
        aiExplanation,
        verdictStatement,
        recommendedActions,
        confidenceSignals,
        inputType: type,
        inputPreview,
        analyzedAt,
        highlightedPhrases,
    };
}

export async function analyzeContentAsync(input: AnalysisInput): Promise<AnalysisResult> {
    const { type, content, screenshotScenario } = input;
    
    // Call backend API
    let backendResult;
    try {
        console.log(`[FRONTEND -> BACKEND] Initiating POST /analyze...`);
        console.log(`[FRONTEND -> BACKEND] Payload:`, { input_type: type, content: content.substring(0, 50) + '...', screenshot_scenario: screenshotScenario });
        
        const response = await fetch("http://127.0.0.1:8000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                input_type: type,
                content: content,
                screenshot_scenario: screenshotScenario
            })
        });
        
        if (!response.ok) {
            console.error(`[BACKEND ERROR] Response received with status code: ${response.status}`);
            throw new Error(`API error: ${response.status}`);
        }
        backendResult = await response.json();
        console.log(`[FRONTEND <- BACKEND] Success! Payload received:`, backendResult);
        
    } catch (e) {
        console.error("[FRONTEND ERROR] Fallback triggered! Backend failed because:", e);
        console.log("[FRONTEND] Falling back to local simulated response...");
        // Fallback to existing mock logic if backend fails
        return analyzeContent(input);
    }
    
    // Process backend result into precise frontend schema expectations
    const riskScore = backendResult.risk_score;
    const scamType = backendResult.scam_type as ScamType;
    const riskLevel = getRiskLevel(riskScore);
    const confidence = backendResult.confidence_breakdown.trust_confidence || 85;
    
    // Generate rich UI flags locally based on the returned scamType/content
    let redFlags = generateRedFlags(content, scamType, type);
    
    // Format explanation block nicely
    const aiExplanation = backendResult.explanation 
        ? backendResult.explanation.split('. ').filter(Boolean).map((s: string) => s + (s.endsWith('.') ? '' : '.')) 
        : generateExplanation(content, scamType, riskScore);
    
    const verdictStatement = backendResult.verdict || generateVerdictStatement(scamType, riskScore);
    const recommendedActions = generateActions(scamType, riskScore);
    
    const confidenceSignals: ConfidenceSignal[] = [
        { label: 'Manipulation Level', score: backendResult.confidence_breakdown.manipulation_level, color: 'bg-red-500' },
        { label: 'Financial Risk', score: backendResult.confidence_breakdown.financial_risk, color: 'bg-red-400' },
        { label: 'Impersonation Risk', score: backendResult.confidence_breakdown.impersonation_risk, color: 'bg-orange-500' },
        { label: 'Action Urgency', score: backendResult.confidence_breakdown.urgency_level, color: 'bg-orange-400' },
        { label: 'Overall Confidence', score: backendResult.confidence_breakdown.trust_confidence, color: 'bg-cyan-500' },
    ];
    
    const highlightedPhrases = generateHighlightedPhrases(content, scamType);
    
    const now = new Date();
    const analyzedAt = now.toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata',
    }) + ' IST';
    
    const inputPreview = type === 'url' ? content : content.length > 200 ? content.slice(0, 200) + '...' : content;
    
    return {
        riskScore,
        riskLevel,
        scamType,
        scamSubType: backendResult.scam_type, 
        confidence,
        verdict: verdictStatement,
        redFlags,
        aiExplanation,
        verdictStatement,
        recommendedActions,
        confidenceSignals,
        inputType: type,
        inputPreview,
        analyzedAt,
        highlightedPhrases
    };
}

export function saveAnalysisResult(result: AnalysisResult, rawContent: string): void {
    if (typeof window === 'undefined') return;
    try {
        sessionStorage.setItem('trustlayer_result', JSON.stringify(result));
        sessionStorage.setItem('trustlayer_raw_content', rawContent);
    } catch {
        // ignore storage errors
    }
}

export function loadAnalysisResult(): AnalysisResult | null {
    if (typeof window === 'undefined') return null;
    try {
        const stored = sessionStorage.getItem('trustlayer_result');
        if (!stored) return null;
        return JSON.parse(stored) as AnalysisResult;
    } catch {
        return null;
    }
}

export function loadRawContent(): string {
    if (typeof window === 'undefined') return '';
    try {
        return sessionStorage.getItem('trustlayer_raw_content') || '';
    } catch {
        return '';
    }
}
