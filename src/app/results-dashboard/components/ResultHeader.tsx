'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Clock, ShieldCheck, Shield } from 'lucide-react';
import { loadAnalysisResult, type AnalysisResult } from '@/lib/analysisEngine';

export default function ResultHeader() {
    const [result, setResult] = useState<AnalysisResult | null>(null);

    useEffect(() => {
        const loaded = loadAnalysisResult();
        if (loaded) setResult(loaded);
    }, []);

    const riskLevel = result?.riskLevel || 'critical';
    const scamType = result?.scamType || 'Fake Internship Scam';
    const analyzedAt = result?.analyzedAt || '31 Mar 2026 · 11:20 IST';

    const riskBadge = {
        critical: { dot: 'bg-red-500', text: 'text-red-400', label: 'HIGH RISK DETECTED', tagBg: 'bg-red-500/10 border-red-500/20', tagText: 'text-red-400', icon: AlertTriangle },
        high: { dot: 'bg-orange-500', text: 'text-orange-400', label: 'HIGH RISK DETECTED', tagBg: 'bg-orange-500/10 border-orange-500/20', tagText: 'text-orange-400', icon: AlertTriangle },
        medium: { dot: 'bg-yellow-500', text: 'text-yellow-400', label: 'SUSPICIOUS CONTENT', tagBg: 'bg-yellow-500/10 border-yellow-500/20', tagText: 'text-yellow-400', icon: AlertTriangle },
        low: { dot: 'bg-cyan-500', text: 'text-primary', label: 'LOW RISK', tagBg: 'bg-cyan-500/10 border-cyan-500/20', tagText: 'text-primary', icon: Shield },
        safe: { dot: 'bg-emerald-500', text: 'text-emerald-400', label: 'APPEARS SAFE', tagBg: 'bg-emerald-500/10 border-emerald-500/20', tagText: 'text-emerald-400', icon: ShieldCheck },
    };

    const badge = riskBadge[riskLevel];
    const BadgeIcon = badge.icon;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <Link
                    href="/analyze-content"
                    className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
                    Back to Analyzer
                </Link>
                <div className="h-4 w-px bg-black/10" />
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`} />
                    <span className={`text-sm font-semibold ${badge.text}`}>{badge.label}</span>
                </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Analyzed {analyzedAt}</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${badge.tagBg}`}>
                    <BadgeIcon className={`w-3.5 h-3.5 ${badge.tagText}`} />
                    <span className={`text-xs font-medium ${badge.tagText}`}>{scamType}</span>
                </div>
            </div>
        </div>
    );
}