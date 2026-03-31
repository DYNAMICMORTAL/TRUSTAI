'use client';

import React, { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { ShieldX, ShieldCheck, Shield, TrendingUp } from 'lucide-react';
import { loadAnalysisResult, type AnalysisResult, type RiskLevel } from '@/lib/analysisEngine';

const riskConfig: Record<RiskLevel, {
    label: string;
    color: string;
    bg: string;
    barColor: string;
    scoreColor: string;
    glowClass: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
}> = {
    critical: {
        label: 'CRITICAL RISK',
        color: 'text-red-400',
        bg: 'bg-red-500/10 border-red-500/20',
        barColor: '#ef4444',
        scoreColor: 'text-red-400',
        glowClass: 'shadow-sm shadow-red-500/20 ring-1 ring-red-500/30',
        icon: ShieldX,
        description: 'This content shows overwhelming evidence of being a scam. Do not act on it.',
    },
    high: {
        label: 'HIGH RISK',
        color: 'text-orange-400',
        bg: 'bg-orange-500/10 border-orange-500/20',
        barColor: '#f97316',
        scoreColor: 'text-orange-400',
        glowClass: 'shadow-sm shadow-red-500/20 ring-1 ring-red-500/30',
        icon: ShieldX,
        description: 'This content shows strong indicators of fraud. Exercise extreme caution.',
    },
    medium: {
        label: 'SUSPICIOUS',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10 border-yellow-500/20',
        barColor: '#eab308',
        scoreColor: 'text-yellow-400',
        glowClass: '',
        icon: Shield,
        description: 'This content shows several suspicious patterns. Verify independently before acting.',
    },
    low: {
        label: 'LOW RISK',
        color: 'text-primary',
        bg: 'bg-cyan-500/10 border-cyan-500/20',
        barColor: '#06b6d4',
        scoreColor: 'text-primary',
        glowClass: '',
        icon: Shield,
        description: 'This content shows minor suspicious signals. Proceed with caution.',
    },
    safe: {
        label: 'APPEARS SAFE',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/20',
        barColor: '#22c55e',
        scoreColor: 'text-emerald-400',
        glowClass: '',
        icon: ShieldCheck,
        description: 'This content appears relatively safe. Always exercise general caution online.',
    },
};

const defaultResult: AnalysisResult = {
    riskScore: 94,
    riskLevel: 'critical',
    scamType: 'Fake Job / Internship Scam',
    scamSubType: 'Registration Fee Fraud',
    confidence: 91,
    verdict: 'This message shows overwhelming evidence of a fake job scam. Do not pay any fee.',
    redFlags: [],
    aiExplanation: [],
    verdictStatement: 'This message shows overwhelming evidence of a fake job scam.',
    recommendedActions: [],
    confidenceSignals: [
        { label: 'Payment Demand', score: 98, color: 'bg-red-500' },
        { label: 'Urgency Pressure', score: 92, color: 'bg-red-400' },
        { label: 'Reward Bait', score: 87, color: 'bg-orange-500' },
        { label: 'Identity Spoofing', score: 76, color: 'bg-orange-400' },
        { label: 'Missing Legitimacy', score: 94, color: 'bg-red-500' },
    ],
    inputType: 'text',
    inputPreview: 'Congratulations! You\'ve been shortlisted for our paid remote internship...',
    analyzedAt: '31 Mar 2026 · 11:20 IST',
    highlightedPhrases: [],
};

export default function RiskScorePanel() {
    const [result, setResult] = useState<AnalysisResult>(defaultResult);

    useEffect(() => {
        const loaded = loadAnalysisResult();
        if (loaded) setResult(loaded);
    }, []);

    const config = riskConfig[result.riskLevel];
    const RiskIcon = config.icon;
    const chartData = [{ name: 'Risk', value: result.riskScore, fill: config.barColor }];

    return (
        <div className={`card-surface p-6 ${config.glowClass}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <RiskIcon className={`w-5 h-5 ${config.color}`} />
                    <span className="text-sm font-semibold text-text-primary">Trust Report</span>
                </div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${config.bg} ${config.color}`}>
                    {config.label}
                </div>
            </div>

            {/* Gauge Chart */}
            <div className="relative flex items-center justify-center my-2">
                <ResponsiveContainer width="100%" height={200}>
                    <RadialBarChart
                        cx="50%"
                        cy="75%"
                        innerRadius="70%"
                        outerRadius="100%"
                        startAngle={180}
                        endAngle={0}
                        data={chartData}
                        barSize={16}
                    >
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar
                            background={{ fill: 'hsl(240 6% 15%)' }}
                            dataKey="value"
                            angleAxisId={0}
                            data={chartData}
                            cornerRadius={8}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute bottom-8 flex flex-col items-center">
                    <span className={`text-6xl font-black tabular-nums font-mono leading-none ${config.scoreColor}`}>
                        {result.riskScore}
                    </span>
                    <span className="text-sm text-text-secondary mt-1">out of 100</span>
                </div>
            </div>

            {/* Gauge labels */}
            <div className="flex items-center justify-between text-xs text-text-secondary px-2 -mt-2 mb-4">
                <span>Safe</span>
                <span>Medium</span>
                <span>Critical</span>
            </div>

            {/* Scam type */}
            <div className="bg-card/60 rounded-xl p-4 mb-4 border border-border-subtle">
                <div className="text-xs text-text-secondary uppercase tracking-wider mb-1.5">Scam Classification</div>
                <div className={`text-base font-semibold ${config.color}`}>{result.scamType}</div>
                <div className="text-xs text-text-secondary mt-1">Sub-type: {result.scamSubType}</div>
            </div>

            {/* Confidence */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <TrendingUp className="w-3.5 h-3.5" />
                    AI Confidence
                </div>
                <span className="text-sm font-semibold text-text-primary tabular-nums font-mono">{result.confidence}%</span>
            </div>
            <div className="w-full bg-card-elevated rounded-full h-1.5 mb-5">
                <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-700"
                    style={{ width: `${result.confidence}%` }}
                />
            </div>

            {/* Signal breakdown */}
            <div>
                <div className="text-xs text-text-secondary uppercase tracking-wider mb-3">Fraud Signal Breakdown</div>
                <div className="flex flex-col gap-2.5">
                    {result.confidenceSignals.map((signal) => (
                        <div key={`signal-${signal.label}`}>
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-text-secondary">{signal.label}</span>
                                <span className="text-text-secondary tabular-nums font-mono">{signal.score}%</span>
                            </div>
                            <div className="w-full bg-card-elevated rounded-full h-1">
                                <div
                                    className={`h-1 rounded-full ${signal.color} transition-all duration-700`}
                                    style={{ width: `${signal.score}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Risk description */}
            <div className="mt-5 pt-5 border-t border-border-subtle">
                <p className="text-xs text-text-secondary leading-relaxed italic">{config.description}</p>
            </div>
        </div>
    );
}