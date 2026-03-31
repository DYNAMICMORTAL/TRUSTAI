'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Copy, Share2, RotateCcw, Download, Check, MessageSquare, Image as ImageIcon, Link2 } from 'lucide-react';
import { loadAnalysisResult } from '@/lib/analysisEngine';

export default function ResultActions() {
    const [copied, setCopied] = useState(false);
    const [result, setResult] = useState<ReturnType<typeof loadAnalysisResult>>(null);

    useEffect(() => {
        setResult(loadAnalysisResult());
    }, []);

    const handleCopyReport = () => {
        const score = result?.riskScore || 94;
        const level = result?.riskLevel?.toUpperCase() || 'CRITICAL RISK';
        const scamType = result?.scamType || 'Fake Job / Internship Scam';
        const confidence = result?.confidence || 91;
        const flags = result?.redFlags?.map((f, i) => `${i + 1}. ${f?.tactic}`)?.join('\n') || '1. Payment demand\n2. Urgency pressure';
        const verdict = result?.verdictStatement || 'Fraudulent message. Do not pay, do not engage.';

        const reportText = `TrustLayer AI — Risk Report
━━━━━━━━━━━━━━━━━━━━━━━━
Risk Score: ${score}/100
Classification: ${level}
Scam Type: ${scamType}
Confidence: ${confidence}%

Red Flags Detected (${result?.redFlags?.length || 0}):
${flags}

Verdict: ${verdict}

Analyzed by TrustLayer AI`;

        navigator.clipboard?.writeText(reportText)?.then(() => {
            setCopied(true);
            toast?.success('Report copied to clipboard');
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleShare = () => {
        const score = result?.riskScore || 94;
        const scamType = result?.scamType || 'Fake Internship Scam';
        if (navigator.share) {
            navigator.share({
                title: 'TrustLayer AI — Scam Detected',
                text: `I just checked suspicious content with TrustLayer AI. Risk Score: ${score}/100 — ${scamType}. Stay safe!`,
                url: window.location?.href,
            });
        } else {
            navigator.clipboard?.writeText(window.location?.href);
            toast?.success('Share link copied to clipboard');
        }
    };

    return (
        <div className="card-surface p-5">
            <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
                Report Actions
            </div>
            <div className="flex flex-col gap-2.5">
                <button
                    onClick={handleCopyReport}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/[0.03] border border-black/8 hover:bg-black/[0.06] hover:border-black/12 active:scale-[0.98] transition-all duration-150 text-sm text-text-primary hover:text-text-primary"
                >
                    {copied ? (
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                        <Copy className="w-4 h-4 text-text-secondary flex-shrink-0" />
                    )}
                    {copied ? 'Report Copied!' : 'Copy Full Report'}
                </button>

                <button
                    onClick={handleShare}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/[0.03] border border-black/8 hover:bg-black/[0.06] hover:border-black/12 active:scale-[0.98] transition-all duration-150 text-sm text-text-primary hover:text-text-primary"
                >
                    <Share2 className="w-4 h-4 text-text-secondary flex-shrink-0" />
                    Share This Warning
                </button>

                <button
                    onClick={() => {
                        toast.success('Preparing PDF Document...');
                        setTimeout(() => window.print(), 100);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/[0.03] border border-black/8 hover:bg-black/[0.06] hover:border-black/12 active:scale-[0.98] transition-all duration-150 text-sm text-text-primary hover:text-text-primary"
                >
                    <Download className="w-4 h-4 text-text-secondary flex-shrink-0" />
                    Export as PDF
                </button>

                <Link
                    href="/analyze-content"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/15 hover:border-cyan-500/30 active:scale-[0.98] transition-all duration-150 text-sm text-primary hover:text-cyan-300 mt-1"
                >
                    <RotateCcw className="w-4 h-4 flex-shrink-0" />
                    Analyze Another Content
                </Link>
            </div>

            {/* Next action flow */}
            <div className="mt-5 pt-5 border-t border-border-subtle">
                <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">What would you like to do next?</div>
                <div className="flex flex-col gap-2">
                    <Link
                        href="/analyze-content"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-black/[0.02] border border-border-subtle hover:bg-black/[0.05] hover:border-border transition-all duration-150 text-xs text-text-secondary hover:text-text-primary"
                    >
                        <MessageSquare className="w-3.5 h-3.5 text-text-secondary" />
                        Scan another message
                    </Link>
                    <Link
                        href="/analyze-content"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-black/[0.02] border border-border-subtle hover:bg-black/[0.05] hover:border-border transition-all duration-150 text-xs text-text-secondary hover:text-text-primary"
                    >
                        <ImageIcon className="w-3.5 h-3.5 text-text-secondary" />
                        Check a screenshot
                    </Link>
                    <Link
                        href="/analyze-content"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-black/[0.02] border border-border-subtle hover:bg-black/[0.05] hover:border-border transition-all duration-150 text-xs text-text-secondary hover:text-text-primary"
                    >
                        <Link2 className="w-3.5 h-3.5 text-text-secondary" />
                        Inspect a suspicious URL
                    </Link>
                </div>
            </div>
        </div>
    );
}