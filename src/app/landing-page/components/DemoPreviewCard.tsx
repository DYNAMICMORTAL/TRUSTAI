import React from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, ShieldX } from 'lucide-react';

const redFlags = [
    { id: 'flag-payment', text: 'Payment demand for onboarding (₹499)', severity: 'critical' },
    { id: 'flag-urgency', text: 'Urgency manipulation — "confirm your slot"', severity: 'high' },
    { id: 'flag-reward', text: 'Reward bait — unsolicited shortlist claim', severity: 'high' },
    { id: 'flag-nodomain', text: 'No official company email or domain', severity: 'medium' },
    { id: 'flag-generic', text: 'Generic greeting, no recruiter name', severity: 'medium' },
];

const severityConfig = {
    critical: { dot: 'bg-red-500', text: 'text-red-400', bg: 'bg-red-500/8 border-red-500/20' },
    high: { dot: 'bg-orange-500', text: 'text-orange-400', bg: 'bg-orange-500/8 border-orange-500/20' },
    medium: { dot: 'bg-yellow-500', text: 'text-yellow-400', bg: 'bg-yellow-500/8 border-yellow-500/20' },
};

export default function DemoPreviewCard() {
    return (
        <section className="py-16 bg-black/[0.01] border-y border-border-subtle">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-16 items-center">
                    {/* Left: explanation */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-6 uppercase tracking-wider">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Live Analysis Preview
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight mb-5 leading-tight">
                            Not just "Scam or Safe" —
                            <br />
                            <span className="text-primary">we explain exactly why</span>
                        </h2>
                        <p className="text-text-secondary text-base leading-relaxed mb-8">
                            Generic spam filters give you a verdict. TrustLayer gives you the reasoning — specific manipulation tactics, suspicious language patterns, and missing legitimacy signals — so you can make your own informed decision.
                        </p>
                        <div className="flex flex-col gap-3 mb-8">
                            {[
                                'Urgency and pressure tactic detection',
                                'Payment and reward bait identification',
                                'Impersonation and authority spoofing',
                                'Domain and link anomaly analysis',
                                'AI-generated text pattern recognition',
                            ].map((feature) => (
                                <div key={`feature-${feature}`} className="flex items-center gap-3 text-sm text-text-primary">
                                    <div className="w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/analyze-content"
                            className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 text-text-primary font-semibold text-sm hover:bg-cyan-400 active:scale-95 transition-all duration-150"
                        >
                            Try It Free — No Signup
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                        </Link>
                    </div>

                    {/* Right: mock result card */}
                    <div className="card-surface p-6 shadow-sm shadow-red-500/20 ring-1 ring-red-500/30">
                        {/* Input preview */}
                        <div className="bg-card/60 rounded-xl p-4 mb-5 border border-border-subtle">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-border" />
                                <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">Analyzed Input</span>
                            </div>
                            <p className="text-sm text-text-primary italic leading-relaxed">
                                "Congratulations! You've been shortlisted for our paid remote internship at TechCorp. Pay ₹499 registration fee to confirm your onboarding. Limited slots available — respond within 2 hours."
                            </p>
                        </div>

                        {/* Score row */}
                        <div className="flex items-center justify-between mb-5 pb-5 border-b border-border-subtle">
                            <div>
                                <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Risk Score</div>
                                <div className="text-5xl font-black tabular-nums text-red-400 font-mono leading-none">94</div>
                                <div className="text-xs text-text-secondary mt-1">out of 100</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-text-secondary uppercase tracking-wider mb-2">Classification</div>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30">
                                    <ShieldX className="w-4 h-4 text-red-400" />
                                    <span className="text-sm font-semibold text-red-400">CRITICAL RISK</span>
                                </div>
                                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20">
                                    <span className="text-xs font-medium text-orange-400">Fake Internship Scam</span>
                                </div>
                            </div>
                        </div>

                        {/* Risk bar */}
                        <div className="mb-5">
                            <div className="flex items-center justify-between text-xs mb-2">
                                <span className="text-text-secondary">Risk Level</span>
                                <span className="text-red-400 font-medium">Extreme Danger</span>
                            </div>
                            <div className="w-full bg-card-elevated rounded-full h-2.5">
                                <div
                                    className="h-2.5 rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 transition-all duration-700"
                                    style={{ width: '94%' }}
                                />
                            </div>
                        </div>

                        {/* Red flags */}
                        <div>
                            <div className="text-xs text-text-secondary uppercase tracking-wider mb-3">
                                {redFlags.length} Red Flags Detected
                            </div>
                            <div className="flex flex-col gap-2">
                                {redFlags.map((flag) => {
                                    const config = severityConfig[flag.severity as keyof typeof severityConfig];
                                    return (
                                        <div
                                            key={flag.id}
                                            className={`flex items-start gap-2.5 px-3 py-2 rounded-lg border text-xs ${config.bg}`}
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full ${config.dot} mt-1 flex-shrink-0`} />
                                            <span className={`${config.text} font-medium leading-relaxed`}>{flag.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}