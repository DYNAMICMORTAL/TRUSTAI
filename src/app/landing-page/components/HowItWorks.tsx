import React from 'react';
import { Upload, Cpu, FileText } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const steps = [
    {
        id: 'step-01',
        number: '01',
        icon: Upload,
        title: 'Submit Suspicious Content',
        description: 'Paste a suspicious message, upload a screenshot, or enter a URL you received. Supports emails, chat messages, payment confirmations, job offers, and more.',
        accent: 'text-primary',
        border: 'border-cyan-500/20',
        bg: 'bg-cyan-500/10',
    },
    {
        id: 'step-02',
        number: '02',
        icon: Cpu,
        title: 'AI Analyzes for Fraud Signals',
        description: 'Our dual-layer engine runs rule-based fraud signal detection and LLM reasoning simultaneously — checking for urgency manipulation, impersonation, payment bait, and 40+ other scam indicators.',
        accent: 'text-indigo-400',
        border: 'border-indigo-500/20',
        bg: 'bg-indigo-500/10',
    },
    {
        id: 'step-03',
        number: '03',
        icon: FileText,
        title: 'Receive Explainable Trust Report',
        description: 'Get a Risk Score (0–100), scam type classification, specific red flags with explanations, and concrete recommended actions — all in plain language you can act on immediately.',
        accent: 'text-emerald-400',
        border: 'border-emerald-500/20',
        bg: 'bg-emerald-500/10',
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-border text-text-secondary text-xs font-medium mb-6 uppercase tracking-wider">
                        How It Works
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight mb-4">
                        From suspicious to certain
                        <br />
                        <span className="text-text-secondary font-normal">in under 3 seconds</span>
                    </h2>
                    <p className="text-text-secondary text-lg leading-relaxed">
                        TrustLayer doesn't just classify — it explains. Every analysis includes the reasoning behind the verdict so you understand exactly what makes something dangerous.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
                    {steps?.map((step, index) => {
                        const Icon = step?.icon;
                        return (
                            <div
                                key={step?.id}
                                className={`card-surface p-8 relative overflow-hidden group hover:border-border transition-all duration-300`}
                            >
                                {/* Step number background */}
                                <div className="absolute top-4 right-6 text-7xl font-black text-text-primary/[0.03] font-mono select-none">
                                    {step?.number}
                                </div>
                                {/* Connector line */}
                                {index < steps?.length - 1 && (
                                    <div className="hidden md:block absolute top-12 -right-3 w-6 h-px bg-gradient-to-r from-white/10 to-transparent z-10" />
                                )}
                                <div className={`w-12 h-12 rounded-xl ${step?.bg} border ${step?.border} flex items-center justify-center mb-6`}>
                                    <Icon className={`w-6 h-6 ${step?.accent}`} />
                                </div>
                                <div className={`text-xs font-semibold uppercase tracking-widest ${step?.accent} mb-3`}>
                                    Step {step?.number}
                                </div>
                                <h3 className="text-xl font-semibold text-text-primary mb-3 leading-snug">
                                    {step?.title}
                                </h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    {step?.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}