import React from 'react';

const stats = [
    { value: '2.4M+', label: 'Scam attempts detected in 2025', color: 'text-red-400' },
    { value: '₹1,750 Cr', label: 'Lost to UPI fraud in India (2025)', color: 'text-orange-400' },
    { value: '67%', label: 'Scams now AI-generated or enhanced', color: 'text-yellow-400' },
    { value: '3 sec', label: 'Average TrustLayer analysis time', color: 'text-primary' },
];

export default function StatsBar() {
    return (
        <div className="border-y border-border-subtle bg-black/[0.02]">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/5">
                    {stats?.map((stat) => (
                        <div key={`stat-${stat?.label}`} className="lg:px-8 first:pl-0 last:pr-0">
                            <div className={`text-3xl font-bold tabular-nums font-mono mb-1 ${stat?.color}`}>
                                {stat?.value}
                            </div>
                            <div className="text-sm text-text-secondary leading-snug">{stat?.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}