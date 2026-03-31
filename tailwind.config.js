/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                background: 'hsl(var(--background))',
                card: 'hsl(var(--card))',
                'card-elevated': 'hsl(var(--card-elevated))',
                border: 'hsl(var(--border))',
                'border-subtle': 'hsl(var(--border-subtle))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                danger: 'hsl(var(--danger))',
                warning: 'hsl(var(--warning))',
                safe: 'hsl(var(--safe))',
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                text: {
                    primary: 'hsl(var(--text-primary))',
                    secondary: 'hsl(var(--text-secondary))',
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out forwards',
                'slide-up': 'slideUp 0.4s ease-out forwards',
                'pulse-slow': 'pulseSlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 3s linear infinite',
                'spin-reverse': 'spin 2s linear infinite reverse',
                'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                slideUp: {
                    from: { opacity: '0', transform: 'translateY(16px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                pulseSlow: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
            },
        },
    },
    plugins: [],
};