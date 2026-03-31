import React from 'react';
import Link from 'next/link';
import { Shield, ArrowRight } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="py-24 border-t border-border-subtle">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-background via-zinc-900 to-zinc-800 border border-black/8 p-12 md:p-16 text-center">
                    {/* Background glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-indigo-500/6 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-primary text-xs font-medium mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            Free to use · No account required
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Before you trust it,
                            <br />
                            <span className="text-primary">scan it.</span>
                        </h2>

                        <p className="text-text-secondary text-lg leading-relaxed max-w-xl mx-auto mb-10">
                            One suspicious message, screenshot, or link is all it takes. TrustLayer gives you clarity in seconds — so you can act with confidence.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/analyze-content"
                                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-cyan-500 text-text-primary font-semibold text-base hover:bg-cyan-400 active:scale-95 transition-all duration-150 shadow-sm shadow-cyan-500/30"
                            >
                                <Shield className="w-5 h-5" />
                                Analyze Now — It's Free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary">
                            {['No signup required', 'No data stored', 'Results in under 3 seconds', 'Works on any device']?.map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-border" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
