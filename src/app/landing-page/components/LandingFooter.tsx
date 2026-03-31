import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function LandingFooter() {
    return (
        <footer className="border-t border-border-subtle py-16">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2.5 mb-4">
                            <AppLogo size={32} />
                            <span className="font-semibold text-lg tracking-tight">
                                TrustLayer<span className="text-primary">AI</span>
                            </span>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-6">
                            A human safety layer for the AI internet. Helping students, freelancers, job seekers, and everyday users detect scams before they cost them.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            All analysis runs in real-time. No data stored.
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-4">Platform</div>
                        <div className="flex flex-col gap-2.5">
                            {[
                                { label: 'Analyze Content', href: '/analyze-content' },
                                { label: 'View Results', href: '/results-dashboard' },
                                { label: 'How It Works', href: '#how-it-works' },
                                { label: 'Scam Types', href: '#scam-types' },
                            ]?.map((link) => (
                                <Link
                                    key={`footer-platform-${link?.label}`}
                                    href={link?.href}
                                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
                                >
                                    {link?.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Safety */}
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-4">Safety Resources</div>
                        <div className="flex flex-col gap-2.5">
                            {[
                                { label: 'Cybercrime Portal India', href: '#' },
                                { label: 'RBI Fraud Reporting', href: '#' },
                                { label: 'TRAI SANCHARSAATHI', href: '#' },
                                { label: 'CERT-In Advisory', href: '#' },
                            ]?.map((link) => (
                                <a
                                    key={`footer-safety-${link?.label}`}
                                    href={link?.href}
                                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
                                >
                                    {link?.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-text-secondary">
                        © 2026 TrustLayer AI. Built for safer digital lives.
                    </p>
                    <div className="flex items-center gap-1 text-xs text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        <span>Hackathon MVP — March 2026</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}