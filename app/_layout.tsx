import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/redux/store';
import { loadUser } from '@/redux/slices/userSlice';
import { getItem } from '@/utils/asyncStorage';
import asyncStorageConstants from '@/utils/asyncStorageConstants';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    lexand: require('../assets/fonts/Lexend-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const RenderApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const { token, isAuthenticated } = useSelector(
      (state: RootState) => state.user
    );

    const fetchdata = async () => {
      const user = await getItem(asyncStorageConstants.user);
      dispatch(loadUser(JSON.parse(user)));
    };

    useEffect(() => {
      fetchdata();
    }, [dispatch]);

    useEffect(() => {
      if (!isAuthenticated || !token) {
        router.replace('/login'); // Redirect to login if unauthenticated
      } else {
        router.replace('/(tabs)'); // Redirect to Influencer dashboard
      }
    }, [isAuthenticated, token]);

    return children;
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RenderApp>
          <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
            {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="profile" />
              <Stack.Screen name="quiz" />
              <Stack.Screen name="questionScreen" />
              <Stack.Screen name="result" />
            </Stack>
            <StatusBar style="auto" />
            <Toast />
          </SafeAreaView>
        </RenderApp>
      </SafeAreaProvider>
      {/* </ThemeProvider> */}
    </Provider>
  );
}
