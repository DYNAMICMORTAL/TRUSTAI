'use client';

import React from 'react';

const presets = [
    {
        id: 'preset-fake-internship',
        label: '💼 Fake Internship',
        text: "Congratulations! You\'ve been shortlisted for our paid remote internship at TechVentures Pvt Ltd. Pay ₹499 registration fee to confirm your onboarding slot. Limited seats — respond within 2 hours. WhatsApp: +91-9876543210",
        type: 'text' as const,
    },
    {
        id: 'preset-bank-kyc',
        label: '🏦 Bank KYC Scam',
        text: "URGENT: Your HDFC Bank account will be suspended in 30 minutes due to incomplete KYC. Click here to verify immediately: http://hdfc-kyc-verify-now.in/update or call our helpline 1800-XXX-XXXX. Failure to comply will result in account freeze.",
        type: 'text' as const,
    },
    {
        id: 'preset-support-otp',
        label: '🎧 Support OTP Scam',
        text: "Hello, I'm calling from Amazon Customer Care. We detected an unauthorized order of ₹12,499 on your account. To cancel and get a refund, please share the OTP sent to your registered mobile number. This is an official Amazon process.",
        type: 'text' as const,
    },
    {
        id: 'preset-prize',
        label: '🎁 Prize Scam',
        text: "🎉 WINNER ALERT! You have won an Apple iPhone 15 Pro in our Diwali Lucky Draw! To claim your prize, pay ₹199 delivery charges to: UPI ID: prize.claim2026@paytm. Offer valid for 24 hours only. Claim code: LUCKY-2026-WIN",
        type: 'text' as const,
    },
    {
        id: 'preset-url',
        label: '🔗 Suspicious URL',
        text: "amaz0n-pay-support-verification-login.in/account/verify?ref=urgent&token=abc123",
        type: 'url' as const,
    },
];

interface SamplePresetsBarProps {
    onSelect?: (text: string, type: 'text' | 'url') => void;
}

export default function SamplePresetsBar({ onSelect }: SamplePresetsBarProps) {
    return (
        <div className="card-surface p-4">
            <div className="flex items-center gap-2 mb-3">
                <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Try a sample scam scenario
                </div>
                <div className="h-px flex-1 bg-black/5" />
            </div>
            <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                    <button
                        key={preset.id}
                        onClick={() => onSelect?.(preset.text, preset.type)}
                        className="px-3 py-1.5 rounded-lg bg-black/5 border border-black/8 text-xs text-text-secondary font-medium hover:bg-black/10 hover:text-text-primary hover:border-black/15 active:scale-95 transition-all duration-150"
                    >
                        {preset.label}
                    </button>
                ))}
            </div>
        </div>
    );
}