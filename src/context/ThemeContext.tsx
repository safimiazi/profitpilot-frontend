'use client';

import { Theme, theme } from "@/lib/theme";
import { createContext, ReactNode, useContext } from "react";



const ThemeContext = createContext<Theme>(theme);

interface ThemeProviderProps {
    children: ReactNode,
    customTheme?: Partial<Theme>
}

export function ThemeProvider({ children, customTheme }: ThemeProviderProps) {
    const mergedTheme = {
        ...theme,
        ...customTheme,
        colors: {
            ...theme.colors,
            ...customTheme?.colors,
        },
        spacing: {
            ...theme.spacing,
            ...customTheme?.spacing
        }
    };

    return (
        <ThemeContext.Provider value={mergedTheme}>
            {children}
        </ThemeContext.Provider>
    )
}


export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}