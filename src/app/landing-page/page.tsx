import React from 'react';
import AppLayout from '@/components/AppLayout';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import HowItWorks from './components/HowItWorks';
import DemoPreviewCard from './components/DemoPreviewCard';
import ScamTypesGrid from './components/ScamTypesGrid';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import LandingFooter from './components/LandingFooter';

export default function LandingPage() {
    return (
        <AppLayout>
            <HeroSection />
            <StatsBar />
            <HowItWorks />
            <DemoPreviewCard />
            <ScamTypesGrid />
            <FeaturesSection />
            <CTASection />
            <LandingFooter />
        </AppLayout>
    );
}