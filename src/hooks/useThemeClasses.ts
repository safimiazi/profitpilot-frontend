// hooks/useThemeClasses.ts

import { useTheme } from "@/context/ThemeContext";

export function useThemeClasses() {
  const { theme } = useTheme();

  return {
    // Layout classes
    layout: `min-h-screen bg-gradient-to-br ${
      theme.mode === 'dark' 
        ? 'from-gray-900 to-indigo-950' 
        : 'from-blue-50 to-indigo-100'
    } flex items-center justify-center p-4 transition-colors duration-200`,
    
    // Card classes
    card: `${
      theme.mode === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-100'
    } rounded-2xl shadow-xl p-8 border transition-colors duration-200`,
    
    // Text classes
    text: {
      primary: theme.mode === 'dark' ? 'text-gray-50' : 'text-gray-900',
      secondary: theme.mode === 'dark' ? 'text-gray-300' : 'text-gray-600',
      light: theme.mode === 'dark' ? 'text-gray-400' : 'text-gray-500',
      link: `${
        theme.mode === 'dark' 
          ? 'text-blue-400 hover:text-blue-300' 
          : 'text-blue-600 hover:text-blue-500'
      } font-semibold transition-colors duration-200`,
    },
    
    // Button classes
    button: {
      primary: `w-full ${
        theme.mode === 'dark' 
          ? 'bg-blue-600 hover:bg-blue-700' 
          : 'bg-blue-600 hover:bg-blue-700'
      } text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg`,
      
      secondary: `w-full border-2 ${
        theme.mode === 'dark' 
          ? 'border-gray-600 hover:border-gray-500 text-gray-200' 
          : 'border-gray-300 hover:border-gray-400 text-gray-800'
      } font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow`,
    },
    
    // Input classes
    input: `w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:outline-none transition-all duration-200 ${
      theme.mode === 'dark' 
        ? 'border-gray-700 bg-gray-800 text-gray-100 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-900' 
        : 'border-gray-200 bg-white text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-200'
    }`,
    
    // Divider
    divider: `my-8 border-t ${
      theme.mode === 'dark' ? 'border-gray-700' : 'border-gray-300'
    } transition-colors duration-200`,
  };
}