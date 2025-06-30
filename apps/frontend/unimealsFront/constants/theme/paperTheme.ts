import {
  MD3LightTheme as DefaultLight,
  MD3DarkTheme as DefaultDark,
  MD3Theme ,
} from 'react-native-paper';

export const LightTheme: MD3Theme = {
  ...DefaultLight,
  colors: {
    ...DefaultLight.colors,
    primary: '#2e9863',
    secondary: '#fbbf24',
    background: '#f6f6f6',
    surface: '#ffffff',
    onSurface: '#111827',
    error: '#ef4444',

    backgroundSecondary: '#e8ede9',
    textSecondary: '#6b7280',
  },
};


export const DarkTheme: MD3Theme = {
  ...DefaultDark,
  colors: {
    ...DefaultDark.colors,
    primary: '#2e9863',
    secondary: '#fbbf24',
    background: '#121212',
    surface: '#1e1e1e',
    onSurface: '#fefefe',
    error: '#e74c3c',

    backgroundSecondary: '#7f7f80',
    textSecondary: '#b0b0b0',
  },
};
