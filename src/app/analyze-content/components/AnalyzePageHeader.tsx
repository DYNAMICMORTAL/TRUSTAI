import React from 'react';
import { Shield, Info } from 'lucide-react';

export default function AnalyzePageHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Analyze Suspicious Content</h1>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                    Paste text, upload a screenshot, or enter a URL. Get an instant AI risk report with explained red flags.
                </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/[0.03] border border-black/8 text-xs text-text-secondary shrink-0">
                <Info className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>No data stored · Analysis runs in real-time</span>
            </div>
        </div>
    );
}