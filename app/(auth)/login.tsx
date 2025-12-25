import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { useAuth } from '@/contexts/AuthContext'
import { api } from "@/services/api"
import { theme } from "@/styles/theme"
import { showError, showSuccess } from "@/utils/toast"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Text, View } from "react-native"


export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const { signIn } = useAuth()

    async function handleLogin() {
        try {
            const res = await api.post('/auth/login', { 
                email: email.trim().toLocaleLowerCase(), 
                password 
            })

            await signIn(res.data.accessToken)
            showSuccess("Login efetuado com sucesso!")
            router.replace("/dashboard")

        } catch (error) {
            showError("Houve um erro ao logar!")
            console.error("Houve um erro ao logar: ", error)
        }
    }

    return (
        <View style={{ 
            flex: 1, 
            justifyContent: "center", 
            padding: 24, 
            backgroundColor: theme.colors.background 
        }}>
            <Text style={{ 
                fontFamily: 'Merienda',
                fontSize: 32, 
                color: theme.colors.text, 
                marginBottom: 32 
            }}>
                Login
            </Text>

            <Input

                placeholder="Email"
                onChangeText={setEmail}
            />
            <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={setPassword}
            />

            <Button 
                title="Entrar" 
                onPress={handleLogin} 
                isFont={true}
                variant="primary"
            />

            <Button
                title="Criar conta"
                variant="link"
                isFont={true}
                onPress={() => router.push("/register")}
            />
        </View>
    )
}
