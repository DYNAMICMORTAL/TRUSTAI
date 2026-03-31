import React from 'react';

const scamTypes = [
    {
        id: 'scam-phishing',
        emoji: '🎣',
        name: 'Phishing Attacks',
        description: 'Fake login pages, credential harvesting, spoofed bank emails designed to steal your passwords.',
        risk: 'Critical',
        riskColor: 'text-red-400',
        riskBg: 'bg-red-500/10 border-red-500/20',
        examples: ['Fake bank OTP requests', 'Spoofed Netflix billing', 'Fake password reset'],
    },
    {
        id: 'scam-fake-job',
        emoji: '💼',
        name: 'Fake Job & Internship Scams',
        description: 'Fraudulent recruiters demanding registration fees, fake offer letters from known companies.',
        risk: 'High',
        riskColor: 'text-orange-400',
        riskBg: 'bg-orange-500/10 border-orange-500/20',
        examples: ['Pay-to-join internships', 'Fake HR onboarding', 'Work-from-home fraud'],
    },
    {
        id: 'scam-upi',
        emoji: '💸',
        name: 'UPI / Payment Fraud',
        description: 'Fake payment screenshots, collect request scams, QR code manipulation, refund bait.',
        risk: 'High',
        riskColor: 'text-orange-400',
        riskBg: 'bg-orange-500/10 border-orange-500/20',
        examples: ['Fake GPay screenshots', 'Collect request fraud', 'Fake refund portals'],
    },
    {
        id: 'scam-support',
        emoji: '🎧',
        name: 'Support Impersonation',
        description: 'Fraudsters posing as bank, telecom, or platform support demanding OTPs or remote access.',
        risk: 'Critical',
        riskColor: 'text-red-400',
        riskBg: 'bg-red-500/10 border-red-500/20',
        examples: ['Fake Amazon support', 'Bank account freeze alerts', 'OTP reversal scams'],
    },
    {
        id: 'scam-kyc',
        emoji: '🏦',
        name: 'KYC / Banking Scams',
        description: 'Fake KYC expiry alerts, account suspension threats, loan approval fraud requiring upfront fees.',
        risk: 'High',
        riskColor: 'text-orange-400',
        riskBg: 'bg-orange-500/10 border-orange-500/20',
        examples: ['KYC expiry SMS', 'Loan approval fees', 'Account block threats'],
    },
    {
        id: 'scam-prize',
        emoji: '🎁',
        name: 'Prize & Giveaway Scams',
        description: 'You\'ve won an iPhone! Lottery winnings, lucky draw frauds requiring processing fees.',
        risk: 'Medium',
        riskColor: 'text-yellow-400',
        riskBg: 'bg-yellow-500/10 border-yellow-500/20',
        examples: ['Fake iPhone giveaways', 'Lottery winnings', 'Lucky coupon fraud'],
    },
    {
        id: 'scam-deepfake',
        emoji: '🤖',
        name: 'AI-Generated Social Engineering',
        description: 'Deepfake voice/video calls, AI-written personalized scam messages, synthetic identity fraud.',
        risk: 'Critical',
        riskColor: 'text-red-400',
        riskBg: 'bg-red-500/10 border-red-500/20',
        examples: ['Deepfake CEO calls', 'AI voice cloning', 'Synthetic identity scams'],
    },
    {
        id: 'scam-url',
        emoji: '🔗',
        name: 'Malicious Links & URLs',
        description: 'Typosquatted domains, shortened URL traps, fake login portals, drive-by malware downloads.',
        risk: 'High',
        riskColor: 'text-orange-400',
        riskBg: 'bg-orange-500/10 border-orange-500/20',
        examples: ['amaz0n-support.net', 'Bit.ly redirect traps', 'Fake IRCTC portals'],
    },
];

export default function ScamTypesGrid() {
    return (
        <section id="scam-types" className="py-24">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-border text-text-secondary text-xs font-medium mb-6 uppercase tracking-wider">
                        What We Detect
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight mb-4">
                        8 scam categories.
                        <br />
                        <span className="text-text-secondary font-normal">One platform to check them all.</span>
                    </h2>
                    <p className="text-text-secondary text-base leading-relaxed">
                        TrustLayer is trained on 2025–2026 fraud patterns across India and globally. Every category includes domain-specific detection rules and AI reasoning tailored to how that scam actually operates.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {scamTypes?.map((scam) => (
                        <div
                            key={scam?.id}
                            className="card-surface p-5 group hover:border-black/15 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-3xl">{scam?.emoji}</span>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${scam?.riskBg} ${scam?.riskColor}`}>
                                    {scam?.risk}
                                </span>
                            </div>
                            <h3 className="text-base font-semibold text-text-primary mb-2 leading-snug">{scam?.name}</h3>
                            <p className="text-xs text-text-secondary leading-relaxed mb-4">{scam?.description}</p>
                            <div className="flex flex-col gap-1">
                                {scam?.examples?.map((example) => (
                                    <div key={`${scam?.id}-ex-${example}`} className="flex items-center gap-1.5 text-xs text-text-secondary">
                                        <div className="w-1 h-1 rounded-full bg-border flex-shrink-0" />
                                        {example}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}