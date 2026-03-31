'use client';

import React, { useEffect, useState } from 'react';

interface AnalysisLoaderProps {
    onComplete: () => void;
}

const stages = [
    { id: 1, label: 'Scanning content for suspicious patterns...', sublabel: 'Extracting text signals and metadata', duration: 700 },
    { id: 2, label: 'Detecting urgency and manipulation tactics...', sublabel: 'Checking for psychological pressure patterns', duration: 800 },
    { id: 3, label: 'Checking identity and trust signals...', sublabel: 'Verifying sender legitimacy indicators', duration: 750 },
    { id: 4, label: 'Analyzing financial and phishing risk...', sublabel: 'Cross-referencing known fraud patterns', duration: 800 },
    { id: 5, label: 'Generating your Trust Report...', sublabel: 'Compiling findings and recommendations', duration: 600 },
];

export default function AnalysisLoader({ onComplete }: AnalysisLoaderProps) {
    const [currentStage, setCurrentStage] = useState(0);
    const [completedStages, setCompletedStages] = useState<number[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let stageIndex = 0;
        let totalElapsed = 0;
        const totalDuration = stages.reduce((sum, s) => sum + s.duration, 0);

        const runStage = () => {
            if (stageIndex >= stages.length) {
                setProgress(100);
                setTimeout(onComplete, 300);
                return;
            }

            setCurrentStage(stageIndex);
            const stage = stages[stageIndex];

            // Animate progress for this stage
            const startProgress = (totalElapsed / totalDuration) * 100;
            const endProgress = ((totalElapsed + stage.duration) / totalDuration) * 100;
            const steps = 20;
            const stepDuration = stage.duration / steps;
            let step = 0;

            const progressInterval = setInterval(() => {
                step++;
                const p = startProgress + ((endProgress - startProgress) * step) / steps;
                setProgress(Math.min(p, 99));
                if (step >= steps) clearInterval(progressInterval);
            }, stepDuration);

            setTimeout(() => {
                setCompletedStages(prev => [...prev, stageIndex]);
                totalElapsed += stage.duration;
                stageIndex++;
                runStage();
            }, stage.duration);
        };

        runStage();
    }, [onComplete]);

    return (
        <div className="relative w-full overflow-hidden flex flex-col items-center justify-center p-8">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/4 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-lg mx-auto px-6 flex flex-col items-center">
                {/* Animated radar / orbit loader */}
                <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border border-cyan-500/15 animate-spin-slow" />
                    {/* Middle ring */}
                    <div className="absolute inset-3 rounded-full border border-cyan-500/20" style={{ animation: 'spin 2s linear infinite reverse' }} />
                    {/* Inner ring */}
                    <div className="absolute inset-6 rounded-full border border-cyan-500/30 animate-spin-slow" />
                    {/* Scanning dot */}
                    <div
                        className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                        style={{
                            top: '50%',
                            left: '50%',
                            transformOrigin: '-28px 0',
                            animation: 'spin 1.5s linear infinite',
                            marginTop: '-5px',
                            marginLeft: '-5px',
                        }}
                    />
                    {/* Center pulse */}
                    <div className="relative w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-cyan-500/40 animate-pulse" />
                    </div>
                    {/* Pulse rings */}
                    <div className="absolute inset-0 rounded-full border border-cyan-500/10 animate-ping" style={{ animationDuration: '2s' }} />
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                    <h2 className="text-xl font-semibold text-text-primary mb-2">Analyzing Trust Signals</h2>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
                        We're checking common scam signals and trust patterns to surface why something feels suspicious.
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-full mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-text-secondary">Analysis progress</span>
                        <span className="text-xs font-mono text-primary tabular-nums">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-card-elevated rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Stage list */}
                <div className="w-full flex flex-col gap-3">
                    {stages.map((stage, index) => {
                        const isCompleted = completedStages.includes(index);
                        const isCurrent = currentStage === index && !isCompleted;
                        const isPending = index > currentStage;

                        return (
                            <div
                                key={stage.id}
                                className={`flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isCurrent
                                        ? 'bg-cyan-500/8 border border-cyan-500/20'
                                        : isCompleted
                                            ? 'bg-black/[0.02] border border-border-subtle'
                                            : 'opacity-40'
                                    }`}
                            >
                                {/* Status indicator */}
                                <div className="flex-shrink-0 mt-0.5">
                                    {isCompleted ? (
                                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    ) : isCurrent ? (
                                        <div className="w-5 h-5 rounded-full border-2 border-cyan-500/60 border-t-cyan-400 animate-spin" />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border border-border" />
                                    )}
                                </div>

                                {/* Stage text */}
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium leading-snug ${isCurrent ? 'text-cyan-300' : isCompleted ? 'text-text-secondary' : 'text-text-secondary'
                                        }`}>
                                        {stage.label}
                                    </p>
                                    {isCurrent && (
                                        <p className="text-xs text-text-secondary mt-0.5 animate-fade-in">
                                            {stage.sublabel}
                                        </p>
                                    )}
                                </div>

                                {/* Step number */}
                                <span className={`text-xs font-mono flex-shrink-0 mt-0.5 ${isCurrent ? 'text-primary' : isCompleted ? 'text-text-secondary' : 'text-text-secondary'
                                    }`}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Reassurance text */}
                <p className="mt-8 text-xs text-text-secondary text-center leading-relaxed">
                    This helps surface why something feels suspicious — no data is stored or transmitted.
                </p>
            </div>
        </div>
    );
}
