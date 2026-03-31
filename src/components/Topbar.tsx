import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import MobileMenu from '@/components/MobileMenu';

const navLinks = [
    { label: 'Features', href: '/landing-page#features' },
    { label: 'How It Works', href: '/landing-page#how-it-works' },
    { label: 'Scam Types', href: '/landing-page#scam-types' },
];

export default function Topbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border-subtle bg-background/85 backdrop-blur-md">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/landing-page" className="flex items-center gap-2.5 group">
                    <AppLogo size={32} />
                    <span className="font-semibold text-lg tracking-tight text-text-primary group-hover:text-primary transition-colors duration-200">
                        TrustLayer<span className="text-primary">AI</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks?.map((link) => (
                        <Link
                            key={`nav-${link?.label?.toLowerCase()?.replace(/\s+/g, '-')}`}
                            href={link?.href}
                            className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary rounded-lg hover:bg-black/5 transition-all duration-150"
                        >
                            {link?.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/results-dashboard"
                        className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary text-sm font-medium hover:text-text-primary hover:bg-black/5 transition-all duration-150"
                    >
                        Last Report
                    </Link>
                    <Link
                        href="/analyze-content"
                        className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-white text-sm font-semibold hover:bg-cyan-400 active:scale-95 transition-all duration-150"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 01.75 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-2.929-1.048-5.614-2.773-7.697" />
                        </svg>
                        Analyze Now
                    </Link>
                    <MobileMenu navLinks={navLinks} />
                </div>
            </div>
        </header>
    );
}