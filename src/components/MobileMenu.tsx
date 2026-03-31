'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Shield } from 'lucide-react';

interface NavLink {
    label: string;
    href: string;
}

interface MobileMenuProps {
    navLinks: NavLink[];
}

export default function MobileMenu({ navLinks }: MobileMenuProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-black/5 transition-all duration-150"
                aria-label={open ? 'Close menu' : 'Open menu'}
            >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {open && (
                <div className="fixed inset-0 top-16 z-40 bg-[hsl(240_10%_4%/0.97)] backdrop-blur-md animate-fade-in">
                    <div className="px-6 py-8 flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <a
                                key={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="px-4 py-3 text-base font-medium text-text-primary hover:text-text-primary rounded-xl hover:bg-black/5 transition-all duration-150"
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="mt-4 pt-4 border-t border-border">
                            <Link
                                href="/analyze-content"
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-cyan-500 text-text-primary text-base font-semibold hover:bg-cyan-400 transition-all duration-150"
                            >
                                <Shield className="w-5 h-5" />
                                Analyze Content Now
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}