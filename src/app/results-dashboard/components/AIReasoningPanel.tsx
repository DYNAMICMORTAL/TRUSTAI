'use client';

import React, { useEffect, useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';
import { loadAnalysisResult, type AnalysisResult } from '@/lib/analysisEngine';

const defaultExplanation = [
    `This message exhibits the classic hallmarks of a **registration fee internship scam** — one of the most prevalent fraud patterns targeting students and recent graduates in India in 2025–2026.`,
    `The core mechanism is straightforward: the fraudster poses as a recruiter from a plausible-sounding company, claims the victim has been "shortlisted" without any prior interaction, and then demands a small fee framed as a legitimate onboarding cost.`,
    `The message deploys **three simultaneous manipulation tactics**: urgency ("respond within 2 hours"), scarcity ("Limited seats"), and reward bait ("paid remote internship"). This trifecta is designed to override rational decision-making.`,
    `Critically, the message contains **zero verifiable legitimacy signals**: no official company email domain, no LinkedIn or company website reference, no named HR contact, no job posting ID, and no application reference number.`,
];

function renderBoldText(text: string) {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
        i % 2 === 1 ? (
            <strong key={i} className="text-text-primary/90 font-semibold">{part}</strong>
        ) : (
            <span key={i}>{part}</span>
        )
    );
}

export default function AIReasoningPanel() {
    const [result, setResult] = useState<AnalysisResult | null>(null);

    useEffect(() => {
        const loaded = loadAnalysisResult();
        if (loaded) setResult(loaded);
    }, []);

    const explanation = result?.aiExplanation?.length ? result.aiExplanation : defaultExplanation;
    const verdict = result?.verdictStatement || 'This is a fraudulent message with extremely high confidence. Do not pay any amount, do not share personal information, and do not engage further with this sender.';
    const confidence = result?.confidence || 91;
    const scamType = result?.scamType || 'Fake Job / Internship Scam';

    const verdictColor = result?.riskLevel === 'critical' || result?.riskLevel === 'high' ? 'bg-red-500/8 border-red-500/20'
        : result?.riskLevel === 'medium' ? 'bg-yellow-500/8 border-yellow-500/20' : 'bg-cyan-500/8 border-cyan-500/20';

    const verdictDotColor = result?.riskLevel === 'critical' || result?.riskLevel === 'high' ? 'bg-red-500/20 border-red-500/30 bg-red-400'
        : result?.riskLevel === 'medium' ? 'bg-yellow-500/20 border-yellow-500/30 bg-yellow-400' : 'bg-cyan-500/20 border-cyan-500/30 bg-cyan-400';

    const verdictTextColor = result?.riskLevel === 'critical' || result?.riskLevel === 'high' ? 'text-red-400'
        : result?.riskLevel === 'medium' ? 'text-yellow-400' : 'text-primary';

    return (
        <div className="card-surface overflow-hidden">
            <div className="px-6 py-5 border-b border-border-subtle flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-text-primary">Why This Was Flagged</h2>
                    <p className="text-xs text-text-secondary mt-0.5">AI reasoning behind the {scamType} classification</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-xs font-medium text-indigo-400">AI Generated</span>
                </div>
            </div>

            <div className="px-6 py-5">
                <div className="flex flex-col gap-4">
                    {explanation.map((para, i) => (
                        <p key={i} className={`text-sm leading-relaxed ${i === 0 ? 'text-text-primary' : 'text-text-secondary'}`}>
                            {renderBoldText(para)}
                        </p>
                    ))}
                </div>

                {/* Verdict box */}
                <div className={`mt-6 px-4 py-4 rounded-xl border ${verdictColor}`}>
                    <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${verdictDotColor.split(' ').slice(0, 2).join(' ')}`}>
                            <div className={`w-2 h-2 rounded-full ${verdictDotColor.split(' ')[2]}`} />
                        </div>
                        <div>
                            <div className={`text-sm font-semibold mb-1 ${verdictTextColor}`}>TrustLayer Verdict</div>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {renderBoldText(verdict)}{' '}
                                <strong className="text-text-primary">AI Confidence: {confidence}%</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}