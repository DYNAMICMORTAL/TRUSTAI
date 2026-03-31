'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, ExternalLink, Phone, Flag, Lock, Eye, ShieldX } from 'lucide-react';
import { loadAnalysisResult, type RecommendedAction } from '@/lib/analysisEngine';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    ShieldX,
    ShieldCheck,
    Eye,
    Flag,
    Lock,
    Phone,
    ExternalLink,
};

const priorityConfig = {
    immediate: { badge: 'bg-red-500/10 border-red-500/20 text-red-400', label: 'Act Immediately' },
    recommended: { badge: 'bg-cyan-500/10 border-cyan-500/20 text-primary', label: 'Recommended' },
    'urgent-if-paid': { badge: 'bg-orange-500/10 border-orange-500/20 text-orange-400', label: 'If Already Paid' },
};

const defaultActions: RecommendedAction[] = [
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
        description: 'Block the sender on WhatsApp, SMS, or email. Report as spam to prevent further contact and protect other users.',
        cta: null,
        ctaLabel: null,
    },
    {
        id: 'action-report',
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

export default function RecommendedActions() {
    const [actions, setActions] = useState<RecommendedAction[]>(defaultActions);

    useEffect(() => {
        const result = loadAnalysisResult();
        if (result?.recommendedActions?.length) {
            setActions(result.recommendedActions);
        }
    }, []);

    return (
        <div className="card-surface overflow-hidden">
            <div className="px-6 py-5 border-b border-border-subtle">
                <h2 className="text-base font-semibold text-text-primary mb-1">What You Should Do Next</h2>
                <p className="text-xs text-text-secondary">Context-specific safety steps based on the scam type detected</p>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {actions.map((action) => {
                    const ActionIcon = iconMap[action.iconName] || ShieldCheck;
                    const pConfig = priorityConfig[action.priority as keyof typeof priorityConfig];
                    return (
                        <div
                            key={action.id}
                            className="card-elevated p-4 flex flex-col gap-3 hover:border-black/15 transition-all duration-200"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${action.iconBg}`}>
                                    <ActionIcon className={`w-4 h-4 ${action.iconColor}`} />
                                </div>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${pConfig?.badge || 'bg-zinc-500/10 border-zinc-500/20 text-text-secondary'}`}>
                                    {pConfig?.label || 'Recommended'}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-text-primary mb-1.5 leading-snug">{action.title}</h3>
                                <p className="text-xs text-text-secondary leading-relaxed">{action.description}</p>
                            </div>
                            {action.cta && (
                                <div className="mt-4 pt-3 border-t border-border-subtle/50">
                                    <a
                                        href={action.cta}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary hover:bg-cyan-600 active:scale-[0.98] text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-cyan-500/20"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        {action.ctaLabel || 'Take Action'}
                                    </a>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}