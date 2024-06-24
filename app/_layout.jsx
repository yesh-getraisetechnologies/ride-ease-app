import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF6961',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index"  options={{ headerShown: false }}/>
      <Stack.Screen name="splash" options={{ headerShown: false }}/>
      <Stack.Screen name="login" options={{ headerShown: false }}/>
    </Stack>
  );
}
