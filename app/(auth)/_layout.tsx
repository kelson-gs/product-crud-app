import { useAuth } from "@/contexts/AuthContext"
import { Redirect, Stack } from "expo-router"

export default function AuthLayout() {
  const { token } = useAuth()

  if (token) {
    return <Redirect href="/(private)/dashboard" />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
