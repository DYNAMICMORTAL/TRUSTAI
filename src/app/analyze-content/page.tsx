import React from 'react';
import AppLayout from '@/components/AppLayout';
import AnalyzeInputPanel from './components/AnalyzeInputPanel';

export default function AnalyzeContentPage() {
    return (
        <AppLayout>
            <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col justify-center items-center">
                <div className="w-full h-full flex flex-col justify-end px-4 sm:px-6 pb-12 pt-16 lg:pt-24 max-w-4xl mx-auto">
                    <AnalyzeInputPanel />
                </div>
            </div>
        </AppLayout>
    );
}