/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/index.html', './src/script.js'],
    theme: {
        extend: {
            colors: {
                teal: {
                    dark: '#0d5c4e',
                    DEFAULT: '#1a6b5e',
                    mid: '#2a8c7a',
                    light: '#4db6a0',
                    pale: '#d0eeea',
                    bg: '#e8f6f3',
                },
                orange: {
                    DEFAULT: '#e8704a',
                    light: '#f0a080',
                },
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(28px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulse2: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.04)' },
                },
                shimmer: {
                    '100%': { backgroundPosition: '-200% 0' },
                },
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s ease both',
                pulse2: 'pulse2 2s ease-in-out infinite',
                shimmer: 'shimmer 1.5s infinite',
            },
        },
    },
    plugins: [],
};
