import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import WelcomeScreen from './welcomeScreen';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';
import { ExpensesProvider } from '@/components/ExpenseContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isWelcomePageVisible, setIsWelcomePageVisible] = useState<boolean>(true);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ExpensesProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
     
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
       
        <Stack.Screen name="+not-found" />
      </Stack>

    </ThemeProvider>
    </ExpensesProvider>
  );
}

