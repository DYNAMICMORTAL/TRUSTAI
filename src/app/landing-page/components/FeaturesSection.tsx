import React from 'react';
import { Brain, Layers, MessageSquare } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const features = [
    {
        id: 'feature-explainability',
        icon: Brain,
        iconBg: 'bg-cyan-500/10 border-cyan-500/20',
        iconColor: 'text-primary',
        tag: 'Explainability First',
        tagColor: 'text-primary bg-cyan-500/10 border-cyan-500/20',
        title: 'Not a black box. A transparent verdict.',
        description: "Every TrustLayer result tells you the 'why' — specific manipulation tactics, suspicious language patterns, and missing legitimacy signals. You're not just told it's dangerous, you understand it.",
        highlights: [
            'Named manipulation tactics (urgency, authority, reward bait)',
            'Specific suspicious phrases highlighted',
            'Missing legitimacy signals listed',
            'Confidence level for each red flag',
        ],
    },
    {
        id: 'feature-multiinput',
        icon: Layers,
        iconBg: 'bg-indigo-500/10 border-indigo-500/20',
        iconColor: 'text-indigo-400',
        tag: 'Multi-Input Analysis',
        tagColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
        title: 'Check anything suspicious, any format.',
        description: 'Scams arrive through every channel. TrustLayer accepts text, screenshots (with OCR extraction), and URLs — so you can check the WhatsApp message, the payment screenshot, and the suspicious link all in one place.',
        highlights: [
            'Plain text paste — emails, chats, SMS',
            'Screenshot upload with OCR text extraction',
            'URL risk analysis and domain inspection',
            'No file size limits on screenshots',
        ],
    },
    {
        id: 'feature-actions',
        icon: MessageSquare,
        iconBg: 'bg-emerald-500/10 border-emerald-500/20',
        iconColor: 'text-emerald-400',
        tag: 'Actionable Safety Guidance',
        tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        title: "Know exactly what to do next.",
        description: "The analysis doesn't end at the verdict. TrustLayer generates specific, context-aware recommended actions — tailored to the scam type detected — so you always know your next safe step.",
        highlights: [
            'Context-specific safety recommendations',
            'Official verification resource links',
            'Reporting and blocking guidance',
            'Steps to protect yourself if already exposed',
        ],
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-24 bg-black/[0.01] border-t border-border-subtle">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-border text-text-secondary text-xs font-medium mb-6 uppercase tracking-wider">
                        Platform Features
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight mb-4">
                        Built for the era where
                        <br />
                        <span className="text-primary">AI is used against you</span>
                    </h2>
                    <p className="text-text-secondary text-base leading-relaxed">
                        Traditional spam filters were built for the old internet. TrustLayer is purpose-built for 2026 — where scams are personalized, AI-generated, and virtually indistinguishable from legitimate communication.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
                    {features?.map((feature) => {
                        const Icon = feature?.icon;
                        return (
                            <div key={feature?.id} className="card-surface p-8 group hover:border-border transition-all duration-300">
                                <div className={`w-12 h-12 rounded-xl ${feature?.iconBg} border flex items-center justify-center mb-6`}>
                                    <Icon className={`w-6 h-6 ${feature?.iconColor}`} />
                                </div>
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium mb-4 ${feature?.tagColor}`}>
                                    {feature?.tag}
                                </div>
                                <h3 className="text-xl font-semibold text-text-primary mb-3 leading-snug">
                                    {feature?.title}
                                </h3>
                                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                                    {feature?.description}
                                </p>
                                <div className="flex flex-col gap-2.5">
                                    {feature?.highlights?.map((highlight) => (
                                        <div key={`${feature?.id}-hl-${highlight?.slice(0, 20)}`} className="flex items-start gap-2.5 text-sm text-text-primary">
                                            <div className="w-4 h-4 rounded-full bg-black/5 border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                                            </div>
                                            {highlight}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}