import React from 'react';
import Link from 'next/link';
import { Shield, ArrowRight } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="py-24 bg-background">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
                <div className="relative rounded-[2.5rem] overflow-hidden bg-white border border-border p-12 md:p-20 text-center shadow-sm">
                    {/* Background glow highlights */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Free to use · No account required
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-text-primary max-w-2xl">
                            Before you trust it,{' '}
                            <span className="text-primary italic">scan it.</span>
                        </h2>

                        <p className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
                            One suspicious message, screenshot, or link is all it takes. <br className="hidden sm:block" />
                            TrustLayer gives you clarity in seconds — <span className="font-medium text-text-primary">so you can act with confidence.</span>
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/analyze-content"
                                className="group flex items-center gap-3 px-10 py-5 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-xl shadow-primary/20"
                            >
                                <Shield className="w-6 h-6" />
                                Analyze Now — It's Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        </div>

                        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-text-secondary opacity-70">
                            {['No signup required', 'No data stored', 'Results in under 3 seconds', 'Works on any device']?.map((item) => (
                                <div key={item} className="flex items-center gap-2.5">
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
