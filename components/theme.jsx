import { useColorScheme } from 'react-native';

const palettes = {
    light: {
        background: '#fff',
        card: '#f0f0f0',
        pressed: '#e0e0e0',
        textPrimary: '#000',
        textSecondary: '#666',
        shadow: 'rgba(0,0,0,0.1)',
    },
    dark: {
        background: '#1c1c1e',
        card: '#2c2c2e',
        pressed: '#3a3a3c',
        textPrimary: '#fff',
        textSecondary: '#aaa',
        shadow: 'rgba(0,0,0,0.5)',
    },
};

export function useTheme() {
    const scheme = useColorScheme();
    return palettes[scheme] || palettes.light;
}
