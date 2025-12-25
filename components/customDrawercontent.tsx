import { useAuth } from "@/contexts/AuthContext"
import { Ionicons } from "@expo/vector-icons"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { Text, TouchableOpacity, View } from "react-native"

export function CustomDrawerContent(props: any) {
  const { logOut } = useAuth()

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <View
        style={{
          height: 1,
          backgroundColor: "#fff",
          marginVertical: 16,
          marginHorizontal: 12,
        }}
      />

      <TouchableOpacity
        onPress={logOut}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={{ color: "#fff", marginLeft: 12 }}>
          Sair
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  )
}
