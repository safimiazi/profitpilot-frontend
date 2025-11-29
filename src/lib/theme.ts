// lib/theme.ts
export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main primary color
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    background: {
      gradient: {
        from: '#f0f9ff', // blue-50
        to: '#e0e7ff',   // indigo-100
      },
      card: '#ffffff',
    },
    text: {
      primary: '#1f2937',   // gray-900
      secondary: '#6b7280', // gray-600
      light: '#9ca3af',     // gray-400
    },
    border: {
      default: '#d1d5db',   // gray-300
      focus: '#3b82f6',     // primary-500
    },
  },
  spacing: {
    container: {
      maxWidth: '28rem', // max-w-md
      padding: '2rem',   // p-8
    },
    section: {
      marginBottom: '2rem', // mb-8
    },
    input: {
      padding: '0.75rem 1rem', // px-4 py-3
      marginBottom: '1.5rem',  // mb-6
    },
  },
  borderRadius: {
    small: '0.5rem',  // rounded-lg
    medium: '0.75rem', // rounded-xl
    large: '1rem',     // rounded-2xl
  },
  shadows: {
    card: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    button: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  },
  typography: {
    h1: {
      size: '1.875rem', // text-3xl
      weight: 'bold',
    },
    h2: {
      size: '1.5rem', // text-2xl
      weight: '600',
    },
    body: {
      size: '1rem', // text-base
      weight: 'normal',
    },
    small: {
      size: '0.875rem', // text-sm
      weight: 'normal',
    },
  },
} as const;

export type Theme = typeof theme;