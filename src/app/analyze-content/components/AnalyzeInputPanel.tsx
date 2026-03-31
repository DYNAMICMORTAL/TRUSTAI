'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
    Paperclip,
    ArrowUp,
    X,
    Sparkles,
    Image as ImageIcon
} from 'lucide-react';
import AnalysisLoader from '@/components/AnalysisLoader';
import { analyzeContent, saveAnalysisResult } from '@/lib/analysisEngine';

type TabType = 'text' | 'screenshot' | 'url';

const demoScenarios = [
    {
        id: 'demo-internship',
        emoji: '💼',
        label: 'Fake Internship Scam',
        type: 'text' as const,
        content: "Congratulations! You've been shortlisted for our paid remote internship at TechVentures Pvt Ltd. Pay ₹499 registration fee to confirm your onboarding slot. Limited seats — respond within 2 hours. WhatsApp: +91-9876543210",
        hint: 'Registration fee fraud',
    },
    {
        id: 'demo-kyc',
        emoji: '🏦',
        label: 'Bank KYC Scam',
        type: 'text' as const,
        content: "URGENT: Your HDFC Bank account will be suspended in 30 minutes due to incomplete KYC. Click here to verify immediately: http://hdfc-kyc-verify-now.in/update or call our helpline 1800-XXX-XXXX. Failure to comply will result in account freeze.",
        hint: 'Account suspension threat',
    },
    {
        id: 'demo-prize',
        emoji: '🎁',
        label: 'Prize Scam',
        type: 'text' as const,
        content: "🎉 WINNER ALERT! You have won an Apple iPhone 15 Pro in our Diwali Lucky Draw! To claim your prize, pay ₹199 delivery charges to: UPI ID: prize.claim2026@paytm. Offer valid for 24 hours only. Claim code: LUCKY-2026-WIN",
        hint: 'Fake lottery demand',
    },
    {
        id: 'demo-url',
        emoji: '🔗',
        label: 'Suspicious URL',
        type: 'url' as const,
        content: "amaz0n-pay-support-verification-login.in/account/verify?ref=urgent&token=abc123",
        hint: 'Typosquatted phishing link',
    },
    {
        id: 'ss-payment',
        emoji: '📸',
        label: 'Fake Payment Screenshot',
        type: 'screenshot' as const,
        content: "",
        hint: 'Analyze payment proof',
    }
];

interface AnalyzeInputPanelProps {
    initialTab?: TabType;
    initialContent?: string;
}

