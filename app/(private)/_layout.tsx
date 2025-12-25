import { CustomDrawerContent } from "@/components/customDrawercontent"
import { useAuth } from "@/contexts/AuthContext"
import { Ionicons } from "@expo/vector-icons"
import { Redirect } from "expo-router"
import { Drawer } from "expo-router/drawer"

export default function PrivateLayout() {
  const { token, loading } = useAuth()

  if (loading) return null

  if (!token) {
    return <Redirect href="/" />
  }

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: "#111",
          width: 260,
        },
        drawerLabelStyle: {
          color: "#fff",
        },
        headerStyle: {
          backgroundColor: "#111",
        },
        headerTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          title: "Catálogo",
          drawerIcon: ({ color }) => (
            <Ionicons name="cube-outline" size={20} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="products"
        options={{
          title: "Cadastro Produto",
          drawerIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={20} color={color} />
          ),
        }}
      />
    </Drawer>
  )
}
