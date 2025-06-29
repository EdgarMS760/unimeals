import {
  ThemeProvider as NavigationThemeProvider,
  DefaultTheme as NavigationLightTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { LightTheme, DarkTheme } from '@constants/theme/paperTheme';
import { useColorScheme } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const scheme = useColorScheme();
  const paperTheme = scheme === 'dark' ? DarkTheme : LightTheme;

  // tema navigation sincronizado con Paper
  const navigationTheme = {
    ...(scheme === 'dark' ? NavigationDarkTheme : NavigationLightTheme),
    colors: {
      ...(scheme === 'dark' ? NavigationDarkTheme.colors : NavigationLightTheme.colors),
      background: paperTheme.colors.background,
      card: paperTheme.colors.surface,
      text: paperTheme.colors.onSurface || "#000",
      primary: paperTheme.colors.primary,
    },
  };

  return (
    <GestureHandlerRootView>

      <SafeAreaProvider>
        <PaperProvider theme={paperTheme}>
          <NavigationThemeProvider value={navigationTheme}>
            <Slot />
          </NavigationThemeProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