export default function AnalyzeInputPanel({ initialTab, initialContent }: AnalyzeInputPanelProps) {
    const router = useRouter();
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    
    // Unified Input State
    const [inputValue, setInputValue] = useState(initialContent || '');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);
    const [selectedScreenshotScenario, setSelectedScreenshotScenario] = useState<string>('ss-payment');
    const [isDragOver, setIsDragOver] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 250)}px`;
        }
    }, [inputValue]);

    const handlePresetSelect = useCallback((scenario: typeof demoScenarios[0]) => {
        if (scenario.type === 'screenshot') {
            toast.success('Screenshot demo loaded. Click Analyze Now to proceed.', { duration: 2500 });
            setUploadedFile(new File([''], 'demo-screenshot.png', { type: 'image/png' }));
            setUploadPreview('https://placehold.co/600x400/eeeeee/999999?text=Pending+Payment+Screenshot');
            setSelectedScreenshotScenario(scenario.id);
            setInputValue('');
        } else {
            setInputValue(scenario.content);
            clearFile();
            toast.success('Demo scenario loaded. Click Analyze to investigate.', { duration: 2500 });
            
            // Focus and push cursor to end
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                    textareaRef.current.setSelectionRange(scenario.content.length, scenario.content.length);
                }
            }, 10);
        }
    }, []);

    const handleFileChange = (file: File | null) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file (JPG, PNG, WebP)');
            return;
        }
        setUploadedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setUploadPreview(e.target?.result as string);
        reader.readAsDataURL(file);
        toast.success('Screenshot attached');
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        handleFileChange(file);
    }, []);

    const clearFile = () => {
        setUploadedFile(null);
        setUploadPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleAnalyze = () => {
        if (!inputValue.trim() && !uploadedFile) {
            toast.error('Please provide text, a URL, or an image to analyze');
            return;
        }
        setIsAnalyzing(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAnalyze();
        }
    };

    const handleAnalysisComplete = () => {
        // Auto-detect type
        let type: TabType = 'text';
        if (uploadedFile) type = 'screenshot';
        else if (/^(https?:\/\/|[\w-]+\.\w+(\/|$))/.test(inputValue.trim()) && !inputValue.trim().includes(' ')) {
            type = 'url';
        }

        const content = type === 'screenshot' 
            ? (selectedScreenshotScenario ? (demoScenarios.find(s => s.id === selectedScreenshotScenario)?.label || 'payment screenshot') : 'Uploaded Screenshot')
            : inputValue;

        const result = analyzeContent({
            type,
            content,
            screenshotScenario: selectedScreenshotScenario,
        });

        saveAnalysisResult(result, content);
        router.push('/results-dashboard');
    };

    if (isAnalyzing) {
        return (
            <div className="card-surface p-8 animate-fade-in border-cyan-500/30">
                <AnalysisLoader onComplete={handleAnalysisComplete} />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 mt-[10vh] animate-fade-in">
            {/* Header / Intro */}
            <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-6">
                    <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-semibold text-text-primary mb-3">How can I help you stay safe today?</h2>
                <p className="text-text-secondary text-base max-w-lg">
                    Paste any suspicious message, upload a screenshot, or share a risky URL. I'll analyze it for fraud patterns.
                </p>
            </div>

            {/* Starter Prompts */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl mx-auto mt-4 px-2">
                {demoScenarios.slice(0, 5).map((scenario) => (
                    <button
                        key={scenario.id}
                        onClick={() => handlePresetSelect(scenario)}
                        className="flex flex-col items-start gap-1 p-3.5 rounded-2xl bg-card border border-border-subtle hover:bg-black/[0.02] hover:border-border transition-all text-left group active:scale-[0.98]"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-base">{scenario.emoji}</span>
                            <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">{scenario.label}</span>
                        </div>
                        <span className="text-xs text-text-secondary line-clamp-1">{scenario.hint}</span>
                    </button>
                ))}
            </div>

            {/* Chat Input Container */}
            <div 
                className={`card-surface rounded-[1.5rem] shadow-sm flex flex-col transition-colors border ${isDragOver ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : 'border-border focus-within:border-border focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.06)]'}`}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
            >
                {/* Upload Preview Area */}
                {uploadPreview && (
                    <div className="px-4 pt-4 pb-0">
                        <div className="relative inline-block w-20 h-20 rounded-xl overflow-hidden border border-border-subtle group">
                            <img src={uploadPreview} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button 
                                    onClick={clearFile}
                                    className="p-1.5 bg-background rounded-full hover:scale-110 transition-transform"
                                >
                                    <X className="w-4 h-4 text-text-primary" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-end px-3 py-3 w-full relative">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                    />
                    
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2.5 text-text-secondary hover:text-text-primary hover:bg-black/5 rounded-full transition-colors flex-shrink-0 mb-0.5"
                        title="Attach a screenshot"
                    >
                        <Paperclip className="w-5 h-5" />
                    </button>

                    <textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={uploadedFile ? "Add an optional message about this screenshot..." : "Message TrustLayer or paste a suspicious link..."}
                        className="w-full bg-transparent border-none outline-none resize-none px-3 py-2.5 max-h-[250px] min-h-[44px] text-[15px] text-text-primary placeholder:text-text-secondary placeholder:font-normal leading-relaxed"
                        style={{ overflowY: 'auto' }}
                    />

                    <button
                        onClick={handleAnalyze}
                        disabled={!inputValue.trim() && !uploadedFile}
                        className={`p-2.5 rounded-full flex-shrink-0 ml-2 mb-0.5 transition-all ${(!inputValue.trim() && !uploadedFile) ? 'bg-black/5 text-text-secondary cursor-not-allowed opacity-50' : 'bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-sm'}`}
                        title="Analyze Content"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </button>
                </div>
            </div>
            
            <p className="text-xs text-text-secondary text-center mt-[-1rem]">
                TrustLayer AI checks for scam signals immediately. No data is stored on our servers.
            </p>
        </div>
    );
}