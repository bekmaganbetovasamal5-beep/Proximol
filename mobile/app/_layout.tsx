import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="light-content" backgroundColor="#FF6B6B" />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
          initialRouteName="auth/start"
        >
          {/* Auth screens */}
          <Stack.Screen name="auth/start" />
          <Stack.Screen name="auth/registration" />
          <Stack.Screen name="auth/email-registration" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/email-login" />
          <Stack.Screen name="auth/login-input" />
          <Stack.Screen name="auth/forgot-password" />
          <Stack.Screen name="auth/reset-password" />
          <Stack.Screen name="auth/reset-success" />

          {/* Onboarding screens */}
          <Stack.Screen name="onboarding/1" />
          <Stack.Screen name="onboarding/2" />
          <Stack.Screen name="onboarding/3" />
          <Stack.Screen name="onboarding/4" />

          {/* Profile setup screens */}
          <Stack.Screen name="profile/location" />
          <Stack.Screen name="profile/school" />
          <Stack.Screen name="profile/class" />
          <Stack.Screen name="profile/photo-upload" />
          <Stack.Screen name="profile/main" />

          {/* Main app screens */}
          <Stack.Screen name="polls/main" />
          <Stack.Screen name="polls/voting-1" />
          <Stack.Screen name="polls/voting-2" />
          <Stack.Screen name="polls/voting-3" />
          <Stack.Screen name="polls/voting-4" />

          {/* Results screens */}
          <Stack.Screen name="results/main" />
          <Stack.Screen name="results/compliment-1" />
          <Stack.Screen name="results/compliment-2" />
          <Stack.Screen name="results/compliment-3" />
          <Stack.Screen name="results/compliment-4" />
          <Stack.Screen name="results/compliment-5" />

          {/* Additional screens */}
          <Stack.Screen name="notifications" />
          <Stack.Screen name="about" />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}