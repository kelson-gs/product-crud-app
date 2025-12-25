import { AuthProvider } from "@/contexts/AuthContext"
import { useFonts } from 'expo-font'
import { Stack } from "expo-router"
import Toast from "react-native-toast-message"

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Merienda: require("../assets/fonts/Merienda-Regular.ttf"),
    MeriendaBold: require("../assets/fonts/Merienda-Bold.ttf"),
  })

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast/>
    </AuthProvider>
  )
}
