import { Button } from "@/components/Button"
import { theme } from "@/styles/theme"
import { useRouter } from "expo-router"
import { ImageBackground, Text, View } from "react-native"

export default function ApresentationScreen() {
  const router = useRouter()

  return (
    <ImageBackground
      source={require("../../assets/images/bird-phone.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >

      <View style={{
        flex: 1,
        justifyContent: "flex-end",
        padding: 24,
        marginBottom: 50
      }}>
        <Text style={{
          fontFamily: 'Merienda',
          fontSize: 32,
          color: theme.colors.text,
          textAlign: 'center',
        }}>
          Bem-vindo
        </Text>
        <Text style={{ 
          fontFamily: 'Merienda', 
          fontSize: 14, 
          color: theme.colors.text, 
          marginBottom: 32,
          textAlign: 'center'
        }}>
          Tecnologia refinada. Experiência absoluta.
        </Text>

        <Button
          title="Login"
          variant="primary"
          isFont={true}
          onPress={() => router.push("/login")}
        />

        <Button
          title="Criar conta"
          variant="link"
          isFont={true}
          onPress={() => router.push("/register")}
        />

      </View>
    </ImageBackground>
  )
}
