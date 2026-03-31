import React from 'react';
import AppLayout from '@/components/AppLayout';
import ResultHeader from './components/ResultHeader';
import RiskScorePanel from './components/RiskScorePanel';
import RedFlagsPanel from './components/RedFlagsPanel';
import AIReasoningPanel from './components/AIReasoningPanel';
import RecommendedActions from './components/RecommendedActions';
import InputPreviewPanel from './components/InputPreviewPanel';
import ResultActions from './components/ResultActions';

export default function ResultDashboardPage() {
    return (
        <AppLayout>
            <div className="min-h-[calc(100vh-4rem)] bg-background">
                <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-10">
                    <ResultHeader />
                    <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
                        {/* Left column: score + input */}
                        <div className="xl:col-span-1 flex flex-col gap-6">
                            <RiskScorePanel />
                            <InputPreviewPanel />
                            <ResultActions />
                        </div>
                        {/* Right column: flags + reasoning + actions */}
                        <div className="xl:col-span-2 flex flex-col gap-6">
                            <RedFlagsPanel />
                            <AIReasoningPanel />
                            <RecommendedActions />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}