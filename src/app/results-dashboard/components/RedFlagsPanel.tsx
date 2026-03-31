'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { loadAnalysisResult, type RedFlag } from '@/lib/analysisEngine';

const severityConfig = {
    critical: {
        dot: 'bg-red-500',
        border: 'border-red-500/20',
        bg: 'bg-red-500/5',
        badge: 'bg-red-500/10 border-red-500/20 text-red-400',
        label: 'Critical',
        infoColor: 'text-red-400',
    },
    high: {
        dot: 'bg-orange-500',
        border: 'border-orange-500/20',
        bg: 'bg-orange-500/5',
        badge: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
        label: 'High',
        infoColor: 'text-orange-400',
    },
    medium: {
        dot: 'bg-yellow-500',
        border: 'border-yellow-500/20',
        bg: 'bg-yellow-500/5',
        badge: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
        label: 'Medium',
        infoColor: 'text-yellow-400',
    },
    low: {
        dot: 'bg-cyan-500',
        border: 'border-cyan-500/20',
        bg: 'bg-cyan-500/5',
        badge: 'bg-cyan-500/10 border-cyan-500/20 text-primary',
        label: 'Low',
        infoColor: 'text-primary',
    },
};

const defaultFlags: RedFlag[] = [
    {
        id: 'flag-001',
        severity: 'critical',
        tactic: 'Payment Demand for Onboarding',
        detail: 'Legitimate companies never charge candidates for joining, onboarding, or interview confirmation. The ₹499 "registration fee" is a classic advance-fee fraud tactic.',
        trigger: '"Pay ₹499 registration fee to confirm your onboarding slot"',
        category: 'Financial Manipulation',
    },
    {
        id: 'flag-002',
        severity: 'critical',
        tactic: 'Artificial Urgency Pressure',
        detail: 'The "Limited seats — respond within 2 hours" language is a deliberate psychological pressure tactic to prevent victims from thinking critically.',
        trigger: '"Limited seats — respond within 2 hours"',
        category: 'Urgency Manipulation',
    },
    {
        id: 'flag-003',
        severity: 'high',
        tactic: 'Unsolicited Job Offer (Reward Bait)',
        detail: 'The message claims you\'ve been "shortlisted" without any prior application or interview. This is a reward bait pattern to build false credibility.',
        trigger: '"You\'ve been shortlisted for our paid remote internship"',
        category: 'Reward Bait',
    },
];

export default function RedFlagsPanel() {
    const [flags, setFlags] = useState<RedFlag[]>(defaultFlags);
    const [expandedFlags, setExpandedFlags] = useState<Set<string>>(new Set());

    useEffect(() => {
        const result = loadAnalysisResult();
        if (result?.redFlags?.length) {
            setFlags(result.redFlags);
            // Auto-expand first 2 flags
            const firstTwo = new Set(result.redFlags.slice(0, 2).map(f => f.id));
            setExpandedFlags(firstTwo);
        } else {
            setExpandedFlags(new Set(['flag-001', 'flag-002']));
        }
    }, []);

    const toggleFlag = (id: string) => {
        setExpandedFlags((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const criticalCount = flags.filter((f) => f.severity === 'critical').length;
    const highCount = flags.filter((f) => f.severity === 'high').length;
    const mediumCount = flags.filter((f) => f.severity === 'medium').length;

    return (
        <div className="card-surface overflow-hidden">
            <div className="px-6 py-5 border-b border-border-subtle flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <div>
                        <h2 className="text-base font-semibold text-text-primary">Detected Red Flags</h2>
                        <p className="text-xs text-text-secondary mt-0.5">{flags.length} fraud signal{flags.length !== 1 ? 's' : ''} identified in this content</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
                    {criticalCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
                            {criticalCount} Critical
                        </span>
                    )}
                    {highCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
                            {highCount} High
                        </span>
                    )}
                    {mediumCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs font-semibold text-yellow-400">
                            {mediumCount} Medium
                        </span>
                    )}
                </div>
            </div>

            <div className="divide-y divide-white/5">
                {flags.map((flag) => {
                    const config = severityConfig[flag.severity as keyof typeof severityConfig] || severityConfig.medium;
                    const isExpanded = expandedFlags.has(flag.id);

                    return (
                        <div key={flag.id} className={`transition-colors duration-150 ${isExpanded ? config.bg : 'hover:bg-black/[0.02]'}`}>
                            <button
                                onClick={() => toggleFlag(flag.id)}
                                className="w-full flex items-start gap-4 px-6 py-4 text-left"
                            >
                                <div className={`w-2 h-2 rounded-full ${config.dot} mt-2 flex-shrink-0`} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-3 mb-1">
                                        <span className="text-sm font-semibold text-text-primary leading-snug">{flag.tactic}</span>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${config.badge}`}>
                                                {config.label}
                                            </span>
                                            {isExpanded
                                                ? <ChevronUp className="w-4 h-4 text-text-secondary" />
                                                : <ChevronDown className="w-4 h-4 text-text-secondary" />}
                                        </div>
                                    </div>
                                    <span className="text-xs text-text-secondary">{flag.category}</span>
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="px-6 pb-5 animate-fade-in">
                                    <div className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg border mb-3 ${config.bg} ${config.border}`}>
                                        <Info className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${config.infoColor}`} />
                                        <p className="text-xs font-mono text-text-secondary italic leading-relaxed">
                                            Trigger: {flag.trigger}
                                        </p>
                                    </div>
                                    <p className="text-sm text-text-secondary leading-relaxed pl-6">{flag.detail}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}