/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#182e2c',
          foreground: '#ffffff',
          50: '#e8f0ef',
          100: '#d1e1df',
          200: '#a3c3bf',
          300: '#75a59f',
          400: '#47877f',
          500: '#19695f',
          600: '#145347',
          700: '#0f3d35',
          800: '#0a2823',
          900: '#1c3f3a',
        },
        background: '#ffffff',
        foreground: '#111827',
        accent: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
        },
        success: '#22c55e',
        warning: '#eab308',
        error: '#ef4444',
        card: '#ffffff',
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#182e2c',
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
      },
      fontFamily: {
        pacifico: ['"Pacifico"', 'cursive'],
      },
    },
  },
  plugins: [],
}
