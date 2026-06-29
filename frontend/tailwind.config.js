/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        theme: {
          bg: 'var(--bg-app)',
          sidebar: 'var(--bg-sidebar)',
          header: 'var(--bg-header)',
          footer: 'var(--bg-footer)',
          card: 'var(--bg-card)',
          border: 'var(--border-color)',
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          hover: 'var(--bg-hover)',
          active: 'var(--bg-active-sidebar)',
        },
        // Exact colors from design
        brand: {
          50: '#ecf3ff',
          100: '#dde9ff',
          200: '#c2d6ff',
          300: '#9cb9ff',
          400: '#7592ff',
          500: '#465fff',
          600: '#3641f5',
          700: '#2a31d8',
          800: '#252dae',
          900: '#262e89',
          950: '#161950',
        },
        success: {
          100: '#DFF7DF',
          500: '#16A34A',
          600: '#16A34A',
        },
        error: {
          100: '#FDECEC',
          500: '#EF4444',
          600: '#EF4444',
        },
        warning: {
          100: '#FEF3C7',
          500: '#EAB308',
          600: '#EAB308',
        },
        blue: {
          50: '#EEF4FF',
          100: '#E0E7FF',
          500: '#4F6BFF',
          600: '#2563EB',
        },
        green: {
          50: '#DFF7DF',
          500: '#16A34A',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        red: {
          50: '#FDECEC',
          500: '#EF4444',
        },
        yellow: {
          50: '#FEF3C7',
          500: '#EAB308',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
