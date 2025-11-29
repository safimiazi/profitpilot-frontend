import { useTheme } from "@/context/ThemeContext";
import { use } from "react"

const useThemeClasses = () => {
    const theme = useTheme();

    return {
        // Layout classes
        layout: `min-h-screen bg-gradient-to-br from-[${theme.colors.background.gradient.from}] to-[${theme.colors.background.gradient.to}] flex items-center justify-center p-4`,

        // Container classes
        container: `w-full max-w-[${theme.spacing.container.maxWidth}] mx-auto`,

        // Card classes
        card: `bg-${theme.colors.background.card} rounded-${theme.borderRadius.large} shadow-${theme.shadows.card} p-8`,

        // Header classes
        header: `text-center mb-${theme.spacing.section.marginBottom}`,
        title: `text-${theme.typography.h1.size} font-${theme.typography.h1.weight} text-${theme.colors.text.primary} mb-2`,
        subtitle: `text-${theme.colors.text.secondary} mb-6`,
        sectionTitle: `text-${theme.typography.h2.size} font-${theme.typography.h2.weight} text-${theme.colors.text.primary}`,

        // Text classes
        text: {
            primary: `text-${theme.colors.text.primary}`,
            secondary: `text-${theme.colors.text.secondary}`,
            light: `text-${theme.colors.text.light}`,
            link: `text-${theme.colors.primary[600]} hover:text-${theme.colors.primary[500]} font-medium`,
        },

        // Form classes
        form: {
            label: `block text-${theme.typography.small.size} font-medium text-${theme.colors.text.primary} mb-2`,
            input: `w-full px-4 py-3 border border-${theme.colors.border.default} rounded-${theme.borderRadius.small} focus:ring-2 focus:ring-${theme.colors.primary[500]} focus:border-${theme.colors.primary[500]} transition-colors`,
            inputGroup: `mb-${theme.spacing.input.marginBottom}`,
        },

        // Button classes
        button: {
            primary: `w-full bg-${theme.colors.primary[600]} text-white py-3 px-4 rounded-${theme.borderRadius.small} hover:bg-${theme.colors.primary[700]} focus:ring-2 focus:ring-${theme.colors.primary[500]} focus:ring-offset-2 transition-colors font-medium`,
            secondary: `w-full border border-${theme.colors.border.default} text-${theme.colors.text.primary} py-3 px-4 rounded-${theme.borderRadius.small} hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center gap-3`,
        },

        // Divider classes
        divider: `relative flex items-center my-6`,
        dividerLine: `flex-grow border-t border-${theme.colors.border.default}`,
        dividerText: `flex-shrink mx-4 text-${theme.colors.text.light} text-${theme.typography.small.size}`,
    };
}

export default useThemeClasses;