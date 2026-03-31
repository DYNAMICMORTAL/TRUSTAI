import React from 'react';
import Link from 'next/link';
import { ShieldX, ShieldCheck, ShieldAlert, Clock, ChevronRight } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const recentAnalyses = [
    {
        id: 'analysis-r001',
        type: 'text',
        snippet: '"Pay ₹499 to confirm your internship onboarding slot..."',
        scamType: 'Fake Internship Scam',
        riskScore: 94,
        riskLevel: 'critical',
        timeAgo: '12 min ago',
    },
    {
        id: 'analysis-r002',
        type: 'url',
        snippet: 'hdfc-kyc-verify-now.in/account/update',
        scamType: 'Phishing URL',
        riskScore: 88,
        riskLevel: 'critical',
        timeAgo: '34 min ago',
    },
    {
        id: 'analysis-r003',
        type: 'screenshot',
        snippet: 'Screenshot: Payment confirmation for ₹15,000',
        scamType: 'Payment Screenshot Fraud',
        riskScore: 71,
        riskLevel: 'high',
        timeAgo: '1 hr ago',
    },
    {
        id: 'analysis-r004',
        type: 'text',
        snippet: '"Your Amazon Prime subscription has been renewed..."',
        scamType: 'Support Impersonation',
        riskScore: 22,
        riskLevel: 'low',
        timeAgo: '2 hr ago',
    },
];

const riskConfig = {
    critical: {
        icon: ShieldX,
        color: 'text-red-400',
        bg: 'bg-red-500/10 border-red-500/20',
        dot: 'bg-red-500',
        label: 'Critical',
    },
    high: {
        icon: ShieldAlert,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10 border-orange-500/20',
        dot: 'bg-orange-500',
        label: 'High Risk',
    },
    low: {
        icon: ShieldCheck,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/20',
        dot: 'bg-emerald-500',
        label: 'Low Risk',
    },
};

const typeLabel = {
    text: '📝 Text',
    url: '🔗 URL',
    screenshot: '🖼 Screenshot',
};

export default function RecentAnalysesSidebar() {
    return (
        <div className="flex flex-col gap-4">
            {/* Tips card */}
            <div className="card-surface p-5">
                <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
                    Detection Tips
                </div>
                <div className="flex flex-col gap-3">
                    {[
                        { emoji: '⚡', tip: 'Urgency language like "within 2 hours" is a major red flag' },
                        { emoji: '💸', tip: 'Legitimate companies never charge for onboarding or interviews' },
                        { emoji: '🔗', tip: 'Check if the URL domain matches the company\'s official website' },
                        { emoji: '📞', tip: 'Real bank support never asks for OTPs over the phone' },
                        { emoji: '🎁', tip: 'Unsolicited prize wins almost always require a fee — it\'s a scam' },
                    ].map((item) => (
                        <div key={`tip-${item.emoji}`} className="flex items-start gap-2.5">
                            <span className="text-base flex-shrink-0 mt-0.5">{item.emoji}</span>
                            <p className="text-xs text-text-secondary leading-relaxed">{item.tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent analyses */}
            <div className="card-surface overflow-hidden">
                <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm font-semibold text-text-primary">Recent Analyses</span>
                    </div>
                    <span className="text-xs text-text-secondary">{recentAnalyses.length} items</span>
                </div>
                <div className="divide-y divide-white/5">
                    {recentAnalyses.map((analysis) => {
                        const config = riskConfig[analysis.riskLevel as keyof typeof riskConfig];
                        const Icon = config.icon;
                        return (
                            <Link
                                key={analysis.id}
                                href="/results-dashboard"
                                className="flex items-start gap-3 px-5 py-4 hover:bg-black/[3] transition-colors duration-150 group"
                            >
                                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 ${config.bg}`}>
                                    <Icon className={`w-4 h-4 ${config.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <span className="text-xs font-medium text-text-secondary truncate">{analysis.scamType}</span>
                                        <span className={`text-xs font-bold tabular-nums font-mono flex-shrink-0 ${config.color}`}>
                                            {analysis.riskScore}
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-secondary truncate mb-1.5 leading-snug italic">
                                        {analysis.snippet}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-text-secondary">{typeLabel[analysis.type as keyof typeof typeLabel]}</span>
                                        <span className="text-text-secondary">·</span>
                                        <span className="text-xs text-text-secondary">{analysis.timeAgo}</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-text-secondary group-hover:text-text-secondary flex-shrink-0 mt-1 transition-colors duration-150" />
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Safety resources */}
            <div className="card-surface p-5">
                <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
                    Report a Scam
                </div>
                <div className="flex flex-col gap-2">
                    {[
                        { name: 'Cybercrime Portal India', url: 'https://cybercrime.gov.in', badge: '🇮🇳' },
                        { name: 'TRAI SANCHARSAATHI', url: '#', badge: '📱' },
                        { name: 'RBI Sachet Portal', url: '#', badge: '🏦' },
                    ].map((resource) => (
                        <a
                            key={`resource-${resource.name}`}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-black/[3] border border-border-subtle hover:bg-black/[6] hover:border-border transition-all duration-150 group"
                        >
                            <span className="text-sm">{resource.badge}</span>
                            <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors duration-150 flex-1">
                                {resource.name}
                            </span>
                            <ChevronRight className="w-3 h-3 text-text-secondary group-hover:text-text-secondary transition-colors duration-150" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}