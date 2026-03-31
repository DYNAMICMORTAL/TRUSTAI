import React from 'react';
import Topbar from '@/components/Topbar';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: React.ReactNode;
    showTopbar?: boolean;
}

export default function AppLayout({ children, showTopbar = true }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-text-primary">
            {showTopbar && <Topbar />}
            <main className={showTopbar ? 'pt-16' : ''}>
                {children}
            </main>
            <Toaster
                position="bottom-right"
                theme="dark"
                toastOptions={{
                    style: {
                        background: 'hsl(240 8% 10%)',
                        border: '1px solid hsl(240 6% 18%)',
                        color: 'hsl(240 5% 96%)',
                        fontFamily: 'DM Sans, sans-serif',
                    },
                }}
            />
        </div>
    );
}