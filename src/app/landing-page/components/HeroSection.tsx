import React from 'react';
import Link from 'next/link';
import { Shield, ArrowRight, Eye, Zap } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-[92vh] flex items-center overflow-hidden">
            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `linear-gradient(hsl(189 94% 43%) 1px, transparent 1px), linear-gradient(90deg, hsl(189 94% 43%) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />
            {/* Glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/4 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-red-500/3 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-24 w-full">
                <div className="max-w-4xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-primary text-xs font-medium mb-8 animate-slide-up">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        AI-Powered Scam Detection — Updated for 2026 Threat Landscape
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6 animate-slide-up" style={{ animationDelay: '0.05s' }}>
                        A Human Safety Layer
                        <br />
                        <span className="text-primary">for the AI Internet</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Before you click, pay, trust, or reply —{' '}
                        <span className="text-text-primary font-medium">TrustLayer checks first.</span>
                        {' '}Paste suspicious messages, upload screenshots, or check URLs.
                        Get an instant AI risk report with explainable red flags.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.15s' }}>
                        <Link
                            href="/analyze-content"
                            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-cyan-500 text-text-primary font-semibold text-base hover:bg-cyan-400 active:scale-95 transition-all duration-150 shadow-sm shadow-cyan-500/30"
                        >
                            <Shield className="w-5 h-5" />
                            Analyze Suspicious Content
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                        </Link>
                        <a
                            href="#how-it-works"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border text-text-primary font-medium text-base hover:bg-black/5 hover:text-text-primary hover:border-border active:scale-95 transition-all duration-150"
                        >
                            <Eye className="w-5 h-5" />
                            See How It Works
                        </a>
                    </div>

                    {/* Trust signals */}
                    <div className="flex flex-wrap items-center gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        {[
                            { icon: '🔒', label: 'No data stored' },
                            { icon: '⚡', label: 'Results in under 3 seconds' },
                            { icon: '🧠', label: 'AI + rule-based analysis' },
                            { icon: '🌐', label: 'Detects 8+ scam types' },
                        ]?.map((item) => (
                            <div key={`trust-${item?.label}`} className="flex items-center gap-2 text-sm text-text-secondary">
                                <span>{item?.icon}</span>
                                <span>{item?.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating alert card */}
                <div className="absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 hidden xl:block animate-slide-up" style={{ animationDelay: '0.25s' }}>
                    <div className="w-80 card-surface p-5 shadow-sm shadow-red-500/20 ring-1 ring-red-500/30">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-xs font-medium text-red-400 uppercase tracking-wider">High Risk Detected</span>
                            </div>
                            <span className="text-xs text-text-secondary font-mono">2s ago</span>
                        </div>
                        <div className="bg-card rounded-lg p-3 mb-4 border border-border-subtle">
                            <p className="text-xs text-text-secondary italic leading-relaxed">
                                "Congratulations! You've been shortlisted for a remote internship. Pay ₹499 to confirm your onboarding slot."
                            </p>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-text-secondary">Risk Score</span>
                            <span className="text-2xl font-bold text-red-400 tabular-nums font-mono">94/100</span>
                        </div>
                        <div className="w-full bg-card-elevated rounded-full h-2 mb-4">
                            <div className="h-2 rounded-full bg-gradient-to-r from-red-500 to-red-400" style={{ width: '94%' }} />
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20">
                            <Zap className="w-3.5 h-3.5 text-red-400" />
                            <span className="text-xs font-medium text-red-400">Fake Job / Internship Scam</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border-subtle">
                            <p className="text-xs text-text-secondary mb-2 font-medium uppercase tracking-wider">Red Flags Detected</p>
                            <div className="flex flex-col gap-1.5">
                                {[
                                    'Payment demand for onboarding',
                                    'Urgency pressure tactics',
                                    'No official company domain',
                                ]?.map((flag) => (
                                    <div key={`hero-flag-${flag}`} className="flex items-start gap-2 text-xs text-text-secondary">
                                        <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                                        {flag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}