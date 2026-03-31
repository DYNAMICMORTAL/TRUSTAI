import React from 'react';
import Link from 'next/link';
import { Shield, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-16">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-500/5 blur-[100px] rounded-full" />
                <div 
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="relative max-w-screen-xl mx-auto px-6 py-20 flex flex-col items-center text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-10 animate-slide-up shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Free to use · No account required
                </div>

                {/* Headline */}
                <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-8 animate-slide-up text-text-primary max-w-4xl" style={{ animationDelay: '0.05s' }}>
                    Before you trust it,{' '}
                    <span className="text-primary italic">scan it.</span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    One suspicious message, screenshot, or link is all it takes. <br className="hidden sm:block" />
                    TrustLayer gives you clarity in seconds — <span className="font-medium text-text-primary">so you can act with confidence.</span>
                </p>

                {/* Main CTA */}
                <div className="flex flex-col items-center gap-6 animate-slide-up" style={{ animationDelay: '0.15s' }}>
                    <Link
                        href="/analyze-content"
                        className="group flex items-center gap-3 px-8 py-4.5 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-xl shadow-primary/20"
                    >
                        <Shield className="w-6 h-6" />
                        Analyze Now — It's Free
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>

                    {/* Trust signals list */}
                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mt-4">
                        {[
                            'No signup required',
                            'No data stored',
                            'Results in under 3 seconds',
                            'Works on any device',
                        ]?.map((label) => (
                            <div key={`hero-signal-${label}`} className="flex items-center gap-2 text-sm text-text-secondary">
                                <span className="w-1 h-1 rounded-full bg-border" />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive preview element (simplistic version of screenshot) */}
                <div className="mt-20 w-full max-w-5xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="relative rounded-[2rem] p-1 bg-white/20 border border-border/50 shadow-2xl overflow-hidden backdrop-blur-sm group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-indigo-500/5" />
                        <div className="relative card-surface border-none rounded-[1.8rem] overflow-hidden bg-white/80">
                           {/* Simplified Visual Representation of the "Trust Dashboard" UI in Hero */}
                           <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-border/40">
                               <div className="md:col-span-8 p-10 bg-white">
                                   <div className="flex items-center gap-3 mb-8">
                                       <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                           <Zap className="w-5 h-5 text-red-500" />
                                       </div>
                                       <div>
                                           <h3 className="text-lg font-bold text-text-primary">Analysis Result</h3>
                                           <p className="text-xs text-text-secondary">High Risk Detected • Fraud Signals Found</p>
                                       </div>
                                   </div>
                                   <div className="bg-black/[0.02] rounded-2xl p-6 border border-border-subtle mb-6">
                                       <p className="text-sm text-text-secondary italic">"Your HDFC account will be suspended in 30 minutes. Verify KYC immediately at hdfc-kyc-secure.com"</p>
                                   </div>
                                   <div className="flex flex-wrap gap-2">
                                       {['Urgency Tactics', 'Phishing Domain', 'Identity Impersonation'].map(tag => (
                                           <span key={tag} className="px-3 py-1 rounded-full bg-red-50 text-[10px] font-bold text-red-600 border border-red-100 uppercase tracking-wider">{tag}</span>
                                       ))}
                                   </div>
                               </div>
                               <div className="md:col-span-4 p-10 bg-white md:border-l border-border/40 flex flex-col justify-center items-center">
                                   <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
                                       <svg className="w-full h-full rotate-[-90deg]">
                                           <circle cx="64" cy="64" r="58" fill="none" stroke="hsl(var(--border-subtle))" strokeWidth="8" />
                                           <circle cx="64" cy="64" r="58" fill="none" stroke="hsl(var(--danger))" strokeWidth="8" strokeDasharray="364.4" strokeDashoffset="36.4" strokeLinecap="round" />
                                       </svg>
                                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                                           <span className="text-3xl font-black text-text-primary">90</span>
                                           <span className="text-[10px] font-bold text-red-500 uppercase">Risk</span>
                                       </div>
                                   </div>
                                   <div className="text-center group-hover:scale-110 transition-transform duration-500">
                                       <p className="text-sm font-bold text-red-600">Scam Highly Likely</p>
                                       <p className="text-[10px] text-text-secondary">AI Confidence: 98%</p>
                                   </div>
                               </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}