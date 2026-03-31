'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Link2, Image as ImageIcon } from 'lucide-react';
import { loadAnalysisResult, loadRawContent, type AnalysisResult } from '@/lib/analysisEngine';

function HighlightedText({ text, phrases }: { text: string; phrases: { phrase: string; color: string }[] }) {
    if (!phrases?.length) return <span>{text}</span>;

    const parts: { text: string; highlighted: boolean; color?: string }[] = [];
    let remaining = text;

    const sorted = [...phrases].sort((a, b) => {
        const idxA = text.toLowerCase().indexOf(a.phrase.toLowerCase());
        const idxB = text.toLowerCase().indexOf(b.phrase.toLowerCase());
        return idxA - idxB;
    });

    for (const { phrase, color } of sorted) {
        const idx = remaining.toLowerCase().indexOf(phrase.toLowerCase());
        if (idx === -1) continue;
        if (idx > 0) parts.push({ text: remaining.slice(0, idx), highlighted: false });
        parts.push({ text: remaining.slice(idx, idx + phrase.length), highlighted: true, color });
        remaining = remaining.slice(idx + phrase.length);
    }
    if (remaining) parts.push({ text: remaining, highlighted: false });

    return (
        <span>
            {parts.map((part, i) =>
                part.highlighted ? (
                    <span key={i} className={part.color}>{part.text}</span>
                ) : (
                    <span key={i}>{part.text}</span>
                )
            )}
        </span>
    );
}

export default function InputPreviewPanel() {
    const [expanded, setExpanded] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [rawContent, setRawContent] = useState('');

    useEffect(() => {
        const loaded = loadAnalysisResult();
        const raw = loadRawContent();
        if (loaded) setResult(loaded);
        if (raw) setRawContent(raw);
    }, []);

    const inputType = result?.inputType || 'text';
    const preview = rawContent || result?.inputPreview || "Congratulations! You've been shortlisted for our paid remote internship at TechVentures Pvt Ltd. Pay ₹499 registration fee to confirm your onboarding slot.";
    const phrases = result?.highlightedPhrases || [];

    const typeIcon = inputType === 'url' ? Link2 : inputType === 'screenshot' ? ImageIcon : FileText;
    const TypeIcon = typeIcon;
    const typeLabel = inputType === 'url' ? 'URL input' : inputType === 'screenshot' ? 'Screenshot input' : 'Text input';

    return (
        <div className="card-surface overflow-hidden">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-black/[0.03] transition-colors duration-150"
            >
                <div className="flex items-center gap-2.5">
                    <TypeIcon className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm font-medium text-text-primary">Analyzed Content</span>
                    <span className="text-xs text-text-secondary font-mono">{preview.length} chars · {typeLabel}</span>
                </div>
                {expanded ? (
                    <ChevronUp className="w-4 h-4 text-text-secondary" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-text-secondary" />
                )}
            </button>

            {expanded && (
                <div className="px-5 pb-5 animate-fade-in">
                    <div className="bg-card/60 rounded-xl p-4 border border-border-subtle">
                        <p className="text-sm text-text-primary leading-relaxed italic break-words">
                            <HighlightedText text={preview} phrases={phrases} />
                        </p>
                    </div>
                    {phrases.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-sm bg-red-500/25 border border-red-500/30 inline-block" />
                                Critical trigger phrase
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-sm bg-orange-500/25 border border-orange-500/30 inline-block" />
                                Urgency manipulation
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-sm bg-yellow-500/25 border border-yellow-500/30 inline-block" />
                                Reward bait language
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}